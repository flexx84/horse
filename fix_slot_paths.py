#!/usr/bin/env python3
"""
슬롯 페이지의 절대 경로를 상대 경로로 변환
"""
import re
from pathlib import Path

def fix_slot_page(html_file):
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

    # 4. href="https://impact.me.kr/slot/XX" -> href="../XX" (같은 레벨)
    # NA에서 GA로: href="../GA"
    content = re.sub(r'href="https://impact\.me\.kr/slot/(\w+)(/[^"]*)?', r'href="../\1\2', content)

    # 5. href="/slot/XX" -> href="../XX"
    content = re.sub(r'href="/slot/(\w+)(/[^"]*)?', r'href="../\1\2', content)

    # 6. href="/auth/logout" -> href="../../auth/logout"
    content = content.replace('href="/auth/logout"', 'href="../../auth/logout/index.html"')

    # 7. form action 수정 (이미 fix_all_forms.py에서 했지만 확인)
    if 'action="/auth/login"' in content:
        content = content.replace('action="/auth/login"', 'action="javascript:void(0)"')

    if 'method="post"' in content or 'method="POST"' in content:
        content = re.sub(r'method="(post|POST)"', 'method="get"', content)

    # 8. offline-fix.js 추가 (없으면)
    if 'offline-fix.js' not in content:
        # </body> 태그 앞에 추가
        content = content.replace('</body>', '<!-- Offline Mode Fix Script -->\n<script src="../../js/offline-fix.js"></script>\n</body>')

    # 9. 클라이언트 측 로그인 처리 추가 (없으면)
    if '#btn_login' in content and 'window.location.href' not in content:
        # 로그인 버튼 클릭 시 리다이렉트 스크립트 추가
        login_script = '''
<script>
// 오프라인 모드: 로그인 불필요, 모든 페이지 접근 가능
$(document).ready(function() {
    // 이미 슬롯 페이지에 있으므로 로그인 관련 처리 불필요
    console.log('Offline mode: Slot page loaded');
});
</script>
'''
        content = content.replace('</body>', login_script + '\n</body>')

    # 변경사항 있으면 저장
    if content != original_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

if __name__ == '__main__':
    # NA 슬롯 페이지 수정
    na_file = Path(r'D:\Download_Website_OffilinV2\impact_depth100\impact.me.kr\slot\NA\index.html')

    if na_file.exists():
        print(f"Processing: {na_file}")
        if fix_slot_page(na_file):
            print("  [OK] Paths fixed")
        else:
            print("  [SKIP] No changes needed")
    else:
        print(f"  [ERROR] File not found: {na_file}")
