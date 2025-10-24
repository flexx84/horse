var wrestMsg = "";
var wrestFld = null;
var wrestFldDefaultColor = "";
//var wrestFldBackColor = "#ff3061";

// subject 속성값을 얻어 return, 없으면 tag의 name을 넘김
function wrestItemname(fld)
{
    //return fld.getAttribute("title") ? fld.getAttribute("title") : ( fld.getAttribute("alt") ? fld.getAttribute("alt") : fld.name );
    var id = fld.getAttribute("id");
    var labels = document.getElementsByTagName("label");
    var el = null;

    for(i=0; i<labels.length; !="null)" break;="" el="labels[i];" i++)="" if(el="" if(id="=" labels[i].htmlfor)="" text="el.innerHTML.replace(/[&lt;].*[" var="" {="" }="">].*[&lt;]\/+.*[&gt;]/gi, "");

        if(text == '') {
            return fld.getAttribute("title") ? fld.getAttribute("title") : ( fld.getAttribute("placeholder") ? fld.getAttribute("placeholder") : fld.name );
        } else {
            return text;
        }
    } else {
        return fld.getAttribute("title") ? fld.getAttribute("title") : ( fld.getAttribute("placeholder") ? fld.getAttribute("placeholder") : fld.name );
    }
}

// 양쪽 공백 없애기
function wrestTrim(fld)
{
    var pattern = /(^\s+)|(\s+$)/g; // \s 공백 문자
    return fld.value.replace(pattern, "");
}

// 필수 입력 검사
function wrestRequired(fld)
{
    if (wrestTrim(fld) == "") {
        if (wrestFld == null) {
            // 셀렉트박스일 경우에도 필수 선택 검사합니다.
            wrestMsg = wrestItemname(fld) + " : 필수 "+(fld.type=="select-one"?"선택":"입력")+"입니다.\n";
            wrestFld = fld;
        }
    }
}

// 김선용 2006.3 - 전화번호(휴대폰) 형식 검사 : 123-123(4)-5678
function wrestTelNum(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if(!pattern.test(fld.value)){
        if(wrestFld == null){
            wrestMsg = wrestItemname(fld)+" : 전화번호 형식이 올바르지 않습니다.\n\n하이픈(-)을 포함하여 입력하세요.\n";
            wrestFld = fld;
            fld.select();
        }
    }
}

// 이메일주소 형식 검사
function wrestEmail(fld)
{
    if (!wrestTrim(fld)) return;

    //var pattern = /(\S+)@(\S+)\.(\S+)/; 이메일주소에 한글 사용시
    var pattern = /([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)\.([0-9a-zA-Z_-]+)/;
    if (!pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + " : 이메일주소 형식이 아닙니다.\n";
            wrestFld = fld;
        }
    }
}

// 한글인지 검사 (자음, 모음 조합된 한글만 가능)
function wrestHangul(fld)
{
    if (!wrestTrim(fld)) return;

    //var pattern = /([^가-힣\x20])/i;
    var pattern = /([^가-힣\x20])/;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : 한글이 아닙니다. (자음, 모음 조합된 한글만 가능)\n';
            wrestFld = fld;
        }
    }
}

// 한글인지 검사2 (자음, 모음만 있는 한글도 가능)
function wrestHangul2(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
    //var pattern = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : 한글이 아닙니다.\n';
            wrestFld = fld;
        }
    }
}

// 한글,영문,숫자인지 검사3
function wrestHangulAlNum(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /([^가-힣\x20^a-z^A-Z^0-9])/i;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : 한글, 영문, 숫자가 아닙니다.\n';
            wrestFld = fld;
        }
    }
}

// 한글,영문 인지 검사
function wrestHangulAlpha(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /([^가-힣\x20^a-z^A-Z])/i;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : 한글, 영문이 아닙니다.\n';
            wrestFld = fld;
        }
    }
}

// 숫자인지검사
// 배부른꿀꿀이님 추가 (http://dasir.com) 2003-06-24
function wrestNumeric(fld)
{
    if (fld.value.length &gt; 0) {
        for (i = 0; i &lt; fld.value.length; i++) {
            if (fld.value.charAt(i) &lt; '0' || fld.value.charAt(i) &gt; '9') {
                wrestMsg = wrestItemname(fld) + " : 숫자가 아닙니다.\n";
                wrestFld = fld;
            }
        }
    }
}

// 영문자 검사
// 배부른꿀꿀이님 추가 (http://dasir.com) 2003-06-24
function wrestAlpha(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /(^[a-zA-Z]+$)/;

    if (!pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + " : 영문이 아닙니다.\n";
            wrestFld = fld;
        }
    }
}

// 영문자와 숫자 검사
// 배부른꿀꿀이님 추가 (http://dasir.com) 2003-07-07
function wrestAlNum(fld)
{
   if (!wrestTrim(fld)) return;

   var pattern = /(^[a-zA-Z0-9]+$)/;

   if (!pattern.test(fld.value)) {
       if (wrestFld == null) {
           wrestMsg = wrestItemname(fld) + " : 영문 또는 숫자가 아닙니다.\n";
           wrestFld = fld;
       }
   }
}

// 영문자와 숫자 그리고 _ 검사
function wrestAlNum_(fld)
{
   if (!wrestTrim(fld)) return;

   var pattern = /(^[a-zA-Z0-9\_]+$)/;

   if (!pattern.test(fld.value)) {
       if (wrestFld == null) {
           wrestMsg = wrestItemname(fld) + " : 영문, 숫자, _ 가 아닙니다.\n";
           wrestFld = fld;
       }
   }
}

// 최소 길이 검사
function wrestMinLength(fld)
{
    if (!wrestTrim(fld)) return;

    var minlength = fld.getAttribute("minlength");

    if (wrestFld == null) {
        if (fld.value.length &lt; parseInt(minlength)) {
            wrestMsg = wrestItemname(fld) + " : 최소 "+minlength+"글자 이상 입력하세요.\n";
            wrestFld = fld;
        }
    }
}

// 이미지 확장자
function wrestImgExt(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /\.(gif|jpg|png)$/i; // jpeg 는 제외
    if(!pattern.test(fld.value)){
        if(wrestFld == null){
            wrestMsg = wrestItemname(fld)+" : 이미지 파일이 아닙니다.\n.gif .jpg .png 파일만 가능합니다.\n";
            wrestFld = fld;
            fld.select();
        }
    }
}

// 확장자
function wrestExtension(fld, css)
{
    if (!wrestTrim(fld)) return;

    var str = css.split("="); // ext=?? &lt;-- str[1]
    var src = fld.value.split(".");
    var ext = src[src.length - 1];

    if (wrestFld == null) {
        if (ext.toLowerCase() &lt; str[1].toLowerCase()) {
            wrestMsg = wrestItemname(fld) + " : ."+str[1]+" 파일만 가능합니다.\n";
            wrestFld = fld;
        }
    }
}

// 공백 검사후 공백을 "" 로 변환
function wrestNospace(fld)
{
    var pattern = /(\s)/g; // \s 공백 문자

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + " : 공백이 없어야 합니다.\n";
            wrestFld = fld;
        }
    }
}

// submit 할 때 속성을 검사한다.
function wrestSubmit()
{
    wrestMsg = "";
    wrestFld = null;

    var attr = null;

    // 해당폼에 대한 요소의 개수만큼 돌려라
    for (var i=0; i</labels.length;>