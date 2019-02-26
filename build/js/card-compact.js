// Card Info Toggle
;(function() {

	var $container = $('.js-cpt-card-info-toggle-delegate');

	if ($container.length) {
		$container.on('click.cpt-card-info-toggle', '.cpt-card-info-toggle', function() {
			var $button = $(this);
			var $main = $button.closest('.cpt-card-main');
			var $info = $main.find('.cpt-card-main__info');

			if ($info.hasClass('cpt-card-main__info--hidden')) {
				$info.removeClass('cpt-card-main__info--hidden')
				$button.addClass('cpt-card-info-toggle--active');
			} else {
				$info.addClass('cpt-card-main__info--hidden');
				$button.removeClass('cpt-card-info-toggle--active');
			}
		});
	}

}());

// Card Collapse
;(function() {

	var $collapse = $('.js-cpt-card-collapse-delegate');

	if ($collapse.length) {
		$collapse.on('click.cpt-card-collapse', '.cpt-card-collapse__toggle', function() {
			var $button = $(this);
			var $box = $button.closest('.cpt-card-collapse');

			if ($box.hasClass('cpt-card-collapse--closed')) {
				$box.removeClass('cpt-card-collapse--closed');
			} else {
				$box.addClass('cpt-card-collapse--closed');
			}
		});
	}

}());