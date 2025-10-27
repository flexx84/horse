/**
 * Slot Manager - 슬롯 관리 기능
 * 일괄 수정, 엑셀 수정, 순위/메모 편집 기능
 */

(function($) {
  'use strict';

  $(document).ready(function() {

    // ============================================
    // 일괄 수정 버튼
    // ============================================
    $('.btn-batch-edit, button:contains("일괄 수정")').on('click', function(e) {
      e.preventDefault();

      const checkedSlots = $('input[name="slot_check"]:checked');
      if (checkedSlots.length === 0) {
        alert('수정할 슬롯을 선택해주세요.');
        return;
      }

      // 일괄 수정 모달 열기
      $('#modalBatchEdit').modal('show');
    });

    // ============================================
    // 엑셀 수정 버튼
    // ============================================
    $('.btn-excel-edit, button:contains("엑셀 수정")').on('click', function(e) {
      e.preventDefault();

      // 엑셀 업로드 모달 열기
      $('#modalExcelUpload').modal('show');
    });

    // ============================================
    // 엑셀 파일 업로드 처리
    // ============================================
    $('#btnUploadExcel').on('click', function() {
      const fileInput = $('#excelFile')[0];
      if (!fileInput.files.length) {
        alert('엑셀 파일을 선택해주세요.');
        return;
      }

      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      $.ajax({
        url: 'http://localhost:3000/slot/upload',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          if (response.result === 'success') {
            alert('엑셀 업로드 성공!');
            $('#modalExcelUpload').modal('hide');
            location.reload();
          }
        },
        error: function(xhr) {
          alert('엑셀 업로드 실패: ' + (xhr.responseJSON?.message || '알 수 없는 오류'));
        }
      });
    });

    // ============================================
    // 순위 버튼 클릭 (인라인 편집)
    // ============================================
    $(document).on('click', '.btn-ranking, .ranking-cell', function(e) {
      e.preventDefault();

      const $cell = $(this).hasClass('ranking-cell') ? $(this) : $(this).closest('td');
      const $row = $cell.closest('tr');
      const slotId = $row.data('slot-id');
      const currentRank = $cell.find('.rank-value').text().trim();

      // 인라인 편집 모드
      const $input = $('<input type="number" class="form-control form-control-sm" min="1" max="100" style="width:60px">');
      $input.val(currentRank === '-' ? '' : currentRank);

      $cell.html($input);
      $input.focus().select();

      // 저장 (Enter 또는 blur)
      $input.on('blur keypress', function(evt) {
        if (evt.type === 'keypress' && evt.which !== 13) return;

        const newRank = $(this).val();
        updateSlotRanking(slotId, newRank, function() {
          $cell.html('<span class="rank-value">' + (newRank || '-') + '</span>');
        });
      });
    });

    // ============================================
    // 시간별 순위 버튼 클릭
    // ============================================
    $(document).on('click', '.btn-hourly-ranking', function(e) {
      e.preventDefault();

      const $row = $(this).closest('tr');
      const slotId = $row.data('slot-id');

      // 시간별 순위 데이터 로드
      loadHourlyRanking(slotId);

      // 모달 열기
      $('#modalHourlyRanking').modal('show');
    });

    // ============================================
    // 메모 버튼 클릭
    // ============================================
    $(document).on('click', '.btn-memo, .memo-cell', function(e) {
      e.preventDefault();

      const $cell = $(this).hasClass('memo-cell') ? $(this) : $(this).closest('td');
      const $row = $cell.closest('tr');
      const slotId = $row.data('slot-id');
      const currentMemo = $cell.text().trim();

      // 모달에 현재 메모 설정
      $('#memoText').val(currentMemo === '-' ? '' : currentMemo);
      $('#modalMemo').data('slot-id', slotId).modal('show');
    });

    // ============================================
    // 메모 저장
    // ============================================
    $('#btnSaveMemo').on('click', function() {
      const $modal = $('#modalMemo');
      const slotId = $modal.data('slot-id');
      const memo = $('#memoText').val();

      updateSlotMemo(slotId, memo, function() {
        $modal.modal('hide');

        // 테이블 업데이트
        const $row = $('tr[data-slot-id="' + slotId + '"]');
        $row.find('.memo-cell').text(memo || '-');
      });
    });

    // ============================================
    // 메뉴 버튼들 (수정, 확인)
    // ============================================
    $(document).on('click', '.btn-edit-slot', function(e) {
      e.preventDefault();
      const slotId = $(this).data('slot-id');

      // 슬롯 상세 정보 로드
      loadSlotDetail(slotId, function(data) {
        // 편집 모달 열기
        fillEditModal(data);
        $('#modalEditSlot').modal('show');
      });
    });

    $(document).on('click', '.btn-confirm-slot', function(e) {
      e.preventDefault();
      const slotId = $(this).data('slot-id');

      if (confirm('이 슬롯을 확인 처리하시겠습니까?')) {
        confirmSlot(slotId);
      }
    });

    // ============================================
    // Helper Functions
    // ============================================

    function updateSlotRanking(slotId, ranking, callback) {
      $.ajax({
        url: 'http://localhost:3000/slot/set-inline',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          slot_id: slotId,
          field: 'ranking',
          value: ranking
        }),
        success: function(response) {
          if (response.result === 'success' && callback) {
            callback();
          }
        },
        error: function(xhr) {
          alert('순위 업데이트 실패');
          console.error(xhr);
        }
      });
    }

    function updateSlotMemo(slotId, memo, callback) {
      $.ajax({
        url: 'http://localhost:3000/slot/memo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          slot_id: slotId,
          memo: memo
        }),
        success: function(response) {
          if (response.result === 'success' && callback) {
            callback();
          }
        },
        error: function(xhr) {
          alert('메모 업데이트 실패');
          console.error(xhr);
        }
      });
    }

    function loadHourlyRanking(slotId) {
      $.ajax({
        url: 'http://localhost:3000/slot/detail-hourly/' + slotId,
        method: 'GET',
        success: function(response) {
          if (response.result === 'success') {
            renderHourlyChart(response.data);
          }
        },
        error: function(xhr) {
          console.error('시간별 순위 로드 실패', xhr);
        }
      });
    }

    function renderHourlyChart(data) {
      const $container = $('#hourlyChartContainer');
      if (!data || data.length === 0) {
        $container.html('<p class="text-muted">시간별 순위 데이터가 없습니다.</p>');
        return;
      }

      // 간단한 텍스트 표시 (차트 라이브러리 없이)
      let html = '<div class="list-group">';
      data.forEach(function(item) {
        html += '<div class="list-group-item">';
        html += '<div class="d-flex justify-content-between">';
        html += '<span>' + item.check_time + '</span>';
        html += '<strong>' + item.ranking + '위</strong>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';

      $container.html(html);
    }

    function loadSlotDetail(slotId, callback) {
      $.ajax({
        url: 'http://localhost:3000/slot/detail/' + slotId,
        method: 'GET',
        success: function(response) {
          if (response.result === 'success' && callback) {
            callback(response.data);
          }
        },
        error: function(xhr) {
          alert('슬롯 정보 로드 실패');
          console.error(xhr);
        }
      });
    }

    function fillEditModal(data) {
      $('#editSlotId').val(data.id);
      $('#editKeyword').val(data.keyword);
      $('#editUrl').val(data.url);
      $('#editRanking').val(data.ranking);
      // ... 기타 필드들
    }

    function confirmSlot(slotId) {
      $.ajax({
        url: 'http://localhost:3000/slot/init-slot',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          slot_id: slotId,
          status: 'confirmed'
        }),
        success: function(response) {
          if (response.result === 'success') {
            alert('슬롯 확인 완료');
            location.reload();
          }
        },
        error: function(xhr) {
          alert('슬롯 확인 실패');
          console.error(xhr);
        }
      });
    }

    // ============================================
    // 테이블에서 버튼 활성화
    // ============================================

    // 동적으로 추가된 행에 버튼 이벤트 바인딩
    function bindRowButtons($row) {
      $row.find('.btn-ranking').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.ranking-cell').trigger('click');
      });

      $row.find('.btn-hourly').on('click', function(e) {
        e.preventDefault();
        $(this).trigger('click');
      });

      $row.find('.btn-memo').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.memo-cell').trigger('click');
      });
    }

    // 페이지 로드 시 기존 행들에 이벤트 바인딩
    $('tbody tr').each(function() {
      bindRowButtons($(this));
    });

    console.log('✅ Slot Manager loaded');
  });

})(jQuery);
