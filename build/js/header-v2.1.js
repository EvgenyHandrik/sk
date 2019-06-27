;(function() {

	var $window = $(window);
	var $header = $('.header-v2');
	var mobile = null;
	var fixed = null;
	var headerMobile = null;
	var headerFixed = null;

	var $button = $('.h-menu-toggle');
	var $nav = $('.h-nav'); // v2.2
	var navOpen = false;

	mobileDesktop();

	$window.on('resize.header', mobileDesktop);
	
	$button.on('click', openCloseNav);
	$window.on('click.outsideNav', function(e) {
			var isNavOpen = $button.hasClass('h-menu-toggle--close');
			if (isNavOpen) {
				var isOutsideClick = $(e.target).closest('.h-nav-l1__list').length < 1;
				var isButtonClick = $(e.target).closest($button).length > 0;
				if (isOutsideClick && !isButtonClick) {
					closeNav();
				}
			}
		});

	function mobileDesktop() {
		mobile = $window.innerWidth() <= 1024;
		
		if (mobile) {
			if (headerMobile == null || headerMobile == false) {
				headerMobile = true;
				headerFixed = true;
				$header
					.addClass('header-v2--mobile header-v2--fixed');
				$window
					.off('scroll.header');
			}
		} else {
			if (headerMobile == null || headerMobile == true) {
				headerMobile = false;
				$header
					.removeClass('header-v2--mobile');
				fixedStatic();
				$window
					.on('scroll.header', fixedStatic);
			}
		}
	}

	function fixedStatic() {
		fixed = $window.scrollTop() > 50;
		
		if (fixed) {
			if (headerFixed == null || headerFixed == false) {
				headerFixed = true;
				$header
					.addClass('header-v2--fixed');
			}
		} else {
			if (headerFixed == null || headerFixed == true) {
				headerFixed = false;
				closeNav();
				$header
					.removeClass('header-v2--fixed');
			}
		}
	}

	function openCloseNav() {
		if (navOpen) {
			closeNav();
		} else {
			openNav();
		}
	}

	function openNav() {
		navOpen = true;
		$button
			.addClass('h-menu-toggle--close');
		$nav
			.addClass('h-nav--open'); // v2.2
	}

	function closeNav() {
		navOpen = false;
		$button
			.removeClass('h-menu-toggle--close');
		$nav
			.removeClass('h-nav--open'); // v2.2
	}

}());

// h-menu-v2 more
(function() {
	var $container = $('.js-h-menu-v2-more');
	var $box;
	var $main;
	var $mainItems;
	var $more;
	var $moreItems;
	var $moreToggle;
	var resizeTimer = 0;

	if ($container.length) {
		$box = $container.find('.h-menu-v2-box');
		$main = $container.find('.h-menu-v2-main');
		$mainItems = $main.find('.h-menu-v2-item');
		$more = $container.find('.h-menu-v2-more');
		$moreItems = $more.find('.h-menu-v2-item');
		$moreToggle = $more.find('.h-menu-v2-more__toggle');

		checkMain();
		addHandlers();
	}

	// Main

	function checkMain() {
		var mainWidth = $main.width();
		var itemsWidth = getMainItemsWidth();
		var $hiddenItems = $mainItems.filter('.h-menu-v2-item--hidden');

		if (itemsWidth > mainWidth) {
			hideMainItems(mainWidth, itemsWidth);
		} else if ($hiddenItems.length) {
			showMainItems($hiddenItems, mainWidth);
		}
	}

	function showMainItems($hiddenItems, mainWidth) {
		$hiddenItems = $hiddenItems || $items.filter('.h-menu-v2-item--hidden');		
		mainWidth = mainWidth || $main.width();
		
		$hiddenItems.each(function(i) {
			var $hiddenItem = $(this);
			var hiddenItemWidth = $hiddenItem.innerWidth();
			var itemsWidth = getMainItemsWidth();
			
			if (i === ($hiddenItems.length - 1)) {
				mainWidth = $box.width() - (parseFloat($main.css('padding-left')) * 2);
			}
		
			var freeSpace = mainWidth - itemsWidth;

			if (freeSpace >= hiddenItemWidth) {
				showMainItem($hiddenItem);
			} else {
				return false;
			}
		});
	}

	function showMainItem($hiddenItem) {
		$hiddenItem = $hiddenItem || $mainItems.filter('.h-menu-v2-item--hidden').first();
		$hiddenItem
			.removeClass('h-menu-v2-item--hidden');
		
		hideMoreItem();
		hideMore();
	}

	function hideMainItems(mainWidth, itemsWidth) {
		mainWidth = mainWidth || $main.width();
		itemsWidth = itemsWidth || getMainItemsWidth();

		if (itemsWidth > mainWidth) {
			hideMainItem();
			hideMainItems();
		}
	}

	function hideMainItem() {
		$mainItems.not('.h-menu-v2-item--hidden').last()
			.addClass('h-menu-v2-item--hidden');
		
		showMoreItem();
		showMore();
	}

	function getMainItemsWidth() {
		var itemsWidth = 0;
		$mainItems.not('.h-menu-v2-item--hidden')
			.each(function() {
				itemsWidth += $(this).innerWidth();
			});

		return itemsWidth;
	}

	function addHandlers() {
		$(window)
			.on('resize.h-menu-v2', function() {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					checkMain();
				}, 300);
			});
		
		$moreToggle
			.on('click.h-menu-v2-dropdown-toggle', function() {
				toggleMoreDropdown();
			});
	}

	// More

	function showMore() {
		if (!$container.hasClass('h-menu-v2--more')) {
			$container
				.addClass('h-menu-v2--more');
		}
	}

	function hideMore() {
		if ($container.hasClass('h-menu-v2--more')) {
			if ($moreItems.not('.h-menu-v2-item--hidden').length < 1) {
				$container
					.removeClass('h-menu-v2--more');
				
				if ($more.hasClass('h-menu-v2-more--open')) {
					closeMoreDropdown();
				}
			}			
		}
	}

	function showMoreItem() {
		$moreItems.filter('.h-menu-v2-item--hidden').last()
			.removeClass('h-menu-v2-item--hidden');
	}

	function hideMoreItem() {
		$moreItems.not('.h-menu-v2-item--hidden').first()
			.addClass('h-menu-v2-item--hidden');
	}

	// More Dropdown

	function toggleMoreDropdown() {
		if ($more.hasClass('h-menu-v2-more--open')) {
			closeMoreDropdown();
		} else {
			openMoreDropdown();
		}
	}

	function openMoreDropdown() {
		$more.addClass('h-menu-v2-more--open');

		$(window)
			.on('click.h-menu-v2-more-outside-click', function(e) {
				if (isOutsideMoreClick(e)) {
					closeMoreDropdown();
				}
			});
	}

	function closeMoreDropdown() {
		$more.removeClass('h-menu-v2-more--open');
		
		$(window)
			.off('click.h-menu-v2-more-outside-click');
	}

	function isOutsideMoreClick(e) {
		var isOutsideClick = $(e.target).closest('.h-menu-v2-more').length < 1;
		var isButtonClick = $(e.target).closest($moreToggle).length > 0;
		if (isOutsideClick && !isButtonClick) {
			return true;
		} else {
			return false;
		}
	}

}());