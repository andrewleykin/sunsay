// Функция для нижнего слайдера на странице Карточки

(function(){
	$('.card-slider__list').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true
	});
})();
