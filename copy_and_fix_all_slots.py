#!/usr/bin/env python3
"""
다운로드된 슬롯 페이지들을 복사하고 경로 수정
"""
import re
import shutil
from pathlib import Path

def fix_slot_page(html_file, slot_name):
    """슬롯 페이지의 경로 수정"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. /assets/ -> ../../css/assets/
    content = content.replace('href="/assets/', 'href="../../css/assets/')
    content = content.replace('src="/assets/', 'src="../../css/assets/')

    # 2. /images/ -> ../../img/images/
    content = content.replace('src="/images/', 'src="../../img/images/')
    content = content.replace('href="/images/', 'href="../../img/images/')

    # 3. /js/ -> ../../js/
    content = content.replace('src="/js/', 'src="../../js/')

    # 4. href="https://impact.me.kr/slot/XX" -> href="../XX"
    content = re.sub(r'href="https://impact\.me\.kr/slot/(\w+)(/[^"]*)?', r'href="../\1\2', content)

    # 5. href="/slot/XX" -> href="../XX"
    content = re.sub(r'href="/slot/(\w+)(/[^"]*)?', r'href="../\1\2', content)

    # 6. href="https://impact.me.kr/auth/logout" -> href="../../auth/logout/index.html"
    content = content.replace('href="https://impact.me.kr/auth/logout"', 'href="../../auth/logout/index.html"')
    content = content.replace('href="/auth/logout"', 'href="../../auth/logout/index.html"')

    # 7. form action 수정
    if 'action="/auth/login"' in content:
        content = content.replace('action="/auth/login"', 'action="javascript:void(0)"')

    if 'method="post"' in content or 'method="POST"' in content:
        content = re.sub(r'method="(post|POST)"', 'method="get"', content)

    # 8. offline-fix.js 추가 (없으면)
    if 'offline-fix.js' not in content:
        content = content.replace('</body>', '<!-- Offline Mode Fix Script -->\n<script src="../../js/offline-fix.js"></script>\n</body>')

    # 변경사항 있으면 저장
    if content != original_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

if __name__ == '__main__':
    downloads = Path(r'C:\Users\Administrator\Downloads')
    base_dir = Path(r'D:\Download_Website_OffilinV2\impact_depth100\impact.me.kr\slot')

    # 슬롯 페이지 매핑 (history는 slot 하위)
    slots = {
        'GA': 'slot_GA.html',
        'YA': 'slot_YA.html',
        'WS': 'slot_WS.html',
        'CP': 'slot_CP.html',
        'NS': 'slot_NS.html',
        'history': 'slot_history.html'
    }

    print("=" * 60)
    print("Copying and fixing slot pages...")
    print("=" * 60)

    for slot_name, filename in slots.items():
        source = downloads / filename
        dest = base_dir / slot_name / 'index.html'

        if source.exists():
            print(f"\n{slot_name}:")
            print(f"  Copying: {filename}")

            # 대상 디렉토리 생성
            dest.parent.mkdir(parents=True, exist_ok=True)

            # 파일 복사
            shutil.copy2(source, dest)
            print(f"  -> {dest}")

            # 경로 수정
            if fix_slot_page(dest, slot_name):
                print(f"  [OK] Paths fixed")
            else:
                print(f"  [SKIP] No path changes needed")
        else:
            print(f"\n{slot_name}: [ERROR] Source file not found: {source}")

    print("\n" + "=" * 60)
    print("All slot pages processed!")
    print("=" * 60)
