;(function() {

	var $paginators = $('.js-paginator-lt');

	$paginators.each(function() {
		init(this);
	});

	function init(paginator) {
		var $paginator = $(paginator);

		$select = $paginator.find('.paginator-lt__select');
		

		ready(function() {
			$selectboxSelect = $paginator.find('.jq-selectbox__select');
			
			var settings = $select.data('paginator-settings');
			
			if (settings) {
				var totalPagesHTML =
					'<div class="paginator-lt-pages__total">' +
						'&nbsp;/&nbsp;' +
						'<span class="paginator-lt-pages__total-num"></span>' +
					'</div>';
					
				var $totalPagesContent = $(totalPagesHTML)
					.find('.paginator-lt-pages__total-num')
						.html(settings.totalPages)
						.end();
				
				$selectboxSelect.append($totalPagesContent);
			}
		});
	}

	function ready(func) {
		var count = 10;

		var timer = setInterval(function() {
			if (count < 0) {
				clearInterval(timer);
			}
			
			if ($select.parent('.jq-selectbox').length) {
				clearInterval(timer);
				func();
			}

			--count;
		 }, 1000);
	};

}());