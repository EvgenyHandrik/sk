// week tab
;(function() {
	var $container = $('.js-corp-catering-menu-week-tab');
	var $tabButtons;
	var $tabItems;
	var $contentItems;

	if ($container.length) {
		$tabButtons = $container.find('.cc-menu-week-tab__button');
		$tabItems = $container.find('.cc-menu-week-tab__item');
		$contentItems = $container.find('.cc-menu-week-content__item');

		$container.on('click.week-tab', '.cc-menu-week-tab__button', function() {
			var $button = $(this);
			var index = $tabButtons.index($button);

			$tabItems
				.removeClass('cc-menu-week-tab__item--active')
				.eq(index)
					.addClass('cc-menu-week-tab__item--active');
			
			$contentItems
				.removeClass('cc-menu-week-content__item--active')
				.eq(index)
					.addClass('cc-menu-week-content__item--active');

		});
	}
}());

// menu accordion
(function() {
	var $accordion = $('.js-corp-catering-menu-accordion');
	var $prev;

	if ($accordion.length) {
		$prev = $accordion.find('.cc-menu-accordion__item--active')
		
		$accordion.on('click.menu-accordion', '.cc-menu-accordion__button', function() {
			var $button = $(this);
			var $item = $button.closest('.cc-menu-accordion__item');

			if ($item.hasClass('cc-menu-accordion__item--active')) {
				$item.removeClass('cc-menu-accordion__item--active');
				$prev = $();
			} else {
				$prev.removeClass('cc-menu-accordion__item--active');
				
				$item.addClass('cc-menu-accordion__item--active');
				$prev = $item;
			}
		});
	}
}());

// type tab
(function() {
	var $containers = $('.js-corp-catering-menu-type-tab');

	if ($containers.length) {
		$containers.each(function() {
			init($(this));
		});
	}

	function init($container) {
		if (!$container[0].menuTypeTabs) {
			$container[0].menuTypeTabs = {
				$tabItems: $container.find('.cc-menu-type-tab__item'),
				$tabButtons: $container.find('.cc-menu-type-tab__button'),
				$contentItems: $container.find('.cc-menu-type-content__item')
			}
	
			addHandlers($container);
		}		
	}
	
	function addHandlers($container) {
		$container
			.on('click.menu-type-tab-button', '.cc-menu-type-tab__button', function() {
				buttonClickHandler($container, $(this));
			});
	}

	function buttonClickHandler($container, $button) {
		var index = $container[0].menuTypeTabs.$tabButtons.index($button);
		
		$containers.each(function() {
			openTab($(this), index);
		});
	}	

	function openTab($container, index) {
		var $tabItems = $container[0].menuTypeTabs.$tabItems;
		var $contentItems = $container[0].menuTypeTabs.$contentItems;

		$tabItems
			.removeClass('cc-menu-type-tab__item--active')
			.eq(index)
				.addClass('cc-menu-type-tab__item--active');
	
		$contentItems
			.removeClass('cc-menu-type-content__item--active')
			.eq(index)
				.addClass('cc-menu-type-content__item--active');
	}

}());

// order comment toggle
(function() {
	var $container = $('.js-cc-order-form-comment-toggle');

	if ($container.length) {
		$container.on('click.comment-toggle', '.cc-order-form-comment__toggle', function() {
			if ($container.hasClass('cc-order-form-comment--open')) {
				$container.removeClass('cc-order-form-comment--open');
			} else {
				$container.addClass('cc-order-form-comment--open');
			}
		});
	}

}())