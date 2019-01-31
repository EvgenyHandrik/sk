// Combo dish brief toggle
;(function() {

	$('.js-combo-dbrief-toggle-delegate')
		.on('click.brief-toggle-delegate', '.combo-dish-brief-toggle', function() {
			$button = $(this);
			$dish = $button.closest('.combo-dish');
			$brief = $dish.find('.combo-dish-brief');

			if ($brief.hasClass('combo-dish-brief--isHidden')) {
				$brief.removeClass('combo-dish-brief--isHidden');
				$button.addClass('combo-dish-brief-toggle--isActive');
			} else {
				$brief.addClass('combo-dish-brief--isHidden');
				$button.removeClass('combo-dish-brief-toggle--isActive');
			}
		});

}());