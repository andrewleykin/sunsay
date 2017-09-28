// Функция для слайдера в секции card на странице Карточка товара

(function(){
	$('.card__display').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: '.card__more, .card-zoom__list',
	});

	$('.card__more').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.card__display, .card-zoom__list',
		centerMode: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: true,
				}
			},
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					centerMode: true,
				}
			}
		]
	});
})();