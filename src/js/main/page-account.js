;(function() {

	var $container = $('.js-acc-navbar');
	var $buttonOpen = $('.acc-navbar-toggle');
	var $nav = $('.acc-nav');

	$container.on('click.acc-nav-toggle', '.acc-navbar-toggle, .acc-nav-toggle', function() {
		toggle();
	});

	function open() {
		$(window).on('click.acc-nav-close', function(e) {
			var $target = $(e.target);
			
			if ($target.closest($nav).length < 1 && $target.closest($buttonOpen).length < 1) {
				close();
			}
		});

		$container.addClass('acc-navbar--open');
	}

	function close() {
		$(window).off('click.acc-nav-close');

		$container.removeClass('acc-navbar--open');
	}

	function toggle() {
		if ($container.hasClass('acc-navbar--open')) {
			close();
		} else {
			open();
		}
	}

}());

// account-history
(function() {
	
	var $container = $('.js-account-history-delegate');
	var $current = $();

	$container
		.on('click.history-open-detail', '.acc-history__detail-open', function() {
			var $target = $(this);
			var $history = $target.closest('.acc-history');
			closeDetail($current);
			openDetail($history);
			$current = $history;
		})
		.on('click.history-close-detail', '.acc-history__detail-close', function() {
			closeDetail($current);
			$current = $();
		});

	function openDetail($history) {
		if ($history.length) {
			$history.addClass('acc-history--detail');
		}
	}

	function closeDetail($history) {
		if ($history.length) {
			$history.removeClass('acc-history--detail');
		}
	}

}());