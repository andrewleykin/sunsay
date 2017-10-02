// функция для проверки на нажатую галку

(function(){
	var btn = $('.js-check'),
		check = $('.check__input');

		if(check.length) {
			btn.click(function() {
				if(!(check.is(':checked'))) {
					window.alert('Дайте свое согласие на обработку данных!');
					return false;
				}
			});
		}
})();