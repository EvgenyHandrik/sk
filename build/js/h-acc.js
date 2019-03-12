(function() {
	var bpMobile = 520 + 30;

	var $container = $('.js-h-acc-toggle');
	var $button = $container.find('.h-acc-toggle');

	var isOpen = false;

	$button.on('click', function(e) {
		toggle();
	});

	function toggle() {
		if (!isOpen) {
			open();
		} else {
			close();
		}
	}

	function open() {
		isOpen = true;
		$container
			.addClass('h-acc--is-open');
		$(window)
			.on('click.h-acc-outside-click', function(e) {
				if (isOutsideClick(e)) {
					close();
				}
			});
			// .on('resize.h-acc-resize', function() {
			// 	if (window.innerWidth <= bpMobile) {
			// 		close();
			// 	}
			// });
	}

	function close() {
		isOpen = false;
		$container
			.removeClass('h-acc--is-open');
		$(window)
			.off('click.h-acc-outside-click')
			.off('resize.h-acc-resize');
	}

	function isOutsideClick(e) {
		var isOutsideClick = $(e.target).closest('.h-acc-dd').length < 1;
		var isButtonClick = $(e.target).closest($button).length > 0;
		if (isOutsideClick && !isButtonClick) {
			return true;
		} else {
			return false;
		}
	}
}());