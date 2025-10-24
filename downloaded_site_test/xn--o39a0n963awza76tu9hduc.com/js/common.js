// 전역 변수
var errmsg = "";
var errfld = null;

$(function(){
	$('.numbersOnly').keyup(function() {
		if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
		   this.value = this.value.replace(/[^0-9\.]/g, '');
		}
	});

	$('.my_score_point').keyup(function() {
		if (this.value != this.value.replace(/[^0-9\-]/g, '')) {
		   //this.value = this.value.replace(/[^0-9\-]/g, '');
		} else {
			/**
			var mypoint = parseInt(this.value);
			if (mypoint &gt;= 90) {
				$(this).css("color", "#ff0000");
			} else if (mypoint &gt;= 70) {
				$(this).css("color", "#0000ff");
			} else {
				$(this).css("color", "#000000");
			}
			**/
		}
	});
});

// 필드 검사
function check_field(fld, msg)
{
    if ((fld.value = trim(fld.value)) == "")
        error_field(fld, msg);
    else
        clear_field(fld);
    return;
}

// 필드 오류 표시
function error_field(fld, msg)
{
    if (msg != "")
        errmsg += msg + "\n";
    if (!errfld) errfld = fld;
    fld.style.background = "#BDDEF7";
}

// 필드를 깨끗하게
function clear_field(fld)
{
    fld.style.background = "#FFFFFF";
}

function trim(s)
{
    var t = "";
    var from_pos = to_pos = 0;

    for (i=0; i<s.length; '="" ')="" (i="s.length;" (s.charat(i)="=" break;="" continue;="" else="" for="" from_pos="i;" i="" i++)="" if="" {="" }="">=0; i--)
    {
        if (s.charAt(i-1) == ' ')
            continue;
        else
        {
            to_pos = i;
            break;
        }
    }

    t = s.substring(from_pos, to_pos);
    //				alert(from_pos + ',' + to_pos + ',' + t+'.');
    return t;
}

// 자바스크립트로 PHP의 number_format 흉내를 냄
// 숫자에 , 를 출력
function number_format(data)
{

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;
    
    data = data + '';

    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; !="" "=" + value + " "";="" ";";="" "wformmail",="" %="" '="([^;]+)'));" ((k="" (60*60*1000*expirehours));="" (data.charat(i)="" (document.getelementbyid(id).rows="" (domain)="" (i="0;" (match)="" )="" )'="" +="" ,="" -="" 0)="" 1)="" 1);="" ;="" ;";="" <="" comma="," comma;="" cutlen)="=" data.charat(i);="" data.length="" date();="" del(href)="" delete_cookie(name)="" document.cookie="name" document.getelementbyid(id).style.display="none" document.location.href="href;" domain="" domain)="" else="" expirehours,="" expires=" + today.toGMTString();
}

var last_id = null;
function menu(id)
{
    if (id != last_id)
    {
        if (last_id != null)
            document.getElementById(last_id).style.display = " for="" function="" get_cookie(name)="" i++)="" i;="" i<data.length;="" if="" if(confirm("한번="" if(sign="" if(value="" k="0;" k++;="" last_id="null;" match="document.cookie.match(new" name="" no_comma(data)="" none";="" number="sign+number;" number;="" opt="scrollbars=yes,width=417,height=385,top=10,left=20" opt)="" opt);="" path="/;" popup_formmail(url)="" popup_window(url,="" regexp('(^|="" return="" row="" row)="" set_cookie(name,="" textarea_decrease(id,="" tmp="" tmp;="" today="new" today.settime(today.gettime()="" unescape(match[2]);="" value="get_cookie(name);" value,="" var="" window.open(url,="" winname,="" {="" }="" 검사="" 를="" 방법이="" 복구할="" 삭제="" 삭제하시겠습니까?"))="" 삭제한="" 새="" 얻음="" 없습니다.\n\n정말="" 없앤다.="" 입력="" 자료는="" 지움="" 창="" 쿠키="" 폼메일="" 확인=""> 0)
        document.getElementById(id).rows -= row;
}

function textarea_original(id, row)
{
    document.getElementById(id).rows = row;
}

function textarea_increase(id, row)
{
    document.getElementById(id).rows += row;
}

// 글숫자 검사
function check_byte(content, target)
{
    var i = 0;
    var cnt = 0;
    var ch = '';
    var cont = document.getElementById(content).value;

    for (i=0; i<cont.length; (escape(ch).length="" ch="cont.charAt(i);" i++)="" if="" {=""> 4) {
            cnt += 2;
        } else {
            cnt += 1;
        }
    }
    // 숫자를 출력
    document.getElementById(target).innerHTML = cnt;

    return cnt;
}

// 브라우저에서 오브젝트의 왼쪽 좌표
function get_left_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var left = obj.offsetLeft + document.body.clientLeft;
    var left = obj.offsetLeft;

    while((parentObj=clientObj.offsetParent) != null)
    {
        left = left + parentObj.offsetLeft;
        clientObj = parentObj;
    }

    return left;
}

// 브라우저에서 오브젝트의 상단 좌표
function get_top_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var top = obj.offsetTop + document.body.clientTop;
    var top = obj.offsetTop;

    while((parentObj=clientObj.offsetParent) != null)
    {
        top = top + parentObj.offsetTop;
        clientObj = parentObj;
    }

    return top;
}

function flash_movie(src, ids, width, height, wmode)
{
    var wh = "";
    if (parseInt(width) &amp;&amp; parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    return "<object "+wh+"="" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" id="+ids+"><param name="wmode" value="+wmode+"/><param name="movie" value="+src+"/><param name="quality" value="high"/><embed "+wh+"="" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash" quality="high" src="+src+" type="application/x-shockwave-flash" wmode="+wmode+"/></object>";
}

function obj_movie(src, ids, width, height, autostart)
{
    var wh = "";
    if (parseInt(width) &amp;&amp; parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    if (!autostart) autostart = false;
    return "<embed "+wh+"="" autostart='"+autostart+"' src='"+src+"'/>";
}

function doc_write(cont)
{
    document.write(cont);
}

var win_password_lost = function(href) {
    window.open(href, "win_password_lost", "left=50, top=50, width=617, height=330, scrollbars=1");
}

$(document).ready(function(){
    $("#login_password_lost, #ol_password_lost").click(function(){
        win_password_lost(this.href);
        return false;
    });
});

/**
 * 등록 새창
 **/
var win_open_insert = function(href) {
    var new_win = window.open(href, '', 'left=100, top=100, width=600, height=600, scrollbars=1');
    new_win.focus();
}

/**
 * 포인트 창
 **/
var win_point = function(href) {
    var new_win = window.open(href, 'win_point', 'left=100,top=100,width=600, height=600, scrollbars=1');
    new_win.focus();
}

/**
 * 문자 창
 **/
var win_message = function(href) {
    var new_win = window.open(href, 'win_message', 'left=100,top=100,width=620,height=700,scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var win_memo = function(href) {
    var new_win = window.open(href, 'win_memo', 'left=100,top=100,width=620,height=700,scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var check_goto_new = function(href, event) {
    if( !(typeof g5_is_mobile != "undefined" &amp;&amp; g5_is_mobile) ){
        if (window.opener &amp;&amp; window.opener.document &amp;&amp; window.opener.document.getElementById) {
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            window.open(href);
            //window.opener.document.location.href = href;
        }
    }
}

/**
 * 메일 창
 **/
var win_email = function(href) {
    var new_win = window.open(href, 'win_email', 'left=100,top=100,width=600,height=580,scrollbars=1');
    new_win.focus();
}

/**
 * 자기소개 창
 **/
var win_profile = function(href) {
    var new_win = window.open(href, 'win_profile', 'left=100,top=100,width=620,height=510,scrollbars=1');
    new_win.focus();
}

/**
 * 스크랩 창
 **/
var win_scrap = function(href) {
    var new_win = window.open(href, 'win_scrap', 'left=100,top=100,width=600,height=600,scrollbars=1');
    new_win.focus();
}

/**
 * 홈페이지 창
 **/
var win_homepage = function(href) {
    var new_win = window.open(href, 'win_homepage', '');
    new_win.focus();
}

/**
 * 우편번호 창
 **/
var win_zip = function(frm_name, frm_zip, frm_addr1, frm_addr2, frm_addr3, frm_jibeon) {
    if(typeof daum === 'undefined'){
        alert("다음 우편번호 postcode.v2.js 파일이 로드되지 않았습니다.");
        return false;
    }

    // 핀치 줌 현상 제거
    var vContent = "width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10";
    $("#meta_viewport").attr("content", vContent + ",user-scalable=no");

    var zip_case = 1;   //0이면 레이어, 1이면 페이지에 끼워 넣기, 2이면 새창

    var complete_fn = function(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
        var of = document[frm_name];

        of[frm_zip].value = data.zonecode;

        of[frm_addr1].value = fullAddr;
        of[frm_addr3].value = extraAddr;

        if(of[frm_jibeon] !== undefined){
            of[frm_jibeon].value = data.userSelectedType;
        }
        
        setTimeout(function(){
            $("#meta_viewport").attr("content", vContent);
            of[frm_addr2].focus();
        } , 100);
    };

    switch(zip_case) {
        case 1 :    //iframe을 이용하여 페이지에 끼워 넣기
            var daum_pape_id = 'daum_juso_page'+frm_zip,
                element_wrap = document.getElementById(daum_pape_id),
                currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            if (element_wrap == null) {
                element_wrap = document.createElement("div");
                element_wrap.setAttribute("id", daum_pape_id);
                element_wrap.style.cssText = 'display:none;border:1px solid;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;';
                element_wrap.innerHTML = '<img alt="접기 버튼" class="close_daum_juso" id="btnFoldWrap" src="../../i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" style="cursor:pointer;position:absolute;right:0px;top:-21px;z-index:1"/>';
                jQuery('form[name="'+frm_name+'"]').find('input[name="'+frm_addr1+'"]').before(element_wrap);
                jQuery("#"+daum_pape_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    $("#meta_viewport").attr("content", vContent);
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_wrap.style.display = 'none';
                    // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                    document.body.scrollTop = currentScroll;
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
                // iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    element_wrap.style.height = size.height + "px";
                },
                maxSuggestItems : g5_is_mobile ? 6 : 10,
                width : '100%',
                height : '100%'
            }).embed(element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            element_wrap.style.display = 'block';
            break;
        case 2 :    //새창으로 띄우기
            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                }
            }).open();
            break;
        default :   //iframe을 이용하여 레이어 띄우기
            var rayer_id = 'daum_juso_rayer'+frm_zip,
                element_layer = document.getElementById(rayer_id);
            if (element_layer == null) {
                element_layer = document.createElement("div");
                element_layer.setAttribute("id", rayer_id);
                element_layer.style.cssText = 'display:none;border:5px solid;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
                element_layer.innerHTML = '<img alt="닫기 버튼" class="close_daum_juso" id="btnCloseLayer" src="../../i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1"/>';
                document.body.appendChild(element_layer);
                jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    $("#meta_viewport").attr("content", vContent);
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_layer.style.display = 'none';
                },
                maxSuggestItems : g5_is_mobile ? 6 : 10,
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';
    }
}

/**
 * 새로운 비밀번호 분실 창 : 101123
 **/
win_password_lost = function(href)
{
    var new_win = window.open(href, 'win_password_lost', 'width=617, height=330, scrollbars=1');
    new_win.focus();
}

/**
 * 설문조사 결과
 **/
var win_poll = function(href) {
    var new_win = window.open(href, 'win_poll', 'width=616, height=500, scrollbars=1');
    new_win.focus();
}

/**
 * 쿠폰
 **/
var win_coupon = function(href) {
    var new_win = window.open(href, "win_coupon", "left=100,top=100,width=700, height=600, scrollbars=1");
    new_win.focus();
}


// 로그인 체크
var get_con_user = function() {
	$.ajax({
		type: "POST",
		url: "/bbs/login_ip_check.php",
		dataType: "html",
		success: function(responseText) {

			/**
			if (responseText == 'login_fail') {
				alert('로그인 후 이용해주세요.');
				location.href = "/bbs/login.php";
			}
			**/
			if (responseText == 'ip_fail') {
				alert('중복 로그인 되어 로그아웃 되었습니다.\n\n타인에게 아이디와 비번이 노출되지 않도록 주의해 주세요.');
				location.href = "/";
			}
			setTimeout(get_con_user, 8000); // 8초 후 다시 체크
		},
		error: function(responseText) {
			return false;
		}
	});
};

// 포인트 체크
var get_point_user = function() {
	$.ajax({
		type: "POST",
		url: "/bbs/point_check.php",
		dataType: "html",
		success: function(response) {
			//console.log(response);
			$(".win_point").data("mb_point", response);
			$(".win_point").text(number_format(response) + "원");
			setTimeout(get_point_user, 7000); // 7초 후 다시 체크
		},
		error: function(responseText) {
			return false;
		}
	});
};



/**
 * 스크린리더 미사용자를 위한 스크립트 - 지운아빠 2013-04-22
 * alt 값만 갖는 그래픽 링크에 마우스오버 시 title 값 부여, 마우스아웃 시 title 값 제거
 **/
$(function() {
    $('a img').mouseover(function() {
        $a_img_title = $(this).attr('alt');
        $(this).attr('title', $a_img_title);
    }).mouseout(function() {
        $(this).attr('title', '');
    });
});

/**
 * 텍스트 리사이즈
**/
function font_resize(id, rmv_class, add_class, othis)
{
    var $el = $("#"+id);

	if((typeof rmv_class !== "undefined" &amp;&amp; rmv_class) || (typeof add_class !== "undefined" &amp;&amp; add_class)){
		$el.removeClass(rmv_class).addClass(add_class);

		set_cookie("ck_font_resize_rmv_class", rmv_class, 1, g5_cookie_domain);
		set_cookie("ck_font_resize_add_class", add_class, 1, g5_cookie_domain);
	}

    if(typeof othis !== "undefined"){
        $(othis).addClass('select').siblings().removeClass('select');
    }
}

/**
 * 댓글 수정 토큰
**/
function set_comment_token(f)
{
    if(typeof f.token === "undefined")
        $(f).prepend('<input name="token" type="hidden" value=""/>');

    $.ajax({
        url: g5_bbs_url+"/ajax.comment_token.php",
        type: "GET",
        dataType: "json",
        async: false,
        cache: false,
        success: function(data, textStatus) {
            f.token.value = data.token;
        }
    });
}

$(function(){
    $(".win_popup").click(function() {
        win_open_insert(this.href);
        return false;
    });

    $(".win_point").click(function() {
        win_point(this.href);
        return false;
    });

    $(".win_message").click(function() {
        win_message(this.href);
        return false;
    });

    $(".win_memo").click(function() {
        win_memo(this.href);
        return false;
    });

    $(".win_email").click(function() {
        win_email(this.href);
        return false;
    });

    $(".win_scrap").click(function() {
        win_scrap(this.href);
        return false;
    });

    $(".win_profile").click(function() {
        win_profile(this.href);
        return false;
    });

    $(".win_homepage").click(function() {
        win_homepage(this.href);
        return false;
    });

    $(".win_password_lost").click(function() {
        win_password_lost(this.href);
        return false;
    });

    /*
    $(".win_poll").click(function() {
        win_poll(this.href);
        return false;
    });
    */

    $(".win_coupon").click(function() {
        win_coupon(this.href);
        return false;
    });

	$(".blink_basic").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 700);
	});

	$(".blink_basic_quick").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 300);
	});

	$(".blink").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 700);
	});

	$(".blink2").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 400);
	});

	$(".blink_quick").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 200);
	});

	$(".blink_quick2").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 100);
	});

    // 사이드뷰
    var sv_hide = false;
    $(".sv_member, .sv_guest").click(function() {
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv, .sv_wrap").hover(
        function() {
            sv_hide = false;
        },
        function() {
            sv_hide = true;
        }
    );

    $(".sv_member, .sv_guest").focusin(function() {
        sv_hide = false;
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv a").focusin(function() {
        sv_hide = false;
    });

    $(".sv a").focusout(function() {
        sv_hide = true;
    });


    // 셀렉트 ul
    var sel_hide = false;
    $('.sel_btn').click(function() {
        $('.sel_ul').removeClass('sel_on');
        $(this).siblings('.sel_ul').addClass('sel_on');
    });

    $(".sel_wrap").hover(
        function() {
            sel_hide = false;
        },
        function() {
            sel_hide = true;
        }
    );

    $('.sel_a').focusin(function() {
        sel_hide = false;
    });

    $('.sel_a').focusout(function() {
        sel_hide = true;
    });

    $(document).click(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).focusin(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).on( "keyup change", "textarea#wr_content[maxlength]", function(){
        var str = $(this).val();
        var mx = parseInt($(this).attr("maxlength"));
        if (str.length &gt; mx) {
            $(this).val(str.substr(0, mx));
            return false;
        }
    });
});

function get_blink_process() {

	$(".blink").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 700);
	});

	$(".blink2").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 400);
	});

	$(".blink_quick").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 200);
	});

	$(".blink_quick2").each(function() {
		var ele = $(this);
		setInterval(function() {
			if (ele.css('visibility') == 'hidden') {
				ele.css('visibility', 'visible');
			} else {
				ele.css('visibility', 'hidden');
			}
		}, 100);
	});

}

function get_write_token(bo_table)
{
    var token = "";

    $.ajax({
        type: "POST",
        url: g5_bbs_url+"/write_token.php",
        data: { bo_table: bo_table },
        cache: false,
        async: false,
        dataType: "json",
        success: function(data) {
            if(data.error) {
                alert(data.error);
                if(data.url)
                    document.location.href = data.url;

                return false;
            }

            token = data.token;
        }
    });

    return token;
}


function go_point_order(e) {
	var it_id = $(e).data("it_id");

	var url = "../shop/ajax.cart_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'sw_direct':'1', 'it_id':it_id},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				//alert("저장되었습니다.");
				window.open('../shop/order_form.php?sw_direct=1', 'order', 'width=800, height=600, scrollbars=auto');
			} else {
				alert(response);
			}
		}
	});
}

function go_point_order_cancel(e) {
	var od_id = $(e).data("od_id");

	if (confirm('주문을 취소하시겠습니까?')) {
		var url = "../shop/ajax.cart_order_cancel.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'od_id':od_id},
			dataType: 'html',
			success: function(response) {
				if (response == "OK") {
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}

$(function() {
    $(document).on("click", "form[name=fwrite] input:submit, form[name=fwrite] button:submit, form[name=fwrite] input:image", function() {
        var f = this.form;

        if (typeof(f.bo_table) == "undefined") {
            return;
        }

        var bo_table = f.bo_table.value;
        var token = get_write_token(bo_table);

        if(!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }

        var $f = $(f);

        if(typeof f.token === "undefined")
            $f.prepend('<input name="token" type="hidden" value=""/>');

        $f.find("input[name=token]").val(token);

        return true;
    });
});

$(function () {
    $("ab").click(function () {
        var target = $(this).attr("target");
		var url = $(this).attr("href");
		if (target != "_blank" &amp;&amp; url != "javascript:;") {
			/**
			$(".wrapper").animate({
				"opacity": "0",
				"top": "10px"
			}, 100);
			**/
			$("html, body").animate({scrollTop:0}, '200');
			$(".wrapper").html("<div style="width:100%; text-align:center; padding:50px; color:#fff; font-size:1.2em;"><p>데이터를 가져오는 중입니다.</p><p>잠시만 기다려주세요.</p></div>");
			$(".wrapper").css("min-height", "1500px");
			$(".wrapper").css("background", "#000000");
			document.location.href = url;

			return false;
		}
    });
});

$(document).ready(function() {
    $('#favorite').on('click', function(e) {
        var bookmarkURL = window.location.href;
        var bookmarkTitle = document.title;
        var triggerDefault = false;

        if (window.sidebar &amp;&amp; window.sidebar.addPanel) {
            // Firefox version &lt; 23
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if ((window.sidebar &amp;&amp; (navigator.userAgent.toLowerCase().indexOf('firefox') &gt; -1)) || (window.opera &amp;&amp; window.print)) {
            // Firefox version &gt;= 23 and Opera Hotlist
            var $this = $(this);
            $this.attr('href', bookmarkURL);
            $this.attr('title', bookmarkTitle);
            $this.attr('rel', 'sidebar');
            $this.off(e);
            triggerDefault = true;
        } else if (window.external &amp;&amp; ('AddFavorite' in window.external)) {
            // IE Favorite
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            // WebKit - Safari/Chrome
            alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
        }

        return triggerDefault;
    });
});

function roulette_point(coupon) {
	var mb_point = Number($(".win_point").data("mb_point"));
	var url = g5_url + "/main/popup/ajax.set_member_roulette_point_update.php";
	$.ajax({
		url: url,
		type: 'POST',
        dataType: 'json',
		data: {'coupon':coupon},
		success: function(data) {
			if (data.resCode == "OK") {
				let sum_point = mb_point + Number(data.addPoint);
				$(".win_point").text(number_format(sum_point) + "P");
			} else {
				console.log(data.code + ":" + data.mb_next);
				alert("정상적으로 저장되지 않았습니다.");
			}
		}
	});
}

function goto_vip() {
	/**
	if (confirm("VIP(AI분석)는 신청하신 분에 한하여\n\n오픈하여 드리고 있습니다.\n\n신청하시겠습니까?"))
	{
		location.href = "/lesson";
	}
	**/
	alert("접근 권한이 없습니다.");
}

function numberofcases() {
	var no1 = $("#hrnumber1").val();
	var no2 = $("#hrnumber2").val();
	var no3 = $("#hrnumber3").val();
	var no4 = $("#hrnumber4").val();
	var no5 = $("#hrnumber5").val();

	$(".hrnumber1").text(no1);
	$(".hrnumber2").text(no2);
	$(".hrnumber3").text(no3);
	$(".hrnumber4").text(no4);
	$(".hrnumber5").text(no5);
}

function leftNumberOfCase() {
	var no1 = $("#hrnumber1").val();
	var no2 = $("#hrnumber2").val();
	var no3 = $("#hrnumber3").val();
	var no4 = $("#hrnumber4").val();
	var no5 = $("#hrnumber5").val();

	$(".hrnumber1").text(no1);
	$(".hrnumber2").text(no2);
	$(".hrnumber3").text(no3);
	$(".hrnumber4").text(no4);
	$(".hrnumber5").text(no5);
}

function typeNumberOfCase(betCase) {
	$("#betCase1").removeClass("on");
	$("#betCase2").removeClass("on");
	$("#betCase3").removeClass("on");
	$("#betCase" + betCase).addClass("on");

	$("#betCaseTitle1").removeClass("gray");
	$("#betCaseTitle2").removeClass("gray");
	$("#betCaseTitle3").removeClass("gray");
	$("#betCaseTitle" + betCase).addClass("gray");

	$("#leftBetCase1").hide();
	$("#leftBetCase2").hide();
	$("#leftBetCase3").hide();
	$("#leftBetCase" + betCase).show();
}

function betNumberOfCase() {
	var no1 = $("#hrnumber1").val();
	var no2 = $("#hrnumber2").val();
	var no3 = $("#hrnumber3").val();
	var no4 = $("#hrnumber4").val();
	var no5 = $("#hrnumber5").val();

	$(".hrnumber1").text(no1);
	$(".hrnumber2").text(no2);
	$(".hrnumber3").text(no3);
	$(".hrnumber4").text(no4);
	$(".hrnumber5").text(no5);
}


$(function(){
	$(".outlogin_id").keyup(function(key) {
		if (key.keyCode == 13) {
			foutlogin_submit($(this));
		}
	});
	$(".outlogin_pw").keyup(function(key) {
		if (key.keyCode == 13) {
			foutlogin_submit($(this));
		}
	});
});
function foutlogin_submit(f) {
	var mb_id = $("#login_id").val();
	var mb_pw = $("#login_pw").val();
	var re_url = $("#login_url").val();

	if (trim(mb_id) == "") {
		alert("아이디를 입력해 주세요.");
		f.mb_id.value = "";
		f.mb_id.focus();
		return false;
	}

	if (trim(mb_pw) == "") {
		alert("비밀번호를 입력해 주세요.");
		f.mb_password.value = "";
		f.mb_password.focus();
		return false;
	}

	var url = g5_url + "/bbs/ajax.login_check.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'mb_id':mb_id, 'mb_password':mb_pw},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				//document.location.reload();
				location.href = re_url;
			} else {
				alert(response);
			}
		}
	});
}

function get_analyst_odds_ranking_from_result(e, meet) {
	var url = g5_url + "/main/ajax.get_analyst_odds_order_from_result.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rank_meet':meet},
		dataType: 'html',
		success: function(response) {
			if (meet == "서울") {
				$(e).css("background", "#ff0000");
				$(e).parent().find("a").eq(1).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(2).css("background", "#bcbcbc");
			} else if (meet == "제주") {
				$(e).css("background", "#0066ff");
				$(e).parent().find("a").eq(0).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(2).css("background", "#bcbcbc");
			} else if (meet == "부산경남") {
				$(e).css("background", "#009900");
				$(e).parent().find("a").eq(0).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(1).css("background", "#bcbcbc");
			}
			$("#analyst_result1").html(response);
			
		}
	});
}
function get_analyst_mean_ranking_from_result(e, meet) {
	var url = g5_url + "/main/ajax.get_analyst_mean_order_from_result.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rank_meet':meet},
		dataType: 'html',
		success: function(response) {
			if (meet == "서울") {
				$(e).css("background", "#ff0000");
				$(e).parent().find("a").eq(1).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(2).css("background", "#bcbcbc");
			} else if (meet == "제주") {
				$(e).css("background", "#0066ff");
				$(e).parent().find("a").eq(0).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(2).css("background", "#bcbcbc");
			} else if (meet == "부산경남") {
				$(e).css("background", "#009900");
				$(e).parent().find("a").eq(0).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(1).css("background", "#bcbcbc");
			}
			$("#analyst_result2").html(response);
			
		}
	});
}
function get_analyst_score_ranking_from_result(e, meet) {
	var url = g5_url + "/main/ajax.get_analyst_score_order_from_result.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rank_meet':meet},
		dataType: 'html',
		success: function(response) {
			if (meet == "서울") {
				$(e).css("background", "#ff0000");
				$(e).parent().find("a").eq(1).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(2).css("background", "#bcbcbc");
			} else if (meet == "제주") {
				$(e).css("background", "#0066ff");
				$(e).parent().find("a").eq(0).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(2).css("background", "#bcbcbc");
			} else if (meet == "부산경남") {
				$(e).css("background", "#009900");
				$(e).parent().find("a").eq(0).css("background", "#bcbcbc");
				$(e).parent().find("a").eq(1).css("background", "#bcbcbc");
			}
			$("#analyst_result3").html(response);
			
		}
	});
}


function confirm_membership(mb_type) {

	if (confirm(mb_type + " 멤버쉽에 가입하시겠습니까?")) {
		var url = g5_url + "/shop/ajax.order_data_analysis_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':'', 'data_type':mb_type},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
				} else if (response == "POINT") {
					alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
				} else if (response == "EXIST") {
					alert('이미 가입하셨습니다.');
					location.href = '../member/mypage';
				} else if (response == "OK") {
					alert(mb_type + " 멤버쉽에 정상적으로 가입되었습니다.");
					//location.reload();
					location.href = '../page/data3';
				} else {
					alert(response);
				}
			}
		});
	}
}

function confirm_membership_reload(mb_type) {

	if (confirm(mb_type + " 멤버쉽에 가입하시겠습니까?")) {
		var url = g5_url + "/shop/ajax.order_data_analysis_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':'', 'data_type':mb_type},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
				} else if (response == "POINT") {
					alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
				} else if (response == "EXIST") {
					alert('이미 가입하셨습니다.');
					location.href = '../member/mypage';
				} else if (response == "OK") {
					alert(mb_type + " 멤버쉽에 정상적으로 가입되었습니다.");
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}

function frm_check_all(f)
{
    var chk = document.getElementsByName("chk[]");

    for (i=0; i<chk.length; "="" ""="" "end")="" "exist")="" "login")="" "ok")="" "point")="" "경주="" $("#chat_form_race5duma").html(response);="" $("#chat_form_raceinfo").html(response);="" $("#chat_support_money").data("support_money",="" $("#info_button_blink").addclass("blink_quick");="" $("#race_result_meet1").find("a").eq(race_result1_no).trigger("click");="" $("#race_result_meet2").find("a").eq(race_result2_no).trigger("click");="" $("#race_result_meet3").find("a").eq(race_result3_no).trigger("click");="" $("#user_"="" $(".analystbetno1").text(no1);="" $(".analystbetno2").text(no2);="" $(".analystbetno3").text(no3);="" $(".analystbetno4").text(no4);="" $(".analystbetno5").text(no5);="" $('.modal_close').trigger('click');="" $(document).ready(function(){="" $.ajax({="" &&="" &evno=' + event_no);
}

function get_chat_user_order_mabun_process(analyst, rcDate, meet, rcNo, eventNo) { // 경마 코칭 유저 / 마번보기
	var odType = "chatUser";

	var url = "../shop/ajax.order_data_chatLive_use_point.php";
	$.ajax({
		url: url,
		type: ' &meet=" + meet + " &rcdate=" + rcDate + " &rcno=" + rcNo);
}

function get_chat_coaching_support_money(e) { // 후원금

	var support_money = 0;
	$(" '="" '&meet=" + meet + " 'analyst':analyst,="" 'betno1':no1,="" 'betno2':no2,="" 'betno3':no3,="" 'betno4':no4,="" 'betno5':no5},="" 'eventno':eventno,="" 'html',="" 'json',="" 'meet':meet,="" 'odtype':odtype},="" 'post',="" 'rcdate':rcdate,="" 'rcdate':rcdate,'meet':meet,="" 'rcno':rcno,="" 'rcno':rcno},="" 'viewno':viewno},="" '배\n\n맞습니까?'))="" '배\n삼쌍승="" (chk[i].checked)="" (confirm("정말로="" (confirm('복승="" (data.rescode="=" (infoodds1="" (race_result1_no="=" (race_result2_no="=" (race_result3_no="=" (response="=" (save_check="=" (support_money="" (var="" **="" +="" .modal_close').trigger('click');="" 1000);="" 1;="" 3)="" 5분전까지만="" :="" ;="" additionaldata="&amp;additionalData=1" additionaldata,="" ajax.mb_cutoff_update.php";="" alert("로그인="" alert("마감="" alert("마감되었습니다.");="" alert("보유하신="" alert("삼쌍승="" alert("저장되었습니다.\n\n마감="" alert('이미="" alert('정상적으로="" alert(data.rescode);="" alert(response);="" analyst='$(e).parent().parent().data("analyst");' analyst).html(response);="" analyst_result1="setInterval(auto_play_analyst_ranking1," analyst_result2="setInterval(auto_play_analyst_ranking2," analyst_result3="setInterval(auto_play_analyst_ranking3," auto_play_analyst_ranking1()="" auto_play_analyst_ranking2()="" auto_play_analyst_ranking3()="" bbs="" checked="true;" checked;="" chk="document.getElementsByName(elements_name);" chk[i].checked="f.chkall.checked;" console.error('요청="" console.log(response);="" console.log(support_money);="" data:="" datatype:="" else="" error)="" error);="" error:="" event_no='$(e).parent().parent().data("event_no");' eventno);="" eventno,="" for="" formdata="" frm_is_checked(elements_name)="" function="" function(data)="" function(response)="" function(xhr,="" get_blink_process();="" get_chat_coaching_order_mabun(e)="" get_chat_coaching_support(rcdate,="" get_chat_form_raceinfo(rcdate,="" get_chat_user_bettingno(analyst,="" get_chat_user_order_mabun(e)="" i="0;" i++)="" i<chk.length;="" if="" if($(this).is(":checked")="=" infoodds1="" infoodds2="" infoodds2)="" input:checkbox[id^="chat_support]').each(function(index," insert_race_analysis_info(e)="" item)="" meet='$(e).parent().parent().data("meet");' meet,="" member_cutoff(mb_id)="" modal="" modalextend('modal_layer',="" odtitle="meet" odtype="chatSupport" order_chatcoaching?rcdate=" + rcDate + " order_chatsupport?rcdate=" + rcDate + " order_chatuser?analyst=" + analyst + " parent.location.href="chat?rcDate=" parseint($(this).val());="" post',="" race_result1_no="0;" race_result2_no="0;" race_result3_no="0;" rcdate="" rcdate,="" rcno="" rcno)="" rcno,="" return="" save_check="false;" status,="" success:="" support_money="support_money" support_money);="" true)="" type:="" url="./chat_event_area_user_betNo.ajax.php" url,="" url:="" var="" viewno)="" {="" {'analyst':analyst,="" {'mb_id':mb_id},="" {'odtype':odtype,="" {'rcdate':rcdate,="" {'rcdate':rcdate,'meet':meet,="" }="" });="" },="" 가능합니다.");="" 경마="" 경우="" 구매하신="" 내역이="" 다시="" 당일만="" 데이터="" 마번보기="" 마번보기";="" 보이지="" 부족합니다.");="" 분석표가="" 사용="" 새로고침="" 수정이="" 시도해="" 시키겠습니까?"))="" 실패:',="" 않을="" 유저="" 입력="" 있습니다.');="" 저장되었습니다.');="" 조합기는\n\n경주="" 좌측="" 주세요.");="" 차단="" 추가할="" 코칭="" 포인트가="" 해주세요.');="" 후="" 후원금="" 후원금";=""> 0) {
		$("#chat_support_money").text(number_format(support_money) + "원");
	} else {
		$("#chat_support_money").text("후원 금액을 체크해 주세요.");
	}
}

function get_chat_coaching_support_process(rcDate, meet, rcNo) { // 경마 코칭 / 후원금
	var support_money = $("#chat_support_money").data("support_money");
	if (support_money == "0") {
		alert("후원 금액을 체크해 주세요.");
		return false;
	}
	var odType = "chatSupport";
	var odMoney = support_money;
	var url = "../shop/ajax.order_data_chatLive_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'odType':odType, 'odMoney':odMoney},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
				parent.location.href = '../member/login';
			} else if (response == "POINT") {
				alert("보유하신 포인트가 부족합니다.");
				parent.location.href = '../member/mypage';
			} else if (response == "EXIST") {
				alert('이미 후원금을 보내신 내역이 있습니다.');
				$('.modal_close').trigger('click');
			} else if (response == "OK") {
				var icon_code = "{{후원금}}";
				$("#chat-message").val(icon_code);
				$("#chat-message").text(icon_code);
				$('#btn-chat').trigger('click');

				$('.modal_close').trigger('click');
			} else {
				alert(response);
			}
		}
	});
}


function get_chat_select_percent_bgcolor(e) {
	var select_val = parseInt($(e).val());

	if (select_val &gt;= 90) {
		$(e).css("background-color", "#ff0000");
	} else if (select_val &gt;= 80) {
		$(e).css("background-color", "#0000ff");
	} else if (select_val &gt;= 60) {
		$(e).css("background-color", "#000000");
	} else  {
		$(e).css("background-color", "#000000");
	}
}

function popup_login(f)
{
	var mb_id = f.mb_id.value;
	var mb_pw = f.mb_password.value;

	if (mb_id == "") {
		alert("아이디를 입력해 주세요.");
		f.mb_id.focus();
		return false;
	}
	if (mb_pw == "") {
		alert("비밀번호를 입력해 주세요.");
		f.mb_password.focus();
		return false;
	}

	var url = "../bbs/ajax.login_check.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'mb_id':mb_id, 'mb_password':mb_pw},
        cache: false,
        async: false,
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				document.location.reload();
			} else {
				alert(response);
			}
		}
	});
}

function sleep(ms)
{
    var start = new Date();
    var current = null;
    do { current = new Date(); }
    while(current-start &lt; ms);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// 모달창
function modal(id) {
	var zIndex = 9999999;
	var modal = $('#' + id);

	var bg = $('<div>')
		.css({
			position: 'fixed',
			zIndex: zIndex,
			left: '0',
			top: '0',
			width: '100%',
			height: '100%',
			overflow: 'auto',
			backgroundColor: 'rgba(0,0,0,0.8)'
		})
		.appendTo('body');

	modal
		.css({
			position: 'fixed',
			display: 'block',
			zIndex: zIndex + 1,
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		})
		.show()

		.find('.modal_close')
		.on('click', function () {
			bg.remove();
			modal.hide();
		});
}

// 모달창
function modalExtend(id, url) {
	var zIndex = 9999999;
	var modal = $('#' + id);

	$.ajax({
		url: url,
		type: 'get',
		dataType: 'html',
		success: function (html) {
			//console.log(html);
			var bg = $('<div>')
				.css({
					position: 'fixed',
					zIndex: zIndex,
					left: '0',
					top: '0',
					width: '100%',
					height: '100%',
					overflow: 'auto',
					backgroundColor: 'rgba(0,0,0,0.8)'
				})
				.appendTo('body');

			modal
				.css({
					position: 'fixed',
					display: 'block',
					zIndex: zIndex + 1,
					boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
				})
				.append(html)
				.show()
				.find('.modal_close')
				.on('click', function () {
					bg.remove();
					modal.empty();
					modal.hide();
				});
		},
		error: function (req, stt, err) {
			console.log(req, stt, err);
		}
	});
}

$(function() {
    $(".ranking_list").on({
      "mouseover focus" : function(){
		  if ($(this).data("rank_result") == "1") clearInterval(analyst_result1);
		  else if ($(this).data("rank_result") == "2") clearInterval(analyst_result2);
		  //else if ($(this).data("rank_result") == "3") clearInterval(analyst_result3);
      },
      "mouseout blur" : function(){
		  if ($(this).data("rank_result") == "1") analyst_result1 = setInterval(auto_play_analyst_ranking1, 1000);
		  else if ($(this).data("rank_result") == "2") analyst_result2 = setInterval(auto_play_analyst_ranking2, 1000);
		  //else if ($(this).data("rank_result") == "3") analyst_result3 = setInterval(auto_play_analyst_ranking3, 1000);
      }
    });

	$(".order_point_button").mouseover(function() {
		$(this).parent().css("background-color", "#ff0000");
	});
	$(".order_point_button").mouseout(function() {
		$(this).parent().css("background-color", "");
	});
});</div></div></chk.length;></cont.length;></data.length;></s.length;>