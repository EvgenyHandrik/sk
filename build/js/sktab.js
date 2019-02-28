;(function() {

	$('.js-sktab').each(function() {
		var $sktab = $(this);

		var $navItems = $sktab.find('.sktab-nav__item');
		var $contentItems = $sktab.find('.sktab-content__item');

		$sktab
			.on('click.sktab-click-button', '.sktab-nav__button', function() {
				var $button = $(this);
				var $navItem = $button.closest('.sktab-nav__item');
				var index;
				
				if (!$navItem.hasClass('sktab-nav__item--active')) {
					index = $navItems.index($navItem);

					$navItems
						.removeClass('sktab-nav__item--active')
						.eq(index)
							.addClass('sktab-nav__item--active');
					
					$contentItems
						.removeClass('sktab-content__item--active')
						.eq(index)
							.addClass('sktab-content__item--active');
					
					$sktab.trigger('sktab-change', [{
						$activeNavItem: $navItems.eq(index),
						$activeContentItem: $contentItems.eq(index)
					}]);
				}
			});
	})

}());