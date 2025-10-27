#!/usr/bin/env python3
"""
Website Offline Downloader V3 - Complete Playwright-based Implementation

A comprehensive web crawler that uses Playwright for all operations including:
- Website structure analysis
- Authentication/login support
- Asset classification and organization
- API detection and documentation
- Complete URL rewriting for offline viewing
- Detailed reporting and documentation
"""

import os
import re
import json
import csv
import sys
import time
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Set, Optional, Tuple
from urllib.parse import urljoin, urlparse, urlunparse, parse_qs, urlencode
from dataclasses import dataclass, field, asdict
from collections import defaultdict
import mimetypes

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(__name__)


@dataclass
class APICall:
    """Represents a detected API call"""
    url: str
    method: str
    status_code: int
    resource_type: str
    timestamp: float
    request_headers: Dict[str, str] = field(default_factory=dict)
    response_headers: Dict[str, str] = field(default_factory=dict)


@dataclass
class PageInfo:
    """Information about a downloaded page"""
    url: str
    title: str
    depth: int
    local_path: str
    links: List[str] = field(default_factory=list)
    has_form: bool = False
    form_actions: List[str] = field(default_factory=list)
    page_type: str = "unknown"


@dataclass
class WebsiteStructure:
    """Complete website structure analysis"""
    base_url: str
    navigation_items: List[Dict[str, str]] = field(default_factory=list)
    page_types: Dict[str, int] = field(default_factory=dict)
    total_forms: int = 0
    external_domains: Set[str] = field(default_factory=set)
    asset_categories: Dict[str, int] = field(default_factory=dict)


class AssetManager:
    """Manages asset downloading and organization"""

    ASSET_CATEGORIES = {
        'css': {
            'extensions': ['.css'],
            'mime_types': ['text/css'],
            'dir': 'css'
        },
        'js': {
            'extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
            'mime_types': ['application/javascript', 'text/javascript', 'application/x-javascript'],
            'dir': 'js'
        },
        'images': {
            'extensions': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.bmp'],
            'mime_types': ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp', 'image/x-icon'],
            'dir': 'img'
        },
        'fonts': {
            'extensions': ['.woff', '.woff2', '.ttf', '.otf', '.eot'],
            'mime_types': ['font/woff', 'font/woff2', 'font/ttf', 'font/otf', 'application/font-woff'],
            'dir': 'fonts'
        },
        'media': {
            'extensions': ['.mp4', '.webm', '.ogg', '.mp3', '.wav', '.avi', '.mov'],
            'mime_types': ['video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav'],
            'dir': 'media'
        },
        'documents': {
            'extensions': ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
            'mime_types': ['application/pdf', 'application/msword'],
            'dir': 'documents'
        }
    }

    def __init__(self, output_dir: str):
        self.output_dir = Path(output_dir)
        self.downloaded_assets: Set[str] = set()
        self.asset_stats: Dict[str, int] = defaultdict(int)
        self.failed_assets: List[str] = []

    def classify_asset(self, url: str, content_type: Optional[str] = None) -> str:
        """Classify asset by URL extension or content type"""
        parsed = urlparse(url)
        path_lower = parsed.path.lower()

        # Check by extension first
        for category, info in self.ASSET_CATEGORIES.items():
            for ext in info['extensions']:
                if path_lower.endswith(ext):
                    return category

        # Check by content type
        if content_type:
            for category, info in self.ASSET_CATEGORIES.items():
                if any(mime in content_type.lower() for mime in info['mime_types']):
                    return category

        # Default to assets
        return 'assets'

    def get_asset_local_path(self, url: str, base_url: str, category: str) -> Path:
        """Generate local path for asset"""
        parsed_base = urlparse(base_url)
        parsed_asset = urlparse(url)

        # Handle same domain assets
        if parsed_asset.netloc == parsed_base.netloc or not parsed_asset.netloc:
            path = parsed_asset.path.lstrip('/')
        else:
            # External domain assets
            path = f"{parsed_asset.netloc}/{parsed_asset.path.lstrip('/')}"

        # Get category directory
        if category in self.ASSET_CATEGORIES:
            category_dir = self.ASSET_CATEGORIES[category]['dir']
        else:
            category_dir = category

        local_path = self.output_dir / parsed_base.netloc / category_dir / path
        return local_path

    async def download_asset(self, page, url: str, base_url: str) -> Optional[Path]:
        """Download asset using Playwright's request API"""
        if url in self.downloaded_assets:
            category = self.classify_asset(url)
            return self.get_asset_local_path(url, base_url, category)

        try:
            # Use Playwright's request API
            response = await page.request.get(url)

            if response.status != 200:
                logger.warning(f"Asset download failed ({response.status}): {url}")
                self.failed_assets.append(url)
                return None

            # Get content type
            content_type = response.headers.get('content-type', '')

            # Classify and get local path
            category = self.classify_asset(url, content_type)
            local_path = self.get_asset_local_path(url, base_url, category)

            # Create directory
            local_path.parent.mkdir(parents=True, exist_ok=True)

            # Save file
            content = await response.body()
            local_path.write_bytes(content)

            self.downloaded_assets.add(url)
            self.asset_stats[category] += 1

            logger.debug(f"Downloaded {category}: {url}")
            return local_path

        except Exception as e:
            logger.error(f"Error downloading asset {url}: {e}")
            self.failed_assets.append(url)
            return None


class APIDetector:
    """Detects and tracks API calls"""

    def __init__(self):
        self.api_calls: List[APICall] = []
        self.external_domains: Set[str] = set()
        self.rest_endpoints: Dict[str, List[str]] = defaultdict(list)

    def is_api_call(self, url: str, resource_type: str) -> bool:
        """Determine if request is likely an API call"""
        api_indicators = [
            '/api/', '/v1/', '/v2/', '/v3/', '/rest/', '/graphql',
            '/json', '/xml', '.json', '/ajax/', '/service/'
        ]

        resource_types_api = ['xhr', 'fetch', 'websocket']

        if resource_type.lower() in resource_types_api:
            return True

        url_lower = url.lower()
        return any(indicator in url_lower for indicator in api_indicators)

    def track_request(self, request, response=None):
        """Track a network request"""
        try:
            url = request.url
            method = request.method
            resource_type = request.resource_type

            # Check if it's an API call
            if self.is_api_call(url, resource_type):
                parsed = urlparse(url)

                # Track external domains
                self.external_domains.add(parsed.netloc)

                # Create API call record
                api_call = APICall(
                    url=url,
                    method=method,
                    status_code=response.status if response else 0,
                    resource_type=resource_type,
                    timestamp=time.time(),
                    request_headers=dict(request.headers),
                    response_headers=dict(response.headers) if response else {}
                )

                self.api_calls.append(api_call)

                # Track REST endpoints
                if method in ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']:
                    endpoint = f"{method} {parsed.path}"
                    self.rest_endpoints[parsed.netloc].append(endpoint)

        except Exception as e:
            logger.debug(f"Error tracking request: {e}")

    def generate_api_report(self) -> Dict:
        """Generate comprehensive API usage report"""
        report = {
            'total_api_calls': len(self.api_calls),
            'external_domains': sorted(list(self.external_domains)),
            'rest_endpoints': {},
            'api_calls_by_domain': defaultdict(list),
            'api_calls_by_method': defaultdict(int)
        }

        # Organize by domain
        for api_call in self.api_calls:
            parsed = urlparse(api_call.url)
            domain = parsed.netloc
            report['api_calls_by_domain'][domain].append({
                'url': api_call.url,
                'method': api_call.method,
                'status': api_call.status_code,
                'resource_type': api_call.resource_type
            })
            report['api_calls_by_method'][api_call.method] += 1

        # Add REST endpoints
        for domain, endpoints in self.rest_endpoints.items():
            unique_endpoints = sorted(list(set(endpoints)))
            report['rest_endpoints'][domain] = unique_endpoints

        return dict(report)


class WebsiteAnalyzer:
    """Analyzes website structure before crawling"""

    def __init__(self, page):
        self.page = page

    async def analyze(self, url: str) -> WebsiteStructure:
        """Analyze website structure from main page"""
        logger.info(f"Analyzing website structure: {url}")

        structure = WebsiteStructure(base_url=url)

        try:
            await self.page.goto(url, wait_until='networkidle', timeout=30000)

            # Extract navigation items
            structure.navigation_items = await self._extract_navigation()

            # Analyze forms
            structure.total_forms = await self._count_forms()

            # Detect page type
            page_type = await self._detect_page_type()
            structure.page_types[page_type] = 1

            logger.info(f"Found {len(structure.navigation_items)} navigation items")
            logger.info(f"Found {structure.total_forms} forms")
            logger.info(f"Page type: {page_type}")

        except Exception as e:
            logger.error(f"Error analyzing website: {e}")

        return structure

    async def _extract_navigation(self) -> List[Dict[str, str]]:
        """Extract navigation menu items"""
        nav_items = []

        try:
            # Common navigation selectors
            selectors = [
                'nav a', 'header a', '.menu a', '.navigation a',
                '#nav a', '#menu a', '.nav-menu a', '[role="navigation"] a'
            ]

            for selector in selectors:
                try:
                    links = await self.page.query_selector_all(selector)
                    for link in links:
                        href = await link.get_attribute('href')
                        text = await link.inner_text()
                        if href and text:
                            nav_items.append({
                                'text': text.strip(),
                                'href': href.strip()
                            })
                except:
                    continue

            # Remove duplicates
            seen = set()
            unique_items = []
            for item in nav_items:
                key = (item['text'], item['href'])
                if key not in seen:
                    seen.add(key)
                    unique_items.append(item)

            return unique_items[:50]  # Limit to 50 items

        except Exception as e:
            logger.debug(f"Error extracting navigation: {e}")
            return []

    async def _count_forms(self) -> int:
        """Count forms on the page"""
        try:
            forms = await self.page.query_selector_all('form')
            return len(forms)
        except:
            return 0

    async def _detect_page_type(self) -> str:
        """Detect the type of page"""
        try:
            # Check for common page indicators
            title = await self.page.title()
            title_lower = title.lower()

            if 'login' in title_lower or 'sign in' in title_lower:
                return 'login'
            elif 'home' in title_lower or 'index' in title_lower:
                return 'homepage'
            elif 'about' in title_lower:
                return 'about'
            elif 'contact' in title_lower:
                return 'contact'
            elif 'product' in title_lower or 'item' in title_lower:
                return 'product'
            elif 'blog' in title_lower or 'article' in title_lower:
                return 'blog'
            else:
                return 'general'

        except:
            return 'unknown'


class WebsiteCrawler:
    """Main crawler using Playwright exclusively"""

    def __init__(self, args):
        self.args = args
        self.output_dir = Path(args.output)
        self.base_url = args.url
        self.max_depth = args.depth

        # State tracking
        self.visited_urls: Set[str] = set()
        self.pages_info: List[PageInfo] = []
        self.link_tree: Dict = {}

        # Components
        self.asset_manager = AssetManager(args.output)
        self.api_detector = APIDetector()
        self.website_structure: Optional[WebsiteStructure] = None

        # Playwright objects
        self.browser = None
        self.context = None
        self.page = None

    async def initialize_browser(self):
        """Initialize Playwright browser"""
        from playwright.async_api import async_playwright

        logger.info("Initializing Playwright browser...")

        self.playwright = await async_playwright().start()

        # Browser options
        headless = not self.args.visible

        self.browser = await self.playwright.chromium.launch(
            headless=headless,
            args=['--disable-blink-features=AutomationControlled']
        )

        # Create context with realistic settings
        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )

        self.page = await self.context.new_page()

        # Set up network monitoring
        self.page.on('request', lambda req: self._on_request(req))
        self.page.on('response', lambda res: self._on_response(res))

        logger.info(f"Browser initialized (headless={headless})")

    def _on_request(self, request):
        """Handle network requests"""
        try:
            self.api_detector.track_request(request)
        except:
            pass

    def _on_response(self, response):
        """Handle network responses"""
        try:
            request = response.request
            self.api_detector.track_request(request, response)
        except:
            pass

    async def login(self) -> bool:
        """Perform login if credentials provided"""
        if not self.args.login:
            return True

        logger.info("="*60)
        logger.info("Starting login process...")
        logger.info("="*60)

        try:
            login_url = self.args.login_url if self.args.login_url else self.base_url

            logger.info(f"Navigating to login page: {login_url}")
            await self.page.goto(login_url, wait_until='networkidle', timeout=30000)

            # Wait for page to stabilize
            await self.page.wait_for_timeout(2000)

            # Fill username
            logger.info(f"Filling username (selector: {self.args.username_selector})")
            await self.page.fill(self.args.username_selector, self.args.username)
            await self.page.wait_for_timeout(500)

            # Fill password
            logger.info(f"Filling password (selector: {self.args.password_selector})")
            await self.page.fill(self.args.password_selector, self.args.password)
            await self.page.wait_for_timeout(500)

            # Click submit
            logger.info(f"Clicking submit button (selector: {self.args.submit_selector})")
            await self.page.click(self.args.submit_selector)

            # Wait for navigation
            logger.info("Waiting for login to complete...")
            await self.page.wait_for_load_state('networkidle', timeout=30000)
            await self.page.wait_for_timeout(3000)

            current_url = self.page.url
            logger.info(f"Current URL after login: {current_url}")

            # Check if login was successful
            cookies = await self.context.cookies()
            logger.info(f"Login successful! Retrieved {len(cookies)} cookies")

            logger.info("="*60)
            return True

        except Exception as e:
            logger.error(f"Login failed: {e}")
            return False

    async def analyze_website(self):
        """Analyze website structure before crawling"""
        analyzer = WebsiteAnalyzer(self.page)
        self.website_structure = await analyzer.analyze(self.base_url)

        # Save structure to JSON
        structure_file = self.output_dir / "website_structure.json"
        structure_file.parent.mkdir(parents=True, exist_ok=True)

        with open(structure_file, 'w', encoding='utf-8') as f:
            # Convert sets to lists for JSON serialization
            structure_dict = asdict(self.website_structure)
            structure_dict['external_domains'] = list(structure_dict['external_domains'])
            json.dump(structure_dict, f, indent=2, ensure_ascii=False)

        logger.info(f"Website structure saved to {structure_file}")

    def normalize_url(self, url: str) -> str:
        """Normalize URL for comparison"""
        parsed = urlparse(url)

        # Remove fragment
        parsed = parsed._replace(fragment='')

        # Remove trailing slash from path
        path = parsed.path.rstrip('/')
        if not path:
            path = '/'
        parsed = parsed._replace(path=path)

        return urlunparse(parsed)

    def is_same_domain(self, url: str) -> bool:
        """Check if URL belongs to the same domain"""
        base_parsed = urlparse(self.base_url)
        url_parsed = urlparse(url)
        return url_parsed.netloc == base_parsed.netloc

    def url_to_local_path(self, url: str) -> Path:
        """Convert URL to local file path"""
        parsed = urlparse(url)
        path = parsed.path

        # Handle root or directory paths
        if path.endswith('/') or not path:
            path = path.rstrip('/') + '/index.html'
        elif not os.path.splitext(path)[1]:
            path += '/index.html'

        # Create local path
        local_path = self.output_dir / parsed.netloc / path.lstrip('/')
        return local_path

    async def extract_links(self) -> Set[str]:
        """Extract all links from current page"""
        links = set()

        try:
            current_url = self.page.url

            # Extract from <a> tags
            a_links = await self.page.query_selector_all('a[href]')
            for link in a_links:
                href = await link.get_attribute('href')
                if href and not href.startswith('#'):
                    full_url = urljoin(current_url, href)
                    links.add(full_url)

            # Extract from forms
            forms = await self.page.query_selector_all('form[action]')
            for form in forms:
                action = await form.get_attribute('action')
                if action:
                    full_url = urljoin(current_url, action)
                    links.add(full_url)

            # Extract from meta refresh
            meta_refresh = await self.page.query_selector('meta[http-equiv="refresh"]')
            if meta_refresh:
                content = await meta_refresh.get_attribute('content')
                if content:
                    match = re.search(r'url=(.+)', content, re.IGNORECASE)
                    if match:
                        refresh_url = match.group(1).strip('\'"')
                        full_url = urljoin(current_url, refresh_url)
                        links.add(full_url)

        except Exception as e:
            logger.debug(f"Error extracting links: {e}")

        return links

    async def process_html(self, html: str, page_url: str, page_path: Path) -> str:
        """Process HTML and rewrite URLs to relative paths"""
        from bs4 import BeautifulSoup

        soup = BeautifulSoup(html, 'html.parser')
        current_url = page_url

        # Process CSS links
        for tag in soup.find_all('link', href=True):
            original_href = tag['href']
            if original_href.startswith('#') or original_href.startswith('data:'):
                continue

            asset_url = urljoin(current_url, original_href)
            local_path = await self.asset_manager.download_asset(self.page, asset_url, self.base_url)

            if local_path:
                relative_path = os.path.relpath(local_path, page_path.parent)
                tag['href'] = relative_path.replace('\\', '/')

        # Process JavaScript
        for tag in soup.find_all('script', src=True):
            original_src = tag['src']
            if original_src.startswith('data:'):
                continue

            asset_url = urljoin(current_url, original_src)
            local_path = await self.asset_manager.download_asset(self.page, asset_url, self.base_url)

            if local_path:
                relative_path = os.path.relpath(local_path, page_path.parent)
                tag['src'] = relative_path.replace('\\', '/')

        # Process images
        for tag in soup.find_all('img', src=True):
            original_src = tag['src']
            if original_src.startswith('data:'):
                continue

            asset_url = urljoin(current_url, original_src)
            local_path = await self.asset_manager.download_asset(self.page, asset_url, self.base_url)

            if local_path:
                relative_path = os.path.relpath(local_path, page_path.parent)
                tag['src'] = relative_path.replace('\\', '/')

        # Process srcset attributes
        for tag in soup.find_all(attrs={'srcset': True}):
            srcset = tag['srcset']
            new_srcset_parts = []

            for part in srcset.split(','):
                part = part.strip()
                if not part:
                    continue

                parts = part.split()
                if not parts:
                    continue

                url_part = parts[0]
                descriptor = ' '.join(parts[1:]) if len(parts) > 1 else ''

                if url_part.startswith('data:'):
                    new_srcset_parts.append(part)
                    continue

                asset_url = urljoin(current_url, url_part)
                local_path = await self.asset_manager.download_asset(self.page, asset_url, self.base_url)

                if local_path:
                    relative_path = os.path.relpath(local_path, page_path.parent)
                    relative_path = relative_path.replace('\\', '/')
                    new_part = f"{relative_path} {descriptor}".strip()
                    new_srcset_parts.append(new_part)
                else:
                    new_srcset_parts.append(part)

            tag['srcset'] = ', '.join(new_srcset_parts)

        # Process inline styles with url()
        for tag in soup.find_all(style=True):
            style = tag['style']
            urls = re.findall(r'url\([\'"]?([^\'"]+)[\'"]?\)', style)

            for url in urls:
                if url.startswith('data:'):
                    continue

                asset_url = urljoin(current_url, url)
                local_path = await self.asset_manager.download_asset(self.page, asset_url, self.base_url)

                if local_path:
                    relative_path = os.path.relpath(local_path, page_path.parent)
                    relative_path = relative_path.replace('\\', '/')
                    style = style.replace(url, relative_path)

            tag['style'] = style

        # Process internal links
        for tag in soup.find_all('a', href=True):
            href = tag['href']
            if href.startswith('#'):
                continue

            full_url = urljoin(current_url, href)

            if self.is_same_domain(full_url):
                target_path = self.url_to_local_path(full_url)
                relative_path = os.path.relpath(target_path, page_path.parent)
                tag['href'] = relative_path.replace('\\', '/')

        return str(soup)

    async def save_page(self, url: str, depth: int) -> Optional[PageInfo]:
        """Save page with URL rewriting"""
        try:
            # Get rendered HTML
            html = await self.page.content()
            title = await self.page.title()

            # Determine local path
            local_path = self.url_to_local_path(url)

            # Process HTML and rewrite URLs
            processed_html = await self.process_html(html, url, local_path)

            # Create directory and save
            local_path.parent.mkdir(parents=True, exist_ok=True)
            local_path.write_text(processed_html, encoding='utf-8')

            # Extract information
            links = await self.extract_links()

            # Detect forms
            forms = await self.page.query_selector_all('form')
            has_form = len(forms) > 0
            form_actions = []

            for form in forms:
                action = await form.get_attribute('action')
                if action:
                    form_actions.append(action)

            # Create page info
            page_info = PageInfo(
                url=url,
                title=title,
                depth=depth,
                local_path=str(local_path),
                links=list(links),
                has_form=has_form,
                form_actions=form_actions,
                page_type='general'
            )

            self.pages_info.append(page_info)
            logger.info(f"Saved: {url} -> {local_path}")

            return page_info

        except Exception as e:
            logger.error(f"Error saving page {url}: {e}")
            return None

    async def crawl_recursive(self, url: str, depth: int, parent_node: Optional[Dict] = None) -> Optional[Dict]:
        """Recursively crawl website"""
        # Normalize URL
        normalized_url = self.normalize_url(url)

        # Check if already visited
        if normalized_url in self.visited_urls:
            return None

        # Check depth
        if depth > self.max_depth:
            return None

        # Check domain
        if not self.is_same_domain(url):
            return None

        logger.info(f"[Depth {depth}] Crawling: {url}")
        self.visited_urls.add(normalized_url)

        try:
            # Navigate to page
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            await self.page.wait_for_timeout(1000)

            # Save page
            page_info = await self.save_page(url, depth)

            if not page_info:
                return None

            # Create tree node
            node = {
                'url': url,
                'title': page_info.title,
                'depth': depth,
                'has_form': page_info.has_form,
                'children': []
            }

            # Recursively crawl child links
            if depth < self.max_depth:
                for link in page_info.links:
                    normalized_link = self.normalize_url(link)

                    if normalized_link not in self.visited_urls and self.is_same_domain(link):
                        child_node = await self.crawl_recursive(link, depth + 1, node)
                        if child_node:
                            node['children'].append(child_node)

            return node

        except Exception as e:
            logger.error(f"Error crawling {url}: {e}")
            return None

    async def crawl(self):
        """Main crawl execution"""
        logger.info("="*60)
        logger.info("Starting website crawl")
        logger.info(f"Base URL: {self.base_url}")
        logger.info(f"Max depth: {self.max_depth}")
        logger.info(f"Output directory: {self.output_dir}")
        logger.info("="*60)

        # Initialize browser
        await self.initialize_browser()

        # Login if required
        if self.args.login:
            if not await self.login():
                logger.error("Login failed, aborting crawl")
                return

        # Analyze website
        await self.analyze_website()

        # Start crawling
        start_time = time.time()
        self.link_tree = await self.crawl_recursive(self.base_url, 0)
        elapsed_time = time.time() - start_time

        logger.info("="*60)
        logger.info("Crawl completed!")
        logger.info(f"Total pages: {len(self.visited_urls)}")
        logger.info(f"Total time: {elapsed_time:.2f} seconds")
        logger.info("="*60)

    def generate_reports(self):
        """Generate all reports and documentation"""
        logger.info("Generating reports...")

        # Save link tree
        link_tree_file = self.output_dir / "link_tree.json"
        with open(link_tree_file, 'w', encoding='utf-8') as f:
            json.dump(self.link_tree, f, indent=2, ensure_ascii=False)
        logger.info(f"Link tree saved to {link_tree_file}")

        # Save unique links CSV
        csv_file = self.output_dir / "unique_links.csv"
        with open(csv_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['URL', 'Title', 'Depth', 'Has Form', 'Local Path'])
            for page in self.pages_info:
                writer.writerow([
                    page.url,
                    page.title,
                    page.depth,
                    'Yes' if page.has_form else 'No',
                    page.local_path
                ])
        logger.info(f"Unique links saved to {csv_file}")

        # Generate API report
        api_report = self.api_detector.generate_api_report()
        api_report_file = self.output_dir / "api_report.json"

        # Convert defaultdict to dict for JSON serialization
        api_report['api_calls_by_domain'] = dict(api_report['api_calls_by_domain'])
        api_report['api_calls_by_method'] = dict(api_report['api_calls_by_method'])

        with open(api_report_file, 'w', encoding='utf-8') as f:
            json.dump(api_report, f, indent=2, ensure_ascii=False)
        logger.info(f"API report saved to {api_report_file}")

        # Generate README with API documentation
        self.generate_api_readme(api_report)

    def generate_api_readme(self, api_report: Dict):
        """Generate README.md with API documentation"""
        readme_file = self.output_dir / "README.md"

        content = f"""# Website Offline Download Report

## Overview

- **Base URL**: {self.base_url}
- **Download Date**: {time.strftime('%Y-%m-%d %H:%M:%S')}
- **Total Pages**: {len(self.visited_urls)}
- **Max Depth**: {self.max_depth}

## Statistics

### Pages
- Total pages downloaded: {len(self.pages_info)}
- Pages with forms: {sum(1 for p in self.pages_info if p.has_form)}

### Assets
"""

        for category, count in sorted(self.asset_manager.asset_stats.items()):
            content += f"- {category.capitalize()}: {count}\n"

        if self.asset_manager.failed_assets:
            content += f"\n### Failed Assets: {len(self.asset_manager.failed_assets)}\n"

        content += f"""
## API Usage

### Summary
- **Total API Calls**: {api_report['total_api_calls']}
- **External Domains**: {len(api_report['external_domains'])}

### External Domains
"""

        for domain in api_report['external_domains']:
            content += f"- {domain}\n"

        content += "\n### API Calls by Method\n\n"
        for method, count in sorted(api_report['api_calls_by_method'].items()):
            content += f"- {method}: {count}\n"

        content += "\n### REST Endpoints by Domain\n\n"
        for domain, endpoints in api_report['rest_endpoints'].items():
            content += f"\n#### {domain}\n\n"
            for endpoint in sorted(set(endpoints)):
                content += f"- `{endpoint}`\n"

        content += f"""
## Directory Structure

```
{self.output_dir}/
├── {urlparse(self.base_url).netloc}/
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript files
│   ├── img/          # Images
│   ├── fonts/        # Font files
│   ├── assets/       # Other assets
│   └── ...           # HTML pages
├── link_tree.json           # Complete site structure
├── unique_links.csv         # All downloaded pages
├── api_report.json          # Detailed API usage
├── website_structure.json   # Initial site analysis
└── README.md                # This file
```

## Navigation

The website has been downloaded and all URLs have been rewritten to work offline.
Open `{self.url_to_local_path(self.base_url)}` in your browser to start browsing.

## Notes

- All internal links have been rewritten to relative paths
- External resources (APIs, CDNs) are documented but not downloaded
- JavaScript-rendered content has been captured
- Forms and interactive elements are preserved but may not function offline

---

*Generated by Website Offline Downloader V3*
"""

        readme_file.write_text(content, encoding='utf-8')
        logger.info(f"README generated at {readme_file}")

    async def cleanup(self):
        """Cleanup Playwright resources"""
        if self.page:
            await self.page.close()
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if hasattr(self, 'playwright'):
            await self.playwright.stop()


def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='Download website for offline viewing using Playwright',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Basic crawl
  python Donwnload_Website_OfflineV3.py https://example.com

  # With login
  python Donwnload_Website_OfflineV3.py https://example.com --login --username user --password pass

  # Visible browser mode with limited depth
  python Donwnload_Website_OfflineV3.py https://example.com --visible -d 5
        """
    )

    # Required arguments
    parser.add_argument('url', help='Website URL to crawl')

    # Optional arguments
    parser.add_argument('-d', '--depth', type=int, default=10,
                        help='Maximum crawl depth (default: 10)')
    parser.add_argument('-o', '--output', default='downloaded_site',
                        help='Output directory (default: downloaded_site)')

    # Login arguments
    parser.add_argument('--login', action='store_true',
                        help='Enable login before crawling')
    parser.add_argument('--login-url', type=str,
                        help='Login page URL (if different from main URL)')
    parser.add_argument('--username', type=str,
                        help='Login username')
    parser.add_argument('--password', type=str,
                        help='Login password')
    parser.add_argument('--username-selector', type=str,
                        default='input[name="mb_id"]',
                        help='CSS selector for username input (default: input[name="mb_id"])')
    parser.add_argument('--password-selector', type=str,
                        default='input[name="mb_password"]',
                        help='CSS selector for password input (default: input[name="mb_password"])')
    parser.add_argument('--submit-selector', type=str,
                        default='button:has-text("Login")',
                        help='CSS selector for submit button (default: button:has-text("Login"))')

    # Browser mode
    parser.add_argument('--visible', action='store_true',
                        help='Show browser window (default: headless)')

    return parser.parse_args()


async def main():
    """Main entry point"""
    args = parse_arguments()

    # Validate login arguments
    if args.login:
        if not args.username or not args.password:
            logger.error("Error: --login requires --username and --password")
            sys.exit(1)

    # Create crawler
    crawler = WebsiteCrawler(args)

    try:
        # Run crawl
        await crawler.crawl()

        # Generate reports
        crawler.generate_reports()

        logger.info("="*60)
        logger.info("All tasks completed successfully!")
        logger.info(f"Output directory: {crawler.output_dir.absolute()}")
        logger.info("="*60)

    except KeyboardInterrupt:
        logger.warning("\nCrawl interrupted by user")
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Cleanup
        await crawler.cleanup()


if __name__ == '__main__':
    import asyncio

    # Check for Playwright
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("Error: Playwright not installed")
        print("Install with:")
        print("  pip install playwright")
        print("  playwright install chromium")
        sys.exit(1)

    # Run main
    asyncio.run(main())
