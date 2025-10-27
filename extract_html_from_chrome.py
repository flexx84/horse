#!/usr/bin/env python3
"""
Chrome DevTools에서 HTML을 청크로 가져와서 파일로 저장
"""
import json

def save_html_chunks(chunks, output_file):
    """청크들을 합쳐서 HTML 파일로 저장"""
    html = ''.join(chunks)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Saved: {output_file} ({len(html)} bytes)")
    return html

if __name__ == '__main__':
    # 사용 예시
    print("이 스크립트는 청크 데이터를 받아서 HTML 파일로 저장합니다")
