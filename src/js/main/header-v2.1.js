(function() {

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