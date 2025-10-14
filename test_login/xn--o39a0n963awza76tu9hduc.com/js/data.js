/**************************************************************************
$(function() {
	$(".hrname_memo").mouseover(function() {
		//$(".hrname_memo").css("height","200px");
		$(this).parent().css("background", "#ff6600");
	});
	$(".hrname_memo").mouseout(function() {
		//$(".hrname_memo").css("height","");
		$(this).parent().css("background", "#000000");
	});
});
***************************************************************************/


$(function(){
    $(".btn_gorcno").click(function() {
        var rcno = $(this).data("rcno");
		$("#gorcno" + rcno).css("color", "#ff3300");
		$("#gorcno" + rcno).text("^^");
		$("#gorcno" + rcno).text(rcno + "R");
		//$("#gorcno" + rcno).css("color", "#666");
    });


	$(".banner-list1").mouseover(function() {
		$(this).css("background", "#ff0000");
		$(this).find(".text-left").css("color", "#ffffff");
		$(this).find(".banner-box").css("color", "#ffffcc");
		$(this).find(".banner-link").css("color", "#ffffff");
	});
	$(".banner-list1").mouseout(function() {
		$(this).css("background", "#ffffcc");
		$(this).find(".text-left").css("color", "#ff0000");
		$(this).find(".banner-box").css("color", "#000000");
		$(this).find(".banner-link").css("color", "#ff0000");
	});
	$(".banner-list2").mouseover(function() {
		$(this).css("background", "#0000ff");
		$(this).find(".text-left").css("color", "#ffffff");
		$(this).find(".banner-box").css("color", "#ffffcc");
		$(this).find(".banner-link").css("color", "#ffffff");
	});
	$(".banner-list2").mouseout(function() {
		$(this).css("background", "#ffffcc");
		$(this).find(".text-left").css("color", "#0000ff");
		$(this).find(".banner-box").css("color", "#000000");
		$(this).find(".banner-link").css("color", "#0000ff");
	});

	$(".blue_button").mouseover(function() {
		$(this).css("background", "#ff0000");
	});
	$(".blue_button").mouseout(function() {
		$(this).css("background", "#0000ff");
	});

	$(".streaming_sms_button").mouseover(function() {
		$(this).css("background", "#ff0000");
		$(".streaming_sms_button_title").css("color", "#ffffff");
		$(".streaming_sms_button_script").css("color", "#ffffff");
	});
	$(".streaming_sms_button").mouseout(function() {
		$(this).css("background", "");
		$(".streaming_sms_button_title").css("color", "#ff0000");
		$(".streaming_sms_button_script").css("color", "");
	});

	$(".main_analyst_view_on, .main_analyst_view_off").mouseover(function() {
		$(this).find(".main_analyst_ai").css("color", "#ffffff");
		$(this).find(".main_analyst_ai2").css("color", "#ffffff");
		$(this).find(".main_analyst_ai_black").css("color", "#ffffff");
		$(this).css("background", "#ff0000");
		$(this).css("color", "#ffffff");
	});
	$(".main_analyst_view_on, .main_analyst_view_off").mouseout(function() {
		$(this).find(".main_analyst_ai").css("color", "#ff0000");
		$(this).find(".main_analyst_ai2").css("color", "#0000ff");
		$(this).find(".main_analyst_ai_black").css("color", "#000000");
		$(this).css("background", "#ffffcc");
		$(this).css("color", "");
	});

	$(".point_charge").mouseover(function() {
		$(this).removeClass("blink");
		$(this).css("visibility", "visible");
	});
	$(".point_charge").mouseout(function() {
		$(this).addClass("blink");
	});

	$(".membership_tr").mouseover(function() {
		$(this).css("background-color", "#efefef");
	});
	$(".membership_tr").mouseout(function() {
		$(this).css("background-color", "");
	});

	$(".ai_view_button").mouseover(function() {
		$(this).css("background", "#ff0000");
		$(this).css("color", "#ffffff");
	});
	$(".ai_view_button").mouseout(function() {
		$(this).css("background", "#5b5b5b");
		$(this).css("color", "#ffffff");
	});

	$(".ai_analysis_button").mouseover(function() {
		$(this).css("background", "#ff0000");
		$(this).css("color", "#ffffff");
	});
	$(".ai_analysis_button").mouseout(function() {
		$(this).css("background", "#ffffff");
		$(this).css("color", "");
	});

	$(".btn_black_blue").mouseover(function() {
		$(this).css("background", "#0000ff");
		//$(this).css("color", "#ffffff");
	});
	$(".btn_black_blue").mouseout(function() {
		$(this).css("background", "#000000");
		//$(this).css("color", "");
	});

	$(".black_click_red").mouseover(function() {
		$(this).css("background", "#ff0000");
		//$(this).css("color", "#ffffff");
	});
	$(".black_click_red").mouseout(function() {
		$(this).css("background", "#000000");
		//$(this).css("color", "");
	});

	$(".black_click_blue").mouseover(function() {
		$(this).css("background", "#0000ff");
		//$(this).css("color", "#ffffff");
	});
	$(".black_click_blue").mouseout(function() {
		$(this).css("background", "#000000");
		//$(this).css("color", "");
	});

	$(".blue_click_red").mouseover(function() {
		$(this).css("background", "#ff0000");
		//$(this).css("color", "#ffffff");
	});
	$(".blue_click_red").mouseout(function() {
		$(this).css("background", "#0000ff");
		//$(this).css("color", "");
	});

	$(".red_click_blue").mouseover(function() {
		$(this).css("background", "#0000ff");
		//$(this).css("color", "#ffffff");
	});
	$(".red_click_blue").mouseout(function() {
		$(this).css("background", "#ff0000");
		//$(this).css("color", "");
	});

	$(".green_click_red").mouseover(function() {
		$(this).css("background", "#ff0000");
		//$(this).css("color", "#ffffff");
	});
	$(".green_click_red").mouseout(function() {
		$(this).css("background", "#006600");
		//$(this).css("color", "");
	});

	$(".yellow_click_black").mouseover(function() {
		$(this).css("background", "#000000");
		$(this).css("color", "#ffffff");
	});
	$(".yellow_click_black").mouseout(function() {
		$(this).css("background", "#ffff00");
		$(this).css("color", "");
	});

});

function get_horse_raceDetail(e, chulNo, in_no) {
    var analysis_type = $(e).parent().parent().data("type");
	var bg_color = $(".roundChulNo" + chulNo).data("bg_color");
	if ($(e).is(":checked")) {
		//$('#horse_raceDetail' + chulNo).show();
		var hr_del = 0;
	} else {
		//$('#horse_raceDetail' + chulNo).hide();
		var hr_del = 1;
	}

	var url = "../analysis/ajax.analyst_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'analysis_type':analysis_type, 'in_no':in_no, 'chulNo':chulNo, 'hr_del':hr_del},
		dataType: 'html',
		success: function(response) {
			console.log(analysis_type);
			if (response == "OK") {
				if (hr_del == 1) {
					$(e).parent().parent().parent().data('hrdel', '1');
					$('.horse_raceDetail' + chulNo).hide();
					$('#horse_popular' + chulNo).hide();
					$('.chulNo' + chulNo).css('background-color', '#8c8c8c');

					$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
					$('.order_chulNo' + chulNo).css('background', '#dddddd');
				} else {
					$(e).parent().parent().parent().data('hrdel', '0');
					$('.horse_raceDetail' + chulNo).show();
					$('#horse_popular' + chulNo).show();
					$('.chulNo' + chulNo).css('background-color', '#828282');

					if (bg_color == "red" || bg_color == "blue" || bg_color == "green") {
						$('.roundChulNo' + chulNo).css('background-color', bg_color);
					} else {
						$('.roundChulNo' + chulNo).css('background-color', '#000000');
					}
					$('.order_chulNo' + chulNo).css('background', '#000000');
				}
			} else if (response == "LOGIN") {
				alert("로그인 후 지우기가 가능합니다.");
				//location.href = '../member/login?url=../page/' + data_type + '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
			} else {
				alert(response);
			}
		}
	});
}

function get_chulNo_order(e, hr_count) {
	var analysis_type = $(e).parent().data("type");
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");

	var post_data = "rcDate=" + rcDate + "&meet=" + meet + "&rcNo=" + rcNo + "&hr_count=" + hr_count;
	for (var i = 1; i <= hr_count; i++) {
		var chulNo = $("#hrNo_order_" + i).val();
		post_data = post_data + "&hrNo_order_" + i + "=" + chulNo;
	}

	var url = "../analysis/ajax.analyst_chulNo_order_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: post_data,
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				get_race_analysis(analysis_type, rcDate, meet, rcNo, '', '');
			} else if (response == "END") {
				alert("마감되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function reset_chulNo_order(e) {
	var analysis_type = $(e).parent().data("type");
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");

	var url = "../analysis/ajax.analyst_chulNo_order_reset.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				$('.hrno_form').data('defaultvalue', '');
				$('.hrno_form').val('');
				$('.chulno_form ').val('');
				get_race_analysis(analysis_type, rcDate, meet, rcNo, '', '');
			} else {
				alert(response);
			}
		}
	});
}

function in_hr_select(e) {
	var hr_seq = parseInt($(e).data("hi"));
	var rcDate = $(e).data("rcdate");
	var meet = $(e).data("meet");
	var rcNo = $(e).data("rcno");
	var defaultvalue = $(e).data("defaultvalue");
	var chulNo = $(e).val();
	var hr_seq_next = hr_seq + 1;

	var url = "../analysis/ajax.analyst_chulNo_order_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hr_count':'0', 'hr_order':hr_seq, 'preChulNo':defaultvalue},
		dataType: 'html',
		success: function(response) {
			//console.log(response);
			if (response == "OK") {
				if (hr_seq < 6) {
					$("#hr_select" + hr_seq).val(chulNo);
				}
				$("#hrNo_order_" + hr_seq).val(chulNo);
				$(e).data("defaultvalue", chulNo);
				//console.log(rcDate + ":" + meet + ":" + rcNo + ":" + chulNo + ":" + hr_seq);
				//$("#hrNo_order_" + hr_seq_next).focus();
				//alert($(e).data("defaultvalue"));
			} else if (response == "DUPLICATE") {
				//alert(response);
				//$(e).data("defaultvalue", chulNo);
				$(e).val(defaultvalue);
			} else if (response == "NULL") {
				$(e).val(defaultvalue);
				alert("없는 마번입니다.");
			} else if (response == "END") {
				$("#hrNo_order_submit").focus();
				$(e).val(defaultvalue);
				alert("마감되었습니다.");
			} else {
				alert(response);
				//console.log(response);
			}
		}
	});
}



function get_analysis_popular(rcDate, meet, rcNo, sst, sod) {

	$("#rc_popular").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
    var url = "../analysis/ajax.get_race_analysis_popular.php";
	//alert(rcDate + ":" + meet + ":" + rcNo);
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'sst':sst, 'sod':sod},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				$("#rc_popular").html(response);
			}
		}
	});
}

function get_analysis_expert(rcDate, meet, rcNo, sst, sod) {

	$("#rc_expert").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
    var url = "../analysis/ajax.get_race_analysis_expert.php";
	//alert(rcDate + ":" + meet + ":" + rcNo);
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'sst':sst, 'sod':sod},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				$("#rc_expert").html(response);
			}
		}
	});
}

function get_analysis_simple(rcDate, meet, rcNo, sst, sod) {

	$("#rc_expert").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
    var url = "../analysis/ajax.get_race_analysis_simple.php";
	//alert(rcDate + ":" + meet + ":" + rcNo);
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'sst':sst, 'sod':sod},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				$("#rc_simple").html(response);
			}
		}
	});
}

function popular_chulNoDel(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var bg_color = $(".roundChulNo" + chulNo).data("bg_color");
	if ($(e).is(":checked")) {
		//alert("체크됨");
		hr_del = "0";
	} else {
		//alert("체크풀림");
		hr_del = "1";
	}
	if (hr_del == 1) {
		$(".trLineShow" + chulNo).hide();
		$(".trLineEmpty" + chulNo).show();
		$("#chkh_" + chulNo).prop("checked", false); //hidden
		$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
	} else {
		$(".trLineShow" + chulNo).show();
		$(".trLineEmpty" + chulNo).hide();
		$("#chks_" + chulNo).prop("checked", true); //show
		if (bg_color == "red" || bg_color == "blue" || bg_color == "green") {
			$('.roundChulNo' + chulNo).css('background-color', bg_color);
		} else {
			$('.roundChulNo' + chulNo).css('background-color', '#000000');
		}
	}

	/**
	var url = "../analysis/ajax.analyst_chulNo_delete_popular_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hr_del':hr_del},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (hr_del == 1) {
					$(".trLineShow" + chulNo).hide();
					$(".trLineEmpty" + chulNo).show();
					$("#chkh_" + chulNo).prop("checked", false); //hidden
					$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
				} else {
					$(".trLineShow" + chulNo).show();
					$(".trLineEmpty" + chulNo).hide();
					$("#chks_" + chulNo).prop("checked", true); //show
					if (bg_color == "red" || bg_color == "blue" || bg_color == "green") {
						$('.roundChulNo' + chulNo).css('background-color', bg_color);
					} else {
						$('.roundChulNo' + chulNo).css('background-color', '#000000');
					}
				}
			} else {
				alert(response);
			}
		}
	});
	**/
}

function get_round_popular_chulNo_Check(e, hrNo) {
	var in_no = $(e).data("in_no");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var bg_color = $(e).data("bg_color");
	var hr_del = $(e).data("hr_del");
	var popular_color = $(".popularChulNo" + chulNo).data("popular_color");

	var url = "../analysis/ajax.set_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hr_del':hr_del},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (hr_del == "1") { //지워져 있을 경우
					$('.roundChulNo' + chulNo).css('background-color', bg_color);
					$('.popularChulNo' + chulNo).css('background-color', popular_color);

					$(".roundChulNo" + chulNo).data("hr_del", "0");
					$(".popularChulNo" + chulNo).data("hr_del", "0");

					$(".teamClass" + chulNo).css('opacity', 1);
					$("#roundChulNo" + chulNo).show();
				} else {
					$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
					$('.popularChulNo' + chulNo).css('background-color', '#dddddd');

					$(".roundChulNo" + chulNo).data("hr_del", "1");
					$(".popularChulNo" + chulNo).data("hr_del", "1");

					$(".teamClass" + chulNo).css('opacity', 0.2);
					$("#roundChulNo" + chulNo).hide();
				}
			} else {
				alert(response);
			}
		}
	});
}

function get_round_popular_chulNo_Check_only(e, hrNo) {
	var in_no = $(e).data("in_no");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var bg_color = $(e).data("bg_color");
	var hr_del = $(e).data("hr_del");
	var popular_color = $(".popularChulNo" + chulNo).data("popular_color");

	if (hr_del == "1") { //지워져 있을 경우
		$('.roundChulNo' + chulNo).css('background-color', bg_color);
		$('.popularChulNo' + chulNo).css('background-color', popular_color);

		$(".roundChulNo" + chulNo).data("hr_del", "0");
		$(".popularChulNo" + chulNo).data("hr_del", "0");

		$(".teamClass" + chulNo).css('opacity', 1);
		$("#roundChulNo" + chulNo).show();
	} else {
		$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
		$('.popularChulNo' + chulNo).css('background-color', '#dddddd');

		$(".roundChulNo" + chulNo).data("hr_del", "1");
		$(".popularChulNo" + chulNo).data("hr_del", "1");

		$(".teamClass" + chulNo).css('opacity', 0.2);
		$("#roundChulNo" + chulNo).hide();
	}
}

function hide_match_chulNo_Check(e, hrNo) {

	var match_no = $(e).data("match_no");
	var popular_color = $(e).data("popular_color");
	var hr_del = $(e).data("hr_del");

	if (hr_del == "1") { //지워져 있을 경우
		$(e).css('background-color', popular_color);
		$(e).data("hr_del", "0");
		$("#chkh_" + hrNo).trigger("click");
	} else {
		$(e).css('background-color', '#dddddd');
		$(e).data("hr_del", "1");
		$("#chks_" + hrNo).trigger("click");
	}
}

function get_ai_data_chulNo_Check(e) {
	var rcDate = $(e).parent().parent().parent().parent().parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().parent().parent().parent().parent().data("rcno");
	var chulNo = $(e).val();
	var hrNo = $(e).data("hrno");
	var hr_del = $(e).data("del_click");

	var bg_color = $(".roundChulNo" + chulNo).data("bg_color");
	var popular_color = $(".popularChulNo" + chulNo).data("popular_color");

	var url = "../analysis/ajax.set_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hr_del':hr_del},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (hr_del == "1") { //지워져 있을 경우
					//$(e).data("del_click", "0");
					//$(".ai_8duma" + chulNo).data("del_click", "0");
					$(".teamClass" + chulNo).data("del_click", "0");

					//$(".ai_8duma" + chulNo).css('opacity', 1);
					$(".teamClass" + chulNo).css('opacity', 1);

					$('.roundChulNo' + chulNo).css('background-color', bg_color);
					$('.popularChulNo' + chulNo).css('background-color', popular_color);

					$(".roundChulNo" + chulNo).data("hr_del", "0");
					$(".popularChulNo" + chulNo).data("hr_del", "0");

					$("#roundChulNo" + chulNo).show();

					//data3
					$(".chulNo" + chulNo).css("background-color", "#000000");
					$(".chulNo" + chulNo).data("bg_color", "black");

					$(".trLineShow" + hrNo).show();
					$(".trLineLeftShow" + hrNo).show();
					$(".trLineEmpty" + hrNo).hide();
					//$("#chks_" + hrNo).prop("checked", true); //show
					$("input:checkbox[id='chks_" + hrNo + "']").prop("checked", true); //show
					$("input:checkbox[id='chkh_" + hrNo + "']").prop("checked", true); //show
				} else {
					//$(e).data("del_click", "1");
					//$(".ai_8duma" + chulNo).data("del_click", "1");
					$(".teamClass" + chulNo).data("del_click", "1");

					//$(".ai_8duma" + chulNo).css('opacity', 0.2);
					$(".teamClass" + chulNo).css('opacity', 0.2);

					$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
					$('.popularChulNo' + chulNo).css('background-color', '#dddddd');

					$(".roundChulNo" + chulNo).data("hr_del", "1");
					$(".popularChulNo" + chulNo).data("hr_del", "1");

					$("#roundChulNo" + chulNo).hide();

					//data3
					$(".chulNo" + chulNo).css("background-color", "#dddddd");
					$(".chulNo" + chulNo).data("bg_color", "white");

					$(".trLineShow" + hrNo).hide();
					$(".trLineLeftShow" + hrNo).hide();
					$(".trLineEmpty" + hrNo).show();
					//$("#chkh_" + hrNo).prop("checked", false); //hidden
					$("input:checkbox[id='chks_" + hrNo + "']").prop("checked", false); //hidden
					$("input:checkbox[id='chkh_" + hrNo + "']").prop("checked", false); //hidden
				}
				console.log($(e).data("del_click"));
			} else {
				alert(response);
			}
		}
	});
}

function get_ai_data_chulNo_Check2(e) {
	var rcDate = $(e).parent().parent().parent().parent().parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().parent().parent().parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");
	var hrNo = $(e).data("hrno");
	var del_click = $(e).data("del_click");

	var url = "../analysis/ajax.set_ai_data_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'del_click':del_click},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (del_click == "1") { //지워져 있을 경우
					//$(e).data("del_click", "0");
					//$(".ai_7duma" + chulNo).data("del_click", "0");
					$(".ai_hrNo" + hrNo).data("del_click", "0");
					//$(".teamClass" + chulNo).data("del_click", "0");

					//$(".ai_7duma" + chulNo).css('opacity', 1);
					$(".ai_hrNo" + hrNo).css('opacity', 1);
					//$(".teamClass" + chulNo).css('opacity', 1);
				} else {
					//$(e).data("del_click", "1");
					//$(".ai_7duma" + chulNo).data("del_click", "1");
					$(".ai_hrNo" + hrNo).data("del_click", "1");
					//$(".teamClass" + chulNo).data("del_click", "1");

					//$(".ai_7duma" + chulNo).css('opacity', 0.2);
					$(".ai_hrNo" + hrNo).css('opacity', 0.2);
					//$(".teamClass" + chulNo).css('opacity', 0.2);
				}
				console.log($(e).data("del_click"));
			} else {
				alert(response);
			}
		}
	});
}

function fn_ai_data_chulNo_Check2_all(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var url = "../analysis/ajax.set_ai_data_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'checkType':'all', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				$('.ai_expert_order').each(function(index, item) {
					let chulNo = $(this).data("chulno");
					$(".ai_7duma" + chulNo).data("del_click", "0");
					$(".ai_7duma" + chulNo).css('opacity', 1);
				});
			} else {
				alert(response);
			}
		}
	});

}

function fn_ai_data_chulNo_Check2_invert(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var url = "../analysis/ajax.set_ai_data_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'checkType':'invert', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				$('.ai_expert_order').each(function(index, item) {
					let chulNo = $(this).data("chulno");
					let del_click = $(this).data("del_click");

					if (del_click == "1") {
						$(".ai_7duma" + chulNo).data("del_click", "0");
						$(".ai_7duma" + chulNo).css('opacity', 1);
					} else {
						$(".ai_7duma" + chulNo).data("del_click", "1");
						$(".ai_7duma" + chulNo).css('opacity', 0.2);
					}
				});
			} else {
				alert(response);
			}
		}
	});
}


function get_ai_data3_result_analysis_Check(e) {
	var rcDate = $(e).parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");
	var hrNo = $(e).data("hrno");
	var possible_color = $(e).data("possible_color");
	var default_color = $(e).data("default_color");
	var del_click = $(e).data("del_click");

	var url = "../analysis/ajax.set_ai_data_chulNo_possible_color_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'possible_color':possible_color, 'del_click':del_click},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "0000") {
				$(e).data("possible_color", data.next_color);
				$(e).css("background-color", data.next_bgColor);
				$(".ai1_hrNo" + hrNo, parent.document).data("possible_color", data.next_color);
				$(".ai1_hrNo" + hrNo, parent.document).css("background-color", data.next_bgColor);
				$("#ichatFrame").contents().find(".ai1_hrNo" + hrNo).data("possible_color", data.next_color);
				$("#ichatFrame").contents().find(".ai1_hrNo" + hrNo).css("background-color", data.next_bgColor);
				if (data.next_color == 0) {
					$(e).css("color", default_color);
					$(".ai1_hrNo" + hrNo, parent.document).css("color", default_color);
					$("#ichatFrame").contents().find(".ai1_hrNo" + hrNo).css("color", default_color);
				} else {
					$(e).css("color", data.next_fontColor);
					$(".ai1_hrNo" + hrNo, parent.document).css("color", data.next_fontColor);
					$("#ichatFrame").contents().find(".ai1_hrNo" + hrNo).css("color", data.next_fontColor);
				}
			} else {
				alert("ERROR");
			}

			console.log(rcDate + " " + meet + " " + rcNo + " " + chulNo + "마번 : " + possible_color + " -> " + data.next_color);
		}
	});
}
function get_ai_data3_result_analysis_Check2(e) {
	var rcDate = $(e).parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");
	var hrNo = $(e).data("hrno");
	var possible_color = $(e).data("possible_color");
	var default_color = $(e).data("default_color");
	var del_click = $(e).data("del_click");

	var url = "../analysis/ajax.set_ai_data_chulNo_possible_color_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'possible_color':possible_color, 'del_click':del_click, 'possible_no':'2'},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "0000") {
				$(e).data("possible_color", data.next_color);
				$(e).css("background-color", data.next_bgColor);
				if (data.next_color == 0) {
					$(e).css("color", default_color);
				} else {
					$(e).css("color", data.next_fontColor);
				}
			} else {
				alert("ERROR");
			}

			console.log(rcDate + " " + meet + " " + rcNo + " " + chulNo + "마번 : " + possible_color + " -> " + data.next_color);
		}
	});
}
function get_ai_data3_result_analysis_Check_delete(e, possible_no) {
	var rcDate = $(e).parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");
	var hrNo = $(e).data("hrno");
	var possible_color = $(e).data("possible_color");
	var default_color = $(e).data("default_color");
	var del_click = $(e).data("del_click");

	var url = "../analysis/ajax.set_ai_data_chulNo_possible_color_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'possible_color':possible_color, 'del_click':del_click, 'possible_no':possible_no},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "0000") {
				$(e).data("possible_color", data.next_color);
				$(e).css("background-color", data.next_bgColor);
				if (data.next_color == 0) {
					$(e).css("color", default_color);
				} else {
					$(e).css("color", data.next_fontColor);
				}
			} else {
				alert("ERROR");
				console.log(data.errSQL);
			}

			console.log(rcDate + " " + meet + " " + rcNo + " " + chulNo + "마번 : " + possible_color + " -> " + data.next_color);
		}
	});
}

function get_ai_data3_result_analysis_possible_check(e) {
	var rcDate = $(e).parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");
	var hrNo = $(e).data("hrno");
	var possible_color = $(e).data("possible_color");
	var default_color = $(e).data("default_color");

	var url = "../analysis/ajax.set_ai_data_chulNo_possible_check_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'possible_color':possible_color},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "0000") {
				$(e).data("possible_color", data.next_color);
				$(e).css("background-color", data.next_bgColor);
				if (data.next_color == 0) {
					$(e).css("color", default_color);
				} else {
					$(e).css("color", data.next_fontColor);
				}
			} else {
				alert("ERROR");
			}

			console.log(rcDate + " " + meet + " " + rcNo + " " + chulNo + "마번 : " + possible_color + " -> " + data.next_color);
		}
	});
}

function get_analyst_result(rcDate, meet, rcNo) {

	$("#analyst_result").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
    var url = "../analysis/ajax.get_race_analyst_result.php";
	//alert(rcDate + ":" + meet + ":" + rcNo);
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			//$("#analyst_result").html('');
			if (response == "ERROR") {
				alert(response);
			} else {
				$("#analyst_result").html(response);

				$(".black_click_red").mouseover(function() {
					$(this).css("background", "#ff0000");
					//$(this).css("color", "#ffffff");
				});
				$(".black_click_red").mouseout(function() {
					$(this).css("background", "#000000");
					//$(this).css("color", "");
				});

				$(".blue_click_red").mouseover(function() {
					$(this).css("background", "#ff0000");
					//$(this).css("color", "#ffffff");
				});
				$(".blue_click_red").mouseout(function() {
					$(this).css("background", "#0000ff");
					//$(this).css("color", "");
				});
			}
		}
	});
}

function reg_data_fieldOdds(e) {
	var hrNo = $(e).parent().parent().data("hrno");
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var fieldOdds = $('#hr_fieldOdds_' + hrNo).val();

	var url = "../analysis/ajax.data_reg_fieldOdds_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'fieldOdds':fieldOdds},
		dataType: 'html',
		success: function(response) {
			//alert(response);
			if (response == "OK") {
				//alert("저장되었습니다.");
				console.log("OK");
			} else {
				alert(response);
			}
		}
	});
}



function reg_data_hrMemo(e) {
	var in_no = $(e).parent().parent().data("in_no");
	var hrNo = $(e).parent().parent().data("hrno");
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var memo = $('#hr_memo_' + hrNo).val();
	var memo1 = $('#hr_memo1_' + hrNo).val();
	var memo2 = $('#hr_memo2_' + hrNo).val();
	var defaultvalue = $(e).data("defaultvalue");

	var url = "../analysis/ajax.set_hrMemo_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_pno':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'hrMemo':memo, 'hrMemo1':memo1, 'hrMemo2':memo2},
		dataType: 'html',
		success: function(response) {
			//alert(response);
			if (response == "OK") {
				//alert("저장되었습니다.");
				$('#hr_memo_btn_' + hrNo).focus();
				$('#hr_memo_btn_' + hrNo).css('color', '#000000');
				//$(e).data("defaultvalue", memo);
			} else {
				$('#hr_memo_' + hrNo).val('');
				$('#hr_memo1_' + hrNo).val('');
				$('#hr_memo2_' + hrNo).val('');
				$('#hr_memo_btn_' + hrNo).css('color', '#000000');
				alert(response);
			}
		}
	});
}

function memo_button_color(e, hrNo) {
	var memo = $('#hr_memo_' + hrNo).val();
	var defaultvalue = $(e).data("defaultvalue");
	if (defaultvalue != memo) {
		$('#hr_memo_btn_' + hrNo).css('color', '#ff0000');
	} else {
		$('#hr_memo_btn_' + hrNo).css('color', '#000000');
	}
}

function memo1_button_color(e, hrNo) {
	var memo = $('#hr_memo1_' + hrNo).val();
	var defaultvalue = $(e).data("defaultvalue");
	if (defaultvalue != memo) {
		$('#hr_memo_btn_' + hrNo).css('color', '#ff0000');
	} else {
		$('#hr_memo_btn_' + hrNo).css('color', '#000000');
	}
}

function memo2_button_color(e, hrNo) {
	var memo = $('#hr_memo2_' + hrNo).val();
	var defaultvalue = $(e).data("defaultvalue");
	if (defaultvalue != memo) {
		$('#hr_memo_btn_' + hrNo).css('color', '#ff0000');
	} else {
		$('#hr_memo_btn_' + hrNo).css('color', '#000000');
	}
}

function go_analyst_data(e) {
	var analyst = $(e).val();
	var rcDate = $(e).data("rcdate");
	var meet = $(e).data("meet");
	var rcNo = $(e).data("rcno");
	if (analyst) {
		//window.open(g5_url + '/page/analyst_data_pop?analyst=' + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo, '', 'width=650, height=900, scrollbars=auto');
		window.open(g5_url + "/page/streaming?analyst=" + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo, '', '');
	}
}

function go_analyst_link(analyst) {
	if (analyst) {
		//window.open(g5_url + '/page/analyst_data_pop?analyst=' + analyst, '', 'width=790, height=900, scrollbars=auto');
		document.location.href = g5_url + "/page/streaming?analyst=" + analyst;
	}
}

function go_analyst_link_modal(e, analyst) {
	var rcDate = $(e).parent().data("rcdate");
	modalExtend('modal_layer', '/modal/order_streaming_direct?analyst=' + analyst + '&rcDate=' + rcDate);
	$(".modal_pop").css("width", "500px");
}

function go_analyst_link_direct(analyst, rcDate, meet, rcNo) {
	if (analyst) {
		//window.open(g5_url + '/page/analyst_data_pop?analyst=' + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo, '', 'width=790, height=900, scrollbars=auto');
		document.location.href = g5_url + "/page/streaming?analyst=" + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
	}
}

function go_winopen_chat(rcDate, meet, rcNo) {
		//window.open(g5_url + '/page/chat?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo, '', 'width=1700, height=950');
		window.open(g5_url + '/page/chat?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo, '', '');
}


function get_hrMemo(e) {
	var hrNo = $(e).data("hrno");
	var hrName = $(e).data("hrname");
	window.open('./analyst_hrMemo_pop?hrNo=' + hrNo + '&hrName=' + hrName, '', 'width=710, height=600, scrollbars=auto');
}

function get_hr_possible_ratio_color(ratio) {
	let str = "";
	if (ratio >= 70) str = "red";
	else if (ratio >= 50) str = "blue";
	else if (ratio >= 30) str = "green";
	else str = "black";

	return str;
}

function get_analyst_possible_graph_color(score, hrNo) {
	score = Number(score);
    if (score >= 70) {
        $('#possible_' + hrNo).css('background-color', 'red');
    } else if (score >= 50) {
        $('#possible_' + hrNo).css('background-color', 'blue');
    } else if (score >= 30) {
        $('#possible_' + hrNo).css('background-color', 'green');
    } else if (score >= 10) {
        $('#possible_' + hrNo).css('background-color', 'orange');
    } else if (score > 0) {
        $('#possible_' + hrNo).css('background-color', 'gray');
    } else {
        $('#possible_' + hrNo).css('background-color', '');
    }
}
function set_analyst_possible(e) {
	var score = $(e).val();
    var data_type = $(e).parent().parent().data("type");
    var rcDate = $(e).parent().parent().data("rcdate");
    var meet = $(e).parent().parent().data("meet");
    var rcNo = $(e).parent().parent().data("rcno");
	var hrNo = $(e).parent().parent().data("hrno");
	var chulNo = $(e).parent().parent().data("chulno");
	var defaultvalue = $(e).data("defaultvalue");

	if (score != defaultvalue) {

		var url = "../analysis/ajax.set_analyst_possible_update.php";
		$.ajax({
			url: url,
			type: 'POST',
            dataType: 'json',
            async: true,
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'score':score},
			success: function(data) {
				if (data.resCode == "0000") {
					$(e).data("defaultvalue", score);
					$('.hr_possible_' + hrNo).data("defaultvalue", score);
					let color = get_hr_possible_ratio_color(score);
					$('.hr_possible_' + hrNo).css("color", color);
					$('.hr_possible_' + hrNo).val(score).prop("selected", true);
					$('#possible_' + hrNo).css('width', score + '%');
					$('#possible_' + hrNo).text(score);
					//$('#hr_memo_btn_' + hrNo).focus();
					get_analyst_possible_graph_color(score, hrNo);

					if (1 || data.hrOrder1) {
						//$("#hrNo_order_1").val(data.hrOrder1);
						$("#hr_select1").val(data.hrOrder1);
					}
					if (1 || data.hrOrder2) {
						//$("#hrNo_order_2").val(data.hrOrder2);
						$("#hr_select2").val(data.hrOrder2);
					}
					if (1 || data.hrOrder3) {
						//$("#hrNo_order_3").val(data.hrOrder3);
						$("#hr_select3").val(data.hrOrder3);
					}
					if (1 || data.hrOrder4) {
						//$("#hrNo_order_4").val(data.hrOrder4);
						$("#hr_select4").val(data.hrOrder4);
					}
					if (1 || data.hrOrder5) {
						//$("#hrNo_order_5").val(data.hrOrder5);
						$("#hr_select5").val(data.hrOrder5);
					}
					/**
					if (data.hrOrder6) $("#hrNo_order_6").val(data.hrOrder6);
					if (data.hrOrder7) $("#hrNo_order_7").val(data.hrOrder7);
					if (data.hrOrder8) $("#hrNo_order_8").val(data.hrOrder8);
					if (data.hrOrder9) $("#hrNo_order_9").val(data.hrOrder9);
					if (data.hrOrder10) $("#hrNo_order_10").val(data.hrOrder10);
					if (data.hrOrder11) $("#hrNo_order_11").val(data.hrOrder11);
					if (data.hrOrder12) $("#hrNo_order_12").val(data.hrOrder12);
					if (data.hrOrder13) $("#hrNo_order_13").val(data.hrOrder13);
					if (data.hrOrder14) $("#hrNo_order_14").val(data.hrOrder14);
					if (data.hrOrder15) $("#hrNo_order_15").val(data.hrOrder15);
					if (data.hrOrder16) $("#hrNo_order_16").val(data.hrOrder16);
					if (data.hrOrder17) $("#hrNo_order_17").val(data.hrOrder17);
					if (data.hrOrder18) $("#hrNo_order_18").val(data.hrOrder18);
					if (data.hrOrder19) $("#hrNo_order_19").val(data.hrOrder19);
					if (data.hrOrder20) $("#hrNo_order_20").val(data.hrOrder20);
					**/
				} else if (data.resCode == "1000") {
					$(e).val(defaultvalue).prop("selected", true);
					alert("마감되었습니다.");
				} else if (data.resCode == "2000") {
					$(e).val(defaultvalue).prop("selected", true);
					//$('#possible_' + hrNo).text("100까지만 입력이 가능합니다.");
				} else if (data.resCode == "LOGIN") {
					$(e).val(defaultvalue).prop("selected", true);
					alert("로그인 (회원가입) 하신경우, % 수정이 가능합니다.");
					location.href = '../member/login?url=../page/' + data_type + '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
				} else {
					alert("정상적으로 저장되지 않았습니다.");
				}
			},
            error: function (xhr, status, error) {
                //console.log(xhr, status, error);
            }
		});
	}
}
function set_analyst_possible_from_order(e) {
	var score = $(e).val();
    var data_type = $(e).parent().data("type");
    var rcDate = $(e).parent().data("rcdate");
    var meet = $(e).parent().data("meet");
    var rcNo = $(e).parent().data("rcno");
	var hrNo = $(e).parent().data("hrno");
	var chulNo = $(e).parent().data("chulno");
	var defaultvalue = $(e).data("defaultvalue");

	if (score != defaultvalue) {

		var url = "../analysis/ajax.set_analyst_possible_update.php";
		$.ajax({
			url: url,
			type: 'POST',
            dataType: 'json',
            async: true,
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'score':score},
			success: function(data) {
				if (data.resCode == "0000") {
					$(e).data("defaultvalue", score);
					$('.hr_possible_' + hrNo).data("defaultvalue", score);
					let color = get_hr_possible_ratio_color(score);
					$('.hr_possible_' + hrNo).css("color", color);
					$('.hr_possible_' + hrNo).val(score).prop("selected", true);
					$('#possible_' + hrNo).css('width', score + '%');
					$('#possible_' + hrNo).text(score);

					get_analyst_possible_graph_color(score, hrNo);

					if (1 || data.hrOrder1) {
						//$("#hrNo_order_1").val(data.hrOrder1);
						$("#hr_select1").val(data.hrOrder1);
					}
					if (1 || data.hrOrder2) {
						//$("#hrNo_order_2").val(data.hrOrder2);
						$("#hr_select2").val(data.hrOrder2);
					}
					if (1 || data.hrOrder3) {
						//$("#hrNo_order_3").val(data.hrOrder3);
						$("#hr_select3").val(data.hrOrder3);
					}
					if (1 || data.hrOrder4) {
						//$("#hrNo_order_4").val(data.hrOrder4);
						$("#hr_select4").val(data.hrOrder4);
					}
					if (1 || data.hrOrder5) {
						//$("#hrNo_order_5").val(data.hrOrder5);
						$("#hr_select5").val(data.hrOrder5);
					}
					/**
					if (data.hrOrder6) $("#hrNo_order_6").val(data.hrOrder6);
					if (data.hrOrder7) $("#hrNo_order_7").val(data.hrOrder7);
					if (data.hrOrder8) $("#hrNo_order_8").val(data.hrOrder8);
					if (data.hrOrder9) $("#hrNo_order_9").val(data.hrOrder9);
					if (data.hrOrder10) $("#hrNo_order_10").val(data.hrOrder10);
					if (data.hrOrder11) $("#hrNo_order_11").val(data.hrOrder11);
					if (data.hrOrder12) $("#hrNo_order_12").val(data.hrOrder12);
					if (data.hrOrder13) $("#hrNo_order_13").val(data.hrOrder13);
					if (data.hrOrder14) $("#hrNo_order_14").val(data.hrOrder14);
					if (data.hrOrder15) $("#hrNo_order_15").val(data.hrOrder15);
					if (data.hrOrder16) $("#hrNo_order_16").val(data.hrOrder16);
					if (data.hrOrder17) $("#hrNo_order_17").val(data.hrOrder17);
					if (data.hrOrder18) $("#hrNo_order_18").val(data.hrOrder18);
					if (data.hrOrder19) $("#hrNo_order_19").val(data.hrOrder19);
					if (data.hrOrder20) $("#hrNo_order_20").val(data.hrOrder20);
					**/
				} else if (data.resCode == "1000") {
					$(e).val(defaultvalue).prop("selected", true);
					alert("마감되었습니다.");
				} else if (data.resCode == "2000") {
					$(e).val(defaultvalue).prop("selected", true);
					//$('#possible_' + hrNo).text("100까지만 입력이 가능합니다.");
				} else if (data.resCode == "LOGIN") {
					$(e).val(defaultvalue).prop("selected", true);
					alert("로그인 (회원가입) 하신경우, % 수정이 가능합니다.");
					location.href = '../member/login?url=../page/' + data_type + '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
				} else {
					alert("정상적으로 저장되지 않았습니다.");
				}
			},
            error: function (xhr, status, error) {
                //console.log(xhr, status, error);
            }
		});
	}
}

function set_rc_team_update(rcDate, meet, rcNo) {
	var teamA_1 = $("#rc_teamA_0").val();
	var teamA_2 = $("#rc_teamA_1").val();
	var teamA_3 = $("#rc_teamA_2").val();
	var teamA_4 = $("#rc_teamA_3").val();
	var teamA_5 = $("#rc_teamA_4").val();

	var teamB_1 = $("#rc_teamB_0").val();
	var teamB_2 = $("#rc_teamB_1").val();
	var teamB_3 = $("#rc_teamB_2").val();
	var teamB_4 = $("#rc_teamB_3").val();
	var teamB_5 = $("#rc_teamB_4").val();

	var teamC_1 = $("#rc_teamC_0").val();
	var teamC_2 = $("#rc_teamC_1").val();
	var teamC_3 = $("#rc_teamC_2").val();
	var teamC_4 = $("#rc_teamC_3").val();
	var teamC_5 = $("#rc_teamC_4").val();
	var teamC_6 = $("#rc_teamC_5").val();

	var url = "/analysis/ajax.set_rc_teamClass_type_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {
			   'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 
			   'teamA_1':teamA_1, 'teamA_2':teamA_2, 'teamA_3':teamA_3, 'teamA_4':teamA_4, 'teamA_5':teamA_5,
			   'teamB_1':teamB_1, 'teamB_2':teamB_2, 'teamB_3':teamB_3, 'teamB_4':teamB_4, 'teamB_5':teamB_5,
			   'teamC_1':teamC_1, 'teamC_2':teamC_2, 'teamC_3':teamC_3, 'teamC_4':teamC_4, 'teamC_5':teamC_5, 'teamC_6':teamC_6
			},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function set_data3_vip_bettingNo(rcDate, meet, rcNo) {
	var hr_lock = 0;
	if ($("#hr_lock").is(":checked")) {
		hr_lock = 1;
	}
	var no1 = $("#hr_select1").val();
	var no2 = $("#hr_select2").val();
	var no3 = $("#hr_select3").val();
	var no4 = $("#hr_select4").val();
	var no5 = $("#hr_select5").val();

	var no6 = $("#hr_select6").val();
	var no7 = $("#hr_select7").val();

	var del1 = $("#hr_delete1").val();

	var hr_race_chuk = parseInt($("#hr_race_chuk").val());
	var hr_race_type = $("#hr_race_type").val();
	var hr_race_memo = $("#hr_race_memo").val();

	var url = "/vip/assay/ajax.data_vip_betNo_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hr_lock':hr_lock, 'betNo1':no1, 'betNo2':no2, 'betNo3':no3, 'betNo4':no4, 'betNo5':no5, 'betNo6':no6, 'betNo7':no7, 'delNo1':del1, 'hr_race_chuk':hr_race_chuk, 'hr_race_type':hr_race_type, 'hr_race_memo':hr_race_memo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
				$(".analystBetNo1").text(no1);
				$(".analystBetNo2").text(no2);
				$(".analystBetNo3").text(no3);
				$(".analystBetNo4").text(no4);
				$(".analystBetNo5").text(no5);

				$("#analyst_race_type_" + meet + rcNo).val(hr_race_type);
				$("#analyst_race_chukma_" + meet + rcNo).val(no1);
				if (hr_race_type == "메인") {
					$("#analyst_race_type_" + meet + rcNo).css("background-color", "#ff0000");
				} else if (hr_race_type == "추천") {
					$("#analyst_race_type_" + meet + rcNo).css("background-color", "#0000ff");
				} else {
					$("#analyst_race_type_" + meet + rcNo).css("background-color", "#ffffff");
				}
				if (hr_race_chuk >= 90) {
					$("#analyst_race_chukma_" + meet + rcNo).css("background-color", "#ff0000");
				} else if (hr_race_chuk >= 70) {
					$("#analyst_race_chukma_" + meet + rcNo).css("background-color", "#0000ff");
				} else {
					$("#analyst_race_chukma_" + meet + rcNo).css("background-color", "#ffffff");
				}
				$("#analyst_race_memo").val(hr_race_memo);
			} else if (response == "END") {
				alert("마번 저장은\n\n경주 시작 8분전까지만 가능합니다.");
			} else {
				alert(response);
			}
		}
	});
}

function set_data3_vip_bettingNo3(rcDate, meet, rcNo) {
	var hr_lock = 0;
	if ($("#hr_lock").is(":checked")) {
		hr_lock = 1;
	}
	var no1 = $("#hr_select1").val();
	var no2 = $("#hr_select2").val();
	var no3 = $("#hr_select3").val();
	var no4 = $("#hr_select4").val();
	var no5 = $("#hr_select5").val();
	var no6 = $("#hr_select6").val();
	var no7 = $("#hr_select7").val();

	var no21 = $("#hr_select21").val();
	var no22 = $("#hr_select22").val();
	var no23 = $("#hr_select23").val();
	var no24 = $("#hr_select24").val();
	var no25 = $("#hr_select25").val();
	var no26 = $("#hr_select26").val();
	var no27 = $("#hr_select27").val();

	var no31 = $("#hr_select31").val();
	var no32 = $("#hr_select32").val();
	var no33 = $("#hr_select33").val();
	var no34 = $("#hr_select34").val();
	var no35 = $("#hr_select35").val();
	var no36 = $("#hr_select36").val();
	var no37 = $("#hr_select37").val();

	var hr_race_chuk = parseInt($("#hr_race_chuk").val());
	var hr_race_type = $("#hr_race_type").val();
	var hr_race_memo = $("#hr_race_memo").val();

	var url = "/vip/assay/ajax.data_vip_betNo_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hr_lock':hr_lock, 'betNo1':no1, 'betNo2':no2, 'betNo3':no3, 'betNo4':no4, 'betNo5':no5, 'betNo6':no6, 'betNo7':no7, 'betNo21':no21, 'betNo22':no22, 'betNo23':no23, 'betNo24':no24, 'betNo25':no25, 'betNo26':no26, 'betNo27':no27, 'betNo31':no31, 'betNo32':no32, 'betNo33':no33, 'betNo34':no34, 'betNo35':no35, 'betNo36':no36, 'betNo37':no37, 'hr_race_chuk':hr_race_chuk, 'hr_race_type':hr_race_type, 'hr_race_memo':hr_race_memo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
				$(".analystBetNo1").text(no1);
				$(".analystBetNo2").text(no2);
				$(".analystBetNo3").text(no3);
				$(".analystBetNo4").text(no4);
				$(".analystBetNo5").text(no5);

				$("#analyst_race_type_" + meet + rcNo).val(hr_race_type);
				$("#analyst_race_chukma_" + meet + rcNo).val(no1);
				if (hr_race_type == "메인") {
					$("#analyst_race_type_" + meet + rcNo).css("background-color", "#ff0000");
				} else if (hr_race_type == "추천") {
					$("#analyst_race_type_" + meet + rcNo).css("background-color", "#0000ff");
				} else {
					$("#analyst_race_type_" + meet + rcNo).css("background-color", "#ffffff");
				}
				if (hr_race_chuk >= 90) {
					$("#analyst_race_chukma_" + meet + rcNo).css("background-color", "#ff0000");
				} else if (hr_race_chuk >= 70) {
					$("#analyst_race_chukma_" + meet + rcNo).css("background-color", "#0000ff");
				} else {
					$("#analyst_race_chukma_" + meet + rcNo).css("background-color", "#ffffff");
				}
				$("#analyst_race_memo").val(hr_race_memo);
			} else if (response == "END") {
				alert("마번 저장은\n\n경주 시작 8분전까지만 가능합니다.");
			} else {
				alert(response);
			}
		}
	});
}

function set_data3_vip_real_bettingNo(rcDate, meet, rcNo) {
	var no1 = $("#real_betNo1").val();
	var no2 = $("#real_betNo2").val();
	var no3 = $("#real_betNo3").val();
	var no4 = $("#real_betNo4").val();
	var no5 = $("#real_betNo5").val();

	var url = "/vip/assay/ajax.data_vip_betNo_real_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'betNo1':no1, 'betNo2':no2, 'betNo3':no3, 'betNo4':no4, 'betNo5':no5},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
				$(".realBetNo1").text(no1);
				$(".realBetNo2").text(no2);
				$(".realBetNo3").text(no3);
				$(".realBetNo4").text(no4);
				$(".realBetNo5").text(no5);
			} else if (response == "END") {
				alert("마감되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function set_data3_vip_real_bettingNote(rcDate, meet, rcNo) {
	var race_note = $("#race_note").val();

	var url = "../analysis/ajax.data_vip_betMemo_real_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'race_note':race_note},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function set_chatLive_bettingNo(rcDate, meet, rcNo) {
	var no1 = $("#hr_select1").val();
	var no2 = $("#hr_select2").val();
	var no3 = $("#hr_select3").val();
	var no4 = $("#hr_select4").val();
	var no5 = $("#hr_select5").val();

	var url = "./chat_betNo_update.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'betNo1':no1, 'betNo2':no2, 'betNo3':no3, 'betNo4':no4, 'betNo5':no5},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
			} else if (response == "END") {
				alert("마감되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}


function get_main_race_analyst_result(rcDate) {
	get_main_race_analyst_result_round(rcDate);
}
function get_main_race_analyst_result_round(rcDate) {
	$("#analyst_round").load("../analysis/ajax.get_race_analysis_loading.php?h=80");
	var url = "./main/ajax.get_analyst_result_round.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate},
		dataType: 'html',
		success: function(response) {
			$("#analyst_round").html(response);
			$(".ov_rcdate").removeClass("on");
			$(".ov_rcdate" + rcDate).addClass("on");
			get_main_race_analyst_result_list(rcDate, '', '', '');
		}
	});
}
function get_main_race_analyst_result_list(rcDate, meet, rcNo, meetNo) {
	get_main_race_analyst_result_round_title(rcDate, meet, rcNo);
	$("#analyst_result").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
	var url = "./main/ajax.get_analyst_result_list.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#analyst_result").html(response);
			if (rcNo && meetNo) {
				$(".ov_rcno").removeClass("on");
				$(".ov_rcno" + meetNo + rcNo).addClass("on");
			}
		}
	});
}
function get_main_race_analyst_result_round_title(rcDate, meet, rcNo) {
	var url = "./main/ajax.get_analyst_result_round_title.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#race_result_round_title").html(response);
		}
	});
}


function get_analyst_analysis_order(rcDate, meet, rcNo) {

	$("#expert_summary").hide();
	$("#expert_order").show();
}
function get_analyst_analysis_result(rcDate, meet, rcNo) {
	var year = rcDate.substr(0, 4);
	var month = rcDate.substr(4, 2);
	var day = rcDate.substr(6, 2);
	var date = year + "-" + month + "-" + day;

	if (confirm(date + ' 내부 분석가 결과보기 포인트(110,000P)가 차감됩니다.\n\n계속하시겠습니까?')) {
		var url = "../analysis/ajax.get_analyst_analysis_result_order.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'od_type':'expert10','rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					location.href = '../member/login?url=../page/popular?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
				} else if (response == "WAIT") {
					alert("문자로 신청 부탁드립니다.");
				} else if (response == "POINT") {
					alert("110,000포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
					location.href = '../member/mypage';
				} else if (response == "OK") {
					//alert('오픈준비 이벤트 기간내\n\n포인트는 차감하지 않습니다.');
					//get_analysis_expert(rcDate, meet, rcNo, '', '');
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}
function get_analyst_analysis_top5(rcDate, meet, rcNo) {
	var year = rcDate.substr(0, 4);
	var month = rcDate.substr(4, 2);
	var day = rcDate.substr(6, 2);
	var date = year + "-" + month + "-" + day;

	if (confirm(date + ' 내부위원 5인 마번보기 포인트(110,000P)가 차감됩니다.\n\n계속하시겠습니까?')) {
		var url = "../analysis/ajax.get_analyst_analysis_result_order.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'od_type':'data3_expert','rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					location.href = '../member/login?url=../page/data3?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
				} else if (response == "WAIT") {
					alert("문자로 신청 부탁드립니다.");
				} else if (response == "POINT") {
					alert("110,000포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
					location.href = '../member/mypage';
				} else if (response == "OK") {
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}


function get_analyst_chulNo_possible_order(e) {
    var data_type = $(e).parent().data("type");
    var rcDate = $(e).parent().data("rcdate");
    var meet = $(e).parent().data("meet");
    var rcNo = $(e).parent().data("rcno");

	console.log(data_type + ":" + rcDate + ":" + meet + ":" + rcNo);

	var url = "../analysis/ajax.get_data_analysis_possible_order.inc.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'analysis_type':data_type, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
				location.href = '../member/login?url=../page/' + data_type + '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
			} else {
				$("#data_possible_order").html(response);
				if (data_type != "data3") {
					get_race_analysis(data_type, rcDate, meet, rcNo, '', '');
				}
			}
		}
	});
}


function get_order_data3_analysis_use_point(rcDate) {
	var url = "../shop/ajax.order_data_analysis_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'data_type':'data3+vip'},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "POINT") {
				//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				alert("110,000포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
				location.href = '../member/mypage';
			} else if (response == "EXIST") {
				alert('이미 구매하신 내역이 있습니다.');
				location.reload();
			} else if (response == "OK") {
				location.reload();
			} else {
				alert(response);
			}
		}
	});
}

function get_order_data1_analysis_use_point(rcDate) {
	var url = "../shop/ajax.order_data_analysis_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'data_type':'data1'},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "POINT") {
				//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				alert("5,500포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
				location.href = '../member/mypage';
			} else if (response == "EXIST") {
				alert('이미 구매하신 내역이 있습니다.');
				location.reload();
			} else if (response == "OK") {
				location.reload();
			} else {
				alert(response);
			}
		}
	});
}

function get_order_data2_analysis_use_point(rcDate) {
	var url = "../shop/ajax.order_data_analysis_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'data_type':'data2'},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "POINT") {
				//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				alert("5,500포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
				location.href = '../member/mypage';
			} else if (response == "EXIST") {
				alert('이미 구매하신 내역이 있습니다.');
				location.reload();
			} else if (response == "OK") {
				location.reload();
			} else {
				alert(response);
			}
		}
	});
}

function get_order_data_analysis_streaming(e, rcDate) {
	var analyst = $(e).data("analyst");
	var name = $(e).data("nick");
	var year = rcDate.substr(0, 4);
	var month = rcDate.substr(4, 2);
	var day = rcDate.substr(6, 2);
	var date = year + "-" + month + "-" + day;

	var $opener = window.opener;

	if (confirm(date + ' ' + name + ' 예상가 마번을 구매 하시겠습니까?')) {
		var url = "../shop/ajax.order_data_streaming_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'analyst':analyst, 'rcDate':rcDate},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					$opener.document.location.href = '../member/login';
					self.close();
				} else if (response == "POINT") {
					//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
					alert("보유하신 포인트가 부족합니다.");
					$opener.document.location.href = '../member/mypage';
					self.close();
				} else if (response == "SMS") {
					//alert("마번을 문자로 전송했습니다.");
					//$opener.document.location.reload();
					//location.reload();
					location.href = '../page/streaming?analyst='+analyst;
				} else if (response == "EXIST") {
					alert('이미 구매하신 내역이 있습니다.');
					$opener.document.location.reload();
					location.reload();
				} else if (response == "OK") {
					$opener.document.location.reload();
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_order_data_analysis_streaming_modal(e, rcDate) {

	//$(e).removeAttr("onclick");

	var analyst = $(e).data("analyst");
	var name = $(e).data("nick");
	var year = rcDate.substr(0, 4);
	var month = rcDate.substr(4, 2);
	var day = rcDate.substr(6, 2);
	var date = year + "-" + month + "-" + day;

	var $opener = window.opener;

	if (confirm(date + ' ' + name + ' 예상가 마번을 구매 하시겠습니까?')) {
		var url = "../shop/ajax.order_data_streaming_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'analyst':analyst, 'rcDate':rcDate},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					if (typeof $opener !== "undefined") {
						location.href = '../member/login';
					} else {
						$opener.document.location.href = '../member/login';
						self.close();
					}
				} else if (response == "POINT") {
					//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
					alert("보유하신 포인트가 부족합니다.");
					if (typeof $opener !== "undefined") {
						location.href = '../member/mypage';
					} else {
						$opener.document.location.href = '../member/mypage';
						self.close();
					}
				} else if (response == "SMS") {
					alert("마번을 문자로 전송했습니다.");
					location.reload();
				} else if (response == "EXIST") {
					alert('이미 구매하신 내역이 있습니다.');
					location.reload();
				} else if (response == "OK") {
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_order_data_analysis_chatLive(e, rcDate) {
	var analyst = $(e).parent().data("analyst");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");
	var odType = $(e).data("odtype");
	var year = rcDate.substr(0, 4);
	var month = rcDate.substr(4, 2);
	var day = rcDate.substr(6, 2);
	var date = year + "-" + month + "-" + day;

	var odTitle = "";
	if (odType == "chatLiveAll") {
		odTitle = "1일 경주";
	} else {
		odTitle = meet + "" + rcNo + "R 1개";
	}

	if (confirm(date + ' ' + odTitle + ' 생생 채팅방 결제를 하시겠습니까?')) {
		var url = "../shop/ajax.order_data_chatLive_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'analyst':analyst, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'odType':odType},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					location.href = '../member/login';
				} else if (response == "POINT") {
					//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
					alert("보유하신 포인트가 부족합니다.");
					location.href = '../member/mypage';
				} else if (response == "EXIST") {
					alert('이미 구매하신 내역이 있습니다.');
					location.reload();
				} else if (response == "OK") {
					location.reload();
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_order_eraser_analysis_use_point(rcDate) {
	var url = "../shop/ajax.order_data_analysis_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'data_type':'eraser'},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "POINT") {
				//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				alert("55,000포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
				location.href = '../member/mypage';
			} else if (response == "EXIST") {
				alert('이미 구매하신 내역이 있습니다.');
				location.reload();
			} else if (response == "OK") {
				location.reload();
			} else {
				alert(response);
			}
		}
	});
}

function get_order_openchat(rcDate) {
	var username = $("#username").val();
	var userhp = $("#userhp").val();

	if (username == "") {
		alert("이름을 입력해 주세요.");
		$("#username").focus();
		return false;
	}
	if (userhp == "") {
		alert("연락처를 입력해 주세요.");
		$("#userhp").focus();
		return false;
	}

	var rc_month = rcDate.substr(4, 2);
	var rc_day = rcDate.substr(6);
	var rc_date = "" + rc_month + "월 " + rc_day + "일";

	var url = "../shop/ajax.order_openchat_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'odType':'openchat', 'username':username, 'userhp':userhp},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "EXIST") {
				alert('이미 신청한 내역이 있습니다.');
			} else if (response == "POINT") {
				alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				location.href = '../member/mypage';
			} else if (response == "OK") {
				//location.reload();
				//alert("정상적으로 신청되었습니다.");
				alert(rc_date + "\n오픈채팅방이 신청되셨으니\n\"문자 메시지\"를 확인하시고\n\n\"문자 메시지\"를 통하여 입실하시면 됩니다.\n(날짜와 상관없이 미리 입실하셔도 됩니다)");
				location.href = '../page/openchat';
			} else {
				alert(response);
			}
		}
	});
}

function get_order_center_visit(rcDate) {

	var rc_month = rcDate.substr(4, 2);
	var rc_day = rcDate.substr(6);
	var rc_date = "" + rc_month + "월 " + rc_day + "일";

	var url = "../shop/ajax.order_center_visit_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'odType':'center_visit'},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "EXIST") {
				alert('이미 신청한 내역이 있습니다.');
			} else if (response == "POINT") {
				alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				location.href = '../member/mypage';
			} else if (response == "OK") {
				//location.reload();
				//alert("정상적으로 신청되었습니다.");
				alert(rc_date + "\n센터 방문이 신청되셨습니다.");
				location.href = '../page/visit';
			} else {
				alert(response);
			}
		}
	});
}

function get_order_center_lesson() {
	var url = "../page/visit_request_lesson.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");;
			} else if (response == "OK") {
				//location.reload();
				location.href = '../page/visit';
			} else {
				alert(response);
			}
		}
	});
}


function get_order_data3_eraser_analysis_use_point(rcDate) {
	var url = "../shop/ajax.order_data_analysis_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'data_type':'data3+eraser'},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "POINT") {
				//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
				alert("33,000포인트가 필요합니다.\n\n보유하신 포인트가 부족합니다.");
				location.href = '../member/mypage';
			} else if (response == "EXIST") {
				alert('이미 구매하신 내역이 있습니다.');
				location.reload();
			} else if (response == "OK") {
				location.reload();
			} else {
				alert(response);
			}
		}
	});
}


function fn_analysis_data3_eraser(e) {
	var in_no = $(e).parent().data("in_no");
	var hrNo = $(e).parent().data("hrno");
	var meet = $(e).parent().data("meet");
	var rcDate = $(e).parent().data("rcdate");
	var rcNo = $(e).parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var mb_id = $(e).data("mb_id");
	var eraser_del = $(e).data("eraser_del");

	var url = "../analysis/ajax.set_analyst_data3_eraser.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_no':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'mb_id':mb_id, 'eraser_del':eraser_del},
		dataType: 'html',
		success: function(response) {
			if (response == "FINISH") {
				alert("경기가 종료되었습니다.");
			} else if (response == "ERROR") {
				alert(response);
			} else {
				//alert(response);
				if (response == "1") {
					$(e).css('background', '#000000');
					$(e).data("eraser_del", "1");
					$(e).text(chulNo);
				} else {
					$(e).css('background', '');
					$(e).data("eraser_del", "0");
					$(e).text('');
				}
			}
		}
	});
}

function fn_analysis_data3_eraser2(e) {
	var hrNo = $(e).parent().data("hrno");
	var meet = $(e).parent().data("meet");
	var rcDate = $(e).parent().data("rcdate");
	var rcNo = $(e).parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var del_type = $(e).data("del_type");
	var eraser_del = $(e).data("eraser_del");

	var url = "../analysis/ajax.set_analyst_data3_eraser2.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'del_type':del_type, 'eraser_del':eraser_del},
		dataType: 'html',
		success: function(response) {
			console.log(response);
			if (response == "ERROR") {
				alert(response);
			} else if (response == "FULL") {
				alert("3두 이상 지우실 수 없습니다.");
			} else if (response == "BLACK") {
				alert("최악은 1개만 지우기 가능합니다.");
			} else {
				//alert(response);
				if (response == "1") {
					$(e).css('background', '#797979');
					$(e).data("eraser_del", "1");
					$(e).text("경고");
				} else if (response == "2") {
					$(e).css('background', '#000000');
					$(e).data("eraser_del", "2");
					$(e).text("최악");
				} else {
					$(e).css('background', '#ffffff');
					$(e).data("eraser_del", "0");
					$(e).text('');
				}
			}
		}
	});
}

function fn_analysis_data3_eraser2_reset(rcDate, meet, rcNo) {
	if (confirm('초기화 하시겠습니까?')) {

		var url = "../analysis/ajax.set_analyst_data3_eraser2_reset.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				console.log(response);
				if (response == "ERROR") {
					alert(response);
				} else {
					$('.analysisEraserButton').each(function(index, item) {
						$(this).css('background', '#ffffff');
						$(this).data("eraser_del", "0");
						$(this).text('');
					});
				}
			}
		});
	}
}

function fn_analysis_data3_eraser_write_chulNo(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var color = $(e).parent().data("color");
	var code = $(e).parent().data("code");
	var seq = $(e).parent().data("seq");
	var chulNo = $(e).val();

	var url = "../analysis/ajax.set_analyst_data3_eraser_write_chulNo.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'code':code, 'seq':seq, 'chulNo':chulNo},
		dataType: 'html',
		success: function(response) {
			console.log(response);
			if (response == "FINISH") {
				alert("경기가 종료되었습니다.");
			} else if (response == "ERROR") {
				alert(response);
			} else {
				$(e).attr("class", "");
				$(e).attr("class", "eraser_chulNo" + chulNo);
				if (color == "red") {
					$(e).addClass("fontcolor_red");
				}

				if (chulNo == "") {
					$(e).css("background", "");
				}
			}
		}
	});
}

function fn_analysis_data3_eraser_chulNo(e) {
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var why_del = $(e).data("why_del");

	var url = "../analysis/ajax.set_analyst_data3_eraser_chulNo.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'why_del':why_del},
		dataType: 'html',
		success: function(response) {
			if (response == "FINISH") {
				alert("경기가 종료되었습니다.");
			} else if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
				document.location.href = '../member/login?url=../page/data3?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
			} else if (response == "ERROR") {
				alert(response);
			} else {
				console.log(why_del + ":" + response);
				if (why_del == "1") {
					$(e).data("why_del", "0");
					$(".eraser_title_chulNo" + chulNo).css("background", "#ffffff");
					$(".eraser_title_chulNo" + chulNo).css("color", "");
					$(".eraser_chulNo" + chulNo).css("background", "#ffffff");
					$(".eraser_chulNo" + chulNo).css("color", "");
				} else {
					$(e).data("why_del", "1");
					$(".eraser_title_chulNo" + chulNo).css("background", "#000000");
					$(".eraser_title_chulNo" + chulNo).css("color", "#ffffff");
					$(".eraser_chulNo" + chulNo).css("background", "#ffffff");
					$(".eraser_chulNo" + chulNo).css("color", "#ffffff");
				}
			}
		}
	});
}

function fn_analysis_data3_ability(e) {
	var hrNo = $(e).parent().data("hrno");
	var meet = $(e).parent().data("meet");
	var rcDate = $(e).parent().data("rcdate");
	var rcNo = $(e).parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var hrNo = $(e).parent().data("hrno");
	var abtype = $(e).data("abtype");

	var ability = prompt("값을 입력해 주세요.");
	if (ability === null) {
		return;
	}

	var url = "../analysis/ajax.set_analyst_data3_ability.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'abtype':abtype, 'ability':ability},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "0000") {

				$(e).css('background-color', data.bgcolor);
				$(e).data("ability", data.ability);
				$(e).text(data.ability);

				let possible = parseInt(data.myPossible);
				$("#rc_mypossible" + hrNo).val(possible);
				if (possible < 0) {

					$("#mypossible2_" + hrNo).css("width", "0");
					$("#mypossible2_" + hrNo).css("background-color", "");
					$("#mypossible2_" + hrNo).text("");

					get_select_mypossible_textcolor($("#rc_mypossible" + hrNo));
					$("#mypossible1_" + hrNo).css("width", possible * (-1) + "%");
					$("#mypossible1_" + hrNo).css("background-color", "#000000");
					$("#mypossible1_" + hrNo).text(possible);
					//get_select_mypossible_bgcolor($("#mypossible1_" + hrNo));
				} else if (possible > 0) {

					$("#mypossible1_" + hrNo).css("width", "0");
					$("#mypossible1_" + hrNo).css("background-color", "");
					$("#mypossible1_" + hrNo).text("");

					get_select_mypossible_textcolor($("#rc_mypossible" + hrNo));
					$("#mypossible2_" + hrNo).css("width", possible + "%");
					$("#mypossible2_" + hrNo).css("background-color", "#ff0000");
					$("#mypossible2_" + hrNo).text(possible);
					//get_select_mypossible_bgcolor($("#mypossible2_" + hrNo));
				} else {

					$("#mypossible1_" + hrNo).css("width", "0");
					$("#mypossible1_" + hrNo).css("background-color", "");
					$("#mypossible1_" + hrNo).text("");

					$("#mypossible2_" + hrNo).css("width", "0");
					$("#mypossible2_" + hrNo).css("background-color", "");
					$("#mypossible2_" + hrNo).text("");
				}

				/**
				$("#rc_mypossible" + hrNo).val(data.myPossible);
				$("#mypossible_" + hrNo).css("width", data.myPossible + "%");
				$("#mypossible_" + hrNo).text(data.myPossible);
				get_select_mypossible_textcolor("#rc_mypossible" + hrNo);
				get_select_mypossible_bgcolor($("#mypossible_" + hrNo));
				**/


			} else if (data.resCode == "1111") {
				alert("다른 항목을 지우고 다시 입력해 주세요.");
			} else {
				alert("ERROR");
			}
		}
	});
}

function fn_analysis_data3_ability_reset(rcDate, meet, rcNo) {
	if (confirm('초기화 하시겠습니까?')) {

		var url = "../analysis/ajax.set_analyst_data3_ability_reset.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				console.log(response);
				if (response == "ERROR") {
					alert(response);
				} else {
					$('.analysisAbilityButton').each(function(index, item) {
						$(this).css('background-color', '');
						$(this).text('');

						$("[id^='rc_mypossible']").val(0);
						$("[id^='rc_mypossible']").css("color", "");
						$(".hr_myPossible_graph").css("width", "0");
						$(".hr_myPossible_graph").css("background-color", "");
						$(".hr_myPossible_graph").text("");
					});
				}
			}
		});
	}
}


function fn_analysis_data3_rank_sum(e) {
	var in_no = $(e).parent().parent().data("in_no");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var rank_sum = $(e).val();

	var url = "../analysis/ajax.set_analyst_data3_rank_sum.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_no':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'rank_sum':rank_sum},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				$(e).val(rank_sum);
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_data3_winOdds(e) {
	var in_no = $(e).parent().parent().data("in_no");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var odds = $(e).val();

	var url = "../analysis/ajax.set_analyst_data3_winOdds.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_no':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'odds':odds},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				if (odds != "") {
					if (confirm('로그인이 필요합니다.\n\n로그인 하시겠습니까?')) {
						location.href = '../member/login?url=../page/data3?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
					}
				}
				$(e).val('');
			} else if (response == "OK") {
				$(e).val(odds);
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_data3_plcOdds(e) {
	var in_no = $(e).parent().parent().data("in_no");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var odds_num = Number($(e).val());
	var odds = $(e).val();

	var url = "../analysis/ajax.set_analyst_data3_plcOdds.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_no':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'odds':odds},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				if (odds != "") {
					if (confirm('로그인이 필요합니다.\n\n로그인 하시겠습니까?')) {
						location.href = '../member/login?url=../page/data3?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
					}
				}
				$(e).val('');
			} else if (response == "OK") {
				if (odds_num > 0) $(e).val(odds);
				else $(e).val('');
				if (odds_num <= 1.1) {
					$(e).css('color', '#ff0000');
				} else if (odds_num <= 1.9) {
					$(e).css('color', '#ff9900');
				} else if (odds_num <= 2.9) {
					$(e).css('color', '#0000ff');
				} else if (odds_num <= 4.9) {
					$(e).css('color', '#006600');
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_data3_check_all() {
	$('input:checkbox[name=chkhidden]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		if($(this).prop("disabled") == false && $(this).is(":checked") == false) {
			//$(this).attr("checked", true);
			//hide_trLineCheck($(this), hrNo);
			$(this).trigger("click");
		}
    });
}

function fn_analysis_data3_check_invert() {
	$('input:checkbox[name=chkshow]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		if($(this).prop("disabled") == false) {
			if($(this).is(":checked") == true) {
				//$(this).attr("checked", false);
				//hide_trLineCheck($(this), hrNo);
				$(this).trigger("click");
			} else {
				//$(this).attr("checked", true);
				//hide_trLineCheck($(this), hrNo);
				$(this).trigger("click");
			}
		}
    });
/**
	$('input:checkbox[name=chkhidden]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		$(this).attr("checked", true);
        hide_trLineCheck($(this), hrNo);
    });
**/
}

function fn_analysis_data3_check_all_data9() {
	$('input:checkbox[name=chkhidden]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		if($(this).is(":checked") == false) {
			$(this).attr("checked", true);
			parent.hide_trLineCheck_data9($(this), hrNo);
		}
    });
}

function fn_analysis_data3_check_invert_data9(analysis_no) {
	parent.analysis_data3_check_invert_data9(analysis_no);
	/**
	$('input:checkbox[name=chkshow]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		if($(this).is(":checked") == true) {
			//$(this).attr("checked", false);
			parent.analysis_data3_check_invert_data($(this), hrNo);
			//$(this).trigger("click");
		} else {
			//$(this).attr("checked", true);
			parent.analysis_data3_check_invert_data($(this), hrNo);
			//$(this).trigger("click");
		}
    });
	**/
}

function fn_analysis_data3_all_check_all(rcDate, meet) {

	var url = "../analysis/ajax.set_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'hr_del':'1'},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				$('input:checkbox[name=chkhidden]').each(function(index, item) {
					let hrNo = $(this).parent().parent().data("hrno");
					let bg_color = $(".hrNo" + hrNo).data("bg_color");
					if($(this).is(":checked") == false) {
						$(this).attr("checked", true);

						$(".trLineShow" + hrNo).show();
						$(".trLineLeftShow" + hrNo).show();
						$(".trLineEmpty" + hrNo).hide();
						$("#chks_" + hrNo).prop("checked", true); //show

						//$(".hrNo" + hrNo).css("background-color", bg_color);
						//$(".hrNo" + hrNo).data("bg_color", "black");
					}
				});
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_data3_all_check_invert(rcDate, meet) {

	var url = "../analysis/ajax.set_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'hr_invert':'1'},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {

				$('input:checkbox[name=chkshow]').each(function(index, item) {
					let hrNo = $(this).parent().parent().data("hrno");
					let bg_color = $(".hrNo" + hrNo).data("bg_color");
					if($(this).is(":checked") == true) {
						$(this).attr("checked", false);

						$(".trLineShow" + hrNo).hide();
						$(".trLineLeftShow" + hrNo).hide();
						$(".trLineEmpty" + hrNo).show();
						$("#chkh_" + hrNo).prop("checked", false); //hidden

						//$(".hrNo" + hrNo).css("background-color", "#ececec");
						//$(".hrNo" + hrNo).data("bg_color", "white");
					} else {
						$(this).attr("checked", true);

						$(".trLineShow" + hrNo).show();
						$(".trLineLeftShow" + hrNo).show();
						$(".trLineEmpty" + hrNo).hide();
						$("#chks_" + hrNo).prop("checked", true); //show

						//$(".hrNo" + hrNo).css("background-color", bg_color);
						//$(".hrNo" + hrNo).data("bg_color", "black");
					}
				});
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_data4_check_all() {
	$('.btn_chulNo_round').each(function(index, item) {
		if ($(this).data("hr_del") == "1") {
			$(this).trigger("click");
		}
    });
}

function fn_analysis_data4_check_invert() {
	$('.btn_chulNo_round').each(function(index, item) {
		$(this).trigger("click");
    });
}

function fn_analysis_data4_ai_check_all() {
	$('.btn_chulNo_round').each(function(index, item) {
		if ($(this).data("hr_del") == "1") {
			$(this).trigger("click");
		}
    });
}

function fn_analysis_data4_ai_check_invert() {
	$('.btn_chulNo_round').each(function(index, item) {
		$(this).trigger("click");
    });
}

function fn_analysis_popular_check_all() {
	$('input:checkbox[name=checkHide]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		$(this).attr("checked", true);
        popular_chulNoDel($(this));
    });
}

function fn_analysis_popular_check_invert() {
	$('input:checkbox[name=checkShow]').each(function(index, item) {
		let hrNo = $(this).parent().parent().data("hrno");
		if($(this).is(":checked") == true) {
			$(this).attr("checked", false);
			popular_chulNoDel($(this));
		} else {
			$(this).attr("checked", true);
			popular_chulNoDel($(this));
		}
    });
}

function fn_analysis_round_match_check_all(match_no) {
	$('.matchChulNo' + match_no).each(function(index, item) {
		if ($(this).data("hr_del") == "1") {
			$(this).trigger("click");
		}
    });
}

function fn_analysis_round_match_check_invert(match_no) {
	$('.matchChulNo' + match_no).each(function(index, item) {
		$(this).trigger("click");
    });
}


function get_main_analyst_search_xxx(stype) {
	if (stype == "stx") {
		var analyst_stx = $("#analyst_stx").val();

		if (analyst_stx == "") {
			alert("검색어를 입력해 주세요.");
			$("#analyst_stx").focus();
			return false;
		}
	} else {
		$("#analyst_stx").val('');
	}

	var url = "../main/ajax.get_main_analyst_search.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'stype':stype, 'analyst_stx':analyst_stx},
		dataType: 'html',
		success: function(response) {
			$("#main_analyst_list").html(response);
		}
	});
}

function get_main_analyst_search(stype) {
	var analyst_stx = $("#analyst_stx").val();

	var url = "../main/ajax.get_main_analyst_search.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'stype':stype, 'analyst_stx':analyst_stx},
		dataType: 'html',
		success: function(response) {
			$("#main_analyst_list").html(response);
		}
	});
}


function set_analyst_data3_damage_check(e, color) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var damage = $(e).data("damage");
	var check_color = $(e).data("check_color");

	var url = "../analysis/ajax.set_analyst_data3_damage_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'damage':damage, 'color':color, 'check_color':check_color},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				console.log(response);
				if (response == "-1") {
					$(e).css("background-color", "#000000");
					$(e).css("color", "#ffffff");
				} else if (response == "1") {
					$(e).css("background-color", "#ff0000");
					$(e).css("color", "#ffffff");
				} else {
					$(e).css("background-color", "#ffffff");
					$(e).css("color", "#ffffff");
				}
				$(e).data("check_color", response);
			}
		}
	});
}


function set_analyst_betting_count(e) {
	var checked_non = 0;
	$('.betInputCheckbox').each(function(index, item) {
		if ($(this).is(":checked") == false) {
			checked_non = checked_non + 1;
		}
    });

	if (checked_non > 0) {
		//alert("경우의 수 체크가 풀린 경우 횟수를 변경할 수 없습니다.");
		//$(e).val($(e).data("defaultvalue"));
		//return false;
	}

	var rcDate = $(e).parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().data("rcno");
	var bet_case = $(e).data("bet_case");
	var bet_number = Number($(e).data("bet_number"));
	var bet_count = Number($(e).val());
	var bet_money = bet_count * 100 * bet_number;

	var url = "./ajax.set_analyst_betting_count_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'bet_case':bet_case, 'bet_count':bet_count},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
				$(e).val('');
			} else {
				$(e).data("defaultvalue", bet_count);
				$("#betting_case_money" + bet_case).text(number_format(bet_money));
				$("#betting_money_total").data("total_money", response);
				$("#betting_money_total").text(number_format(response) + "원");
			}
		}
	});
}

function fn_betting_hide(e, occasion) {
    if($(e).is(":checked") == true) {

        var bet_count = $(e).parent().parent().find(".betInputText").val();
        var bet_money = Number(bet_count) * 100 * occasion;
        var total_money = Number($("#betting_money_total").data('total_money')) + bet_money;
        $("#betting_money_total").text(number_format(total_money) + "원");
        $("#betting_money_total").data("total_money", total_money);

        $(e).parent().parent().find(".betNumber").css('opacity', 1);
        $(e).parent().parent().find(".betMoney").css('opacity', 1);
        $(e).parent().parent().find(".betInputText").attr('disabled', false);
    } else {

        var bet_count = $(e).parent().parent().find(".betInputText").val();
        var bet_money = Number(bet_count) * 100 * occasion;
        var total_money = Number($("#betting_money_total").data('total_money')) - bet_money;
        $("#betting_money_total").text(number_format(total_money) + "원");
        $("#betting_money_total").data("total_money", total_money);

        console.log(bet_money);

        $(e).parent().parent().find(".betNumber").css('opacity', 0.3);
        $(e).parent().parent().find(".betMoney").css('opacity', 0.3);
        $(e).parent().parent().find(".betInputText").attr('disabled', true);
    }
}


function fn_ranking_view_check(e, rcDate, meet, rcNo, m) {
	var checked = "";
	if ($(e).is(":checked")) {
		checked = "1";
	}
	var url = "../analysis/ajax.set_analyst_ranking_check_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'month':m, 'checked':checked},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				if (checked) {
					$(e).attr("checked", false);
				} else {
					$(e).attr("checked", true);
				}
			} else {
				if (checked) {
					if ( ((m == "5M" || m == "6M" || m == "7M") && $("#checkbox_data3_ranking_4M7M").is(":checked")) ) {
						$(".ranking_hide_" + m).hide();
						$(".ranking_show_" + m).show();
					} else if ( ((m == "6M" || m == "7M") && $("#checkbox_data3_ranking_6M7M").is(":checked")) ) {
						$(".ranking_hide_" + m).hide();
						$(".ranking_show_" + m).show();
					} else if (m == "1M" || m == "2M" || m == "3M" || m == "4M") {
						$(".ranking_hide_" + m).hide();
						$(".ranking_show_" + m).show();
					}
				} else {
					$(".ranking_show_" + m).hide();
					$(".ranking_hide_" + m).show();
				}
			}
		}
	});

	/**
	var checked = "";
	if ($(e).is(":checked")) {
		checked = "1";
		$(".ranking_show_" + m).show();
	} else {
		$(".ranking_show_" + m).hide();
	}
	**/
}

function fn_ranking_view_check2(e, rcDate, meet, rcNo, m) {
	var checked = "";
	if ($(e).is(":checked")) {
		checked = "1";
	}
	var url = "../analysis/ajax.set_analyst_ranking_check_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'month':m, 'checked':checked},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				if (checked) {
					$(e).attr("checked", false);
				} else {
					$(e).attr("checked", true);
				}
			} else {
				if (checked) {
					$(".ranking_hide_" + m).hide();
					$(".ranking_show_" + m).show();
				} else {
					$(".ranking_show_" + m).hide();
					$(".ranking_hide_" + m).show();
				}
			}
		}
	});
}

function fn_ranking_view_check_all(e) {
	var checked = "";
	if ($(e).is(":checked")) {
		checked = "1";
		/**
		$("#checkbox_data3_ranking_1M").trigger("click");
		$("#checkbox_data3_ranking_2M").trigger("click");
		$("#checkbox_data3_ranking_3M").trigger("click");
		$("#checkbox_data3_ranking_4M").trigger("click");
		$("#checkbox_data3_ranking_5M").trigger("click");
		$("#checkbox_data3_ranking_6M").trigger("click");
		$("#checkbox_data3_ranking_7M").trigger("click");
		**/

		$("#checkbox_data3_ranking_1M").attr("checked", true);
		$("#checkbox_data3_ranking_2M").attr("checked", true);
		$("#checkbox_data3_ranking_3M").attr("checked", true);
		$("#checkbox_data3_ranking_4M").attr("checked", true);
		$("#checkbox_data3_ranking_5M").attr("checked", true);
		$("#checkbox_data3_ranking_6M").attr("checked", true);
		$("#checkbox_data3_ranking_7M").attr("checked", true);
		$(".ranking_show_1M").show();
		$(".ranking_show_2M").show();
		$(".ranking_show_3M").show();
		$(".ranking_show_4M").show();
		$(".ranking_show_5M").show();
		$(".ranking_show_6M").show();
		$(".ranking_show_7M").show();
	} else {
		$("#checkbox_data3_ranking_1M").attr("checked", false);
		$("#checkbox_data3_ranking_2M").attr("checked", false);
		$("#checkbox_data3_ranking_3M").attr("checked", false);
		$("#checkbox_data3_ranking_4M").attr("checked", false);
		$("#checkbox_data3_ranking_5M").attr("checked", false);
		$("#checkbox_data3_ranking_6M").attr("checked", false);
		$("#checkbox_data3_ranking_7M").attr("checked", false);
		$(".ranking_show_1M").hide();
		$(".ranking_show_2M").hide();
		$(".ranking_show_3M").hide();
		$(".ranking_show_4M").hide();
		$(".ranking_show_5M").hide();
		$(".ranking_show_6M").hide();
		$(".ranking_show_7M").hide();
	}
}

function fn_ranking_view_check_term(e, term) {
	var checked = "";
	if ($(e).is(":checked")) {
		if (term == "1M3M") {
			//$(".ranking_show_1M").show();
			$(".ranking_show_2M").show();
			$(".ranking_show_3M").show();
			if ($("#checkbox_data3_ranking_1M").is(":checked")) {
				$(".ranking_show_1M").show();
			}
		} else if (term == "1M4M") {
			$(".ranking_show_2M").show();
			$(".ranking_show_3M").show();
			$(".ranking_show_4M").show();
			if ($("#checkbox_data3_ranking_1M").is(":checked")) {
				$(".ranking_show_1M").show();
			}
		} else if (term == "3M") {
			$(".ranking_show_3M").show();
		} else if (term == "4M5M") {
			$(".ranking_show_4M").show();
			$(".ranking_show_5M").show();
		} else if (term == "3M7M") {
			$(".ranking_show_3M").show();
			$(".ranking_show_4M").show();
			$(".ranking_show_5M").show();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_show_6M").show();
				}
			} else {
				$(".ranking_show_6M").show();
			}
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_show_7M").show();
				}
			} else {
				$(".ranking_show_7M").show();
			}
		} else if (term == "4M7M") {
			$(".ranking_show_4M").show();
			$(".ranking_show_5M").show();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_show_6M").show();
				}
			} else {
				$(".ranking_show_6M").show();
			}
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_show_7M").show();
				}
			} else {
				$(".ranking_show_7M").show();
			}
		} else if (term == "5M7M") {
			if ($("#checkbox_data3_ranking_5M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_5M").is(":checked")) {
					$(".ranking_show_5M").show();
				}
			} else {
				$(".ranking_show_5M").show();
			}
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_show_6M").show();
				}
			} else {
				$(".ranking_show_6M").show();
			}
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_show_7M").show();
				}
			} else {
				$(".ranking_show_7M").show();
			}
		} else if (term == "6M7M") {
			if ($("#checkbox_data3_ranking_6M").is(":checked")) {
				$(".ranking_show_6M").show();
			}
			if ($("#checkbox_data3_ranking_7M").is(":checked")) {
				$(".ranking_show_7M").show();
			}
		}
	} else {
		if (term == "1M3M") {
			//$(".ranking_show_1M").hide();
			$(".ranking_show_2M").hide();
			$(".ranking_show_3M").hide();
			if ($("#checkbox_data3_ranking_1M").is(":checked")) {
				$(".ranking_show_1M").hide();
			}
		} else if (term == "1M4M") {
			$(".ranking_show_2M").hide();
			$(".ranking_show_3M").hide();
			$(".ranking_show_4M").hide();
			if ($("#checkbox_data3_ranking_1M").is(":checked")) {
				$(".ranking_show_1M").hide();
			}
		} else if (term == "3M") {
			$(".ranking_show_3M").hide();
		} else if (term == "4M5M") {
			$(".ranking_show_4M").hide();
			$(".ranking_show_5M").hide();
		} else if (term == "3M7M") {
			$(".ranking_show_3M").hide();
			$(".ranking_show_4M").hide();
			$(".ranking_show_5M").hide();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_show_6M").hide();
				}
			} else {
				$(".ranking_show_6M").hide();
			}
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_show_7M").hide();
				}
			} else {
				$(".ranking_show_7M").hide();
			}
		} else if (term == "4M7M") {
			$(".ranking_show_4M").hide();
			$(".ranking_show_5M").hide();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_show_6M").hide();
				}
			} else {
				$(".ranking_show_6M").hide();
			}
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_show_7M").hide();
				}
			} else {
				$(".ranking_show_7M").hide();
			}
		} else if (term == "5M7M") {
			if ($("#checkbox_data3_ranking_5M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_5M").is(":checked")) {
					$(".ranking_show_5M").hide();
				}
			} else {
				$(".ranking_show_5M").hide();
			}
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_show_6M").hide();
				}
			} else {
				$(".ranking_show_6M").hide();
			}
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_show_7M").hide();
				}
			} else {
				$(".ranking_show_7M").hide();
			}
		} else if (term == "6M7M") {
			if ($("#checkbox_data3_ranking_6M").is(":checked")) {
				$(".ranking_show_6M").hide();
			}
			if ($("#checkbox_data3_ranking_7M").is(":checked")) {
				$(".ranking_show_7M").hide();
			}
		}
	}
}

function fn_ranking_view_check_color(e, color) {
	if ($(e).is(":checked")) {
		/**
		if ($("#checkbox_data3_ranking_1M").is(":checked")) {
			$(".ranking_1M_color_" + color).show();
		}
		if ($("#checkbox_data3_ranking_2M").is(":checked")) {
			$(".ranking_2M_color_" + color).show();
		}
		if ($("#checkbox_data3_ranking_3M").is(":checked")) {
			$(".ranking_3M_color_" + color).show();
		}
		if ($("#checkbox_data3_ranking_4M").is(":checked")) {
			$(".ranking_4M_color_" + color).show();
		}
		if ($("#checkbox_data3_ranking_5M").is(":checked")) {
			$(".ranking_5M_color_" + color).show();
		}
		**/
		
		if ($("#checkbox_data3_ranking_1M3M").is(":checked")) {
			$(".ranking_1M_color_" + color).show();
			$(".ranking_2M_color_" + color).show();
			$(".ranking_3M_color_" + color).show();
		}

		if ($("#checkbox_data3_ranking_4M5M").is(":checked")) {
			$(".ranking_4M_color_" + color).show();
			$(".ranking_5M_color_" + color).show();
		}

		if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_4M_color_" + color).show();
			$(".ranking_5M_color_" + color).show();
			$(".ranking_6M_color_" + color).show();
			$(".ranking_7M_color_" + color).show();
		}

		if ($("#checkbox_data3_ranking_6M7M").is(":checked")) {
			if ($("#checkbox_data3_ranking_6M").is(":checked")) {
				$(".ranking_6M_color_" + color).show();
			}
			if ($("#checkbox_data3_ranking_7M").is(":checked")) {
				$(".ranking_7M_color_" + color).show();
			}
		}
	} else {
		/**
		if ($("#checkbox_data3_ranking_1M").is(":checked")) {
			$(".ranking_1M_color_" + color).hide();
		}
		if ($("#checkbox_data3_ranking_2M").is(":checked")) {
			$(".ranking_2M_color_" + color).hide();
		}
		if ($("#checkbox_data3_ranking_3M").is(":checked")) {
			$(".ranking_3M_color_" + color).hide();
		}
		if ($("#checkbox_data3_ranking_4M").is(":checked")) {
			$(".ranking_4M_color_" + color).hide();
		}
		if ($("#checkbox_data3_ranking_5M").is(":checked")) {
			$(".ranking_5M_color_" + color).hide();
		}
		**/
		
		if ($("#checkbox_data3_ranking_1M3M").is(":checked")) {
			$(".ranking_1M_color_" + color).hide();
			$(".ranking_2M_color_" + color).hide();
			$(".ranking_3M_color_" + color).hide();
		}

		if ($("#checkbox_data3_ranking_4M5M").is(":checked")) {
			$(".ranking_4M_color_" + color).hide();
			$(".ranking_5M_color_" + color).hide();
		}

		if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_4M_color_" + color).hide();
			$(".ranking_5M_color_" + color).hide();
			$(".ranking_6M_color_" + color).hide();
			$(".ranking_7M_color_" + color).hide();
		}

		if ($("#checkbox_data3_ranking_6M7M").is(":checked")) {
			if ($("#checkbox_data3_ranking_6M").is(":checked")) {
				$(".ranking_6M_color_" + color).hide();
			}
			if ($("#checkbox_data3_ranking_7M").is(":checked")) {
				$(".ranking_7M_color_" + color).hide();
			}
		}
	}
	console.log(color);
}

function fn_ranking_view_check_color2(e, color) {
	if ($(e).is(":checked")) {
		$(".ranking_1M_color_" + color).show();
		$(".ranking_2M_color_" + color).show();
		$(".ranking_3M_color_" + color).show();
		if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_4M_color_" + color).show();
			$(".ranking_5M_color_" + color).show();
			$(".ranking_6M_color_" + color).show();
			$(".ranking_7M_color_" + color).show();
		}
	} else {
		$(".ranking_1M_color_" + color).hide();
		$(".ranking_2M_color_" + color).hide();
		$(".ranking_3M_color_" + color).hide();
		if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_4M_color_" + color).hide();
			$(".ranking_5M_color_" + color).hide();
			$(".ranking_6M_color_" + color).hide();
			$(".ranking_7M_color_" + color).hide();
		}
	}
	console.log(color);
}

function fn_ranking_blink_check(color, check_view) {
	if (check_view) {
		$(".ranking_1M_color_" + color).show();
		$(".ranking_2M_color_" + color).show();
		if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_3M_color_" + color).show();
		}
		if ($("#checkbox_data3_ranking_3M7M").is(":checked")) {
			$(".ranking_3M_color_" + color).show();
			$(".ranking_4M_color_" + color).show();
			$(".ranking_5M_color_" + color).show();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_6M_color_" + color).show();
				}
			} else {
				$(".ranking_6M_color_" + color).show();
			}
			
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_7M_color_" + color).show();
				}
			} else {
				$(".ranking_7M_color_" + color).show();
			}
		} else if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_4M_color_" + color).show();
			$(".ranking_5M_color_" + color).show();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_6M_color_" + color).show();
				}
			} else {
				$(".ranking_6M_color_" + color).show();
			}
			
			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_7M_color_" + color).show();
				}
			} else {
				$(".ranking_7M_color_" + color).show();
			}
		}
	} else {
		$(".ranking_1M_color_" + color).hide();
		$(".ranking_2M_color_" + color).hide();
		if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_3M_color_" + color).hide();
		}
		if ($("#checkbox_data3_ranking_3M7M").is(":checked")) {
			$(".ranking_3M_color_" + color).hide();
			$(".ranking_4M_color_" + color).hide();
			$(".ranking_5M_color_" + color).hide();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_6M_color_" + color).hide();
				}
			} else {
				$(".ranking_6M_color_" + color).hide();
			}

			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_7M_color_" + color).hide();
				}
			} else {
				$(".ranking_7M_color_" + color).hide();
			}
		} else if ($("#checkbox_data3_ranking_4M7M").is(":checked")) {
			$(".ranking_4M_color_" + color).hide();
			$(".ranking_5M_color_" + color).hide();
			if ($("#checkbox_data3_ranking_6M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_6M").is(":checked")) {
					$(".ranking_6M_color_" + color).hide();
				}
			} else {
				$(".ranking_6M_color_" + color).hide();
			}

			if ($("#checkbox_data3_ranking_7M").val() !== undefined) {
				if ($("#checkbox_data3_ranking_7M").is(":checked")) {
					$(".ranking_7M_color_" + color).hide();
				}
			} else {
				$(".ranking_7M_color_" + color).hide();
			}
		}
	}
}
var ranking_check_red = ranking_check_blue = ranking_check_green = ranking_check_black = "";
function fn_ranking_blink_check_color(e, color) {
	if ($(e).is(":checked")) {
		if (color == "red") {
			clearInterval(ranking_check_red);
		} else if (color == "blue") {
			clearInterval(ranking_check_blue);
		} else if (color == "green") {
			clearInterval(ranking_check_green);
		} else if (color == "black") {
			clearInterval(ranking_check_black);
		}
		fn_ranking_blink_check(color, true);
	} else {
		var check_view = false;
		if (color == "red") {
			ranking_check_red = setInterval(function() {
				fn_ranking_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		} else if (color == "blue") {
			ranking_check_blue = setInterval(function() {
				fn_ranking_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		} else if (color == "green") {
			ranking_check_green = setInterval(function() {
				fn_ranking_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		} else if (color == "black") {
			ranking_check_black = setInterval(function() {
				fn_ranking_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		}
	}
}


function fn_s1f_blink_check(color, check_view) {
	if (check_view) {
		$(".s1f_1M_color_" + color).show();
		$(".s1f_2M_color_" + color).show();
		$(".s1f_3M_color_" + color).show();
	} else {
		$(".s1f_1M_color_" + color).hide();
		$(".s1f_2M_color_" + color).hide();
		$(".s1f_3M_color_" + color).hide();
	}
}
var s1f_check_red = s1f_check_black = "";
function fn_s1f_blink_check_color(e, color) {
	if ($(e).is(":checked")) {
		if (color == "red") {
			clearInterval(s1f_check_red);
		} else if (color == "black") {
			clearInterval(s1f_check_black);
		}
		fn_s1f_blink_check(color, true);
	} else {
		var check_view = false;
		if (color == "red") {
			s1f_check_red = setInterval(function() {
				fn_s1f_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		} else if (color == "black") {
			s1f_check_black = setInterval(function() {
				fn_s1f_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		}
	}
}


function fn_rank_blink_check(color, check_view) {
	if (color == "red") {
		if (check_view) {
			$(".rank_sum_color_" + color).show();
			$(".rank_sum_color_" + color).show();
			$(".rank_sum_color_" + color).show();
		} else {
			$(".rank_sum_color_" + color).hide();
			$(".rank_sum_color_" + color).hide();
			$(".rank_sum_color_" + color).hide();
		}
	} else {
		if (check_view) {
			$(".rank_1M_color_" + color).show();
			$(".rank_2M_color_" + color).show();
			$(".rank_3M_color_" + color).show();
			$(".rank_4M_color_" + color).show();
			$(".rank_5M_color_" + color).show();
			$(".rank_6M_color_" + color).show();
			$(".rank_7M_color_" + color).show();
		} else {
			$(".rank_1M_color_" + color).hide();
			$(".rank_2M_color_" + color).hide();
			$(".rank_3M_color_" + color).hide();
			$(".rank_4M_color_" + color).hide();
			$(".rank_5M_color_" + color).hide();
			$(".rank_6M_color_" + color).hide();
			$(".rank_7M_color_" + color).hide();
		}
	}
}
var rank_check_red = rank_check_black = "";
function fn_rank_blink_check_color(e, color) {
	if ($(e).is(":checked")) {
		if (color == "red") {
			clearInterval(rank_check_red);
		} else if (color == "black") {
			clearInterval(rank_check_black);
		}
		fn_rank_blink_check(color, true);
	} else {
		var check_view = false;
		if (color == "red") {
			rank_check_red = setInterval(function() {
				fn_rank_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		} else if (color == "black") {
			rank_check_black = setInterval(function() {
				fn_rank_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		}
	}
}

function fn_odds_blink_check(color, check_view) {
	if (check_view) {
		$(".odds_1M_color_" + color).show();
	} else {
		$(".odds_1M_color_" + color).hide();
	}
}
var odds_check_red = odds_check_black = "";
function fn_odds_blink_check_color(e, color) {
	if ($(e).is(":checked")) {
		if (color == "red") {
			clearInterval(odds_check_red);
		} else if (color == "black") {
			clearInterval(odds_check_black);
		}
		fn_odds_blink_check(color, true);
	} else {
		var check_view = false;
		if (color == "red") {
			odds_check_red = setInterval(function() {
				fn_odds_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		} else if (color == "black") {
			odds_check_black = setInterval(function() {
				fn_odds_blink_check(color, check_view);
				if (check_view) {
					check_view = false;
				} else {
					check_view = true;
				}
			}, 700);
		}
	}
}


var analysis_check_blink = [];
function fn_analysis_blink_check(anobj, check_view) {
	if (check_view) {
		$("." + anobj + "_color_blink").show();
	} else {
		$("." + anobj + "_color_blink").hide();
	}
}
function fn_anlaysis_blink_check_color(e, anobj) {
	if ($(e).is(":checked")) {
		clearInterval(analysis_check_blink[anobj]);
		fn_analysis_blink_check(anobj, true);
	} else {
		var check_view = false;
		analysis_check_blink[anobj] = setInterval(function() {
			fn_analysis_blink_check(anobj, check_view);
			if (check_view) {
				check_view = false;
			} else {
				check_view = true;
			}
		}, 700);
	}
}

var analysis_click_blink = [];
function fn_analysis_blink_click(anobj, check_view) {
	if (check_view) {
		$(".hrNo_" + anobj).show();
	} else {
		$(".hrNo_" + anobj).hide();
	}

	$('input:checkbox[name=chkfavorite]').each(function(index, item) {
		let uno = $(this).data("uno");
		if ($(this).is(":checked") == true) {
			if (check_view) {
				$(".better" + uno + "_hrNo_" + anobj).show();
				console.log($(this).data("uno"));
			} else {
				$(".better" + uno + "_hrNo_" + anobj).hide();
			}
		} else {
			//$(".better" + uno + "_hrNo_" + anobj).hide();
		}
	});
}
function fn_anlaysis_blink_click_hrNo(e, anobj) {
	//alert(analysis_click_blink[anobj]);
	/**
	if (analysis_click_blink[anobj]) {
		clearInterval(analysis_click_blink[anobj]);
		fn_analysis_blink_click(anobj, true);
		analysis_click_blink[anobj] = null;
	} else {
		var check_view = false;
		analysis_click_blink[anobj] = setInterval(function() {
			fn_analysis_blink_click(anobj, check_view);
			if (check_view) {
				check_view = false;
			} else {
				check_view = true;
			}
		}, 700);
	}
	**/
}


function fn_analysis_vip_anlysis_checkbox(e, type) {
	var odcode = $(e).parent().parent().data("odcode");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var checked = $(e).data("checked");

	var url = "./analysis_betting_vip_analysis_checked.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'odcode':odcode, 'checked':checked},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (checked == "") {
					if (type == "damage") {
						$(e).css("background-color", "#000000");
					} else {
						$(e).css("background-color", "#ff0000");
					}
					$(e).data("checked", "1");
				} else {
					$(e).css("background-color", "");
					$(e).data("checked", "");
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_vip_finish_checkbox(e, type) {
	var odcode = $(e).parent().data("odcode");
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");
	var checked = $(e).data("finish");

	var url = "./analysis_betting_vip_analysis_finish.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'odcode':odcode, 'checked':checked},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (checked == "") {
					$(".analysis_tr_" + odcode).css("background-color", "#ffff00");
					$(e).data("finish", "1");
				} else {
					$(".analysis_tr_" + odcode).css("background-color", "");
					$(e).data("finish", "");
				}
			} else {
				alert(response);
			}
		}
	});
}


function get_analysis_betting_vip_user(rcDate, meet, rcNo, viewType) {

	var url = "./analysis_betting_vip_user_list.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'viewType':viewType, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#vip_user_list").html(response);
		}
	});
}

function get_analysis_betting_vip_user_set(e, rcDate, meet, rcNo, viewType) {
	if (viewType == "All") {
		$(e).hide();
		$("#vip_user_list").html('');
		$("#favorite_set_Favorite").show();
	} else {
		$(e).hide();
		$("#vip_user_list").html('');
		$("#favorite_set_All").show();
	}

	var url = "./analysis_betting_vip_user_list.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'viewType':viewType, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#vip_user_list").html(response);
		}
	});
}

function fn_analysis_vip_gosoo_favorite(e, gosoo) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var favorite = $(e).data("favorite");
	var url = "./analysis_betting_vip_favorite.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'gosoo':gosoo, 'favorite':favorite},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (favorite == "1") {
					$(e).data("favorite", "0");
					$(e).text("♡");
					$(e).css("color", "");
				} else {
					$(e).data("favorite", "1");
					$(e).text("♥");
					$(e).css("color", "#ff0000");
					//$("#better_favorite_" + gosoo).attr("checked", true);
				}
				get_analysis_betting_vip_user(rcDate, meet, rcNo, 'Favorite');
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_vip_gosoo_favorite_set(e, gosoo) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var favorite = $(e).data("favorite");
	var url = "./analysis_betting_vip_favorite.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'gosoo':gosoo, 'favorite':favorite},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (favorite == "1") {
					$(e).data("favorite", "0");
					$(e).text("♡");
					$(e).css("color", "");
				} else {
					$(e).data("favorite", "1");
					$(e).text("♥");
					$(e).css("color", "#ff0000");
					//$("#better_favorite_" + gosoo).attr("checked", true);
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_vip_gosoo_favorite_check(e, gosoo) {
	var favorite = 0;
	if ($(e).is(":checked") == true) {
		favorite = 1;
	}
	var url = "./analysis_betting_vip_favorite.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'gosoo':gosoo, 'favorite':favorite},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (favorite == 0) {
					$(e).parent().parent().parent().empty();
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_vip_gosoo_favorite_check_set(e, gosoo) {
	var favorite = 0;
	if ($(e).is(":checked") == true) {
		favorite = 1;
	}
	var url = "./analysis_betting_vip_favorite.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'gosoo':gosoo, 'favorite':favorite},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				//
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_vip_gosoo_checkbox(e, gosoo) {

	var fshow = "";
	var fhide = "";
	if ($(e).is(":checked")) {
		fshow = "1";
		fhide = "0";
	} else {
		fshow = "0";
		fhide = "1";
	}

	var url = "./analysis_betting_vip_gosoo_check.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'gosoo':gosoo, 'fshow':fshow, 'fhide':fhide},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if ($(e).is(":checked")) {
					$(".better_" + gosoo).show();
				} else {
					$(".better_" + gosoo).hide();
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_vip_gosoo_check_all(e) {
	if ($(e).is(":checked") == true) {
		$('input:checkbox[name=chkfavorite]').each(function(index, item) {
			if ($(this).is(":checked") == false) {
				$(this).trigger("click");
			}
		});
	} else {
		$('input:checkbox[name=chkfavorite]').each(function(index, item) {
			if ($(this).is(":checked") == true) {
				$(this).trigger("click");
			}
		});
	}
}

function fn_analysis_better_chulNo_eraser(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var hrNo = $(e).data("hrno");
	var chulNo = $(e).data("chulno");
	var del = "";

	if ($(e).is(":checked")) {
		//alert("체크됨");
		//$(".chulNo_" + chulNo).css("background", "");
		//$(".racechulno_" + chulNo).css("background", "");
		del = "1";
	} else {
		//alert("체크풀림");
		//$(".chulNo_" + chulNo).css("background", "#000000");
		//$(".racechulno_" + chulNo).css("background", "#000000");
		del = "0";

		if (analysis_click_blink[hrNo]) {
			clearInterval(analysis_click_blink[hrNo]);
			fn_analysis_blink_click(hrNo, false);
			analysis_click_blink[hrNo] = null;
		}
	}
	
	var url = "../analysis/ajax.set_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hr_del':del},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (del == "1") {
					$(".hrNo_" + hrNo).show();
					$(".rcCnt_" + hrNo).show();
					$(".chulNo_" + chulNo).show();
					$(".racechulno_" + chulNo).show();

					$(".rcCnt_" + hrNo).parent().css("background", "");
					$(".hrNo_" + hrNo).parent().css("background", "");

					$('input:checkbox[name=chkfavorite]').each(function(index, item) {
						let uno = $(this).data("uno");
						//if ($(this).is(":checked") == true) {
							//$(".better" + uno + "_hrNo_" + hrNo).show();
							$(".better" + uno + "_hrNo_" + hrNo).css("background-color", "");
						//}
					});
				} else {
					$(".hrNo_" + hrNo).hide();
					$(".rcCnt_" + hrNo).hide();
					$(".chulNo_" + chulNo).hide();
					$(".racechulno_" + chulNo).hide();

					$(".rcCnt_" + hrNo).parent().css("background", "#000000");
					$(".hrNo_" + hrNo).parent().css("background", "#000000");

					$('input:checkbox[name=chkfavorite]').each(function(index, item) {
						let uno = $(this).data("uno");
						//if ($(this).is(":checked") == true) {
							//$(".better" + uno + "_hrNo_" + hrNo).hide();
							$(".better" + uno + "_hrNo_" + hrNo).css("background-color", "#000000");
						//}
					});
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_analysis_better_chulNo_color_change(e, chulNo) {
    var bgColor = $(e).data("bgcolor");
    var dfontColor = $(e).data("dfontcolor");
    var rcDate = $(e).parent().parent().data("rcdate");
    var meet = $(e).parent().parent().data("meet");
    var rcNo = $(e).parent().parent().data("rcno");
    var check_color = "";

	if (bgColor == "black") {
		$(".chulNo_" + chulNo).css("background-color", "#ff0000");
		$(".chulNo_" + chulNo).css("color", "#ffffff");
		$(".chulNo_" + chulNo).data("bgcolor", "red");
		check_color = "red";
	} else if (bgColor == "red") {
		$(".chulNo_" + chulNo).css("background-color", "#0000ff");
		$(".chulNo_" + chulNo).css("color", "#ffffff");
		$(".chulNo_" + chulNo).data("bgcolor", "blue");
		check_color = "blue";
	} else if (bgColor == "blue") {
		$(".chulNo_" + chulNo).css("background-color", "#007700");
		$(".chulNo_" + chulNo).css("color", "#ffffff");
		$(".chulNo_" + chulNo).data("bgcolor", "green");
		check_color = "green";
	} else if (bgColor == "green") {
		$(".chulNo_" + chulNo).css("background-color", "");
		$(".chulNo_" + chulNo).css("color", dfontColor);
		$(".chulNo_" + chulNo).data("bgcolor", "");
		check_color = "";
	} else {
		$(".chulNo_" + chulNo).css("background-color", "#000000");
		$(".chulNo_" + chulNo).css("color", "#ffffff");
		$(".chulNo_" + chulNo).data("bgcolor", "black");
		check_color = "black";
	}

	var url = "../analysis/ajax.set_chulNo_color_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'check_color':check_color},
		dataType: 'html',
		success: function(response) {
			console.log(response);
			if (response != "OK") alert(response);
		}
	});
}

function fn_analysis_better_initialization_all(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (confirm('정말로 초기화 하시겠습니까?')) {
		var url = "./analysis_betting_vip_initialization_all.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				console.log(response);
				if (response == "OK") {
					location.reload(true);
				} else {
					alert(response);
				}
			}
		});
	}
}

function fn_analysis_better_check_all() {
	$('input:checkbox[name=chkAnalysis]').each(function(index, item) {
		if($(this).is(":checked") == false) {
			$(this).trigger("click");
		}
    });
}

function fn_analysis_better_check_invert() {
	$('input:checkbox[name=chkAnalysis]').each(function(index, item) {
		$(this).trigger("click");
    });
}

function fn_analysis_better_vip_order_mabun_process(rcDate, meet, rcNo) { // 경마 코칭 VIP / 마번보기
	var odType = "chatCoaching_VIP";

	var url = "../shop/ajax.order_data_chatLive_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'odType':odType},
		dataType: 'html',
		success: function(response) {
			console.log(response);
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
				parent.location.href = '../member/login';
				self.close();
			} else if (response == "POINT") {
				alert("보유하신 포인트가 부족합니다.");
				parent.location.href = '../member/mypage';
				self.close();
			} else if (response == "EXIST") {
				alert('이미 구매하신 내역이 있습니다.');
				$('.modal_close').trigger('click');
				location.href = 'analysis_betting_vip?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
			} else if (response == "OK") {
				$('.modal_close').trigger('click');
				location.href = 'analysis_betting_vip?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
			} else {
				alert(response);
			}
		}
	});
}



function fn_rank_view_check_same(e) {
	var checked = "";
	if ($(e).is(":checked")) {
		checked = "1";
		$(".same_rank").show();
	} else {
		$(".same_rank").hide();
	}
}

function fn_rank_view_check_different(e) {
	var checked = "";
	if ($(e).is(":checked")) {
		checked = "1";
		$(".diff_rank").show();
	} else {
		$(".diff_rank").hide();
	}
}

function fn_ranking_view_check_3M(e, rcDate, meet, rcNo) {
	var checked = "";
	if ($(e).is(":checked")) {
		$(".rank_show_4M").show();
		$(".rank_show_5M").show();
		$(".rank_show_6M").show();
		$(".rank_show_7M").show();

		$(".ranking_show_4M").show();
		$(".ranking_show_5M").show();
		$(".ranking_show_6M").show();
		$(".ranking_show_7M").show();
	} else {
		$(".rank_show_4M").hide();
		$(".rank_show_5M").hide();
		$(".rank_show_6M").hide();
		$(".rank_show_7M").hide();

		$(".ranking_show_4M").hide();
		$(".ranking_show_5M").hide();
		$(".ranking_show_6M").hide();
		$(".ranking_show_7M").hide();
	}
}


function fn_show_oddsResult(e) {
	if ($(e).is(":checked")) {
		$(".rc_odds").show();
	} else {
		$(".rc_odds").hide();
	}
}

function fn_win_open_analysis_check(e, analysis_type, rcDate, meet, rcNo) {
	if ($(e).is(":checked")) {
		win_open_analysis_check(analysis_type, rcDate, meet, rcNo);
	} else {
		$("#popWindowContent").html("");
		popWindowClose();
	}
}


function streaming_send_munja(rcDate, analyst) {
	if (confirm("오늘 마번을 문자로 받으시겠습니까?")) {
		var url = "./ajax.set_analyst_streaming_munja_send_update.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'sendType':'self', 'rcDate':rcDate, 'analyst':analyst},
			dataType: 'html',
			success: function(response) {
				alert(response);
			}
		});
	}
}

function send_munja_aimabun_level4(rcDate, analyst) {
	if (confirm("정회원에게 문자를 전송시겠습니까?")) {
		//var newWin = window.open('./streaming_5duma_popup.php?analyst=' + analyst + '&rcDate=' + rcDate, 'streaming', 'width=400, height=640, scrollbars=0');

		var url = "./ajax.set_analyst_streaming_munja_send_update.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'sendType':'membership', 'rcDate':rcDate, 'analyst':analyst},
			dataType: 'html',
			success: function(response) {
				alert(response);
				//newWin.close();
			}
		});
	}
}

function get_result_order_mabun(e) {
	var analyst = $(e).parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	modalExtend('modal_layer', '/modal/order_result_5duma?analyst=' + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo);
	$(".modal_pop").css("width", "500px");
}

function get_result_order_analyst_mabun(e) {
	var analyst = $(e).parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var odType = "analystResult";
	var odTitle = meet + "" + rcNo + "경주 마번보기";

	if (confirm(odTitle + ' 결제를 하시겠습니까?')) {
		var url = "../shop/ajax.order_data_analyst_result_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'analyst':analyst, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'odType':odType},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					location.href = '../member/login';
				} else if (response == "POINT") {
					alert("보유하신 포인트가 부족합니다.");
					location.href = '../member/mypage';
				} else if (response == "EXIST") {
					alert('이미 구매하신 내역이 있습니다.');
					$(".modal_close").trigger("click");
					get_analyst_result(rcDate, meet, rcNo);
				} else if (response == "OK") {
					//location.href = '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
					$(".modal_close").trigger("click");
					get_analyst_result(rcDate, meet, rcNo);
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_chat_order_mabun(e) {
	var analyst = $(e).parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	modalExtend('modal_layer', '/modal/order_ai?analyst=' + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo);
}

function get_chat_order_ai_mabun(e) {
	var analyst = $(e).parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var odType = "chatSooda";
	var odTitle = meet + "" + rcNo + "경주 마번보기";

	if (confirm(odTitle + ' 결제를 하시겠습니까?')) {
		var url = "../shop/ajax.order_data_chatLive_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'analyst':analyst, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'odType':odType},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					location.href = '../member/login';
				} else if (response == "POINT") {
					//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
					alert("보유하신 포인트가 부족합니다.");
					location.href = '../member/mypage';
				} else if (response == "EXIST") {
					alert('이미 구매하신 내역이 있습니다.');
					location.href = '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
				} else if (response == "OK") {
					location.href = '?rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo;
					//$(".modal_close").trigger("click");
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_chat_gosoo_order_mabun_link(e) {
	var $opener = window.opener;
	var analyst = $(e).parent().parent().parent().parent().parent().parent().data("analyst");
	//$opener.document.location.href = "../page/streaming?analyst=" + analyst;
	//self.close();

	modalExtend('modal_layer', '/modal/order_streaming_direct?analyst=' + analyst);
}

function get_chat_gosoo_order_mabun(e) {
	var analyst = $(e).parent().parent().parent().parent().parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().parent().parent().data("rcno");
	modalExtend('modal_layer', '/modal/order_gosoo?analyst=' + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo);
}

function get_chat_gosoo_order_gosoo_mabun(e) {
	var analyst = $(e).parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var odType = "chatGosoo";
	var odTitle = meet + "" + rcNo + "경주 마번보기";

	if (confirm(odTitle + ' 결제를 하시겠습니까?')) {
		var url = "../shop/ajax.order_data_chatLive_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'analyst':analyst, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'odType':odType},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
					location.href = '../member/login';
				} else if (response == "POINT") {
					//alert('포인트가 부족합니다.\n\n충전 후 다시 시도해 주세요.');
					alert("보유하신 포인트가 부족합니다.");
					location.href = '../member/mypage';
				} else if (response == "EXIST") {
					alert('이미 구매하신 내역이 있습니다.');
					get_chat_gosoo_list();
					$(".modal_close").trigger("click");
				} else if (response == "OK") {
					get_chat_gosoo_list();
					$(".modal_close").trigger("click");
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_chat_gosoo_order_race_mabun(e) {
	var analyst = $(e).parent().parent().data("analyst");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	modalExtend('modal_layer', '/modal/order_gosoo_select?analyst=' + analyst + '&rcDate=' + rcDate + '&meet=' + meet + '&rcNo=' + rcNo);
}

function get_chat_ai5duma_list(rcDate, meet, rcNo) {
	var url = "./chat_ai5duma.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#chatLive_ai5duma").html(response);
			//$("iframe#ichatFrame").attr("src", "./chat_form.php?rcDate="+rcDate+"&meet="+meet+"&rcNo="+rcNo);
			
			$(".ai_view_button").mouseover(function() {
				$(this).css("background", "#ff0000");
			});
			$(".ai_view_button").mouseout(function() {
				$(this).css("background", "#5b5b5b");
			});
		}
	});
}

function get_chat_5duma_box(rcDate, meet, rcNo) {
	var url = "./chat_5duma.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#chatLive_5duma_box").html(response);
		}
	});
}

function get_chat_order_analysis(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var url = "./chat_analysis.inc.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#chat_analysis").html(response);
			$(".chat_analysis").css("background-color", "");
			$(".chat_analysis").css("color", "");
			$(".chat_analysis_" + rcDate + meet + rcNo).css("background-color", "#000000");
			$(".chat_analysis_" + rcDate + meet + rcNo).css("color", "#ffffff");
			get_race_analysis('data3_chatLive', rcDate, meet, rcNo, '', '');

			$("iframe#ichatFrame").attr("src", "./chat_form.php?rcDate="+rcDate+"&meet="+meet+"&rcNo="+rcNo);
			get_chat_5duma_box(rcDate, meet, rcNo);
		}
	});
}


function fn_gosoo_resultview(e, chulNo) {
	var resultview = $(e).data("resultview");

	if (resultview == "1") {
		$(e).data("resultview", "0");
		$('.chulnotitle' + chulNo).css('opacity', 0.2);
		$('.chulnotext' + chulNo).hide();
	} else {
		$(e).data("resultview", "1");
		$('.chulnotitle' + chulNo).css('opacity', 1);
		$('.chulnotext' + chulNo).show();
	}
}

function get_streaming_ai5duma_list(rcDate, meet, rcNo, analyst) {
	var url = "./streaming_ai5duma.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'analyst':analyst},
		dataType: 'html',
		success: function(response) {
			$("#streaming_ai5duma").html(response);
			
			$(".ai_view_button").mouseover(function() {
				$(this).css("background", "#ff0000");
			});
			$(".ai_view_button").mouseout(function() {
				$(this).css("background", "#5b5b5b");
			});
		}
	});
}


function popWindowOpen() {
	$("#popWindow").css("display", "block");
	$("#popWindow").draggable({
	  cursor: "move"
	});
}

function popWindowClose() {
	$("#popWindow").css("display", "none");
}

function win_open_dividend(rcDate, meet, rcNo) {
	var url = "./chat_dividend.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			popWindowOpen();
			$("#popWindowContent").html(response);
		}
	});
}

function win_open_dividend_new(rcDate, meet, rcNo) {
	var url = "./chat_dividend.ajax.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#oddsLayerWindowContent").html(response);
		}
	});
}

function win_open_analysis_check(analysis_type, rcDate, meet, rcNo) {
	var url = "./data3_analysis_round_analysis.inc.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'analysis_type':analysis_type, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			popWindowOpen();
			$("#popWindowContent").html(response);
			$("#closeBtn").hide();
			var tableWidth = $("#analysis_round_analysis").css("width");
			$("#popWindow").css("background-color", "#ffffff");
			$("#popWindow").css("width", tableWidth);
			
			onmouseevent_control();
		}
	});
}

function insert_analysis_divi_badangpan(e) {

    // 폼 데이터 가져오기
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");

    var formData = $('#regForm').serialize();
    
    // 추가할 데이터
    var additionalData = "&additionalData=1";

	var url = "./ajax.set_analysis_divi_baedangpan_update.php";
    $.ajax({
		url: url,
		type: 'POST',
        dataType: 'json',
		data: formData + additionalData,
		success: function(data) {
			if (data.resCode == "OK") {

				alert('정상적으로 저장되었습니다.');
			} else {
				alert(data.resCode);
			}
		},
		error: function(xhr, status, error) {
			console.error('요청 실패:', error);
		}
    });
}



function get_select_percent_bgcolor(e) {
	var select_val = parseInt($(e).val());

	if (select_val >= 90) {
		$(e).css("background-color", "#ff0000");
	} else if (select_val >= 80) {
		$(e).css("background-color", "#0000ff");
	} else if (select_val >= 60) {
		$(e).css("background-color", "#000000");
	} else  {
		$(e).css("background-color", "#000000");
	}
}

function get_select_race_type_bgcolor(e) {
	var select_val = $(e).val();

	if (select_val == "메인") {
		$(e).css("background-color", "#ff0000");
	} else if (select_val == "추천") {
		$(e).css("background-color", "#0000ff");
	} else {
		$(e).css("background-color", "#000000");
	}
}

function set_mypossible(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var hrNo = $(e).parent().parent().data("hrno");
	var possible = Number($(e).val());

	var url = "./ajax.set_mypossbile_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'myPossible':possible},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (possible < 0) {

					get_select_mypossible_textcolor($("#rc_mypossible" + hrNo));

					$("#mypossible2_" + hrNo).css("width", "0");
					$("#mypossible2_" + hrNo).text("");
					$("#mypossible2_" + hrNo).css("background-color", "#ffffff");

					$("#mypossible1_" + hrNo).css("width", possible * (-1) + "%");
					$("#mypossible1_" + hrNo).text(possible);
					get_select_mypossible_bgcolor($("#mypossible1_" + hrNo));

				} else if (possible > 0) {

					get_select_mypossible_textcolor($("#rc_mypossible" + hrNo));

					$("#mypossible1_" + hrNo).css("width", "0");
					$("#mypossible1_" + hrNo).text("");
					$("#mypossible1_" + hrNo).css("background-color", "#ffffff");

					$("#mypossible2_" + hrNo).css("width", possible + "%");
					$("#mypossible2_" + hrNo).text(possible);
					get_select_mypossible_bgcolor($("#mypossible2_" + hrNo));

				} else {

					$("#rc_mypossible" + hrNo).css("color", "#000000");

					$("#mypossible1_" + hrNo).css("width", "0");
					$("#mypossible1_" + hrNo).text("");
					$("#mypossible1_" + hrNo).css("background-color", "#ffffff");

					$("#mypossible2_" + hrNo).css("width", "0");
					$("#mypossible2_" + hrNo).text("");
					$("#mypossible2_" + hrNo).css("background-color", "#ffffff");
				}
			} else {
				alert(response);
			}
		}
	});
}

function set_mypossible_text(e, chulNo) {
	var rcDate = $(e).parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().data("rcno");
	var possible = Number($(e).val());

	var url = "./ajax.set_mypossbile_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'myPossible':possible},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (possible > 90) {
					$(e).css("color", "#ff0000");
				} else if (possible >= 80) {
					$(e).css("color", "#0000ff");
				} else if (possible >= 60) {
					$(e).css("color", "#006600");
				} else {
					$(e).css("color", "#000000");
				}
			} else {
				alert(response);
			}
		}
	});
}

function get_select_mypossible_textcolor(e) {
	var select_val = parseInt($(e).val());

	if (select_val >= 100) {
		$(e).css("color", "#ff0000");
	} else if (select_val >= 80) {
		$(e).css("color", "#0000ff");
	} else if (select_val >= 60) {
		$(e).css("color", "#008000");
	} else if (select_val >= 60) {
		$(e).css("color", "#ff9900");
	} else  {
		$(e).css("color", "#000000");
	}
}

function get_select_mypossible_bgcolor(e) {
	var select_val = parseInt($(e).text());

	if (select_val > 0) {
		$(e).css("background-color", "#ff0000");
	} else if (select_val >= 80) {
		$(e).css("background-color", "#0000ff");
	} else if (select_val >= 60) {
		$(e).css("background-color", "#008000");
	} else if (select_val >= 60) {
		$(e).css("background-color", "#ff9900");
	} else  {
		$(e).css("background-color", "#000000");
	}

	if (select_val == 0) {
		$(e).hide();
	} else {
		$(e).show();
	}
}

function set_mypossible_prize(e, target) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var hrNo = $(e).parent().parent().data("hrno");
	var possible = $(e).val();

	var url = "./ajax.set_mypossbile_prize_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'target':target, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'myPossible':possible},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "0000") {

				let prize_total = data.prizeTotal;
				let prize_percent = data.prizeTotal;

				if (prize_total < 0) {

					if (prize_percent < -100) prize_percent = -100;

					$("#prizePossible2_" + hrNo).css("width", "0");
					$("#prizePossible2_" + hrNo).text("");
					//$("#prizePossible2_" + hrNo).css("background-color", "#0000ff");

					$("#prizePossible1_" + hrNo).css("width", prize_percent * (-1) + "%");
					$("#prizePossible1_" + hrNo).text(prize_total);

				} else if (prize_total > 0) {

					if (prize_percent > 100) prize_percent = 100;

					$("#prizePossible1_" + hrNo).css("width", "0");
					$("#prizePossible1_" + hrNo).text("");
					//$("#prizePossible1_" + hrNo).css("background-color", "#000000");

					$("#prizePossible2_" + hrNo).css("width", prize_percent + "%");
					$("#prizePossible2_" + hrNo).text(prize_total);

				} else {

					$("#prizePossible1_" + hrNo).css("width", "0");
					$("#prizePossible1_" + hrNo).text("");
					$("#prizePossible1_" + hrNo).css("background-color", "#000000");

					$("#prizePossible2_" + hrNo).css("width", "0");
					$("#prizePossible2_" + hrNo).text("");
					$("#prizePossible2_" + hrNo).css("background-color", "#0000ff");

					$(".ai_prize_hrNo_" + hrNo).val("");
					$(".ai_prize_hrNo_" + hrNo).css("color", "#000000");
				}

				if (prize_total != 0) {
					$(".ai_prize_hrNo_" + hrNo).val(prize_total);

					if (prize_total >= 100) {
						$(".ai_prize_hrNo_" + hrNo).css("color", "#ff0000");
					} else if (prize_total >= 90) {
						//$(".ai_prize_hrNo_" + hrNo).css("color", "#0000ff");
						$(".ai_prize_hrNo_" + hrNo).css("color", "#ff0000");
					} else if (prize_total >= 60) {
						//$(".ai_prize_hrNo_" + hrNo).css("color", "#008000");
						$(".ai_prize_hrNo_" + hrNo).css("color", "#ff0000");
					} else if (prize_total > 0) {
						//$(".ai_prize_hrNo_" + hrNo).css("color", "#ff6600");
						$(".ai_prize_hrNo_" + hrNo).css("color", "#ff0000");
					} else {
						$(".ai_prize_hrNo_" + hrNo).css("color", "#000000");
					}

				}

				let possible_percent = parseInt(possible);
				if (possible_percent < 0) {

					if (possible_percent < -100) possible_percent = -100;

					$("#" + target + "2_" + hrNo).css("width", "0");
					$("#" + target + "2_" + hrNo).text("");

					$("#" + target + "1_" + hrNo).css("width", possible_percent * (-1) + "%");
					$("#" + target + "1_" + hrNo).text(possible_percent);

					$(e).css("color", "#000000");

				} else if (possible_percent > 0) {

					if (possible_percent > 100) possible_percent = 100;

					$("#" + target + "1_" + hrNo).css("width", "0");
					$("#" + target + "1_" + hrNo).text("");

					$("#" + target + "2_" + hrNo).css("width", possible_percent + "%");
					$("#" + target + "2_" + hrNo).text(possible_percent);

					$(e).css("color", "#ff0000");

				} else {

					$("#" + target + "1_" + hrNo).css("width", "0");
					$("#" + target + "1_" + hrNo).text("");
					$("#" + target + "1_" + hrNo).css("background-color", "#000000");

					$("#" + target + "2_" + hrNo).css("width", "0");
					$("#" + target + "2_" + hrNo).text("");
					$("#" + target + "2_" + hrNo).css("background-color", "#0000ff");

					$(e).css("color", "#ff0000");
				}
				console.log(possible_percent);

			} else {
				alert("ERROR");
			}
		}
	});
}




function set_analysis_chulNo(rcDate, meet, rcNo) {
	var aNo1 = $("#analysis_ano1").val();
	var aNo2 = $("#analysis_ano2").val();
	var aNo3 = $("#analysis_ano3").val();
	var aNo4 = $("#analysis_ano4").val();
	var aNo5 = $("#analysis_ano5").val();
	var bNo1 = $("#analysis_bno1").val();
	var bNo2 = $("#analysis_bno2").val();
	var bNo3 = $("#analysis_bno3").val();
	var bNo4 = $("#analysis_bno4").val();
	var bNo5 = $("#analysis_bno5").val();
	var cNo1 = $("#analysis_cno1").val();
	var cNo2 = $("#analysis_cno2").val();
	var cNo3 = $("#analysis_cno3").val();

	var url = "./ajax.set_analysis_chulNo_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'aNo1':aNo1, 'aNo2':aNo2, 'aNo3':aNo3, 'aNo4':aNo4, 'aNo5':aNo5, 'bNo1':bNo1, 'bNo2':bNo2, 'bNo3':bNo3, 'bNo4':bNo4, 'bNo5':bNo5, 'cNo1':cNo1, 'cNo2':cNo2, 'cNo3':cNo3},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("저장되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function hide_trLine_black(e) {
	if ($(e).is(":checked")) {
		//alert("체크됨");
		$(e).parent().parent().css("background", "#000000");
	} else {
		//alert("체크풀림");
		$(e).parent().parent().css("background", "");
	}
}

function hide_tdLine_black(e) {
	var chulNo = $(e).data("chulno");
	if ($(e).is(":checked")) {
		//alert("체크됨");
		$(".racechulno_" + chulNo).css("background", "#000000");
	} else {
		//alert("체크풀림");
		$(".racechulno_" + chulNo).css("background", "");
	}
}

function change_ranking_sum_bgcolor(e) {
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var bgcolor = $(e).data("bgcolor");

	var url = "./ajax.set_ranking_sum_bgcolor_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		async: true,
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'bgcolor':bgcolor},
		success: function(data) {
			if (data.resCode == "0000") {
				$(e).data("bgcolor", data.bgcolor);
				$(e).css("background-color", data.bgcolor);
				$(e).css("color", data.color);
			} else {
				alert("ERROR");
			}
		}
	});
}

function change_item_redblack_bgcolor(e, item) {
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");
	var chulNo = $(e).parent().data("chulno");
	var bgcolor = $(e).data("bgcolor");

	var url = "../analysis/ajax.set_chage_item_redblack_bgcolor_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		async: true,
		data: {'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'item':item, 'bgcolor':bgcolor},
		success: function(data) {
			if (data.resCode == "0000") {
				$(e).data("bgcolor", data.bgcolor);
				$(e).css("background-color", data.bgcolor);
				$(e).css("color", data.color);
			} else {
				alert("ERROR");
			}
		}
	});
}

function skilltest_check(f) {
	var url = "./ajax.set_skilltest_result_update.php";
	var formdata = $("#testform").serialize();
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		async: true,
		data: formdata,
		success: function(data) {
			if (data.resCode == "0000") {
				$('input[name^=qa]').attr("disabled", true);
				$("#testbutton").hide();
				$("#skillresult").text(data.skillresult + "점");
				$("#testresult").show();
				$("#testlevel").show();
				return false;
			} else {
				alert("ERROR");
				return false;
			}
		}
	});

	return false;
}

function get_skilltest_result(mb_id) {
	var url = "./ajax.get_skilltest_result.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'mb_id':mb_id},
		dataType: 'html',
		success: function(response) {
			$("#skilltest_result").html(response);
		}
	});
}

function membership_munja(e) {
	$('#munja_list').toggle();
}

function membership_munja_select(option, price) {
	$('#munja_option').text(option);
	$('#munja_price').text(price);
	//$('#munja_list').toggle();
}

function membership_munja_confirm() {
	let option = $("#munja_option").text();
	let price = $("#munja_price").text();
	let data_type = "문자서비스" + option;

	if (confirm(data_type + " 멤버쉽에 가입하시겠습니까?")) {
		var url = g5_url + "/shop/ajax.order_data_analysis_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':'', 'data_type':data_type},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
				} else if (response == "POINT") {
					alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
				} else if (response == "EXIST") {
					alert('이미 가입하셨습니다.');
					location.href = '../page/data3';
				} else if (response == "OK") {
					alert(data_type + " 멤버쉽에 정상적으로 가입되었습니다.");
					//location.reload();
					location.href = '../page/data3';
				} else {
					alert(response);
				}
			}
		});
	}
}

function membership_level4(e) {
	//$('#level4_list').show();
	$('#level4_list').toggle();
}

function membership_level4_select(option, price) {
	$('#level4_option').text(option);
	$('#level4_price').text(price);
	//$('#level4_list').toggle();
}

function membership_level4_confirm() {
	let option = $("#level4_option").text();
	let price = $("#level4_price").text();
	let data_type = "정회원" + option;

	if (data_type == "정회원1일") {
		alert("체험하기 1일 신청은, 010-7665-3667 연락주시면 됩니다.\n\n체험하기 신청은, 월~목요일까지 가능합니다.");
		return false;
	}

	if (confirm(data_type + " 멤버쉽에 가입하시겠습니까?")) {
		var url = g5_url + "/shop/ajax.order_data_analysis_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':'', 'data_type':data_type},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
				} else if (response == "POINT") {
					alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
				} else if (response == "EXIST") {
					alert('이미 가입하셨습니다.');
					location.href = '../page/data3';
				} else if (response == "OK") {
					alert(data_type + " 멤버쉽에 정상적으로 가입되었습니다.");
					//location.reload();
					location.href = '../page/data3';
				} else {
					alert(response);
				}
			}
		});
	}
}

function membership_level5(e) {
	$('#level5_list').toggle();
}

function membership_level5_select(option, price) {
	$('#level5_option').text(option);
	$('#level5_price').text(price);
	//$('#level5_list').toggle();
}

function membership_level5_confirm() {
	let option = $("#level5_option").text();
	let price = $("#level5_price").text();
	let data_type = "분석가" + option;

	if (confirm(option + " 분석가 정액권을 구매하시겠습니까?")) {
		var url = g5_url + "/shop/ajax.order_data_analysis_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':'', 'data_type':data_type},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
				} else if (response == "POINT") {
					alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
				} else if (response == "EXIST") {
					alert('이미 가입하셨습니다.');
					location.href = '../page/data3';
				} else if (response == "OK") {
					alert("분석가 기간이 " + option + " 연장되었습니다.");
					//location.reload();
					location.href = '../page/data3';
				} else {
					alert(response);
				}
			}
		});
	}
}

function membership_level6(e) {
	$('#level6_list').toggle();
}

function membership_level6_select(option, price) {
	$('#level6_option').text(option);
	$('#level6_price').text(price);
	//$('#level6_list').toggle();
}

function membership_level6_confirm() {
	let option = $("#level6_option").text();
	let price = $("#level6_price").text();
	let data_type = "VIP" + option;

	if (confirm(option + " VIP 회원권을 구매하시겠습니까?")) {
		var url = g5_url + "/shop/ajax.order_data_analysis_use_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':'', 'data_type':data_type},
			dataType: 'html',
			success: function(response) {
				if (response == "LOGIN") {
					alert("로그인 후 다시 시도해 주세요.");
				} else if (response == "POINT") {
					alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
				} else if (response == "EXIST") {
					alert('이미 가입하셨습니다.');
					location.href = '../page/data3';
				} else if (response == "OK") {
					alert("분석가 기간이 " + option + " 연장되었습니다.");
					//location.reload();
					location.href = '../page/data3';
				} else {
					alert(response);
				}
			}
		});
	}
}

function data3_all_hrNo_color_change(e, chulNo) {
	var rcDate = $(e).parent().data("rcdate");
	var meet = $(e).parent().data("meet");
	var rcNo = $(e).parent().data("rcno");
    var hrNo = $(e).data("hrno");
    var bgColor = $(e).data("bg_color");
    var check_color = "";

    if ($("#chks_" + hrNo).is(":checked")) {

        if (bgColor == "black") {
            $(".hrNo" + hrNo).css("background-color", "#ff0000");
            $(".hrNo" + hrNo).data("bg_color", "red");
            check_color = "red";
        } else if (bgColor == "red") {
            $(".hrNo" + hrNo).css("background-color", "#095df7");
            $(".hrNo" + hrNo).data("bg_color", "blue");
            check_color = "blue";
        } else if (bgColor == "blue") {
            $(".hrNo" + hrNo).css("background-color", "#000000");
            $(".hrNo" + hrNo).data("bg_color", "black");
            check_color = "black";
        }
		/**
		else if (bgColor == "green") {
            $(".hrNo" + hrNo).css("background-color", "#acacac");
            $(".hrNo" + hrNo).data("bg_color", "gray");
            check_color = "gray";
        } else if (bgColor == "gray") {
            $(".hrNo" + hrNo).css("background-color", "#ececec");
            $(".hrNo" + hrNo).data("bg_color", "white");
            check_color = "white";
        } else if (bgColor == "white") {
            $(".hrNo" + hrNo).css("background-color", "#000000");
            $(".hrNo" + hrNo).data("bg_color", "black");
            check_color = "black";
        }
		**/

        var url = "../analysis/ajax.set_chulNo_color_update.php";
        $.ajax({
            url: url,
            type: 'POST',
            data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrNo':hrNo, 'check_color':check_color},
            dataType: 'html',
            success: function(response) {
                if (response != "OK") alert(response);
            }
        });
    }
}

function data3_analyst_myScore_update(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
    var chulNo = $(e).data("chulno");
    var myScore = $(e).val();

	var url = "../analysis/ajax.set_chulNo_myScore_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'myScore':myScore},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				myScore = parseInt(myScore);
				if (myScore >= 100) {
					$(e).css("color", "#ff0000");
				} else if (myScore >= 90) {
					$(e).css("color", "#0000ff");
				} else if (myScore >= 60) {
					$(e).css("color", "#008000");
				} else if (myScore > 0) {
					$(e).css("color", "#ff6600");
				} else {
					$(e).css("color", "#000000");
				}
			} else {
				alert(response);
			}
		}
	});
}

function data3_analyst_myScore_update2(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
    var chulNo = $(e).data("chulno");
    var myScore = $(e).val();

	var url = "../analysis/ajax.set_chulNo_myScore_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'myScore':myScore, 'possible_no':'2'},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				myScore = parseInt(myScore);
				if (myScore >= 100) {
					$(e).css("color", "#ff0000");
				} else if (myScore >= 90) {
					$(e).css("color", "#0000ff");
				} else if (myScore >= 60) {
					$(e).css("color", "#008000");
				} else if (myScore > 0) {
					$(e).css("color", "#ff6600");
				} else {
					$(e).css("color", "#000000");
				}
			} else {
				alert(response);
			}
		}
	});
}

function fn_round_analysis_item(e, match_item) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (match_item == "item6") {
		$("#sdata_jkName").prop("checked", true);
	} else {
		$("#sdata_jkName").prop("checked", false);
	}

	var loading_height = $("#analysis_round_popular_match").height();

	$("#analysis_round_popular_match").load("../analysis/ajax.get_race_analysis_loading.php?h=" + loading_height);
	var url = "./data3_analysis_round_popular_match.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'match_item':match_item, 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			$("#analysis_round_popular_match").html(response);
			sleep(500);
			get_race_analysis('data3_2', rcDate, meet, rcNo, '', '');
		}
	});
}

function fn_round_analysis_item_data9(match_item, analysis, rcDate, meet, rcNo) {

	data9_match_item = match_item;

	var url = "./data3_analysis_round_popular_match.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'match_item':match_item, 'data_type':'data9', 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			sleep(100);
			get_race_analysis_data9(analysis, 'data9', rcDate, meet, rcNo, '', '');
		}
	});
}

function fn_round_analysis_check(e, chulNo, jin, item) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var checkcolor = $(e).data("checkcolor");

	var url = "./ajax.set_analysis_round_analysis_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'type':'checkcolor', 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'jin':jin, 'item':item, 'checkcolor':checkcolor},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "OK") {
				$(e).data("checkcolor", data.checkcolor);
				$(e).css("background-color", data.checkcolor);
			} else {
				alert("ERROR");
			}
		}
	});
}
function fn_round_analysis_delete(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");

	if ($(e).is(":checked")) {
		var del_check = 1;
	} else {
		var del_check = 0;
	}

	var url = "./ajax.set_analysis_round_analysis_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'type':'del_check', 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'del_check':del_check},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "OK") {
				if (del_check == 1) {
					$(".racechulno_" + chulNo).css("background-color", "#000000");
				} else {
					$(".racechulno_" + chulNo).css("background", "");
					$(".racechulno_" + chulNo).each(function(index, item) {
						let checkcolor = $(this).data("checkcolor");
						$(this).css("background-color", checkcolor);
					});
				}
			} else {
				if (del_check == 1) {
					$(e).attr("checked", false);
				} else {
					$(e).attr("checked", true);
				}
				alert("ERROR");
			}
		}
	});
}


function fn_round_analysis_eraser_check(e) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var hrNo = $(e).parent().parent().data("hrno");
	var del_check = $(e).data("del_check");

	var url = "./ajax.set_analysis_round_analysis_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'type':'eraser_check', 'rcDate':rcDate,'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'del_check':del_check},
		dataType: 'json',
		success: function(data) {
			if (data.resCode == "OK") {
				$(".eraser_check_" + hrNo).css("background-color", data.checkcolor);
				$(".eraser_check_" + hrNo).data("del_check", data.eraser_check);
			} else {
				alert("ERROR");
			}
		}
	});
}

function fn_view_race_round_popular(e) {
	if ($(e).is(":checked")) {
		$("#race_round_popular").show();
	} else {
		$("#race_round_popular").hide();
	}
}

function fn_view_race_round_popular_year(e) {
	if ($(e).is(":checked")) {
		$("#race_round_popular_year").show();
	} else {
		$("#race_round_popular_year").hide();
	}
}

function get_lecture_order(e) {
	var mb_id = $(e).data("mb_id");
	var viewkey = $(e).data("viewkey");
	var odkey = $(e).data("odkey");

	if (viewkey == "9" || viewkey == "10") {
		alert("새로운 강의를 준비 중입니다.\n\n더 좋은 강의로 찾아뵙겠습니다.");
		return false;
	}

	if (odkey == "") {
		if (mb_id == "") {
			modalExtend('modal_layer', '/modal/login2');
		} else {
			modalExtend('modal_layer', '/modal/order_lecture?viewkey=' + viewkey);
		}
		$(".modal_pop").css("width", "500px");
	} else {
		window.open('./lecture_view?viewkey=' + viewkey + '&odkey=' + odkey, '', 'width=1200, height=800, scrollbas=auto');
	}
}

function get_lecture_order_update(viewkey) {
	var url = "../shop/ajax.order_lecture_use_point.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'viewkey':viewkey},
		dataType: 'html',
		success: function(response) {
			if (response == "LOGIN") {
				alert("로그인 후 다시 시도해 주세요.");
			} else if (response == "POINT") {
				alert('포인트가 부족합니다.\n\n입금 후 다시 시도해 주세요.');
			} else if (response == "EXIST") {
				alert('이미 구매하셨습니다.');
				location.href = '../page/lecture';
			} else if (response == "OK") {
				alert('구매가 완료되었습니다.\n\n동영상 특강을 시청하실 수 있습니다.');
				//location.reload();
				location.href = '../page/lecture';
			} else {
				alert(response);
			}
		}
	});
}

function get_lecture_ordered_list(viewkey) {
	window.open('./lecture_order_list?viewkey=' + viewkey, '', 'width=1200, height=800, scrollbas=auto');
}

function today_baedang_update(rcDate, viewkey) {
	var race = $("#today_baedang_race" + viewkey).val();
	var ssang = $("#today_baedang_ssang" + viewkey).val();
	var boks = $("#today_baedang_boks" + viewkey).val();
	var baedang = $("#today_baedang_value" + viewkey).val();

	if (race == "") {
		alert("경주를 입력해 주세요.");
		$("#today_baedang_race" + viewkey).focus();
		return false;
	}

	//if (baedang == "") {
	//	alert("배당을 입력해 주세요.");
	//	$("#today_baedang_value" + viewkey).focus();
	//	return false;
	//}

	var url = "./chat_m_today_baedang_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'viewkey':viewkey, 'race':race, 'ssang':ssang, 'boks':boks, 'baedang':baedang},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (viewkey == "") {
					$("#today_baedang_race").val('');
					$("#today_baedang_value").val('');
				}
				$("#today_baedang").load("./chat_m_today_baedang_list.php?rcDate=" + rcDate);
			} else {
				alert(response);
			}
		}
	});
}


function modal_alert_membership_family(mb_level) {
	if (Number(mb_level) < 2) {
		modalExtend('modal_layer', '/modal/login2');
		$(".modal_pop").css("width", "400px");
	} else if (Number(mb_level) < 3) {
		modalExtend('modal_layer', '/modal/alert_membership_family');
		$(".modal_pop").css("width", "700px");
	}
}



















































function chulNo_color_change(e, chulNo) {
    var in_no = $(e).data("in_no");
    var hrNo = $(e).data("hrno");
    var bgColor = $(e).data("bg_color");
    var hrClass = $(e).parent().data("hrclass");
    var jinClass = $("#rc_group" + hrNo).val();
    var check_color = "";

    if ($("#chks_" + hrNo).is(":checked")) {
        if (bgColor == "black") {
            $(".chulNo" + chulNo).css("background-color", "#095df7");
            $(".order_chulNo" + chulNo).css("background-color", "#095df7");
            $(".chulNo" + chulNo).data("bg_color", "blue");
            check_color = "blue";
            chulNo_sang_set(chulNo, hrClass); ///////////////////////////////
        } else if (bgColor == "blue") {
            $(".chulNo" + chulNo).css("background-color", "#ff0000");
            $(".order_chulNo" + chulNo).css("background-color", "#ff0000");
            $(".chulNo" + chulNo).data("bg_color", "red");
            check_color = "red";
            chulNo_ha_set(chulNo, hrClass); /////////////////////////////////
        } else if (bgColor == "red") {
            $(".chulNo" + chulNo).css("background-color", "#000000");
            $(".order_chulNo" + chulNo).css("background-color", "#000000");
            $(".chulNo" + chulNo).data("bg_color", "black");
            check_color = "black";
            chulNo_jung_set(chulNo, hrClass); /////////////////////////////////
        }
		/**
		else if (bgColor == "green") {
            $(".chulNo" + chulNo).css("background-color", "#acacac");
            $(".order_chulNo" + chulNo).css("background-color", "#acacac");
            $(".chulNo" + chulNo).data("bg_color", "gray");
            check_color = "gray";
            chulNo_haha_set(chulNo, hrClass); ///////////////////////////////
        } else if (bgColor == "gray") {
            $(".chulNo" + chulNo).css("background-color", "#ececec");
            $(".order_chulNo" + chulNo).css("background-color", "#ececec");
            $(".chulNo" + chulNo).data("bg_color", "white");
            check_color = "white";
            chulNo_del_set(chulNo, hrClass); ////////////////////////////////
            chulNo_jinClass_default_set(chulNo, jinClass);
        } else if (bgColor == "white") {
            $(".chulNo" + chulNo).css("background-color", "#000000");
            $(".order_chulNo" + chulNo).css("background-color", "#000000");
            $(".chulNo" + chulNo).data("bg_color", "black");
            check_color = "black";
            chulNo_sang_set(chulNo, hrClass); ////////////////////////////////
        }
		**/

        var url = "../analysis/ajax.set_chulNo_color_update.php";
        $.ajax({
            url: url,
            type: 'POST',
            data: {'in_no':in_no, 'check_color':check_color},
            dataType: 'html',
            success: function(response) {
                if (response != "OK") alert(response);
            }
        });
    }
}
function chulNo_sang_set(chulNo, hrClass) {
    chulNo_hrClass_direct_set(chulNo, '1', hrClass);
}
function chulNo_jung_set(chulNo, hrClass) {
    chulNo_hrClass_direct_set(chulNo, '2', hrClass);
}
function chulNo_ha_set(chulNo, hrClass) {
    chulNo_hrClass_direct_set(chulNo, '3', hrClass);
}
function chulNo_haha_set(chulNo, hrClass) {
    chulNo_hrClass_direct_set(chulNo, '4', hrClass);
}
function chulNo_del_set(chulNo, hrClass) {
    $(".sang_chulNo" + chulNo).data("check_color", "");
    $(".jung_chulNo" + chulNo).data("check_color", "");
    $(".ha_chulNo" + chulNo).data("check_color", "");

    $(".sang_chulNo" + chulNo).css("cursor", "");
    $(".jung_chulNo" + chulNo).css("cursor", "");
    $(".ha_chulNo" + chulNo).css("cursor", "");

    $(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
    $(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
    $(".ha_chulNo" + chulNo).css("background-color", "#ffffff");
    $(".del_chulNo" + chulNo).css("background-color", "#ececec");
}
function chulNo_default_set(chulNo, hrClass) {
    $(".sang_chulNo" + chulNo).data("check_color", "");
    $(".jung_chulNo" + chulNo).data("check_color", "");
    $(".ha_chulNo" + chulNo).data("check_color", "");

    $(".sang_chulNo" + chulNo).css("cursor", "");
    $(".jung_chulNo" + chulNo).css("cursor", "");
    $(".ha_chulNo" + chulNo).css("cursor", "");

    $(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
    $(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
    $(".ha_chulNo" + chulNo).css("background-color", "#ffffff");
    $(".del_chulNo" + chulNo).css("background-color", "#ffffff");
}

function chulNo_hrClass_direct_set(chulNo, jinClass, hrClass) {
    //alert(hrClass + ":" + jinClass);
    $(".del_chulNo" + chulNo).css("background-color", "#ffffff");
    if (hrClass == "1") {
        $(".sang_chulNo" + chulNo).css("cursor", "pointer");
        if (jinClass == "1") {
            $(".sang_chulNo" + chulNo).data("check_color", "red");
            $(".sang_chulNo" + chulNo).css("background-color", "#ff0000");
        } else if (jinClass == "2") {
            $(".sang_chulNo" + chulNo).data("check_color", "blue");
            $(".sang_chulNo" + chulNo).css("background-color", "#095df7");
        } else if (jinClass == "3") {
            $(".sang_chulNo" + chulNo).data("check_color", "green");
            $(".sang_chulNo" + chulNo).css("background-color", "#009900");
        } else if (jinClass == "4") {
            $(".sang_chulNo" + chulNo).data("check_color", "gray");
            $(".sang_chulNo" + chulNo).css("background-color", "#acacac");
            $(".sang_chulNo" + chulNo).css("cursor", "");
        } else {
            $(".sang_chulNo" + chulNo).data("check_color", "");
            $(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
            $(".sang_chulNo" + chulNo).css("cursor", "");
            chulNo_jinClass_default_set(chulNo, jinClass);
        }
    } else if (hrClass == "2") {
        $(".jung_chulNo" + chulNo).css("cursor", "pointer");
        if (jinClass == "1") {
            $(".jung_chulNo" + chulNo).data("check_color", "red");
            $(".jung_chulNo" + chulNo).css("background-color", "#ff0000");
        } else if (jinClass == "2") {
            $(".jung_chulNo" + chulNo).data("check_color", "blue");
            $(".jung_chulNo" + chulNo).css("background-color", "#095df7");
        } else if (jinClass == "3") {
            $(".jung_chulNo" + chulNo).data("check_color", "green");
            $(".jung_chulNo" + chulNo).css("background-color", "#009900");
        } else if (jinClass == "4") {
            $(".jung_chulNo" + chulNo).data("check_color", "gray");
            $(".jung_chulNo" + chulNo).css("background-color", "#acacac");
            $(".jung_chulNo" + chulNo).css("cursor", "");
        } else {
            $(".jung_chulNo" + chulNo).data("check_color", "");
            $(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
            $(".jung_chulNo" + chulNo).css("cursor", "");
            chulNo_jinClass_default_set(chulNo, jinClass);
        }
    } else if (hrClass == "3") {
        $(".ha_chulNo" + chulNo).css("cursor", "pointer");
        if (jinClass == "1") {
            $(".ha_chulNo" + chulNo).data("check_color", "red");
            $(".ha_chulNo" + chulNo).css("background-color", "#ff0000");
        } else if (jinClass == "2") {
            $(".ha_chulNo" + chulNo).data("check_color", "blue");
            $(".ha_chulNo" + chulNo).css("background-color", "#095df7");
        } else if (jinClass == "3") {
            $(".ha_chulNo" + chulNo).data("check_color", "green");
            $(".ha_chulNo" + chulNo).css("background-color", "#009900");
        } else if (jinClass == "4") {
            $(".ha_chulNo" + chulNo).data("check_color", "gray");
            $(".ha_chulNo" + chulNo).css("background-color", "#acacac");
            $(".ha_chulNo" + chulNo).css("cursor", "");
        } else {
            $(".ha_chulNo" + chulNo).data("check_color", "");
            $(".ha_chulNo" + chulNo).css("background-color", "#ffffff");
            $(".ha_chulNo" + chulNo).css("cursor", "");
            chulNo_jinClass_default_set(chulNo, jinClass);
        }
    }
}

function chulNo_hrClass_default_set(chulNo, jinClass, hrClass) {
    //alert(jinClass + ":" + hrClass);
    if (jinClass == "1") {
        if (hrClass == "2") {
            $(".jung_chulNo" + chulNo).css("background-color", "#8cceff");
        } else if (hrClass == "3") {
            $(".ha_chulNo" + chulNo).css("background-color", "#89eb9a");
        } else {
            //$(".sang_chulNo" + chulNo).css("background-color", "#ffcccc");
        }
    } else if (jinClass == "2") {
        if (hrClass == "1") {
            $(".sang_chulNo" + chulNo).css("background-color", "#ffcccc");
        } else if (hrClass == "3") {
            $(".ha_chulNo" + chulNo).css("background-color", "#89eb9a");
        } else {
            //$(".jung_chulNo" + chulNo).css("background-color", "#8cceff");
        }
    } else if (jinClass == "3") {
        if (hrClass == "1") {
            $(".sang_chulNo" + chulNo).css("background-color", "#ffcccc");
        } else if (hrClass == "2") {
            $(".jung_chulNo" + chulNo).css("background-color", "#8cceff");
        } else {
            //$(".ha_chulNo" + chulNo).css("background-color", "#89eb9a");
        }
    }
}

function chulNo_jinClass_default_set(chulNo, jinClass) {
    //alert(jinClass);
    if (jinClass == "1") {
        $(".sang_chulNo" + chulNo).css("background-color", "#ffcccc");
    } else if (jinClass == "2") {
        $(".jung_chulNo" + chulNo).css("background-color", "#8cceff");
    } else if (jinClass == "3") {
        $(".ha_chulNo" + chulNo).css("background-color", "#89eb9a");
    } else if (jinClass == "4") {
        $(".ha_chulNo" + chulNo).css("background-color", "#acacac");
    }
}