// Функция для скролла на странице Корзина

(function(){
	var link = $('#basket-scroll'),
		body = $('body, html'),
		block = $('.basket-form__tile').offset().top;


		link.click(function(e) {
			e.preventDefault();

			$('body, html').animate({scrollTop: block}, 1000);
		});

})();