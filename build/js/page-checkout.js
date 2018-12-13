;(function() {

	var $group = $('.cht2-delivery-group--address');
	var $container = $('.js-delivery-address-list');
	var $button = $container.find('.cht2-delivery-address-list__add');
	var $select = $container.find('.cht2-delivery-address-list__select-box select');
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
				.addClass('cht2-delivery-address-list--new-address');
			$group
				.addClass('cht2-delivery-group--edit');
		} else {
			$container
				.removeClass('cht2-delivery-address-list--new-address');
			$group
				.removeClass('cht2-delivery-group--edit');
		}
	}

	function addContent() {
		var $li = $container.find('.jq-selectbox__dropdown li');

		$options.each(function(i) {
			var $option = $(this);

			var data = $option.data('opt-content');

			if (data) {
				$li.eq(i).html(data.html);
			}
		})
	}

	function addDropDownHandlers() {
		var $dropDown = $container.find('.jq-selectbox__dropdown');
		var $li = $dropDown.find('li');

		$li
			.off('mouseover mouseout mouseenter.js-delivery-address-list')
			.on('mouseenter.js-delivery-address-list', function() {
				$li.removeClass('selected');
			});
		
		$dropDown
			.off('mouseover mouseout mouseleave.js-delivery-address-list')
			.on('mouseleave.js-delivery-address-list', function() {
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