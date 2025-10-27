#!/usr/bin/env python3
"""
Chrome DevTools에서 청크로 가져온 HTML을 합쳐서 저장
"""

# 청크 데이터를 저장할 리스트
chunks = []

# Chunk 0
chunks.append("""<html lang="kr" style="--hdr-h: 80px; --sb-h: 60px;"><head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="1VdEl4F15uZwZKITPtBqCZfz2Tv14xlR55etfHTA">
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>IMPACT</title>

    <link href="/assets/vendor/fontawesome/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;800&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" as="style" crossorigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">

    <link href="/assets/vendor/ionio-icon/css/iconoir.css" rel="stylesheet">

    <link href="/assets/vendor/tabler-icons/tabler-icons.css" rel="stylesheet" type="text/css">

    <link href="/assets/vendor/animation/animate.min.css" rel="stylesheet">

    <link href="/assets/vendor/flag-icons-master/flag-icon.css" rel="stylesheet" type="text/css">

    <link href="/assets/vendor/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css">

    <link href="/assets/vendor/datatable/jquery.dataTables.min.css" rel="stylesheet" type="text/css">

    <link href="/assets/vendor/simplebar/simplebar.css" rel="stylesheet" type="text/css">

    <link href="/assets/css/style.css?v=1761521942" rel="stylesheet" type="text/css">

    <link href="/assets/css/responsive.css" rel="stylesheet" type="text/css">

    <link href="/assets/css/modify.css?v=1761521942" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2-bootstrap4.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">


    <style>
        main {
            padding: 20px;
        }



        .ui-autocomplete {
            z-index: 9999 !important;
        }

        .edit_bx {
            display: none;
        }

        .btn-modal-confirm {
            display: none;
        }

        .btn-modal-cancel {
            display: none;
        }

        .btn-primary {
            height: 100%;
        }

        .selection-bar.is-hidden {
            display: none;
        }

        .modal .modal-dialog {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 450px;
            width: calc(100% - 24px);
        }

        #modal-slot-add .modal-body {
            overflow: visible;
        }

        .mrx-table table {
            table-layout: fixed;
            width: 100%;
        }

        .mrx-table thead th,
        .mrx-table tbody td {
            font-size: 14px;
            text-align: center;
            vertical-align: middle;
            white-space: nowrap;
        }

        .mrx-table tbody td {
            padding: 20px 12px !important;
        }

        /* 줄 가능 셀만 좌측 정렬 */
        .mrx-table .mrx-td--wrap,
        .mrx-table .mrx-td .text_bx,
        .mrx-table .mrx-td .edit_bx,
        .mrx-table .mrx-td--url {
            text-align: center;
            white-space: normal;
            word-break: break-word;
        }

        .mrx-table thead th:nth-child(3) {
            width: 80px;
        }

        .mrx-table thead th:nth-child(4) {
            width: 130px;
        }

        .mrx-table thead th:nth-child(5) {
            width: 120px;
        }

        .mrx-table thead th:nth-child(3) {
            width: 80px;
        }

        .mrx-table thead th:nth-child(6) {
            width: 200px;
        }

        .mrx-table .mrx-td--num,
        .mrx-table th.th-no,
        .mrx-table th.th-check {
            text-align: center;
        }

        .mrx-table col.col-check {
            width: 44px;
        }

        .mrx-table .mrx-td--memo {
            width: 80px;
            min-width: 80px;
            max-width: 80px;
        }

        .memo-cell {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            width: 100%;
        }

        .memo-preview {
            font-size: 11px;
            color: #666;
            width: 100%;
            max-width: 70px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }

        .btn-memo {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn-memo:hover {
            opacity: 0.7;
        }

        .btn-hourly {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn-hourly:hover {
            opacity: 0.7;
        }

        /* 시간별 순위 모달 스타일 */
        .hr {
            padding: 0 0 12px 0;
        }
        .hr__head { padding: 16px 20px 8px; }
        .hr__title { font-size: 18px; font-weight: 700; margin: 0; }
        .hr__sub { color: #666; font-size: 12px; margin-top: 4px; }
        .hr__legend { display:flex; gap:8px; align-items:center; padding: 0 20px 8px; }
        .hr-legend__item { display:flex; gap:6px; align-items:center; color:#666; font-size:12px; }
        .hr-legend__chip { width:8px; height:8px; border-radius:50%; display:inline-block; }
        .hr-legend__chip--up { background:#27ae60; }
        .hr-legend__chip--down { background:#e74c3c; }
        .hr-legend__chip--flat { background:#95a5a6; }
        .hr__body { padding: 0 20px 16px; }
        .hr-list { max-height: 420px; overflow:auto; padding-right: 4px; }
        .hr-item { display:grid; grid-template-columns: 64px 1fr 72px; align-items:center; gap:12px; padding:10px 12px; border:1px solid #eee; border-radius:8px; margin-bottom:8px; background:#fff; }
        .hr-time { font-weight:600; color:#333; }
        .hr-rank { font-weight:700; color:#2c3e50; }
        .hr-delta { justify-self:end; font-size:12px; padding:2px 8px; border-radius:999px; }
        .hr-delta--up { background:rgba(39,174,96,0.1); color:#27ae60; }
        .hr-delta--down { background:rgba(231,76,60,0.1); color:#e74c3c; }
        .hr-delta--flat { background:rgba(149,165,166,0.15); color:#7f8c8d; }

        .mrx-table col.col-no {
            width: 64px;
        }

        .mrx-table col.col-menu {
            width: 72px;
        }

        .mrx-table col.col-rank {
            width: 80px;
        }

        .mrx-table col.col-remain {
            width: 80px;
        }

        .mrx-table col.col-rank-change {
            width: 180px;
        }

        /* 순위변화 컬럼 스타일 */
        .rank-change-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
            width: 100%;
        }

        .rank-change-card {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 4px;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .rank-change-label {
            font-size: 10px;
            font-weight: 600;
            color: #666;
            text-align: center;
            margin-bottom: 2px;
        }

        .rank-change {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            text-align: center;
            white-space: nowrap;
            line-height: 1.2;
        }

        .rank-change--rising {
            background-color: rgba(39, 174, 96, 0.1);
            color: #27ae60;
            border: 1px solid rgba(39, 174, 96, 0.3);
        }

        .rank-change--falling {
            background-color: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
            border: 1px solid rgba(231, 76, 60, 0.3);
        }

        .rank-change--stable {
            background-color: rgba(149, 165, 166, 0.1);
            color: #7f8c8d;
            border: 1px solid rgba(149, 165, 166, 0.3);
        }

        .rank-change--no-data {
            background-color: rgba(149, 165, 166, 0.05);
            color: #95a5a6;
            border: 1px solid rgba(149, 165, 166, 0.2);
        }

        .rank-change--error {
            background-color: rgba(231, 76, 60, 0.05);
            color: #e74c3c;
            border: 1px solid rgba(231, 76, 60, 0.2);
        }

        .rank-change--today-only {
            background-color: rgba(52, 152, 219, 0.1);
            color: #3498db;
            border: 1px solid rgba(52, 152, 219, 0.3);
        }

        /* 모바일용 순위변화 스타일 */
        .rank-change--mobile {
            font-size: 13px;
            padding: 8px 12px;
            min-width: 120px;
            text-align: center;
        }

        .mrx-table col.col-count {
            width: 90px;
        }

        .mrx-table thead th>div {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        @media (max-width: 575.98px) {
            .btn-sm {
                height: 40px !important;
            }
        }
    </style>

    <script src="/js/favicon.js" defer=""></script>
<link rel="icon" type="image/png" href="/images/impact_logo2.png"></head>

<body>
    <div class="app-wrapper">

        <div class="loader-wrapper">
            <div class="app-loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <!-- Menu Navigation starts -->
<nav aria-label="주요 메뉴">
  <div class="app-nav" id="app-simple-bar">

    <!-- 브랜드(모바일에서 닫기 버튼 노출) -->
    <div class="nav-brand">
      <img src="/images/impact_logo.png" class="nav-brand__img" loading="lazy" decoding="async">
      <button type="button" class="nav-close" aria-label="메뉴 닫기">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      </button>
    </div>

    <div class="nav-scroll">
      <ul class="main-nav px-3 mt-4">

        <!-- ===== 관리 그룹 ===== -->

        <!-- ===== 슬롯 그룹(N/C/G/Y) ===== -->
                                      <li class="group-hd">
              <img class="brand-ico" src="/images/n.png" alt="네이버 로고" width="16" height="16" onerror="this.style.display='none'">
              <span class="brand-txt">네이버</span>
            </li>
                                        <li class="no-sub">
                <a href="https://impact.me.kr/slot/NA" aria-current="page">
                  <span class="bullet" aria-hidden="true"></span><span>N자동완성</span>
                </a>
              </li>
                                        <li class="no-sub">
                <a href="https://impact.me.kr/slot/WS" aria-current="false">
                  <span class="bullet" aria-hidden="true"></span><span>N웹트래픽</span>
                </a>
              </li>
                                        <li class="no-sub">
                <a href="https://impact.me.kr/slot/NS" aria-current="false">
                  <span class="bullet" aria-hidden="true"></span><span>N쇼핑</span>
                </a>
              </li>
                        <li class="divider" aria-hidden="true"></li>
                                        <li class="group-hd">
              <img class="brand-ico" src="/images/c.png" alt="쿠팡 로고" width="16" height="16" onerror="this.style.display='none'">
              <span class="brand-txt">쿠팡</span>
            </li>
                                        <li class="no-sub">
                <a href="https://impact.me.kr/slot/CP" aria-current="false">
                  <span class="bullet" aria-hidden="true"></span><span>C쇼핑</span>
                </a>
              </li>
                        <li class="divider" aria-hidden="true"></li>
                                        <li class="group-hd">
              <img class="brand-ico" src="/images/g.png" alt="구글 로고" width="16" height="16" onerror="this.style.display='none'">
              <span class="brand-txt">구글</span>
            </li>
                                        <li class="no-sub">
                <a href="https://impact.me.kr/slot/GA" aria-current="false">
                  <span class="bullet" aria-hidden="true"></span><span>G자동완성</span>
                </a>
              </li>
                                        <li class="no-sub">
                <a href="https://impact.me.kr/slot/YA" aria-current="false">
                  <span class="bullet" aria-hidden="true"></span><span>Y자동완성</span>
                </a>
              </li>
                        <li class="divider" aria-hidden="true"></li>

        <!-- ===== 시스템 그룹 ===== -->
        <li class="group-hd">
          <img class="brand-ico" src="" alt="시스템 로고" width="16" height="16" onerror="this.style.display='none'" style="display: none;">
          <span class="brand-txt">시스템</span>
        </li>

                <li class="no-sub">
          <a href="https://impact.me.kr/slot/history" aria-current="false">
            <span class="bullet" aria-hidden="true"></span><span>정산</span>
          </a>
        </li>


        <li class="divider" aria-hidden="true"></li>

        <!-- 로그아웃: PNG + 호버 애니메이션(유지) -->
        <li class="no-sub mt-auto">
          <a class="logout" href="/auth/logout">
            <img class="item-ico" src="/images/sidenav_logout_icon.png" alt="" width="20" height="20" onerror="this.style.display='none'">
            <span>로그아웃</span>
          </a>
        </li>

      </ul>
    </div>
  </div>
</nav>
<!-- Menu Navigation ends -->



<!-- 오프캔버스 백드롭 -->
<div class="nav-backdrop" hidden=""></div>

        <div class="app-content">
            <div class="">

                <!-- Header Section -->
<header class="header-main" role="banner">
  <div class="header-inner">
    <div class="header-left">
      <!-- 모바일 전용 햄버거 -->
      <button type="button" class="header-toggle" aria-label="메뉴 열기/닫기" aria-controls="app-simple-bar">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <rect x="3" y="6" width="18" height="2" rx="1"></rect>
          <rect x="3" y="11" width="18" height="2" rx="1"></rect>
          <rect x="3" y="16" width="18" height="2" rx="1"></rect>
        </svg>
      </button>

      <h1 class="main-title">
        N자동완성 슬롯
      </h1>
    </div>

    <div class="header-right">
            <div class="profile-chip" title="pcsmkt7 (장부장님)">
        <span class="profile-avatar" aria-hidden="true">P</span>
        <span class="profile-text">
          <span class="profile-id">pcsmkt7</span>
          <span class="profile-name">(장부장님)</span>
        </span>
      </div>
    </div>
  </div>
</header>

                    <main>
        <div class="container-fluid">



            <div class="page-wrapper d-flex">
                <div class="content-area">
                    <div class="card">
                        <div class="card-body pt-0">
                            <div class="ui-toolbar" role="region" aria-label="슬롯 상태 필터">
                                <div class="ui-toolbar__row">
                                    <div class="ui-chips" aria-label="상태 선택">

                                                                                                                                <a href="/slot/NA?type=ALL" class="chip is-active" aria-current="true">
                                                <span class="chip__label">전체</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                                                                                <a href="/slot/NA?type=EMPTY" class="chip" aria-current="false">
                                                <span class="chip__label">빈슬롯</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                                                                                <a href="/slot/NA?type=ING" class="chip" aria-current="false">
                                                <span class="chip__label">사용중</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                                                                                <a href="/slot/NA?type=LOW" class="chip" aria-current="false">
                                                <span class="chip__label">오류</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                                                                                <a href="/slot/NA?type=EXPIRE" class="chip" aria-current="false">
                                                <span class="chip__label">만료예정</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                                                                                <a href="/slot/NA?type=END" class="chip" aria-current="false">
                                                <span class="chip__label">기간종료</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                                                                                <a href="/slot/NA?type=DEL" class="chip" aria-current="false">
                                                <span class="chip__label">최근삭제</span>
                                                <span class="chip__badge">0</span>
                                            </a>
                                                                            </div>
                                </div>
                            </div>

                            <section class="tools-basic" aria-label="기본 도구">
                                <div class="tb-grid">
                                    <div class="tb-actions">
                                                                                <button type="button" id="btn-modal-edit-all" class="btn-outline btn-sm">일괄
                                            수정</button>
                                        <button type="button" id="btn-modal-excel" class="btn-outline btn-sm">엑셀 수정</button>
                                    </div>

                                    <form id="form-search" method="GET" class="tb-search">
                                        <input type="hidden" name="type" value="ALL">
                                        <input type="hidden" id="sort" name="sort" value="">
                                        <input type="hidden" id="orderby" name="orderby" value="">
                                        <input type="hidden" id="limit" name="limit" value="50">
                                        <input class="ipt" name="search" placeholder="이름, 아이디, 메모 검색" value="">
                                        <button type="submit" id="button-search" class="btn-primary">검색</button>
                                    </form>


                                    <div class="ui-limit" id="uiLimit">
                                        <div class="dht-select" id="dhtLimit">
                                            <button type="button" class="dht-select__btn" id="dhtLimitBtn" aria-haspopup="listbox" aria-expanded="false">
                                                <span class="dht-select__label">50개씩 보기</span>
                                                <i class="dht-select__caret" aria-hidden="true"></i>
                                            </button>
                                            <ul class="dht-select__list" id="dhtLimitList" role="listbox" tabindex="-1" aria-labelledby="dhtLimitBtn"><li role="option" class="dht-select__opt" data-val="50" aria-selected="true">50개씩 보기</li><li role="option" class="dht-select__opt" data-val="100" aria-selected="false">100개씩 보기</li><li role="option" class="dht-select__opt" data-val="300" aria-selected="false">300개씩 보기</li><li role="option" class="dht-select__opt" data-val="500" aria-selected="false">500개씩 보기</li><li role="option" class="dht-select__opt" data-val="1000" aria-selected="false">1000개씩 보기</li></ul>
                                        </div>

                                        <select id="select-limit" class="native-select" aria-hidden="true">
                                            <option value="50" selected="">50개씩 보기</option>
                                            <option value="100">100개씩 보기
                                            </option>
                                            <option value="300">300개씩 보기
                                            </option>
                                            <option value="500">500개씩 보기
                                            </option>
                                            <option value="1000">1000개씩 보기
                                            </option>
                                        </select>
                                    </div>


                                </div>
                            </section>

                            <section id="selection-bar" class="selection-bar" aria-hidden="true"><div style="position: absolute; top: 0px; height: 1px;"></div>
                                <div class="sb-surface" id="sbSurface">
                                    <div class="sb-grid">
                                        <div class="sb-left">
                                            <span class="sb-count"><strong id="sbCount">0</strong>개 선택됨</span>
                                        </div>

                                        <div class="sb-actions">
                                            <button type="button" id="sbClear" class="mxsb-btn mxsb-btn--sm">선택 해제</button>

                                                                                                                                </div>
                                    </div>
                                </div>
                            </section>


                            <div class="table-responsive mrx-table">
                                <table class="table table-bottom-border table-hover table-striped table-fixed align-middle mb-0">

                                    <thead>
                                        <tr>
                                            <th class="th-check">
                                                <input id="select-all" type="checkbox">
                                            </th>
                                            <th class="th-no" style="white-space:nowrap;">
                                                <div style="display:flex;align-items:center;gap:6px"><span>NO</span></div>
                                            </th>

                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>코드</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="s.ID" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="s.ID" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>아이디</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="u.USER_ID" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="u.USER_ID" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>대행사</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="a.USER_ID" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="a.USER_ID" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>키워드</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="s.KEYWORD" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="s.KEYWORD" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>순위<br>
키워드</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="s.RANKKEYWORD" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="s.RANKKEYWORD" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>순위</span>


                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; width: 180px;">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>순위변화</span>


                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>생성상태</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="a.RANKING_STATUS" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="a.RANKING_STATUS" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>시작일</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="s.STARTDATE" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="s.STARTDATE" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>마감일</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="s.ENDDATE" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="s.ENDDATE" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>
                                                                                                                                            <th style="white-space:nowrap; ">
                                                    <div style="display:flex;align-items:center;gap:6px">
                                                        <span>잔여일</span>

                                                                                                                    <div style="display:flex;flex-direction:column;line-height:1;margin-left:4px">
                                                                <a href="#" class="sort sort-asc" data-sort="s.ENDDATE" data-orderby="asc" aria-label="오름차순"></a>
                                                                <a href="#" class="sort sort-desc" data-sort="s.ENDDATE" data-orderby="desc" aria-label="내림차순"></a>
                                                            </div>

                                                    </div>
                                                </th>

                                            <th style="white-space:nowrap;">메모</th>
                                            <th style="white-space:nowrap;">메뉴</th>
                                        </tr>
                                    </thead>


                                    <tbody class="mrx-tbody">
                                                                                                                    </tbody>
                                </table>
                            </div>

                            <div class="mxc-cards d-lg-none">
                                <div class="mxc-list">
                                                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-footer ">


                    </div>
                </div>
            </div>
        </div>

        <div id="mxsSlot" class="mxs-sheet" aria-hidden="true">
            <div class="mxs-backdrop js-mxs-close"></div>
            <div class="mxs-panel" role="dialog" aria-modal="true" aria-labelledby="mxsTitle">
                <div class="mxs-handle"></div>
                <div class="mxs-header">
                    <div id="mxsTitle" class="mxs-title">코드</div>
                    <div id="mxsSub" class="mxs-sub">대행사 · 잔여일</div>
                </div>
                <div class="mxs-body">
                    <div class="mxs-kv">
                        <div class="mxs-k">코드</div>
                        <div class="mxs-v" id="mxvId"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">대행사</div>
                        <div class="mxs-v" id="mxvAgency"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">잔여일</div>
                        <div class="mxs-v" id="mxvRemain"></div>
                    </div>

                    <div class="mxs-kv">
                        <div class="mxs-k">아이디</div>
                        <div class="mxs-v" id="mxvUser"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">이름</div>
                        <div class="mxs-v" id="mxvUserName"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">키워드</div>
                        <div class="mxs-v" id="mxvKeyword"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">순위키워드</div>
                        <div class="mxs-v" id="mxvRankKeyword"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">현재 순위</div>
                        <div class="mxs-v">
                            <span id="mxvRanking"></span>
                            <button type="button" class="mxs-btn mxs-btn--link" id="mxvRankBtn" data-id="">자세히 보기</button>
                        </div>
                    </div>
                                            <div class="mxs-kv">
                            <div class="mxs-k">오늘순위변화</div>
                            <div class="mxs-v">
                                <div class="rank-change rank-change--mobile" id="mxvTodayRankChange">데이터 부족</div>
                            </div>
                        </div>
                        <div class="mxs-kv">
                            <div class="mxs-k">첫순위변화</div>
                            <div class="mxs-v">
                                <div class="rank-change rank-change--mobile" id="mxvFirstRankChange">데이터 부족</div>
                            </div>
                        </div>
                                                                                                                                                <div class="mxs-kv">
                            <div class="mxs-k">생성상태</div>
                            <div class="mxs-v" id="mxvRankingStatus"></div>
                        </div>
                                        <div class="mxs-kv">
                        <div class="mxs-k">시작일</div>
                        <div class="mxs-v" id="mxvStart"></div>
                    </div>
                    <div class="mxs-kv">
                        <div class="mxs-k">마감일</div>
                        <div class="mxs-v" id="mxvEnd"></div>
                    </div>
                                        <div class="mxs-kv">
                        <div class="mxs-k">메모</div>
                        <div class="mxs-v" id="mxvMemo"></div>
                    </div>
                </div>
                <div class="mxs-actions">
                    <button type="button" class="mxs-btn js-mxs-close">닫기</button>
                    <button type="button" class="mxs-btn mxs-btn--primary js-mxs-edit">수정</button>
                    <button type="button" class="mxs-btn js-mxs-cancel" hidden="">취소</button>
                    <button type="button" class="mxs-btn mxs-btn--primary js-mxs-confirm" hidden="">확인</button>
                                    </div>
            </div>
        </div>

    </main>




                <footer class="app-footer">
  <div class="container-fluid app-footer__wrap">
    <div class="app-footer__left">
      <span class="app-footer__copy">
        Copyright © <span id="copyYear">2025</span> kimsangmin
      </span>
    </div>

    <ul class="app-footer__links">
      <li>
        <a href="https://instagram.com/smwtb_h" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" fill="none" stroke="currentColor" stroke-width="1.6"></path>
            <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"></circle>
            <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"></circle>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</footer>
            </div>
        </div>
    </div>

""")

print(f"Chunk 0 added ({len(chunks[0])} bytes)")
print("Ready to collect remaining chunks...")
print("Note: You need to manually add chunks 1-5 from Chrome DevTools evaluate_script")
