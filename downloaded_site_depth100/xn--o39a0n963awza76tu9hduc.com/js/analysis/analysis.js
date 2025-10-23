function playVod(meet, rc_date, rc_no, type) {
	meet = '3';
	rc_date = '20220605';
	rc_no = '2';
	type = '1';
	$.ajax({
		type : "POST",
		url : "https://race.kra.co.kr/comm/VodPlayer.do",
		data : {
			"meet" : meet,
			"rc_date" : rc_date,
			"rc_no" : rc_no,
			"type" : type
		},
		async : false,
		success : function(data){
			if(data != ""){
				window.open(data, "_blank", "width=1000, height=650, location=no");
			}else{
				alert("동영상 재생에 실패하였습니다.");
			}
		}
	});
}

function check_all(f)
{
    var chk = document.getElementsByName("chk[]");

    for (i=0; i<chk.length; i++)
        chk[i].checked = f.chkall.checked;
}

function btn_check(f, act)
{
    if (act == "update") // 선택수정
    {
        f.action = list_update_php;
        str = "수정";
    }
    else if (act == "delete") // 선택삭제
    {
        f.action = list_delete_php;
        str = "삭제";
    }
    else
        return;

    var chk = document.getElementsByName("chk[]");
    var bchk = false;

    for (i=0; i<chk.length; i++)
    {
        if (chk[i].checked)
            bchk = true;
    }

    if (!bchk)
    {
        alert(str + "할 자료를 하나 이상 선택하세요.");
        return;
    }

    if (act == "delete")
    {
        if (!confirm("선택한 자료를 정말 삭제 하시겠습니까?"))
            return;
    }

    f.submit();
}

function is_checked(elements_name)
{
    var checked = false;
    var chk = document.getElementsByName(elements_name);
    for (var i=0; i<chk.length; i++) {
        if (chk[i].checked) {
            checked = true;
        }
    }
    return checked;
}

function delete_confirm(el)
{
    if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        var token = get_ajax_token();
        var href = el.href.replace(/&token=.+$/g, "");
        if(!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }
        el.href = href+"&token="+token;
        return true;
    } else {
        return false;
    }
}

function delete_confirm2(msg)
{
    if(confirm(msg))
        return true;
    else
        return false;
}

function get_ajax_token()
{
    var token = "";

    $.ajax({
        type: "POST",
        url: g5_admin_url+"/ajax.token.php",
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



function get_race_analysis(dtype, rcDate, meet, rcNo, sst, sod) {
	var sdata_viewtype = $("#sdata_viewtype").data("viewtype");
	var sdata_airesult = "";
	var sdata_myPercent = "";
	var sdata_fieldOdds = "";
	var sdata_popular = "";
	var sdata_hrAge = "";
	var sdata_5TY = "";
	var sdata_s1f = "";
	var sdata_prize = "";
	var sdata_eraser = "";
	var sdata_eraser2 = "";
	var sdata_ability = "";
	var sdata_expert = "";
	var sdata_rmemo = "";
	var sdata_ranking = "";
	var sdata_rank = "";
	var sdata_rating = "";
	var sdata_winOdds = "";
	var sdata_plcOdds = "";
	var sdata_distance = "";
	var sdata_rcdate = "";
	var sdata_prize = "";
	var sdata_site1 = "";
	var sdata_site2 = "";
	var sdata_hrSex = "";
	var sdata_jkName = "";
	var sdata_trName = "";
	var sdata_wgBudam = "";
	var sdata_resultview = "";

	var sdata_prize_bigdata = "";
	var sdata_prize_sangma = "";
	var sdata_prize_odds = "";
	var sdata_prize_7R = "";
	var sdata_prize_4R7R = "";
	var sdata_prize_3R = "";
	var sdata_prize_1M = "";
	var sdata_prize_2M = "";
	var sdata_prize_total = "";
	var sdata_prize_5TY = "";
	var sdata_prize_expert = "";
	var sdata_prize_airesult = "";
	var sdata_prize_s1f = "";
	var sdata_prize_rank = "";
	var sdata_prize_rank_sum = "";
	var sdata_prize_ranking = "";
	var sdata_prize_ranking_sum = "";
	var sdata_prize_ranking_sum2 = "";
	var sdata_prize_jkName = "";
	var sdata_prize_rmemo = "";

	if ($("#sdata_airesult").is(":checked")) {
		sdata_airesult = "1";
	}
	if ($("#sdata_myPercent").is(":checked")) {
		sdata_myPercent = "1";
	}
	if ($("#sdata_fieldOdds").is(":checked")) {
		sdata_fieldOdds = "1";
	}
	if ($("#sdata_popular").is(":checked")) {
		sdata_popular = "1";
	}
	if ($("#sdata_hrAge").is(":checked")) {
		sdata_hrAge = "1";
	}
	if ($("#sdata_5TY").is(":checked")) {
		sdata_5TY = "1";
	}
	if ($("#sdata_s1f").is(":checked")) {
		sdata_s1f = "1";
	}
	if ($("#sdata_prize").is(":checked")) {
		sdata_prize = "1";
	}
	if ($("#sdata_eraser").is(":checked")) {
		sdata_eraser = "1";
	}
	if ($("#sdata_eraser2").is(":checked")) {
		sdata_eraser2 = "1";
	}
	if ($("#sdata_ability").is(":checked")) {
		sdata_ability = "1";
	}
	if ($("#sdata_expert").is(":checked")) {
		sdata_expert = "1";
	}
	if ($("#sdata_rmemo").is(":checked")) {
		sdata_rmemo = "1";
	}
	if ($("#sdata_ranking").is(":checked")) {
		sdata_ranking = "1";
	}
	if ($("#sdata_rank").is(":checked")) {
		sdata_rank = "1";
	}
	if ($("#sdata_rating").is(":checked")) {
		sdata_rating = "1";
	}
	if ($("#sdata_winOdds").is(":checked")) {
		sdata_winOdds = "1";
	}
	if ($("#sdata_plcOdds").is(":checked")) {
		sdata_plcOdds = "1";
	}
	if ($("#sdata_distance").is(":checked")) {
		sdata_distance = "1";
	}
	if ($("#sdata_rcdate").is(":checked")) {
		sdata_rcdate = "1";
	}
	if ($("#sdata_prize").is(":checked")) {
		sdata_prize = "1";
	}
	if ($("#sdata_site1").is(":checked")) {
		sdata_site1 = "1";
	}
	if ($("#sdata_site2").is(":checked")) {
		sdata_site2 = "1";
	}
	if ($("#sdata_hrSex").is(":checked")) {
		sdata_hrSex = "1";
	}
	if ($("#sdata_jkName").is(":checked")) {
		sdata_jkName = "1";
	}
	if ($("#sdata_trName").is(":checked")) {
		sdata_trName = "1";
	}
	if ($("#sdata_wgBudam").is(":checked")) {
		sdata_wgBudam = "1";
	}
	if ($("#sdata_resultview").is(":checked")) {
		sdata_resultview = "1";
	}


	if ($("#sdata_prize_bigdata").is(":checked")) {
		sdata_prize_bigdata = "1";
	}
	if ($("#sdata_prize_sangma").is(":checked")) {
		sdata_prize_sangma = "1";
	}
	if ($("#sdata_prize_odds").is(":checked")) {
		sdata_prize_odds = "1";
	}
	if ($("#sdata_prize_7R").is(":checked")) {
		sdata_prize_7R = "1";
	}
	if ($("#sdata_prize_4R7R").is(":checked")) {
		sdata_prize_4R7R = "1";
	}
	if ($("#sdata_prize_3R").is(":checked")) {
		sdata_prize_3R = "1";
	}
	if ($("#sdata_prize_1M").is(":checked")) {
		sdata_prize_1M = "1";
	}
	if ($("#sdata_prize_2M").is(":checked")) {
		sdata_prize_2M = "1";
	}
	if ($("#sdata_prize_total").is(":checked")) {
		sdata_prize_total = "1";
	}
	if ($("#sdata_prize_5TY").is(":checked")) {
		sdata_prize_5TY = "1";
	}
	if ($("#sdata_prize_expert").is(":checked")) {
		sdata_prize_expert = "1";
	}
	if ($("#sdata_prize_airesult").is(":checked")) {
		sdata_prize_airesult = "1";
	}
	if ($("#sdata_prize_s1f").is(":checked")) {
		sdata_prize_s1f = "1";
	}
	if ($("#sdata_prize_rank").is(":checked")) {
		sdata_prize_rank = "1";
	}
	if ($("#sdata_prize_rank_sum").is(":checked")) {
		sdata_prize_rank_sum = "1";
	}
	if ($("#sdata_prize_ranking").is(":checked")) {
		sdata_prize_ranking = "1";
	}
	if ($("#sdata_prize_ranking_sum").is(":checked")) {
		sdata_prize_ranking_sum = "1";
	}
	if ($("#sdata_prize_ranking_sum2").is(":checked")) {
		sdata_prize_ranking_sum2 = "1";
	}
	if ($("#sdata_prize_jkName").is(":checked")) {
		sdata_prize_jkName = "1";
	}
	if ($("#sdata_prize_rmemo").is(":checked")) {
		sdata_prize_rmemo = "1";
	}

	//$("#rc_analysis").load("../analysis/ajax.get_race_analysis_loading.php?h=" + rc_loader_height);
	$("#rc_analysis").load("../analysis/ajax.get_race_analysis_loading.php?h=400");
	sleep(1000);
    var url = "../analysis/ajax.get_race_analysis_" + dtype + ".php";
	$.ajax({
		url: url,
		type: 'POST',
		data: { 'dtype':dtype,
				'viewtype':sdata_viewtype,
				'rcDate':rcDate,
				'meet':meet,
				'rcNo':rcNo,
				'sst':sst,
				'sod':sod,
				'sdata_airesult':sdata_airesult,
				'sdata_myPercent':sdata_myPercent,
				'sdata_fieldOdds':sdata_fieldOdds,
				'sdata_popular':sdata_popular,
				'sdata_hrAge':sdata_hrAge,
				'sdata_5TY':sdata_5TY,
				'sdata_s1f':sdata_s1f,
				'sdata_prize':sdata_prize,
				'sdata_prize_bigdata':sdata_prize_bigdata,
				'sdata_prize_sangma':sdata_prize_sangma,
				'sdata_prize_odds':sdata_prize_odds,
				'sdata_prize_7R':sdata_prize_7R,
				'sdata_prize_4R7R':sdata_prize_4R7R,
				'sdata_prize_3R':sdata_prize_3R,
				'sdata_prize_1M':sdata_prize_1M,
				'sdata_prize_2M':sdata_prize_2M,
				'sdata_prize_total':sdata_prize_total,
				'sdata_prize_5TY':sdata_prize_5TY,
				'sdata_prize_expert':sdata_prize_expert,
				'sdata_prize_airesult':sdata_prize_airesult,
				'sdata_prize_s1f':sdata_prize_s1f,
				'sdata_prize_rank':sdata_prize_rank,
				'sdata_prize_rank_sum':sdata_prize_rank_sum,
				'sdata_prize_ranking':sdata_prize_ranking,
				'sdata_prize_ranking_sum':sdata_prize_ranking_sum,
				'sdata_prize_ranking_sum2':sdata_prize_ranking_sum2,
				'sdata_prize_jkName':sdata_prize_jkName,
				'sdata_prize_rmemo':sdata_prize_rmemo,
				'sdata_eraser':sdata_eraser,
				'sdata_eraser2':sdata_eraser2,
				'sdata_ability':sdata_ability,
				'sdata_expert':sdata_expert,
				'sdata_rmemo':sdata_rmemo,
				'sdata_ranking':sdata_ranking,
				'sdata_rank':sdata_rank,
				'sdata_rating':sdata_rating,
				'sdata_winOdds':sdata_winOdds,
				'sdata_plcOdds':sdata_plcOdds,
				'sdata_distance':sdata_distance,
				'sdata_rcdate':sdata_rcdate,
				'sdata_site1':sdata_site1,
				'sdata_site2':sdata_site2,
				'sdata_hrSex':sdata_hrSex,
				'sdata_jkName':sdata_jkName,
				'sdata_trName':sdata_trName,
				'sdata_wgBudam':sdata_wgBudam,
				'sdata_resultview':sdata_resultview},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				console.log(response);
				alert(response);
			} else {
				$("#rc_analysis").html(response);
				//get_race_analysis_point_chulNo(rcDate, meet, rcNo);
				onmouseevent_control();
				get_race_analysis_score_chulNo(rcDate, meet, rcNo);
				
				$(".search_checkbox").attr("disabled", false);
				var rc_analysis_height = $("#rc_analysis .container").height() + 20;
				//$("#rc_analysis").height(rc_analysis_height + 'px');
			}
		}
	});

}

function get_race_analysis_data(e, sst, sod) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	var sdata = $(e).attr("id");
	var sdata_value = "";


	if (sdata == "sdata_all") {
		sdata_value = "all";
	} else if (sdata == "sdata_basic") {
		sdata_value = "basic";
	} else if (sdata == "sdata_clear") {
		sdata_value = "clear";
	} else if (sdata == "sdata_prize_all") {
		sdata_value = "prize_all";
	} else if (sdata == "sdata_prize_clear") {
		sdata_value = "prize_clear";
	} else if (sdata == "sdata_prize_basic") {
		sdata_value = "prize_basic";
	} else {
		if ($(e).is(":checked")) {
			sdata_value = "1";
		} else {
			sdata_value = "0";
		}
		$(".search_checkbox").attr("disabled", true);
		//$(e).attr("disabled", false);
	}

	if (dtype == "data3_chatLive" || dtype == "data3_all") {
		get_race_analysis(dtype, rcDate, meet, rcNo, sst, sod);
	} else {
		var url = "../analysis/ajax.set_analyst_data3_config.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'sdata':sdata, 'sdata_value':sdata_value, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "OK") {
					get_race_analysis(dtype, rcDate, meet, rcNo, sst, sod);
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_race_analysis_data_all(e, sst, sod) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var all_id = $(e).attr("id");

	let checked_choice = true;
	if (all_id == "sdata_basic" || all_id == "sdata_clear") {
		checked_choice = false;
	}

	if (all_id == "sdata_basic") {
		$("#sdata_airesult").prop("checked", true);
	} else {
		$("#sdata_airesult").prop("checked", checked_choice);
	}
	$("#sdata_myPercent").prop("checked", checked_choice);
	$("#sdata_fieldOdds").prop("checked", checked_choice);
	$("#sdata_popular").prop("checked", checked_choice);
	$("#sdata_hrAge").prop("checked", checked_choice);
	$("#sdata_5TY").prop("checked", checked_choice);
	if (all_id == "sdata_basic") {
		$("#sdata_prize").prop("checked", true);
		$("#sdata_eraser").prop("checked", true);
	} else {
		$("#sdata_prize").prop("checked", checked_choice);
		$("#sdata_eraser").prop("checked", checked_choice);
	}
	$("#sdata_eraser2").prop("checked", checked_choice);
	$("#sdata_ability").prop("checked", checked_choice);
	if (all_id == "sdata_basic") {
		$("#sdata_expert").prop("checked", true);
	} else {
		$("#sdata_expert").prop("checked", checked_choice);
	}
	$("#sdata_rmemo").prop("checked", checked_choice);
	$("#sdata_s1f").prop("checked", checked_choice);
	if (all_id == "sdata_basic") {
		$("#sdata_ranking").prop("checked", true);
	} else {
		$("#sdata_ranking").prop("checked", checked_choice);
	}
	$("#sdata_rank").prop("checked", checked_choice);
	$("#sdata_rating").prop("checked", checked_choice);
	$("#sdata_winOdds").prop("checked", checked_choice);
	$("#sdata_plcOdds").prop("checked", checked_choice);
	$("#sdata_distance").prop("checked", checked_choice);
	$("#sdata_rcdate").prop("checked", checked_choice);
	$("#sdata_hrSex").prop("checked", checked_choice);
	$("#sdata_jkName").prop("checked", checked_choice);
	$("#sdata_trName").prop("checked", checked_choice);
	$("#sdata_wgBudam").prop("checked", checked_choice);

	get_race_analysis_data(e, sst, sod);

}

function get_race_analysis_data_prize_all(e, sst, sod) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var all_id = $(e).attr("id");
	var analysis_expert = $(e).data("analysis_expert");

	let checked_choice = true;
	if (all_id == "sdata_prize_basic" || all_id == "sdata_prize_clear") {
		checked_choice = false;
	}

	$("#sdata_prize_bigdata").prop("checked", checked_choice);
	$("#sdata_prize_sangma").prop("checked", checked_choice);
	if (all_id == "sdata_prize_basic") {
		//$("#sdata_prize_odds").prop("checked", true);
		$("#sdata_prize_odds").prop("checked", checked_choice);
	} else {
		$("#sdata_prize_odds").prop("checked", checked_choice);
	}
	if (all_id == "sdata_prize_basic") {
		//$("#sdata_prize_5TY").prop("checked", true);
		$("#sdata_prize_5TY").prop("checked", checked_choice);
	} else {
		$("#sdata_prize_5TY").prop("checked", checked_choice);
	}
	if (all_id == "sdata_prize_basic") {
		//$("#sdata_prize_7R").prop("checked", true);
		$("#sdata_prize_7R").prop("checked", checked_choice);
	} else {
		$("#sdata_prize_7R").prop("checked", checked_choice);
	}
	$("#sdata_prize_4R7R").prop("checked", checked_choice);
	$("#sdata_prize_3R").prop("checked", checked_choice);
	$("#sdata_prize_1M").prop("checked", checked_choice);
	$("#sdata_prize_2M").prop("checked", checked_choice);
	$("#sdata_prize_total").prop("checked", checked_choice);
	if (all_id == "sdata_prize_basic") {
		if (analysis_expert == "1") {
			$("#sdata_prize_expert").prop("checked", true);
		} else {
			$("#sdata_prize_expert").prop("checked", checked_choice);
		}
	} else {
		$("#sdata_prize_expert").prop("checked", checked_choice);
	}
	if (all_id == "sdata_prize_basic") {
		$("#sdata_prize_airesult").prop("checked", true);
	} else {
		$("#sdata_prize_airesult").prop("checked", checked_choice);
	}
	if (all_id == "sdata_prize_basic") {
		//$("#sdata_prize_s1f").prop("checked", true);
		$("#sdata_prize_s1f").prop("checked", checked_choice);
	} else {
		$("#sdata_prize_s1f").prop("checked", checked_choice);
	}
	$("#sdata_prize_rank").prop("checked", checked_choice);
	$("#sdata_prize_rank_sum").prop("checked", checked_choice);
	if (all_id == "sdata_prize_basic") {
		$("#sdata_prize_ranking").prop("checked", true);
	} else {
		$("#sdata_prize_ranking").prop("checked", checked_choice);
	}
	if (all_id == "sdata_prize_basic") {
		//$("#sdata_prize_ranking_sum").prop("checked", true);
		$("#sdata_prize_ranking_sum").prop("checked", checked_choice);
	} else {
		$("#sdata_prize_ranking_sum").prop("checked", checked_choice);
	}
	$("#sdata_prize_ranking_sum2").prop("checked", checked_choice);
	if (all_id == "sdata_prize_basic") {
		//$("#sdata_prize_jkName").prop("checked", true);
		$("#sdata_prize_jkName").prop("checked", checked_choice);
	} else {
		$("#sdata_prize_jkName").prop("checked", checked_choice);
	}
	$("#sdata_prize_rmemo").prop("checked", checked_choice);

	get_race_analysis_data(e, sst, sod);

}

function get_race_analysis_data9(analysis, dtype, rcDate, meet, rcNo, sst, sod) {
	var match_item = data9_match_item;
	var sdata_viewtype = "team";
	var sdata_airesult = "";
	var sdata_myPercent = "";
	var sdata_fieldOdds = "";
	var sdata_popular = "";
	var sdata_hrAge = "";
	var sdata_5TY = "";
	var sdata_s1f = "";
	var sdata_prize = "";
	var sdata_eraser = "";
	var sdata_eraser2 = "";
	var sdata_ability = "";
	var sdata_expert = "";
	var sdata_rmemo = "";
	var sdata_ranking = "";
	var sdata_rank = "";
	var sdata_rating = "";
	var sdata_winOdds = "";
	var sdata_plcOdds = "";
	var sdata_distance = "";
	var sdata_rcdate = "";
	var sdata_prize = "";
	var sdata_site1 = "";
	var sdata_site2 = "";
	var sdata_hrSex = "";
	var sdata_jkName = "";
	var sdata_trName = "";
	var sdata_wgBudam = "";
	var sdata_resultview = "";

	if (analysis == "analysis_01") { // 선행력
		sdata_airesult = "1";
		sdata_s1f = "1";
		sdata_ranking = "1";
		sdata_rmemo = "1";
	} else if (analysis == "analysis_02") { // 기수
		sdata_airesult = "1";
		sdata_jkName = "1";
		sdata_ranking = "1";
	} else if (analysis == "analysis_03") { // 전체 대전수
		sdata_airesult = "1";
		sdata_5TY = "1";
		sdata_expert = "1";
		sdata_ranking = "1";
	}

	//$("#rc_analysis").load("../analysis/ajax.get_race_analysis_loading.php?h=" + rc_loader_height);
	$("#rc_analysis").load("../analysis/ajax.get_race_analysis_loading.php?h=400");
    var url = "../analysis/ajax.get_race_analysis_" + dtype + ".php";
	$.ajax({
		url: url,
		type: 'POST',
		data: { 'match_item':match_item,
				'analysis':analysis,
				'dtype':dtype,
				'viewtype':sdata_viewtype,
				'rcDate':rcDate,
				'meet':meet,
				'rcNo':rcNo,
				'sst':sst,
				'sod':sod,
				'sdata_airesult':sdata_airesult,
				'sdata_myPercent':sdata_myPercent,
				'sdata_fieldOdds':sdata_fieldOdds,
				'sdata_popular':sdata_popular,
				'sdata_hrAge':sdata_hrAge,
				'sdata_5TY':sdata_5TY,
				'sdata_s1f':sdata_s1f,
				'sdata_prize':sdata_prize,
				'sdata_eraser':sdata_eraser,
				'sdata_eraser2':sdata_eraser2,
				'sdata_ability':sdata_ability,
				'sdata_expert':sdata_expert,
				'sdata_rmemo':sdata_rmemo,
				'sdata_ranking':sdata_ranking,
				'sdata_rank':sdata_rank,
				'sdata_rating':sdata_rating,
				'sdata_winOdds':sdata_winOdds,
				'sdata_plcOdds':sdata_plcOdds,
				'sdata_distance':sdata_distance,
				'sdata_rcdate':sdata_rcdate,
				'sdata_site1':sdata_site1,
				'sdata_site2':sdata_site2,
				'sdata_hrSex':sdata_hrSex,
				'sdata_jkName':sdata_jkName,
				'sdata_trName':sdata_trName,
				'sdata_wgBudam':sdata_wgBudam,
				'sdata_resultview':sdata_resultview},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				console.log(response);
				alert(response);
			} else {
				$("#rc_analysis").html(response);
				onmouseevent_control();
			}
		}
	});

}

function onmouseevent_control() {
	$(".trLine").on("mouseover", function() {
		var seq = $(this).data("seq");
		var trBg = parseInt(seq) % 2;
		if (trBg == 1) {
			//$(".trLine" + seq).removeClass("bg_gray");
		} else {
			//$(".trLine" + seq).removeClass("bg_white");
		}

		var hrno = $(this).data("hrno");
		$(".trLineShow" + hrno).addClass("bg_yellow");
		$(".trLineShow" + hrno).css("background-color", "#ffffcc");
		//$(this).children("input").css("background-color", "#ffffcc");
		//$(this).css("border-top", "1px solid #ff0000");
	});
	$(".trLine").on("mouseout", function() {
		var seq = $(this).data("seq");
		var trBg = parseInt(seq) % 2;
		if (trBg == 1) {
			//$(".trLine" + seq).addClass("bg_gray");
			//$(".trLine" + seq).css("background-color", "#eff3f9");
		} else {
			//$(".trLine" + seq).addClass("bg_white");
			//$(".trLine" + seq).css("background-color", "#ffffff");
		}

		var hrno = $(this).data("hrno");
		$(".trLineShow" + hrno).removeClass("bg_yellow");
		$(".trLineShow" + hrno).css("background-color", "#ffffff");
		//$(this).css("border-top", "1px solid #d6dce7");
	});

	$(".hrMemo").keyup(function(key) {
		if (key.keyCode == 13) {
			//reg_hrMemo($(this));
			reg_data_hrMemo($(this));
		}
	});
	$(".hrno_form").keyup(function(key) {
		if (key.keyCode == 13) {
			in_hr_select($(this));
		}
	});
	$(".hrname_memo").mouseover(function() {
		//$(".hrname_memo").css("height","200px");
		$(this).parent().css("background", "#ff6600");
	});
	$(".hrname_memo").mouseout(function() {
		//$(".hrname_memo").css("height","");
		var hr_del = $(this).parent().data("hrdel");
		if (hr_del == "1") {
			$(this).parent().css("background", "#8c8c8c");
		} else {
			$(this).parent().css("background", "#828282");
		}
	});

	$(".mover_red_button").mouseover(function() {
		$(this).css("background", "#ff0000");
		$(this).css("color", "#ffffff");
	});
	$(".mover_red_button").mouseout(function() {
		var bg_color = $(this).data("bg_color");
		$(this).css("background-color", bg_color);
		$(this).css("color", "");
	});

	$(".hrPossible").keyup(function(key) {
		if (key.keyCode == 13) {
			var score = Number($(this).val());
			var hrNo = $(this).parent().parent().data("hrno");
			var defaultvalue = $(this).data("defaultvalue");
			if (score > 100) {
				//$('#possible_' + hrNo).text("100까지만 입력이 가능합니다.");
				$(this).val(defaultvalue);
				return false;
			} else {
				set_analyst_possible($(this));
			}
		}
	});

	$(".add_point").on("click", function() {
		var cell_name = $(this).data("cell_name");
		var cell_point = $(this).data("cell_point");
		var in_no = $(this).parent().data("in_no");
		var rcDate = $(this).parent().data("rcdate");
		var meet = $(this).parent().data("meet");
		var rcNo = $(this).parent().data("rcno");
		var hrNo = $(this).parent().data("hrno");

		if ($("#rc_group" + hrNo).val() == "0") {
			return false;
		}
		return false; // 일단 사용하지 않음

		var obj = $(this);
		/**
		$(this).removeClass("cell_" + cell_point);
		if (cell_point == "") {
			$(this).addClass("cell_advantage1");
			$(this).data("cell_point", "advantage1");
		} else if (cell_point == "advantage1") {
			$(this).addClass("cell_advantage2");
			$(this).data("cell_point", "advantage2");
		} else if (cell_point == "advantage2") {
			$(this).addClass("cell_damage1");
			$(this).data("cell_point", "damage1");
		} else if (cell_point == "damage1") {
			$(this).addClass("cell_damage2");
			$(this).data("cell_point", "damage2");
		} else if (cell_point == "damage2") {
			$(this).addClass("cell_");
			$(this).data("cell_point", "");
		}
		**/
		var url = "../analysis/ajax.set_rc_analysis_add_point.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'in_pno':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'cell_name':cell_name, 'cell_point':cell_point},
			dataType: 'html',
			success: function(response) {
				if (response == "ERROR") {
					alert(response);
				} else {
					var result = response.split('|');
					var point_type = result[0];
					var point_score = result[1];
					obj.removeClass("cell_" + cell_point);
					obj.addClass("cell_" + point_type);
					obj.data("cell_point", point_type);

					if (point_type == "advantage1" || point_type == "advantage2" || point_type == "advantage0") {
						if (Number(point_score) >= 20) {
							$("#total_advantage" + hrNo).css("color", "#ff0000");
						} else if (Number(point_score) >= 10) {
							$("#total_advantage" + hrNo).css("color", "#0000ff");
						} else {
							$("#total_advantage" + hrNo).css("color", "#000000");
						}
						$("#total_advantage" + hrNo).text(point_score);
					} else if (point_type == "damage1" || point_type == "damage2" || point_type == "damage0") {
						//$("#total_damage" + hrNo).text(point_score);
						$("#total_advantage" + hrNo).text(point_score);
					}
					//get_race_analysis_point_chulNo(rcDate, meet, rcNo); //사용안함
				}
			}
		});

	});

	$(".add_attention").on("click", function() {
		var cell_name = $(this).parent().data("cell_name");
		var cell_attention = $(this).parent().data("cell_attention");
		var in_no = $(this).parent().parent().data("in_no");
		var rcDate = $(this).parent().parent().data("rcdate");
		var meet = $(this).parent().parent().data("meet");
		var rcNo = $(this).parent().parent().data("rcno");
		var hrNo = $(this).parent().parent().data("hrno");

		var obj = $(this);

		var url = "../analysis/ajax.set_rc_analysis_add_attention.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'cell_name':cell_name, 'cell_attention':cell_attention},
			dataType: 'html',
			success: function(response) {
				if (response == "ERROR") {
					//alert(response);
				} else {
					let result = response.split('|');
					let attention_type = result[0];
					let attention_prev = result[1];

					$(".cell_" + hrNo + "_attention_" + cell_name + "_" + attention_prev).hide();
					$(".cell_" + hrNo + "_attention_" + cell_name + "_" + attention_type).show();

					if (cell_name == "hrPossible") {
						if (attention_type == "1") {
							$("#possible_" + hrNo).parent().css("background-color", "#000000");
						} else if (attention_type == "2") {
							$("#possible_" + hrNo).parent().css("background-color", "#0000ff");
						} else if (attention_type == "3") {
							$("#possible_" + hrNo).parent().css("background-color", "#ff0000");
						} else {
							$("#possible_" + hrNo).parent().css("background-color", "");
						}
					}

					obj.parent().data("cell_attention", attention_type);

					//console.log(obj.parent().data("cell_attention"));
				}
			}
		});

	});

	$(".add_attention_data9").on("click", function() { // 단통
		var cell_name = $(this).parent().data("cell_name");
		var now_attention = $(this).parent().data("cell_attention");
		var in_no = $(this).parent().parent().data("in_no");
		var rcDate = $(this).parent().parent().data("rcdate");
		var meet = $(this).parent().parent().data("meet");
		var rcNo = $(this).parent().parent().data("rcno");
		var hrNo = $(this).parent().parent().data("hrno");
		var chulNo = $(this).parent().parent().data("chulno");
		//parent.set_data9_cell_attention(hrNo, now_attention);
		var cell_attention = parent.get_data9_cell_attention(hrNo);

		var obj = $(this);

		var url = "../analysis/ajax.set_rc_analysis_add_attention.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'cell_name':cell_name, 'cell_attention':cell_attention},
			dataType: 'html',
			success: function(response) {
				if (response == "ERROR") {
					//alert(response);
				} else {
					let result = response.split('|');
					let attention_type = result[0];
					let attention_prev = result[1];

					if (cell_name == "hrPossible") { // 능력점수
						parent.add_attention_data9(hrNo, attention_type, attention_prev);
						//console.log(cell_attention + "->" + attention_type);
					}

					obj.parent().data("cell_attention", attention_type);
				}
			}
		});

	});

	
	clearInterval(ranking_check_red);
	clearInterval(ranking_check_blue);
	clearInterval(ranking_check_green);
	clearInterval(ranking_check_black);

	clearInterval(s1f_check_red);
	clearInterval(s1f_check_black);

	clearInterval(rank_check_red);
	clearInterval(rank_check_black);

	clearInterval(odds_check_red);
	clearInterval(odds_check_black);

	clearInterval(analysis_check_blink['ranking_sum1']);
	clearInterval(analysis_check_blink['ranking_sum12']);
	clearInterval(analysis_check_blink['rcTop5T']);
	clearInterval(analysis_check_blink['rcCntYWin']);
	clearInterval(analysis_check_blink['ranking_1m']);
	clearInterval(analysis_check_blink['rcCnt3RWin']);
	clearInterval(analysis_check_blink['s1f_1m']);
	clearInterval(analysis_check_blink['winOdds_1m']);
	clearInterval(analysis_check_blink['rank_sum']);
	clearInterval(analysis_check_blink['jkQuRate']);
}

$(function() {
    $(document).on("click", "form input:submit, form button:submit", function() {
        var f = this.form;
        var token = get_ajax_token();

        if(!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }

        var $f = $(f);

        if(typeof f.token === "undefined")
            $f.prepend('<input type="hidden" name="token" value="">');

        $f.find("input[name=token]").val(token);

        return true;
    });

	$("input:text[numberOnly]").on("keyup", function() {
		var regExp = /^[0-9]*$/;
		var num = $(this).val();
		if(!regExp.test(num)){
			alert("숫자만 입력 가능합니다.\n\n다시 입력해주세요.");
			$(this).val($(this).data("defaultvalue"));
			return false;
		}
	});

	onmouseevent_control();
});

function get_race_analysis_point_chulNo(rcDate, meet, rcNo) {
    var url = "../analysis/ajax.get_race_analysis_point_chulNo.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				var result = response.split('|');
				$("#point_num1").text(result[0]);
				$("#point_num2").text(result[1]);
				$("#point_num3").text(result[2]);
				$("#point_num4").text(result[3]);
				$("#point_num5").text(result[4]);
			}
		}
	});
}

function get_race_analysis_score_chulNo(rcDate, meet, rcNo) {
    var url = "../analysis/ajax.get_race_analysis_score_chulNo.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				var result = response.split('|');
				$("#point_num1").text(result[0]);
				$("#point_num2").text(result[1]);
				$("#point_num3").text(result[2]);
				$("#point_num4").text(result[3]);
				$("#point_num5").text(result[4]);
			}
		}
	});
}

function get_race_analysis_team_config(e, sst, sod) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (confirm('팀 분류를 하시겠습니까?')) {
		$("#rc_analysis").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
		var url = "../analysis/ajax.get_analyst_data3_team_config.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "OK") {
					//get_race_analysis(dtype, rcDate, meet, rcNo, sst, sod);
					get_race_analysis(dtype, rcDate, meet, rcNo, '', '');
				} else if (response == "WAIT") {
					alert("팀분류가 진행중입니다.\n\n잠시후 다시 시도해 주세요.");
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_race_analysis_data_set(e, sst, sod) {
	var sdata_viewtype = $("#sdata_viewtype").data("viewtype");
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (sdata_viewtype == "all") { // 전체보기
		$("#sdata_viewtype").data("viewtype", "team");
		$("#sdata_viewtype").text("모아보기");
		//$("#rc_analysis").css("height", $("#rc_analysis").height() + 70);
		//$("#rc_analysis").css("height", $("#rc_analysis").height() + 40); ///////////////////////////////////////
	} else {
		$("#sdata_viewtype").data("viewtype", "all");
		$("#sdata_viewtype").text("분류보기");
		//$("#rc_analysis").css("height", $("#rc_analysis").height() - 70);
		//$("#rc_analysis").css("height", $("#rc_analysis").height() - 40); ///////////////////////////////////////
	}

	get_race_analysis(dtype, rcDate, meet, rcNo, sst, sod);

	//$("#sdata_viewtype").css("color", "#fff");
}

function get_race_analysis_data3_teamInfo(e, rcDate, meet, rcNo) {

	var tdata = $(e).attr("id");
	if (tdata == "team_summary") {
		var tdata_value = $("#team_summary_value").val();
	} else {
		var tdata_value = $(e).val();
	}

	var url = "../analysis/ajax.set_analyst_data3_teamInfo.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'tdata':tdata, 'tdata_value':tdata_value, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (tdata == "team_summary") {
					alert("정상적으로 저장되었습니다.");
				} else if (tdata == "divi_odds") {
					if (tdata_value == "") {
						$(e).css("background", "");
					} else {
						$(e).css("background", "#ffff00");
					}
				}
			} else {
				alert(response);
			}
		}
	});
}

function get_race_analysis_data3_deleteInfo(e, rcDate, meet, rcNo) {

	var del_chulNo1 = $("#del_chulNo1").val();
	var del_chulNo2 = $("#del_chulNo2").val();
	var del_chulNo3 = $("#del_chulNo3").val();
	var del_chulNo4 = $("#del_chulNo4").val();

	var url = "../analysis/ajax.set_analyst_data3_deleteInfo.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'del_chulNo1':del_chulNo1, 'del_chulNo2':del_chulNo2, 'del_chulNo3':del_chulNo3, 'del_chulNo4':del_chulNo4},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				alert("정상적으로 저장되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function get_race_analysis_data3_initialization_team(e) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (confirm('정말로 초기화 하시겠습니까?')) {
		var url = "../analysis/ajax.set_analyst_data3_initialization_team.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'dtype':dtype, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "OK") {
					$(".round_del_chulNo").hide();
					$(".round_chulNo").show();
					get_race_analysis(dtype, rcDate, meet, rcNo, '', '');
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_race_analysis_data3_initialization_all(e) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (confirm('정말로 초기화 하시겠습니까?')) {
		var url = "../analysis/ajax.set_analyst_data3_initialization_all.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'dtype':dtype, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "OK") {
					if (dtype == "data3_result" || dtype == "data3_raceT") {
						let pType = "";
						if (dtype == "data3_raceT") {
							pType = "raceT";
						} else {
							pType = "result";
						}
						$("#rc_analysis1").load("../analysis/ajax.get_race_analysis_loading.php?h=500");
						url = "../page/data3_result_analysis1.ajax.php";
						$.ajax({
							url: url,
							type: 'POST',
							data: {'pType':pType, 'rcDate':rcDate},
							dataType: 'html',
							success: function(response) {
								$("#rc_analysis1").html(response);
							}
						});
					} else if (dtype == "data9") {
						parent.location.reload(true);
					} else {
						//history.go(0);
						location.reload(true);
					}
				} else {
					alert(response);
				}
			}
		});
	}
}

function get_race_analysis_data3_reload(e) {
	var dtype = $(e).parent().parent().data("type");
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");

	if (confirm('데이터를 다시 가져오시겠습니까?')) {
		$("#rc_analysis").load("../analysis/ajax.get_race_analysis_loading.php?h=400");
		var url = "../analysis/ajax.set_analyst_data3_reload.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'dtype':dtype, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response == "OK") {
					get_race_analysis(dtype, rcDate, meet, rcNo, '', '');
				} else {
					console.log(response);
					alert(response);
				}
			}
		});
	}
}

function set_race_analysis_data_vip_open(e, rcDate, meet, rcNo) {
	var open_check = "";
	if ($(e).is(":checked")) {
		open_check = "1";
	} else {
		open_check = "0";
	}


	var url = "../analysis/ajax.set_analysis_data_vip_open.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'open_check':open_check, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
		dataType: 'html',
		beforeSend: function () {
			if (rcNo == "1" && open_check == "1") {
				alert("확인을 누르시고 완료될 때까지 잠시만 기다려주세요.");
			}
		},
		success: function(response) {
			if (response == "OK") {
				alert("완료되었습니다.");
			} else {
				alert(response);
			}
		}

		/**
		beforeSend: function () {
			// XHR Header 포함, HTTP Request 하기전에 호출
		},
		success: function(data, status, xhr) {
			// 정상적으로 응답 받았을 경우 파라미터는 응답 바디, 응답 코드 그리고 XHR 헤더
		},  
		error: function(xhr, status, error) {
			// 응답을 받지 못하거나 정상적인 응답이지만 데이터 형식을 확인할 수 없는 경우
		},
		complete: function(xhr, status) {
			// success와 error 콜백이 호출된 후에 반드시 호출, try - catch - finally의 finally 구문과 동일
		}
		**/
	});
}

function get_race_round_view(e) {
	if ($(e).is(":checked")) {
		$("#race_round").show();
	} else {
		$("#race_round").hide();
	}
}

function hide_tdCellCheck(e, type, yLine) {
	if ($(e).is(":checked")) {
		//alert("체크됨");
		$("." + type + "_hideTdY" + yLine).hide();
		$("." + type + "_showTdY" + yLine).show();
	} else {
		//alert("체크풀림");
		$("." + type + "_hideTdY" + yLine).show();
		$("." + type + "_showTdY" + yLine).hide();
	}
}

function hide_trLineCheck(e, xLine) {
	var in_no = $(e).parent().parent().data("in_no");
	var chulNo = $(e).parent().parent().data("chulno");
	var hrClass = $(e).parent().parent().data("hrclass");
	var jinClass = $(e).parent().parent().data("jinclass");
	var bg_color = $(".roundChulNo" + chulNo).data("bg_color");
	var free_color = $(".roundChulNo" + chulNo).data("free_color");
	var popular_color = $(".popularChulNo" + chulNo).data("popular_color");
	var empty_bg_color = $(".chulNoEmpty" + chulNo).data("bg_color");
	var del = "";
	if ($(e).is(":checked")) {
		//alert("체크됨");
		$(".trLineShow" + xLine).show();
		$(".trLineLeftShow" + xLine).show();
		$(".trLineEmpty" + xLine).hide();
		$("#chks_" + xLine).prop("checked", true); //show
		$("#chka1_" + xLine).prop("checked", true); //show
		$("#chka2_" + xLine).prop("checked", true); //show
		del = "1";
	} else {
		//alert("체크풀림");
		$(".trLineShow" + xLine).hide();
		$(".trLineLeftShow" + xLine).hide();
		$(".trLineEmpty" + xLine).show();
		$("#chkh_" + xLine).prop("checked", false); //hidden
		$("#chka1_" + xLine).prop("checked", false); //hidden
		$("#chka2_" + xLine).prop("checked", false); //hidden
		del = "0";
	}

	var url = "../analysis/ajax.set_chulNo_delete_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_no':in_no, 'hr_del':del},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (del == "1") {
					if (bg_color == "red" || bg_color == "blue" || bg_color == "green") {
						$('.roundChulNo' + chulNo).css('background-color', bg_color);
					} else {
						$('.roundChulNo' + chulNo).css('background-color', '#000000');
					}

					$('.popularChulNo' + chulNo).css('background-color', popular_color);
					$('.order_chulNo' + chulNo).css('background-color', '#000000');

					$(".teamClass" + chulNo).css('opacity', 1);

					//chulNo_default_set(chulNo); ////////////////////////////////
					//chulNo_jinClass_default_set(chulNo, jinClass);
				} else {
					$('.roundChulNo' + chulNo).css('background-color', '#dddddd');
					$('.popularChulNo' + chulNo).css('background-color', '#dddddd');
					$('.order_chulNo' + chulNo).css('background-color', '#dddddd');

					$(".teamClass" + chulNo).css('opacity', 0.2);
					
					if (empty_bg_color == "black") $(".chulNoEmpty" + chulNo).css("background-color", "#ececec");

					//chulNo_del_set(chulNo); ////////////////////////////////
				}
			} else {
				alert(response);
			}
		}
	});
}

function hide_trLineCheck_delete(e, xLine) {
	var rcDate = $(e).parent().parent().data("rcdate");
	var meet = $(e).parent().parent().data("meet");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var hrNo = $(e).parent().parent().data("hrno");
	var bg_color = $(".hrNo" + hrNo).data("bg_color");

	var del = "";
	if ($(e).is(":checked")) {
		//alert("체크됨");
		del = "1";
	} else {
		//alert("체크풀림");
		del = "0";
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
					$(".trLineShow" + xLine).show();
					$(".trLineLeftShow" + xLine).show();
					$(".trLineEmpty" + xLine).hide();
					$("#chks_" + xLine).prop("checked", true); //show
				} else {
					$(".trLineShow" + xLine).hide();
					$(".trLineLeftShow" + xLine).hide();
					$(".trLineEmpty" + xLine).show();
					$("#chkh_" + xLine).prop("checked", false); //hidden
					
					if (bg_color == "black") $(".hrNoEmpty" + hrNo).css("background-color", "#ececec");
				}
			} else {
				alert(response);
			}
		}
	});
}



function hide_round_chulNo_Check(e, hrNo) {
	var hr_del = $(e).data("hr_del");

	if (hr_del == "1") {
		$("#chkh_" + hrNo).trigger("click");
	} else {
		$("#chks_" + hrNo).trigger("click");
	}
}

function fn_trigger_hide_trLineCheck(e, hrNo) {
	if ($(e).is(":checked")) {
		$("#chkh_" + hrNo).trigger("click");

		$(".ai1_hrNo" + hrNo).data("possible_color", "4");
		$(".ai1_hrNo" + hrNo).trigger("click");
	} else {
		$("#chks_" + hrNo).trigger("click");

		$(".ai1_hrNo" + hrNo).data("possible_color", "3");
		$(".ai1_hrNo" + hrNo).trigger("click");
	}
}

function fn_trigger_hide_trLineCheck2(e, hrNo) {
	if ($(e).is(":checked")) {
		$("#chkh_" + hrNo).trigger("click");

		$(".ai2_hrNo" + hrNo).data("possible_color", "4");
		$(".ai2_hrNo" + hrNo).trigger("click");
	} else {
		$("#chks_" + hrNo).trigger("click");

		$(".ai2_hrNo" + hrNo).data("possible_color", "3");
		$(".ai2_hrNo" + hrNo).trigger("click");
	}
}

function fn_lock_hide_trLineCheck(e, hrNo) {
	var rcDate = $(e).parent().parent().parent().parent().parent().data("rcdate");
	var meet = $(e).parent().parent().parent().parent().parent().data("meet");
	var rcNo = $(e).parent().parent().parent().parent().parent().data("rcno");

	var possible_color = $("#ai2_hrNo" + hrNo).data("possible_color");
	var default_color = $("#ai2_hrNo" + hrNo).data("default_color");

	var lock = "";
	if ($(e).is(":checked")) {
		lock = "1";
	} else {
		lock = "0";
	}

	var url = "../analysis/ajax.set_chulNo_lock_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'hr_lock':lock},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				if (lock == "1") { // 체크가 안 되었다가 체크된 경우
					$("#chks_" + hrNo).trigger("click");
					$("#chkh_" + hrNo).attr("disabled", true);
					$("#chks_" + hrNo).attr("disabled", true);
					$("#chka1_" + hrNo).attr("disabled", true);
					$("#chka1_" + hrNo).attr("checked", false);

					$(".ai2_hrNo" + hrNo).data("possible_color", "3");
					$(".ai2_hrNo" + hrNo).trigger("click");
				} else { // 체크가 풀린 경우
					$("#chkh_" + hrNo).attr("disabled", false);
					$("#chks_" + hrNo).attr("disabled", false);
					$("#chka1_" + hrNo).attr("disabled", false);
					$("#chka1_" + hrNo).attr("checked", true);
					$("#chkh_" + hrNo).trigger("click");

					$(".ai2_hrNo" + hrNo).data("possible_color", "4");
					$(".ai2_hrNo" + hrNo).trigger("click");
				}
			} else {
				alert(response);
			}
		}
	});
}


function goto_sort_link(e, query_string) {
	var search = $(e).val().split('|');
	var sst = search[0];
	var sod = search[1];

	location.href = '?' + query_string + '&sst=' + sst + '&sod=' + sod;
}
function goto_sort_link_ajax(e, rcDate, meet, rcNo) {
	var search = $(e).val().split('|');
	var sst = search[0];
	var sod = search[1];
	get_race_analysis(dtype, rcDate, meet, rcNo, sst, sod);
}

function reg_popular(e, site, order) {
	var score = Number($(e).val());
	var old_score = Number($(e).data("defaultvalue"));
	$(e).data("defaultvalue", score);

	var seq = $(e).parent().parent().data("seq");
	var in_no = $(e).parent().parent().data("in_no");
	var hrNo = $(e).parent().parent().data("hrno");
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");

	var url = "../analysis/ajax.set_popular_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_pno':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'site':site, 'order':order, 'score':score},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") alert(response);
			else $("#total_popular_sum" + hrNo).text(response);
		}
	});
}

function reg_score(e, mark) {
	var score = Number($(e).val());
	var in_no = $(e).parent().parent().data("in_no");
	var hrNo = $(e).parent().parent().data("hrno");
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");
	var first_rank = Number($("#first_rank" + hrNo).val());

	var url = "../analysis/ajax.set_score_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_pno':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'score':score, 'mark':mark},
		dataType: 'html',
		success: function(response) {
			var result = response.split('|');
			if (result[0] == "OK") {
				if (result[1] == "0") {
					$("#first_rank" + hrNo).val("");
					$("#first_rank" + hrNo).data("defaultvalue", "0");
				} else {
					$("#first_rank" + hrNo).val(result[1]);
					$("#first_rank" + hrNo).data("defaultvalue", result[1]);
				}
				$("#btn_hrNo" + hrNo).text(result[1]);
				$(".jin_btn_hrNo" + hrNo).text(result[1]);

				get_race_analysis_score_chulNo(rcDate, meet, rcNo);
			} else {
				alert(response);
			}
		}
	});
}

function reg_first_rank(e) {
	var rank = Number($(e).val());
	var old_rank = Number($(e).data("defaultvalue"));
	$(e).data("defaultvalue", rank);

	var seq = $(e).parent().parent().data("seq");
	var in_no = $(e).parent().parent().data("in_no");
	var hrNo = $(e).parent().parent().data("hrno");
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");

	var url = "../analysis/ajax.set_first_rank_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_pno':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'rank':rank},
		dataType: 'html',
		success: function(response) {
			if (response != "OK") {
				alert(response);
			} else {
				$("#btn_hrNo" + hrNo).text(rank);
				$(".jin_btn_hrNo" + hrNo).text(rank);
			}
		}
	});
}

function reg_hrMemo(e) {
	var memo = $(e).val();
	var in_no = $(e).parent().parent().data("in_no");
	var hrNo = $(e).parent().parent().data("hrno");
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).parent().parent().data("chulno");

	var url = "../analysis/ajax.set_hrMemo_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'in_pno':in_no, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'hrNo':hrNo, 'chulNo':chulNo, 'hrMemo':memo},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				//alert("저장되었습니다.");
			} else {
				alert(response);
			}
		}
	});
}

function bat_select_rc_chulNo(e, chulNo, hrNo) {
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var check_color = $(e).data("check_color");
	var chulNo_score = $(".jin_btn_hrNo" + hrNo).eq(0).text();
	var bat_seq = "";

	if (check_color != "") {
		if ($("#bat_num1").data("chulno") == "") {
			bat_seq = "1";
		} else if ($("#bat_num2").data("chulno") == "") {
			bat_seq = "2";
		} else if ($("#bat_num3").data("chulno") == "") {
			bat_seq = "3";
		} else if ($("#bat_num4").data("chulno") == "") {
			bat_seq = "4";
		} else if ($("#bat_num5").data("chulno") == "") {
			bat_seq = "5";
		}

		var select_chulNo = chulNo + "<div style='font-size:9pt;'><span>" + chulNo_score + "</span></div>";
		if (bat_seq != "") {
			var url = "../analysis/ajax.set_rc_batting_update.php";
			$.ajax({
				url: url,
				type: 'POST',
				data: {'w':'', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'bat_seq':bat_seq},
				dataType: 'html',
				success: function(response) {
					if (response != "OK") alert(response);
					else {
						$("#bat_num" + bat_seq).data("chulno", chulNo);
						$("#bat_num" + bat_seq).html(select_chulNo);
					}
				}
			});
		}
	}
}

function select_rc_chulNo(e, no) {
	if ($("#bat_low").is(":checked")) {
		var bat_low = true;
	}
	if ($("#bat_high").is(":checked")) {
		var bat_high = true;
	}
	if ($("#bat_super").is(":checked")) {
		var bat_super = true;
	}

	if (bat_low == true) {
		select_rc_batNo_low(e, no);
	}
	if (bat_high == true) {
		select_rc_batNo_high(e, no);
	}
	if (bat_super == true) {
		select_rc_batNo_super(e, no);
	}
}

function select_rc_batNo_low(e, no) {
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = no;
	var bat_seq = "";

	if ($("#bat_low1").text() == "") {
		$("#bat_low1").text(no);
		bat_seq = "1";
	} else if ($("#bat_low2").text() == "") {
		$("#bat_low2").text(no);
		bat_seq = "2";
	} else if ($("#bat_low3").text() == "") {
		$("#bat_low3").text(no);
		bat_seq = "3";
	} else if ($("#bat_low4").text() == "") {
		$("#bat_low4").text(no);
		bat_seq = "4";
	} else {
		if (confirm("중고배당으로 계속 등록하시겠습니까?")) {
			select_rc_batNo_high(e, no);
		}
	}
	if (bat_seq != "") {
		var url = "../analysis/ajax.set_rc_batting_update.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'w':'', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'bat_type':'low', 'bat_seq':bat_seq},
			dataType: 'html',
			success: function(response) {
				if (response != "OK") alert(response);
			}
		});
	}
}

function select_rc_batNo_high(e, no) {
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = no;
	var bat_seq = "";

	if ($("#bat_high1").text() == "") {
		$("#bat_high1").text(no);
		bat_seq = "1";
	} else if ($("#bat_high2").text() == "") {
		$("#bat_high2").text(no);
		bat_seq = "2";
	} else if ($("#bat_high3").text() == "") {
		$("#bat_high3").text(no);
		bat_seq = "3";
	} else if ($("#bat_high4").text() == "") {
		$("#bat_high4").text(no);
		bat_seq = "4";
	} else if ($("#bat_high5").text() == "") {
		$("#bat_high5").text(no);
		bat_seq = "5";
	} else {
		if (confirm("초고배당으로 계속 등록하시겠습니까?")) {
			select_rc_batNo_super(e, no);
		}
	}
	if (bat_seq != "") {
		var url = "../analysis/ajax.set_rc_batting_update.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'w':'', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'bat_type':'high', 'bat_seq':bat_seq},
			dataType: 'html',
			success: function(response) {
				if (response != "OK") alert(response);
			}
		});
	}
}

function select_rc_batNo_super(e, no) {
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = no;
	var bat_seq = "";

	if ($("#bat_super1").text() == "") {
		$("#bat_super1").text(no);
		bat_seq = "1";
	} else if ($("#bat_super2").text() == "") {
		$("#bat_super2").text(no);
		bat_seq = "2";
	} else if ($("#bat_super3").text() == "") {
		$("#bat_super3").text(no);
		bat_seq = "3";
	} else if ($("#bat_super4").text() == "") {
		$("#bat_super4").text(no);
		bat_seq = "4";
	} else if ($("#bat_super5").text() == "") {
		$("#bat_super5").text(no);
		bat_seq = "5";
	} else if ($("#bat_super6").text() == "") {
		$("#bat_super6").text(no);
		bat_seq = "6";
	} else {
		alert("마번 선택이 완료되었습니다.");
	}
	if (bat_seq != "") {
		var url = "../analysis/ajax.set_rc_batting_update.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'w':'', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'bat_type':'super', 'bat_seq':bat_seq},
			dataType: 'html',
			success: function(response) {
				if (response != "OK") alert(response);
			}
		});
	}
}

function delete_rc_chulNo(e, bat_seq) {
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var chulNo = $(e).data("chulno");

	var url = "../analysis/ajax.set_rc_batting_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'w':'d', 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'bat_seq':bat_seq},
		dataType: 'html',
		success: function(response) {
			if (response == "OK") {
				$(e).data("chulno", "");
				$(e).html('');
			} else {
				alert(response);
			}
		}
	});
}

function set_rc_dividend(e, dividend) {
	var meet = $(e).parent().parent().parent().parent().data("meet");
	var rcDate = $(e).parent().parent().parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().parent().parent().data("rcno");
	var chkvalue = "";
	if ($(e).is(":checked")) {
		chkvalue = "1";
	} else {
		chkvalue = "0";
	}

	var url = "../analysis/ajax.set_rc_dividend_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'chkvalue':chkvalue, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'dividend':dividend},
		dataType: 'html',
		success: function(response) {
			if (response != "OK") alert(response);
		}
	});
}

function set_rc_bat_type(e, bat_type) {
	var meet = $(e).parent().parent().parent().parent().data("meet");
	var rcDate = $(e).parent().parent().parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().parent().parent().data("rcno");
	var chkvalue = "";
	if ($(e).is(":checked")) {
		chkvalue = "1";
	} else {
		chkvalue = "0";
	}

	var url = "../analysis/ajax.set_rc_bat_type_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'chkvalue':chkvalue, 'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'bat_type':bat_type},
		dataType: 'html',
		success: function(response) {
			if (response != "OK") alert(response);
		}
	});
}


var analysis_data_type = "";
function set_hrClass(e) {
	var meet = $(e).parent().parent().data("meet");
	var rcDate = $(e).parent().parent().data("rcdate");
	var rcNo = $(e).parent().parent().data("rcno");
	var hrNo = $(e).parent().parent().data("hrno");
	var chulNo = $(e).parent().parent().data("chulno");
	var hrClass = $(e).val();

	var beforeTeam = $(e).data("beforeteam");
	var teamName = "";
	var beforeTeamName = "";
	var sst = "";
	var sod = "";

	analysis_data_type = $(e).data("data_type");
	
    var bgColor = $(".chulNo" + chulNo).data("bg_color");
	//alert(bgColor);

	//$(e).parent().parent().data("jinclass", hrClass);
	$(".trLineShow" + hrNo).data("hrclass", hrClass);
	$(".trLineShow" + hrNo).data("jinclass", hrClass);
	$(".trLineEmpty" + hrNo).data("hrclass", hrClass);
	$(".trLineEmpty" + hrNo).data("jinclass", hrClass);
	//alert($(".trLineShow" + hrNo).data("jinclass") + ":" + $(".trLineEmpty" + hrNo).data("jinclass"));

	if (hrClass == "1") {
		$(e).css("color", "#000000");
		$(e).css("background-color", "#ffcccc");
		teamName = "Aclass";
	} else if (hrClass == "2") {
		$(e).css("color", "#000000");
		$(e).css("background-color", "#66ccff");
		teamName = "Bclass";
	} else if (hrClass == "3") {
		$(e).css("color", "#000000");
		$(e).css("background-color", "#66cc00");
		teamName = "Cclass";
	} else if (hrClass == "4") {
		$(e).css("color", "#ffffff");
		$(e).css("background-color", "#000000");
		teamName = "Dclass";
	} else if (hrClass == "0") {
		$(e).css("color", "#000000");
		$(e).css("background-color", "#ffffff");
		teamName = "0class";
	}

	var url = "../analysis/ajax.set_rc_hrClass_type_update.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo, 'chulNo':chulNo, 'hrClass':hrClass},
		dataType: 'html',
		success: function(response) {
			if (response != "OK") {
				alert(response);
			} else {

				if (beforeTeam == "1") beforeTeamName = "Aclass";
				else if (beforeTeam == "2") beforeTeamName = "Bclass";
				else if (beforeTeam == "3") beforeTeamName = "Cclass";
				else if (beforeTeam == "4") beforeTeamName = "Dclass";
				else if (beforeTeam == "0") beforeTeamName = "0class";
				get_race_analysis_hrClass(beforeTeamName, rcDate, meet, rcNo, sst, sod); // 팀별 로드
				get_race_analysis_hrClass(teamName, rcDate, meet, rcNo, sst, sod); // 팀별 로드

				/*******
				if (hrClass == "0") {
					$(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".ha_chulNo" + chulNo).css("background-color", "#ffffff");
				} else if (hrClass == "1") {
					$(".sang_chulNo" + chulNo).css("background-color", "#ffcccc");
					$(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".ha_chulNo" + chulNo).css("background-color", "#ffffff");
				} else if (hrClass == "2") {
					$(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".jung_chulNo" + chulNo).css("background-color", "#8cceff");
					$(".ha_chulNo" + chulNo).css("background-color", "#ffffff");
				} else if (hrClass == "3") {
					$(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".ha_chulNo" + chulNo).css("background-color", "#89eb9a");
				} else if (hrClass == "4") {
					$(".sang_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".jung_chulNo" + chulNo).css("background-color", "#ffffff");
					$(".ha_chulNo" + chulNo).css("background-color", "#d19bfd");
				}


				if (bgColor == "red") {
					//$(".sang_chulNo" + chulNo).css("background-color", "#ff0000");
					chulNo_hrClass_direct_set(chulNo, '1', hrClass);
				} else if (bgColor == "blue") {
					//$(".jung_chulNo" + chulNo).css("background-color", "#095df7");
					chulNo_hrClass_direct_set(chulNo, '2', hrClass);
				} else if (bgColor == "green") {
					//$(".ha_chulNo" + chulNo).css("background-color", "#009900");
					chulNo_hrClass_direct_set(chulNo, '3', hrClass);
				} else if (bgColor == "purple") {
					//$(".ha_chulNo" + chulNo).css("background-color", "#009900");
					chulNo_hrClass_direct_set(chulNo, '4', hrClass);
				} else if (bgColor == "gray") {
					//$(".ha_chulNo" + chulNo).css("background-color", "#acacac");
					chulNo_hrClass_direct_set(chulNo, '5', hrClass);
				} else if (bgColor == "white") {
					$(".del_chulNo" + chulNo).css("background-color", "#ececec");
				}
				*******/
				

				/**
				if (hrClass == "4") {
					//$(".roundChulNo" + chulNo).css("background-color", "#ffffff");
					//$(".popularChulNo" + chulNo).css("background-color", "#ffffff");
					$(".round_chulNo" + chulNo).hide();
					$(".round_del_chulNo" + chulNo).show();
				} else {
					$(".round_del_chulNo" + chulNo).hide();
					$(".round_chulNo" + chulNo).show();
				}
				**/

				$(e).data("beforeteam", hrClass);
				$(".chulNo" + chulNo).data("hrclass", hrClass);
				$(".round_chulNo" + chulNo).data("hrclass", hrClass);
			}
		}
	});
}

function get_race_analysis_hrClass(teamName, rcDate, meet, rcNo, sst, sod) {
	var sdata_viewtype = $("#sdata_viewtype").data("viewtype");
	var sdata_airesult = "";
	var sdata_myPercent = "";
	var sdata_fieldOdds = "";
	var sdata_popular = "";
	var sdata_hrAge = "";
	var sdata_5TY = "";
	var sdata_s1f = "";
	var sdata_prize = "";
	var sdata_eraser = "";
	var sdata_eraser2 = "";
	var sdata_ability = "";
	var sdata_expert = "";
	var sdata_rmemo = "";
	var sdata_ranking = "";
	var sdata_rank = "";
	var sdata_rating = "";
	var sdata_winOdds = "";
	var sdata_plcOdds = "";
	var sdata_distance = "";
	var sdata_rcdate = "";
	var sdata_prize = "";
	var sdata_site1 = "";
	var sdata_site2 = "";
	var sdata_hrSex = "";
	var sdata_jkName = "";
	var sdata_trName = "";
	var sdata_wgBudam = "";
	var sdata_resultview = "";

	var sdata_prize_bigdata = "";
	var sdata_prize_sangma = "";
	var sdata_prize_odds = "";
	var sdata_prize_7R = "";
	var sdata_prize_4R7R = "";
	var sdata_prize_3R = "";
	var sdata_prize_1M = "";
	var sdata_prize_2M = "";
	var sdata_prize_total = "";
	var sdata_prize_5TY = "";
	var sdata_prize_expert = "";
	var sdata_prize_airesult = "";
	var sdata_prize_s1f = "";
	var sdata_prize_rank = "";
	var sdata_prize_rank_sum = "";
	var sdata_prize_ranking = "";
	var sdata_prize_ranking_sum = "";
	var sdata_prize_ranking_sum2 = "";
	var sdata_prize_jkName = "";
	var sdata_prize_rmemo = "";

	if ($("#sdata_airesult").is(":checked")) {
		sdata_airesult = "1";
	}
	if ($("#sdata_myPercent").is(":checked")) {
		sdata_myPercent = "1";
	}
	if ($("#sdata_fieldOdds").is(":checked")) {
		sdata_fieldOdds = "1";
	}
	if ($("#sdata_popular").is(":checked")) {
		sdata_popular = "1";
	}
	if ($("#sdata_hrAge").is(":checked")) {
		sdata_hrAge = "1";
	}
	if ($("#sdata_5TY").is(":checked")) {
		sdata_5TY = "1";
	}
	if ($("#sdata_s1f").is(":checked")) {
		sdata_s1f = "1";
	}
	if ($("#sdata_prize").is(":checked")) {
		sdata_prize = "1";
	}
	if ($("#sdata_eraser").is(":checked")) {
		sdata_eraser = "1";
	}
	if ($("#sdata_eraser2").is(":checked")) {
		sdata_eraser2 = "1";
	}
	if ($("#sdata_ability").is(":checked")) {
		sdata_ability = "1";
	}
	if ($("#sdata_expert").is(":checked")) {
		sdata_expert = "1";
	}
	if ($("#sdata_rmemo").is(":checked")) {
		sdata_rmemo = "1";
	}
	if ($("#sdata_ranking").is(":checked")) {
		sdata_ranking = "1";
	}
	if ($("#sdata_rank").is(":checked")) {
		sdata_rank = "1";
	}
	if ($("#sdata_rating").is(":checked")) {
		sdata_rating = "1";
	}
	if ($("#sdata_winOdds").is(":checked")) {
		sdata_winOdds = "1";
	}
	if ($("#sdata_plcOdds").is(":checked")) {
		sdata_plcOdds = "1";
	}
	if ($("#sdata_distance").is(":checked")) {
		sdata_distance = "1";
	}
	if ($("#sdata_rcdate").is(":checked")) {
		sdata_rcdate = "1";
	}
	if ($("#sdata_prize").is(":checked")) {
		sdata_prize = "1";
	}
	if ($("#sdata_site1").is(":checked")) {
		sdata_site1 = "1";
	}
	if ($("#sdata_site2").is(":checked")) {
		sdata_site2 = "1";
	}
	if ($("#sdata_hrSex").is(":checked")) {
		sdata_hrSex = "1";
	}
	if ($("#sdata_jkName").is(":checked")) {
		sdata_jkName = "1";
	}
	if ($("#sdata_trName").is(":checked")) {
		sdata_trName = "1";
	}
	if ($("#sdata_wgBudam").is(":checked")) {
		sdata_wgBudam = "1";
	}
	if ($("#sdata_resultview").is(":checked")) {
		sdata_resultview = "1";
	}


	if ($("#sdata_prize_bigdata").is(":checked")) {
		sdata_prize_bigdata = "1";
	}
	if ($("#sdata_prize_sangma").is(":checked")) {
		sdata_prize_sangma = "1";
	}
	if ($("#sdata_prize_odds").is(":checked")) {
		sdata_prize_odds = "1";
	}
	if ($("#sdata_prize_7R").is(":checked")) {
		sdata_prize_7R = "1";
	}
	if ($("#sdata_prize_4R7R").is(":checked")) {
		sdata_prize_4R7R = "1";
	}
	if ($("#sdata_prize_3R").is(":checked")) {
		sdata_prize_3R = "1";
	}
	if ($("#sdata_prize_1M").is(":checked")) {
		sdata_prize_1M = "1";
	}
	if ($("#sdata_prize_2M").is(":checked")) {
		sdata_prize_2M = "1";
	}
	if ($("#sdata_prize_total").is(":checked")) {
		sdata_prize_total = "1";
	}
	if ($("#sdata_prize_5TY").is(":checked")) {
		sdata_prize_5TY = "1";
	}
	if ($("#sdata_prize_expert").is(":checked")) {
		sdata_prize_expert = "1";
	}
	if ($("#sdata_prize_airesult").is(":checked")) {
		sdata_prize_airesult = "1";
	}
	if ($("#sdata_prize_s1f").is(":checked")) {
		sdata_prize_s1f = "1";
	}
	if ($("#sdata_prize_rank").is(":checked")) {
		sdata_prize_rank = "1";
	}
	if ($("#sdata_prize_rank_sum").is(":checked")) {
		sdata_prize_rank_sum = "1";
	}
	if ($("#sdata_prize_ranking").is(":checked")) {
		sdata_prize_ranking = "1";
	}
	if ($("#sdata_prize_ranking_sum").is(":checked")) {
		sdata_prize_ranking_sum = "1";
	}
	if ($("#sdata_prize_ranking_sum2").is(":checked")) {
		sdata_prize_ranking_sum2 = "1";
	}
	if ($("#sdata_prize_jkName").is(":checked")) {
		sdata_prize_jkName = "1";
	}
	if ($("#sdata_prize_rmemo").is(":checked")) {
		sdata_prize_rmemo = "1";
	}

    var url = "../analysis/ajax.get_race_analysis_data3_sub.inc.php";
	if (analysis_data_type == "data3_all") {
		url = "../analysis/ajax.get_race_analysis_data3_all_sub.inc.php";
	} else if (analysis_data_type == "data_prize") {
		url = "../analysis/ajax.get_race_analysis_data_prize_sub.inc.php";
	} else if (analysis_data_type == "data3_chatLive") {
		url = "../analysis/ajax.get_race_analysis_data3_chatLive_sub.inc.php";
	}

	$.ajax({
		url: url,
		type: 'POST',
		data: { 'analysis_type':analysis_data_type,
				'team_name':teamName,
				'rcDate':rcDate,
				'meet':meet,
				'rcNo':rcNo,
				'sst':sst,
				'sod':sod,
				'sdata_airesult':sdata_airesult,
				'sdata_myPercent':sdata_myPercent,
				'sdata_fieldOdds':sdata_fieldOdds,
				'sdata_popular':sdata_popular,
				'sdata_hrAge':sdata_hrAge,
				'sdata_5TY':sdata_5TY,
				'sdata_s1f':sdata_s1f,
				'sdata_prize':sdata_prize,
				'sdata_prize_bigdata':sdata_prize_bigdata,
				'sdata_prize_sangma':sdata_prize_sangma,
				'sdata_prize_odds':sdata_prize_odds,
				'sdata_prize_7R':sdata_prize_7R,
				'sdata_prize_4R7R':sdata_prize_4R7R,
				'sdata_prize_3R':sdata_prize_3R,
				'sdata_prize_1M':sdata_prize_1M,
				'sdata_prize_2M':sdata_prize_2M,
				'sdata_prize_total':sdata_prize_total,
				'sdata_prize_5TY':sdata_prize_5TY,
				'sdata_prize_expert':sdata_prize_expert,
				'sdata_prize_airesult':sdata_prize_airesult,
				'sdata_prize_s1f':sdata_prize_s1f,
				'sdata_prize_rank':sdata_prize_rank,
				'sdata_prize_rank_sum':sdata_prize_rank_sum,
				'sdata_prize_ranking':sdata_prize_ranking,
				'sdata_prize_ranking_sum':sdata_prize_ranking_sum,
				'sdata_prize_ranking_sum2':sdata_prize_ranking_sum2,
				'sdata_prize_jkName':sdata_prize_jkName,
				'sdata_prize_rmemo':sdata_prize_rmemo,
				'sdata_eraser':sdata_eraser,
				'sdata_eraser2':sdata_eraser2,
				'sdata_ability':sdata_ability,
				'sdata_expert':sdata_expert,
				'sdata_rmemo':sdata_rmemo,
				'sdata_ranking':sdata_ranking,
				'sdata_rank':sdata_rank,
				'sdata_rating':sdata_rating,
				'sdata_winOdds':sdata_winOdds,
				'sdata_plcOdds':sdata_plcOdds,
				'sdata_distance':sdata_distance,
				'sdata_rcdate':sdata_rcdate,
				'sdata_site1':sdata_site1,
				'sdata_site2':sdata_site2,
				'sdata_hrSex':sdata_hrSex,
				'sdata_jkName':sdata_jkName,
				'sdata_trName':sdata_trName,
				'sdata_wgBudam':sdata_wgBudam},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") {
				alert(response);
			} else {
				console.log(teamName);
				$("#analysis_" + teamName).html(response);
				//get_race_analysis_point_chulNo(rcDate, meet, rcNo);
				//get_race_analysis_score_chulNo(rcDate, meet, rcNo);
				onmouseevent_control();
			}
		}
	});
}


function reset_data_rcNo(rcDate, meet, rcNo) {
	if (confirm("예측번호를 제외한 모든 데이터가 지워집니다.\n\n계속하시겠습니까?")) {
		var url = "../analysis/ajax.reset_data_rcNo.php";
		$.ajax({
			url: url,
			type: 'POST',
			data: {'rcDate':rcDate, 'meet':meet, 'rcNo':rcNo},
			dataType: 'html',
			success: function(response) {
				if (response != "OK") alert(response);
				else location.reload();
			}
		});
	}
	return false;
}

function get_race_detail_result(rcID, rcDate, meet, rcNo) {
	var url = "../analysis/ajax.get_result_detail_result.php";
	$.ajax({
		url: url,
		type: 'POST',
		data: {'rc_date':rcDate, 'meet':meet, 'rc_no':rcNo},
		dataType: 'html',
		success: function(response) {
			if (response == "ERROR") alert("경기결과가 없습니다.");
			else $("#rc_result" + rcID).html(response);
		}
	});
}