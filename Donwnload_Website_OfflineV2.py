import os
import re
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from urllib.request import url2pathname
import sys
import json
import csv
import argparse
import logging
from pathlib import Path

sys.setrecursionlimit(10000)

# --- Offline Configuration ---
OFFLINE_ROOT = "downloaded_site"

# --- Runtime Globals ---
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
session = requests.Session()
downloaded_assets = set()

def parse_args():
    parser = argparse.ArgumentParser(description="Download a website for offline viewing.")
    parser.add_argument("url", nargs="?", default="https://xn--o39a0n963awza76tu9hduc.com", help="Root URL to crawl")
    parser.add_argument("-d", "--depth", type=int, default=100, help="Maximum crawl depth")
    parser.add_argument("-o", "--output", default=OFFLINE_ROOT, help="Output directory for offline site")
    
    # 로그인 관련 인자 추가
    parser.add_argument("--login", action="store_true", help="Enable login before crawling")
    parser.add_argument("--login-url", type=str, help="Login page URL (if different from main URL)")
    parser.add_argument("--username", type=str, help="Login username/ID")
    parser.add_argument("--password", type=str, help="Login password")
    parser.add_argument("--username-selector", type=str, default="input[name='mb_id']", 
                        help="CSS selector for username input field")
    parser.add_argument("--password-selector", type=str, default="input[name='mb_password']", 
                        help="CSS selector for password input field")
    parser.add_argument("--submit-selector", type=str, default="button:has-text('로그인')", 
                        help="CSS selector for submit button")
    parser.add_argument("--headless", action="store_true", default=True, 
                        help="Run browser in headless mode (default: True)")
    parser.add_argument("--visible", action="store_true", 
                        help="Run browser in visible mode (shows browser window)")
    
    return parser.parse_args()

# --- 로그인 함수 (Playwright 사용) ---

def login_with_playwright(login_url, username, password, username_selector, password_selector, submit_selector, headless=True):
    """
    Playwright를 사용하여 웹사이트에 로그인하고 인증 쿠키를 반환합니다.
    
    Args:
        login_url: https://xn--o39a0n963awza76tu9hduc.com/
        username: wsh123
        password: 1234
        username_selector: login_id
        password_selector: login_pw
        submit_selector: button:has-text("로그인")
        headless: True
    
    Returns:
        쿠키 딕셔너리 또는 None
    """
    try:
        from playwright.sync_api import sync_playwright
        
        print(f"\n{'='*60}")
        print("🔐 Playwright를 사용하여 로그인 중...")
        print(f"{'='*60}")
        print(f"로그인 URL: {login_url}")
        print(f"사용자명: {username}")
        print(f"헤드리스 모드: {headless}")
        
        with sync_playwright() as p:
            # 브라우저 실행
            browser = p.chromium.launch(headless=headless)
            context = browser.new_context()
            page = context.new_page()
            
            # 로그인 페이지로 이동
            print(f"\n📄 로그인 페이지 접속 중: {login_url}")
            page.goto(login_url, wait_until="networkidle", timeout=30000)
            
            # 페이지 로딩 대기
            time.sleep(2)
            
            # 사용자명 입력
            print(f"✍️  사용자명 입력 중... (selector: {username_selector})")
            page.fill(username_selector, username)
            time.sleep(0.5)
            
            # 비밀번호 입력
            print(f"🔒 비밀번호 입력 중... (selector: {password_selector})")
            page.fill(password_selector, password)
            time.sleep(0.5)
            
            # 로그인 버튼 클릭
            print(f"🖱️  로그인 버튼 클릭 중... (selector: {submit_selector})")
            page.click(submit_selector)
            
            # 로그인 후 페이지 로딩 대기
            print("⏳ 로그인 처리 대기 중...")
            time.sleep(3)
            page.wait_for_load_state("networkidle", timeout=30000)
            
            # 현재 URL 확인
            current_url = page.url
            print(f"📍 현재 URL: {current_url}")
            
            # 쿠키 가져오기
            cookies = context.cookies()
            print(f"\n✅ 로그인 성공! {len(cookies)}개의 쿠키를 획득했습니다.")
            
            # 쿠키 정보 출력 (디버깅용)
            print("\n🍪 획득한 쿠키:")
            for cookie in cookies:
                print(f"  - {cookie['name']}: {cookie['value'][:20]}..." if len(cookie['value']) > 20 else f"  - {cookie['name']}: {cookie['value']}")
            
            # 브라우저 닫기
            browser.close()
            
            # 쿠키를 딕셔너리 형태로 변환
            cookie_dict = {}
            for cookie in cookies:
                cookie_dict[cookie['name']] = cookie['value']
            
            print(f"{'='*60}\n")
            return cookie_dict
            
    except ImportError:
        print("❌ 오류: Playwright가 설치되지 않았습니다.")
        print("다음 명령어로 설치하세요:")
        print("  pip install playwright")
        print("  playwright install chromium")
        return None
    except Exception as e:
        print(f"❌ 로그인 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return None

# --- Utility Functions ---

def is_valid(url):
    """
    Check if the URL is valid (has a scheme and network location).
    """
    parsed = urlparse(url)
    return bool(parsed.scheme) and bool(parsed.netloc)

def url_to_local_path(url):
    """
    Convert a URL into a local file path under OFFLINE_ROOT.
    If the URL path does not have a file extension or ends with a slash, use "index.html".
    """
    parsed = urlparse(url)
    path = parsed.path
    if path.endswith("/"):
        path += "index.html"
    elif not os.path.splitext(path)[1]:
        path += "/index.html"
    local_path = os.path.join(OFFLINE_ROOT, parsed.netloc, path.lstrip("/"))
    return local_path

def ensure_dir(filepath):
    """
    Ensure the directory for the given filepath exists.
    """
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

def download_file(url, local_path):
    """
    Download a file and save it to `local_path` using a shared requests.Session.

    Skips the download if the asset was already fetched during this run or if
    the target file already exists on disk. Returns True if the file is
    confirmed to be available locally.
    """
    try:
        if url in downloaded_assets or os.path.exists(local_path):
            return True
        response = session.get(url, timeout=10)
        if response.status_code == 200:
            ensure_dir(local_path)
            with open(local_path, "wb") as f:
                f.write(response.content)
            downloaded_assets.add(url)
            return True
    except Exception as e:
        print(f"Error downloading asset {url}: {e}")
    return False

# --- URL 정규화 ---

def normalize_url(url):
    """
    URL을 정규화합니다: 백슬래시를 슬래시로, 공백을 %20으로 변환
    """
    # 백슬래시를 슬래시로 변환
    url = url.replace("\\", "/")
    # 공백을 %20으로 변환
    url = url.replace(" ", "%20")
    return url

# --- Asset Processing ---

def process_assets(soup, page_url):
    """
    For asset tags (CSS, JS, images), download the asset file and update the tag
    to refer to the local copy (using a relative path).
    """
    # Process <link> tags (commonly CSS)
    for tag in soup.find_all("link", href=True):
        asset_url = urljoin(page_url, tag["href"].replace(" ", "%20"))
        local_path = url_to_local_path(asset_url)
        relative_path = os.path.relpath(local_path, os.path.dirname(url_to_local_path(page_url)))
        if download_file(asset_url, local_path):
            # Windows 경로 구분자를 웹 경로 구분자로 변경
            tag["href"] = relative_path.replace("\\", "/")

    # Process <script> tags (JavaScript)
    for tag in soup.find_all("script", src=True):
        asset_url = urljoin(page_url, tag["src"].replace(" ", "%20"))
        local_path = url_to_local_path(asset_url)
        relative_path = os.path.relpath(local_path, os.path.dirname(url_to_local_path(page_url)))
        if download_file(asset_url, local_path):
            # Windows 경로 구분자를 웹 경로 구분자로 변경
            tag["src"] = relative_path.replace("\\", "/")

    # Process <img> tags
    for tag in soup.find_all("img", src=True):
        asset_url = urljoin(page_url, tag["src"].replace(" ", "%20"))
        local_path = url_to_local_path(asset_url)
        relative_path = os.path.relpath(local_path, os.path.dirname(url_to_local_path(page_url)))
        if download_file(asset_url, local_path):
            # Windows 경로 구분자를 웹 경로 구분자로 변경
            tag["src"] = relative_path.replace("\\", "/")

def process_links(soup, page_url):
    """
    For anchor tags (<a>) and area tags pointing to internal pages, rewrite the href attribute
    to use a relative local path.
    """
    for tag in soup.find_all("a", href=True):
        href = tag["href"]
        # Skip fragment-only links (e.g. "#section")
        if href.startswith("#"):
            continue
        full_url = urljoin(page_url, href.replace(" ", "%20"))
        # Only rewrite if the link is internal.
        if is_valid(full_url) and urlparse(full_url).netloc == urlparse(page_url).netloc:
            local_path = url_to_local_path(full_url)
            relative_path = os.path.relpath(local_path, os.path.dirname(url_to_local_path(page_url)))
            # Windows 경로 구분자를 웹 경로 구분자로 변경
            tag["href"] = relative_path.replace("\\", "/")

# --- Link Extraction ---

def get_all_links(html_content, base_url):
    """
    Parse HTML and return a set of internal links.
    
    The function scans for URLs in common tag attributes, meta refresh tags,
    inline CSS references, and via regex.
    Any literal spaces are replaced with '%20'.
    Only links that belong to the same domain as base_url (or are file:// URLs)
    are kept.
    """
    soup = BeautifulSoup(html_content, "html.parser")
    links = set()
    url_attrs = ["href", "src", "action", "data-href", "data-src", "data-url", "data-link", "onclick", "onmousedown", "onmouseup", "onmouseover", "onmouseout", "onfocus", "onblur", "data"]
    for tag in soup.find_all(True):
        for attr in url_attrs:
            if tag.has_attr(attr):
                url_candidate = tag.get(attr)
                if url_candidate:
                    url_candidate = normalize_url(url_candidate)
                    full_url = urljoin(base_url, url_candidate)
                    if full_url.startswith("file://"):
                        links.add(full_url)
                    elif is_valid(full_url) and urlparse(full_url).netloc == urlparse(base_url).netloc:
                        links.add(full_url)
    for meta in soup.find_all("meta", attrs={"http-equiv": lambda x: x and x.lower() == "refresh"}):
        content = meta.get("content", "")
        match = re.search(r'url=([\S]+)', content, re.IGNORECASE)
        if match:
            url_candidate = match.group(1).strip().strip('\'"')
            url_candidate = normalize_url(url_candidate)
            full_url = urljoin(base_url, url_candidate)
            if full_url.startswith("file://"):
                links.add(full_url)
            elif is_valid(full_url) and urlparse(full_url).netloc == urlparse(base_url).netloc:
                links.add(full_url)
    css_urls = re.findall(r'url\(([^)]+)\)', html_content)
    for css_url in css_urls:
        css_url = css_url.strip().strip('\'"')
        css_url = normalize_url(css_url)
        full_url = urljoin(base_url, css_url)
        if full_url.startswith("file://"):
            links.add(full_url)
        elif is_valid(full_url) and urlparse(full_url).netloc == urlparse(base_url).netloc:
            links.add(full_url)
    regex_pattern = r'https?://[^\s"\'<>]+'
    for match in re.findall(regex_pattern, html_content):
        fixed_match = normalize_url(match)
        full_url = urljoin(base_url, fixed_match)
        if full_url.startswith("file://"):
            links.add(full_url)
        elif is_valid(full_url) and urlparse(full_url).netloc == urlparse(base_url).netloc:
            links.add(full_url)
    return links

# --- Page Scraping and Offline Saving ---

def replace_absolute_urls(html_content, page_url):
    """
    HTML 내의 절대 URL을 상대 경로로 변환합니다.
    """
    parsed_base = urlparse(page_url)
    domain = parsed_base.netloc
    
    # 절대 URL 패턴들을 상대 경로로 변환
    # https://domain/path -> path 형태로 변환
    patterns = [
        (f'https://{domain}/', ''),
        (f'http://{domain}/', ''),
        (f'https://www.{domain}/', ''),
        (f'http://www.{domain}/', ''),
    ]
    
    for pattern, replacement in patterns:
        html_content = html_content.replace(pattern, replacement)
    
    return html_content

def scrape_page(url):
    """
    Download a page, process its asset files (CSS, JS, images), rewrite the HTML to reference
    local copies (both for assets and internal links), and save the page offline.
    Returns a dictionary with page info.
    """
    try:
        response = session.get(url, timeout=10)
        if response.status_code != 200:
            print(f"Warning: Received status code {response.status_code} for URL: {url}")
            return None
        response.encoding = "utf-8"
        content = response.text
        soup = BeautifulSoup(content, "html.parser")
        # Download assets and update their paths.
        process_assets(soup, url)
        # Update internal links to use relative paths.
        process_links(soup, url)
        modified_html = str(soup)
        
        # HTML 내의 절대 URL을 상대 경로로 변환
        modified_html = replace_absolute_urls(modified_html, url)
        
        local_path = url_to_local_path(url)
        ensure_dir(local_path)
        with open(local_path, "w", encoding="utf-8") as f:
            f.write(modified_html)
        links = get_all_links(modified_html, url)
        title = soup.title.string.strip() if soup.title and soup.title.string else ""
        return {"url": url, "title": title, "html": modified_html, "links": links}
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

def build_tree(url, base_domain, max_depth, visited):
    """
    Recursively scrape pages and build a tree structure representing the site.
    Only follows links that belong to the same domain.
    """
    if url in visited:
        return None
    print(f"Scraping: {url}")
    visited.add(url)
    page_data = scrape_page(url)
    if not page_data:
        return None
    node = {
        "url": page_data["url"],
        "title": page_data["title"],
        "links": sorted(page_data["links"]),
        "children": []
    }
    if max_depth > 0:
        for link in page_data["links"]:
            if urlparse(link).netloc == base_domain:
                child = build_tree(link, base_domain, max_depth - 1, visited)
                if child:
                    node["children"].append(child)
    return node

def traverse_tree(node, unique_links=None):
    """
    Recursively traverse the link tree to collect unique URLs with their titles.
    Returns a dictionary with URLs as keys and titles as values.
    """
    if node is None:
        return unique_links if unique_links is not None else {}
    if unique_links is None:
        unique_links = {}
    url = node.get("url")
    if url and url not in unique_links:
        unique_links[url] = node.get("title", "")
    for child in node.get("children", []):
        traverse_tree(child, unique_links)
    return unique_links

# --- CLI / Main Execution ---

def main():
    args = parse_args()
    website_url = args.url
    max_depth = args.depth

    global OFFLINE_ROOT
    OFFLINE_ROOT = args.output

    # 로그인 처리
    if args.login:
        if not args.username or not args.password:
            print("❌ 오류: --login 옵션 사용 시 --username과 --password가 필요합니다.")
            sys.exit(1)
        
        # 로그인 URL 설정 (지정되지 않으면 메인 URL 사용)
        login_url = args.login_url if args.login_url else website_url
        
        # 헤드리스 모드 설정 (--visible 옵션이 있으면 headless=False)
        headless = not args.visible
        
        # Playwright로 로그인하여 쿠키 획득
        cookies = login_with_playwright(
            login_url=login_url,
            username=args.username,
            password=args.password,
            username_selector=args.username_selector,
            password_selector=args.password_selector,
            submit_selector=args.submit_selector,
            headless=headless
        )
        
        if cookies:
            # 획득한 쿠키를 requests.Session에 주입
            for name, value in cookies.items():
                session.cookies.set(name, value)
            print("✅ 로그인 쿠키를 requests 세션에 주입했습니다.")
            print(f"🚀 이제 인증된 상태로 크롤링을 시작합니다...\n")
        else:
            print("❌ 로그인에 실패했습니다. 크롤링을 중단합니다.")
            sys.exit(1)
    
    # 기존 크롤링 로직 실행
    parsed_base = urlparse(website_url)
    base_domain = website_url if parsed_base.scheme == "file" else parsed_base.netloc

    visited = set()
    tree = build_tree(website_url, base_domain, max_depth, visited)

    # Ensure output directory exists
    os.makedirs(OFFLINE_ROOT, exist_ok=True)

    # Save the link tree
    output_json = os.path.join(OFFLINE_ROOT, "link_tree.json")
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(tree, f, indent=2, ensure_ascii=False)
    print(f"\nLink tree has been saved to {output_json}")

    # Collect unique URLs
    unique_links = traverse_tree(tree)
    output_csv = os.path.join(OFFLINE_ROOT, "unique_links.csv")
    with open(output_csv, "w", encoding="utf-8", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["URL", "Title"])
        for url, title in unique_links.items():
            writer.writerow([url, title])
    print(f"Unique links have been saved to {output_csv}")

    print("\nOffline site has been saved under the directory:", OFFLINE_ROOT)


if __name__ == "__main__":
    main()
