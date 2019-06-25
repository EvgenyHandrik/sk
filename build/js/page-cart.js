;(function() {

	var $container = $('.js-crt2-recommended-more');
	var $scroll;
	var scrollLeftSize = (140 + 10) * 5;

	if ($container.length) {
		$scroll = $container.find('.crt2-recommended-scroll');

		$container.on('click.more-toggle', '.crt2-recommended-more-toggle', function() {
			$container.removeClass('crt2-recommended--more');

			$scroll
				.off('scroll.more-scroll')
				.delay(200).animate({
					scrollLeft: scrollLeftSize
				}, 300, 'linear');
		});

		$scroll
			.one('scroll.more-scroll', function() {
				$container.removeClass('crt2-recommended--more');
			});
	}

}());