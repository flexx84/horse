/**
 * Main Script - Slot Management UI Interactions
 * Handles ranking buttons, memo buttons, and other UI interactions
 */

(function($) {
  'use strict';

  $(document).ready(function() {

    // ============================================
    // Ranking Button Handlers
    // ============================================

    // Open ranking modal or inline edit
    $(document).on('click', '.btn-ranking, [data-action="ranking"]', function(e) {
      e.preventDefault();
      const $btn = $(this);
      const slotId = $btn.data('slot-id') || $btn.closest('tr').data('slot-id');

      if (!slotId) {
        console.warn('No slot ID found for ranking button');
        return;
      }

      // Show ranking input or modal
      const $modal = $('#modalRanking');
      if ($modal.length) {
        $modal.data('slot-id', slotId).modal('show');
      } else {
        // Inline edit mode
        const $row = $btn.closest('tr');
        const $cell = $row.find('.rank-cell');
        if ($cell.length) {
          const currentRank = $cell.text().trim();
          const $input = $('<input type="number" class="form-control form-control-sm rank-input" min="1" max="100">');
          $input.val(currentRank === '-' ? '' : currentRank);
          $cell.html($input);
          $input.focus().select();

          // Save on blur or enter
          $input.on('blur keypress', function(evt) {
            if (evt.type === 'keypress' && evt.which !== 13) return;
            const newRank = $(this).val();
            updateRanking(slotId, newRank);
            $cell.text(newRank || '-');
          });
        }
      }
    });

    // ============================================
    // Hourly Ranking Button Handlers
    // ============================================

    $(document).on('click', '.btn-hourly-ranking, [data-action="hourly-ranking"]', function(e) {
      e.preventDefault();
      const $btn = $(this);
      const slotId = $btn.data('slot-id') || $btn.closest('tr').data('slot-id');

      if (!slotId) {
        console.warn('No slot ID found for hourly ranking button');
        return;
      }

      // Show hourly ranking chart/modal
      const $modal = $('#modalHourlyRanking');
      if ($modal.length) {
        $modal.data('slot-id', slotId).modal('show');
        loadHourlyRankingData(slotId);
      }
    });

    // ============================================
    // Memo Button Handlers
    // ============================================

    $(document).on('click', '.btn-memo, [data-action="memo"]', function(e) {
      e.preventDefault();
      const $btn = $(this);
      const slotId = $btn.data('slot-id') || $btn.closest('tr').data('slot-id');

      if (!slotId) {
        console.warn('No slot ID found for memo button');
        return;
      }

      // Show memo modal or inline edit
      const $modal = $('#modalMemo');
      if ($modal.length) {
        const currentMemo = $btn.closest('tr').find('.memo-cell').text().trim();
        $modal.find('textarea').val(currentMemo === '-' ? '' : currentMemo);
        $modal.data('slot-id', slotId).modal('show');
      } else {
        // Inline edit mode
        const $row = $btn.closest('tr');
        const $cell = $row.find('.memo-cell');
        if ($cell.length) {
          const currentMemo = $cell.text().trim();
          const $textarea = $('<textarea class="form-control form-control-sm memo-input" rows="2"></textarea>');
          $textarea.val(currentMemo === '-' ? '' : currentMemo);
          $cell.html($textarea);
          $textarea.focus();

          // Save on blur
          $textarea.on('blur', function() {
            const newMemo = $(this).val();
            updateMemo(slotId, newMemo);
            $cell.text(newMemo || '-');
          });
        }
      }
    });

    // ============================================
    // Save Memo Handler
    // ============================================

    $(document).on('click', '#btnSaveMemo', function() {
      const $modal = $('#modalMemo');
      const slotId = $modal.data('slot-id');
      const memo = $modal.find('textarea').val();

      updateMemo(slotId, memo);
      $modal.modal('hide');
    });

    // ============================================
    // Helper Functions
    // ============================================

    function updateRanking(slotId, rank) {
      $.ajax({
        url: '/api/slot/update-ranking',
        method: 'POST',
        data: { slot_id: slotId, ranking: rank },
        dataType: 'json',
        success: function(response) {
          if (response.result === 'success') {
            console.log('Ranking updated successfully');
          }
        },
        error: function(xhr) {
          console.error('Failed to update ranking', xhr);
        }
      });
    }

    function updateMemo(slotId, memo) {
      $.ajax({
        url: '/api/slot/update-memo',
        method: 'POST',
        data: { slot_id: slotId, memo: memo },
        dataType: 'json',
        success: function(response) {
          if (response.result === 'success') {
            console.log('Memo updated successfully');
          }
        },
        error: function(xhr) {
          console.error('Failed to update memo', xhr);
        }
      });
    }

    function loadHourlyRankingData(slotId) {
      $.ajax({
        url: '/api/slot/hourly-ranking',
        method: 'GET',
        data: { slot_id: slotId },
        dataType: 'json',
        success: function(response) {
          if (response.result === 'success') {
            renderHourlyRankingChart(response.data);
          }
        },
        error: function(xhr) {
          console.error('Failed to load hourly ranking data', xhr);
        }
      });
    }

    function renderHourlyRankingChart(data) {
      // Placeholder for chart rendering
      console.log('Rendering hourly ranking chart', data);
    }

    // ============================================
    // Select All Checkbox
    // ============================================

    $('#select-all').on('change', function() {
      const checked = $(this).prop('checked');
      $('input[name="CHK_ID"]').prop('checked', checked);
    });

    $(document).on('change', 'input[name="CHK_ID"]', function() {
      const total = $('input[name="CHK_ID"]').length;
      const checked = $('input[name="CHK_ID"]:checked').length;
      $('#select-all').prop('checked', total === checked);
    });

  });

})(jQuery);
