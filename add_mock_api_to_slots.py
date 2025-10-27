#!/usr/bin/env python3
"""
모든 슬롯 페이지에 Mock API 스크립트 추가
"""
from pathlib import Path

def add_mock_api(html_file):
    """슬롯 페이지에 mock-api.js 추가"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 이미 추가되었는지 확인
    if 'mock-api.js' in content:
        return False

    # offline-fix.js 다음에 추가
    if 'offline-fix.js' in content:
        content = content.replace(
            '<script src="../../js/offline-fix.js"></script>',
            '<script src="../../js/offline-fix.js"></script>\n<script src="../../js/mock-api.js"></script>'
        )
    else:
        # offline-fix.js가 없으면 </body> 앞에 추가
        content = content.replace(
            '</body>',
            '<script src="../../js/offline-fix.js"></script>\n<script src="../../js/mock-api.js"></script>\n</body>'
        )

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

if __name__ == '__main__':
    base_dir = Path(r'D:\Download_Website_OffilinV2\impact_depth100\impact.me.kr\slot')

    # 모든 슬롯 페이지
    slots = ['NA', 'GA', 'YA', 'WS', 'CP', 'NS', 'history']

    print("=" * 60)
    print("Adding Mock API to all slot pages...")
    print("=" * 60)

    for slot_name in slots:
        slot_file = base_dir / slot_name / 'index.html'

        if slot_file.exists():
            print(f"\n{slot_name}:")
            if add_mock_api(slot_file):
                print(f"  [OK] Mock API added")
            else:
                print(f"  [SKIP] Mock API already exists")
        else:
            print(f"\n{slot_name}: [ERROR] File not found: {slot_file}")

    print("\n" + "=" * 60)
    print("Complete!")
    print("=" * 60)
