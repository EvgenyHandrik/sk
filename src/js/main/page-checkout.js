(function() {

	var $container = $('.js-delivery-address-list');
	var $button = $container.find('.cht2-delivery-address-list__add');
	var $select = $container.find('.cht2-delivery-address-list__select-box select');
	var $options = $select.find('option');

	if ($container.length) {
		changeStyle();

		$select.on('change.js-delivery-address-list', function() {
			changeStyle();
		});

		$button.on('click.js-delivery-address-list', function() {
			$options.filter(':selected').removeAttr('selected');
			$options.eq(0).prop('selected', true);
			
			$select
				.trigger('refresh')
				.change();
		});
	}

	function changeStyle() {
		if ($options.index($options.filter(':selected')) == 0) {
			$container
				.addClass('cht2-delivery-address-list--new-address');
		} else {
			$container
				.removeClass('cht2-delivery-address-list--new-address');
		}
	}

}())