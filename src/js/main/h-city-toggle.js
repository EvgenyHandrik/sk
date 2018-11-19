(function() {
	var $button = $('.h-city__toggle');
	var $container = $button.closest('.h-city');

	$button.on('click', function(e) {
		$button.addClass('h-city__toggle--close');
		$container.addClass('h-city--open');
	});

	$(window).on('click.outsideHCity', function(e) {
		var isContainerOpen = $button.hasClass('h-city__toggle--close');
		if (isContainerOpen) {
			var isOutsideClick = $(e.target).closest('.h-city').length < 1;
			var isButtonClick = $(e.target).closest($button).length > 0;
			if (isOutsideClick && !isButtonClick) {
				$button.removeClass('h-city__toggle--close');
				$container.removeClass('h-city--open');
			}
		}
	});
}());