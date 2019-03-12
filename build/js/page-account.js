// acc-navbar-open
;(function() {

	var $container = $('.js-acc-navbar-open');
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

// acc-navbar mobile
(function() {
	var headerHeight = 100;
	var mobileBreakpoint = 800;

	var $window = $(window);

	var isDesktop = false;
	var isMobile = false;

	var isDesktopFixedTop = false;
	var isDesktopFixedBottom = false;
	var isDesktopUnfixed = false;

	var $nav = $('.js-acc-navbar-mobile');
	var $container = $('.acc-navbar-container');

	var getDesktopSizes = function() {
		var f = getDesktopSizes;
		f.offset = 20;
		f.containerWidth = $container.width();
		f.containerHeight = $container.height();
		f.containerOffset = $container.offset().top;
		f.navHeight = $nav.height();
		f.point1 = f.containerOffset - headerHeight - f.offset;
		f.point2 = f.containerOffset + f.containerHeight - f.navHeight - headerHeight - f.offset;
		f.fixedIsEnabled = f.containerHeight > f.navHeight;
		return f;
	}

	var desktopTimer = 0;

	desktopMobileToggle();

	$window.on('resize.acc-navbar', function() {
		desktopMobileToggle();
	});

	function desktopMobileToggle() {
		if (window.innerWidth > mobileBreakpoint) {
			if (!isDesktop) {
				desktop();
			}
		} else {
			if (!isMobile) {
				mobile();
			}
		}
	}

	function desktop() {
		if (isMobile) destroyMobile();

		isDesktop = true;
		
		$nav
			.addClass('acc-navbar--desktop');
		
		getDesktopSizes();
		desktopFixedToggle();
		addDesktopHandlers();
	}

	function destroyDesktop() {
		isDesktop = false;

		isDesktopUnfixed = false;
		isDesktopFixedTop = false;
		isDesktopFixedBottom = false;

		clearTimeout(desktopTimer);

		removeDesktopHandlers();

		$nav
			.removeClass('acc-navbar--desktop acc-navbar--desktop-is-fixed')
			.css({
				'position': '',
				'width': '',
				'top': '',
				'right': '',
				'bottom': ''
			});
	}

	function mobile() {
		if (isDesktop) destroyDesktop();
		
		isMobile = true;

		$nav
			.addClass('acc-navbar--mobile');
	}

	function destroyMobile() {
		isMobile = false;

		$nav
			.removeClass('acc-navbar--mobile');
	}

	function desktopFixedTop() {
		$nav
			.addClass('acc-navbar--desktop-is-fixed')
			.css({
				'position': 'fixed',
				'top': headerHeight + getDesktopSizes.offset,
				'width': getDesktopSizes.containerWidth,
				'bottom': ''
			});
		
		isDesktopUnfixed = false;
		isDesktopFixedTop = true;
		isDesktopFixedBottom = false;
	}

	function desktopFixedBottom() {
		$nav
			.removeClass('acc-navbar--desktop-is-fixed')
			.css({
				'position': 'absolute',
				'top': '',
				'width': getDesktopSizes.containerWidth,
				'bottom': 0
			})
		
		isDesktopUnfixed = false;
		isDesktopFixedTop = false;
		isDesktopFixedBottom = true;
	}

	function desktopUnfixed() {
		$nav
			.removeClass('acc-navbar--desktop-is-fixed')
			.css({
				'position': '',
				'width': '',
				'top': '',
				'right': '',
				'bottom': ''
			});
		
		isDesktopUnfixed = true;
		isDesktopFixedTop = false;
		isDesktopFixedBottom = false;
	}
	
	function desktopFixedToggle() {
		if (isDesktop && getDesktopSizes.fixedIsEnabled) {
			
			var scroll = $window.scrollTop();
		
			if (scroll < getDesktopSizes.point1) {
				if (isDesktopUnfixed == false) {
					desktopUnfixed();
				}
			} else if (scroll >= getDesktopSizes.point1 && scroll < getDesktopSizes.point2) {
				if (isDesktopFixedTop == false) {
					desktopFixedTop();
				}
			} else if (scroll >= getDesktopSizes.point1) {
				if (isDesktopFixedBottom == false) {
					desktopFixedBottom();
				}
			}
		}
	}

	function addDesktopHandlers() {
		$window
			.on('scroll.acc-navbar-desktop-fixed', function() {
				desktopFixedToggle();
			})
			.on('resize.acc-navbar-desktop-fixed', function() {
				getDesktopSizes();
				clearTimeout(desktopTimer);
				desktopTimer = setTimeout(function() {
					getDesktopSizes();
					desktopFixedToggle();
				}, 300);
			});
	}

	function removeDesktopHandlers() {
		$window
			.off('scroll.acc-navbar-desktop-fixed')
			.off('resize.acc-navbar-desktop-fixed');
	}

}());

// acc-bonus-await-info-toggle
(function() {
	var $box = $('.js-acc-bonus-await-info-toggle-delegate');

	if ($box.length) {
		$box.on('click.acc-bonus-await-info-toggle', '.b-acc-bonus-await .e-info-toggle', function() {
			var $button = $(this);
			var $await = $button.closest('.b-acc-bonus-await');

			if ($await.hasClass('b-acc-bonus-await--info-open')) {
				$await
					.removeClass('b-acc-bonus-await--info-open')
					.addClass('b-acc-bonus-await--info-closed');

			} else {
				$await
					.removeClass('b-acc-bonus-await--info-closed')
					.addClass('b-acc-bonus-await--info-open');
			}
		});
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
			toggleDetail($history);
			$(window).trigger('resize');
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