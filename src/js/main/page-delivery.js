// map switch
;(function() {
	var $container = $('.js-delivery-geography-map-switch');
	var $switch;
	var $buttons;
	var $contentItems;

	if ($container.length) {
		$switch = $container.find('.dg-map-switch');
		$buttons = $switch.find('.dg-map-switch-button');
		$contentItems = $container.find('.dg-map-content__item');

		$container
			.on('click.map-switch-button', '.dg-map-switch-button', function() {
				var index = $buttons.index(this);
				switchTo(index);
			})
			.on('click.map-switch-toggle', '.dg-map-switch-toggle', function() {
				if ($switch.hasClass('dg-map-switch--0')) {
					switchTo(1);
				} else {
					switchTo(0);
				}
			});
	}

	function switchTo(index) {
		$switch
			.removeClass('dg-map-switch--0 dg-map-switch--1')
			.addClass('dg-map-switch--' + index);
		
		$contentItems
			.removeClass('dg-map-content__item--active')
			.eq(index)
				.addClass('dg-map-content__item--active');
	}
}());