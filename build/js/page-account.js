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
		.on('click.history-detail-toggle', '.acc-history__detail-toggle', function() {
			var $target = $(this);
			var $history = $target.closest('.acc-history');
			toggleDetail($history)
		});

	function toggleDetail($history) {
		if ($history.hasClass('acc-history--detail')) {
			closeDetail();
		} else {
			openDetail($history);
		}
	}

	function openDetail($history) {
		closeDetail();
		$history.addClass('acc-history--detail');
		$current = $history;
	}

	function closeDetail() {
		if ($current.length) {
			$current.removeClass('acc-history--detail');
		}
	}

}());

// account-addresses
(function() {

	var $container = $('.js-acc-address');
	var $button = $container.find('.acc-address-list__add');
	var $selectBox = $container.find('.acc-address-list__select-box');
	var $select = $selectBox.find('select');
	var $options = $select.find('option');

	if ($container.length) {
		changeStyle();
		ready(function() {
			addContent();
			addDropDownHandlers();
		})

		$select.on('change.js-delivery-address-list', function() {
			changeStyle();
		});

		$button.on('click.js-delivery-address-list', function() {
			$options.filter(':selected').removeAttr('selected');
			$options.eq(0).prop('selected', true);
			
			$select
				.trigger('refresh')
				.change();
			
			addContent();
			addDropDownHandlers();
		});
	}

	function changeStyle() {
		if ($options.index($options.filter(':selected')) == 0) {
			$container
				.addClass('acc-address-form--new-address');
		} else {
			$container
				.removeClass('acc-address-form--new-address');
		}
	}

	function addContent() {
		var $li = $selectBox.find('.jq-selectbox__dropdown li');

		$options.each(function(i) {
			var $option = $(this);

			var data = $option.data('opt-content');

			if (data) {
				$li.eq(i).html(data.html);
			}
		})
	}

	function addDropDownHandlers() {
		var $dropDown = $selectBox.find('.jq-selectbox__dropdown');
		var $li = $dropDown.find('li');

		$li
			.off('mouseover mouseout mouseenter.js-address-list')
			.on('mouseenter.js-address-list', function() {
				$li.removeClass('selected');
			});
		
		$dropDown
			.off('mouseover mouseout mouseleave.js-address-list')
			.on('mouseleave.js-address-list', function() {
				$li.filter('.sel').addClass('selected');
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