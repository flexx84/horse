// 전역변수 설정
var g5_url       = "";
var g5_bbs_url   = "";
var g5_is_member = "";
var g5_is_admin  = "";
var g5_is_mobile = "";
var g5_bo_table  = "";
var g5_sca       = "";
var g5_editor    = "";
var g5_cookie_domain = "";

function set_basic_urlinfo(url, bbs_url, is_member, is_admin, is_mobile, bo_table, sca, editor, cookie_domain) {
	g5_url = url;
	g5_bbs_url = bbs_url;
	g5_is_member = is_member;
	g5_is_admin = is_admin;
	g5_is_mobile = is_mobile;
	g5_bo_table = bo_table;
	g5_sca = sca;
	g5_editor = editor;
	g5_cookie_domain = cookie_domain;
}
