// Функция для слайдера в секции card на странице Карточка товара

(function(){
	$('.card__display').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: '.card__more',
	}) .magnificPopup({
      type: 'image',
      delegate: 'a:not(.slick-cloned)',
      gallery: {
        enabled: true
      },
      callbacks: {
        open: function() {
          var current = $('.card__display').slick('slickCurrentSlide');
          $('.card__display').magnificPopup('goTo', current);
        },
        beforeClose: function() {
          $('.card__display').slick('slickGoTo', parseInt(this.index));
        }
      }
		});

	$('.card__more').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.card__display',
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					infinite: true
				}
			},
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: true
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true
				}
			}
		]
	});

})();