// Combo dish brief toggle
;(function() {

	$('.js-combo-dbrief-toggle-delegate')
		.on('click.brief-toggle-delegate', '.combo-dish-brief-toggle', function() {
			$button = $(this);
			$dish = $button.closest('.combo-dish');
			$brief = $dish.find('.combo-dish-brief');

			if ($brief.hasClass('combo-dish-brief--hidden')) {
				$brief.removeClass('combo-dish-brief--hidden');
				$button.addClass('combo-dish-brief-toggle--active');
			} else {
				$brief.addClass('combo-dish-brief--hidden');
				$button.removeClass('combo-dish-brief-toggle--active');
			}
		});

}());

// Combo tab
;(function() {

	var $tab = $('.js-combo-tab');
	var $buttons = $tab.find('.combo-tab-nav__button');
	var $menuItems = $tab.find('.combo-tab-nav__item');
	var $contents = $tab.find('.combo-tab-content__item');

	$tab.on('click.combo-tab', '.combo-tab-nav__button', function() {
		var $button = $(this);
		var index = $buttons.index($button);
		var $item = $menuItems.eq(index);
		var $content = $contents.eq(index);
		
		if (!$item.hasClass('combo-tab-nav__item--active')) {
			$menuItems.filter('.combo-tab-nav__item--active')
				.removeClass('combo-tab-nav__item--active');
			$contents.filter('.combo-tab-content__item--active')
				.removeClass('combo-tab-content__item--active');
			
			$item.addClass('combo-tab-nav__item--active');
			$content.addClass('combo-tab-content__item--active');
		} 
	});

}());

// Combo c-info
;(function() {

	var $boxes = $('.js-combo-c-info');
	
	$boxes.on('click.combo-c-info', '.combo-c-info__button', function(e) {
		var $button = $(e.currentTarget);
		var $box = $(e.delegateTarget);

		if ($button.hasClass('combo-c-info__button--short')) {
			$box
				.removeClass('combo-c-info--full')
				.addClass('combo-c-info--short');
		} else {
			$box
				.removeClass('combo-c-info--short')
				.addClass('combo-c-info--full');
		}
	});

}());


// Combo Select
;(function() {

	var $box = $('.js-combo-select-delegate');

	if ($box.length) {
		
		$('.combo-select').each(function() {
			setStyle($(this));
		})

		$box.on('change.combo-select', '.combo-select__switch', function() {
			var $switch = $(this);
			var $select = $switch.closest('.combo-select');		
			setStyle($select, $switch);
		});
	}

	function setStyle($select, $switch) {
		if ($select && $select.length) {
			
			$switch = $switch || $select.find('.combo-select__switch:checked');
			var $option = $switch.closest('.combo-select__option');
			var $prevOption = $select.find('.combo-select__option--selected');
			
			$prevOption.removeClass('combo-select__option--selected');
			$option.addClass('combo-select__option--selected');
		}
	}

}());

// b-lunch-dish brief toggle
;(function() {

	$('.js-b-lunch-dbrief-toggle-delegate')
		.on('click.brief-toggle-delegate', '.b-lunch-dish-brief-toggle', function() {
			$button = $(this);
			$dish = $button.closest('.b-lunch-dish');
			$brief = $dish.find('.b-lunch-dish-brief');

			if ($brief.hasClass('b-lunch-dish-brief--hidden')) {
				$brief.removeClass('b-lunch-dish-brief--hidden');
				$button.addClass('b-lunch-dish-brief-toggle--active');
			} else {
				$brief.addClass('b-lunch-dish-brief--hidden');
				$button.removeClass('b-lunch-dish-brief-toggle--active');
			}
		});

}());

// b-lunch gselect
;(function() {

	var $container = $('.js-b-lunch-gselect-delegate');
	
	if ($container.length) {
		$('.b-lunch-gselect').each(function() {
			setStyle($(this));
		});

		$container.on(
			'change.b-lunch-gselect',
			'.b-lunch-gselect__dish-switch',
			function() {
				var $dishSwitch = $(this);
				var $lunch = $dishSwitch.closest('.b-lunch-gselect');
				setStyle($lunch, $dishSwitch);
			});
	}

	function setStyle($lunch, $dishSwitch) {
		if ($lunch && $lunch.length) {
			var $dishSwitch = $dishSwitch || $lunch.find('.b-lunch-gselect__dish-switch:checked');			
			var $garnishesAll = $lunch.find('.b-lunch-gselect__garnishes');
			
			var dishName;
			var $garnishes = $();

			if ($dishSwitch.length) {
				dishName = $dishSwitch.data('dish-name');

				if (dishName) {
					$garnishes = $garnishesAll.filter(function() {
						return $(this).data('dish-name') === dishName;
					});
				}
			}

			if ($dishSwitch.length && $garnishes.length) {
				hideGarnishes($lunch, $garnishesAll);
				openGarnishes($lunch, $garnishes);
			} else {
				hideGarnishes($lunch, $garnishesAll);
			}
		}
	}

	function openGarnishes($lunch, $garnishes) {
		$lunch
			.addClass('b-lunch-gselect--garnishes-visible');
		
		$garnishes
			.addClass('b-lunch-gselect__garnishes--visible');
		
		$garnishes.find('.b-lunch-gselect__garnish-switch')
			.prop('disabled', false);
	}

	function hideGarnishes($lunch, $garnishesAll) {
		$lunch
			.removeClass('b-lunch-gselect--garnishes-visible');
		
		$garnishesAll
			.removeClass('b-lunch-gselect__garnishes--visible');
		
		$garnishesAll.find('.b-lunch-gselect__garnish-switch').filter(':not(:disabled)')
			.prop('disabled', true);
	}

}());

// PhotoSwipe Gallery
;(function() {

	var defaults = {
		pswpElement: $('.pswp')[0],
		pswpClass: PhotoSwipeUI_Default,
		options: {
			mainClass: 'pswp--sk-default',
			bgOpacity: 0.8,
			shareEl: false,
			fullscreenEl: false
		}
	}

	var $box = $('.js-combo-dish-pswp-delegate');

	$box.on('click.photoswipe-show', '.combo-dish__image-button', function(e) {
		e.preventDefault();

		var data = $(this).data('gallery');

		show($.extend(true, {}, defaults, data));
	});

	function show(opts) {
		var pswpElement = opts.pswpElement;
		var pswpClass = opts.pswpClass;
		var items = opts.items;
		var options = opts.options;

		var gallery = new PhotoSwipe(pswpElement, pswpClass, items, options);
		gallery.init();
	}

}());