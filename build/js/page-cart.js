// Cutlery-list Toggle
;(function() {
	var $toggle = $('.js-crt2-cutlery-toggle');
	var $container;
	var $list;

	if ($toggle.length) {
		$container = $toggle.closest('.crt2-cutlery');
		$list = $container.find('.crt2-cutlery-list');

		toggle();

		$toggle.on('change', function() {
			toggle();
		});
	}

	function toggle() {
		if ($toggle.prop('checked')) {
			$list.css('display', 'none');
		} else {
			$list.css('display', 'block');
		}
	}
}());