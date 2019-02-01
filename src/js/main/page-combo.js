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

	var $box = $('.js-combo-c-info');
	
	$box.on('click.combo-c-info', '.combo-c-info__button', function() {
		var $button = $(this);

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