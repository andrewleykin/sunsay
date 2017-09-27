// функция для слайдера на странице технологии

(function(){
	var items = $('.tech-slider__item'),
		activeItem = 'tech-slider__item--active',
		dots = $('.tech-slider__dot'),
		activeDots = 'tech-slider__dot--active',
		prev = $('.tech-slider__prev'),
		next = $('.tech-slider__next');

	prev.click(function() {
		var itemActive = items.filter('.' + activeItem),
			dotsActive = dots.filter('.' + activeDots),
			index = itemActive.index();

			index--;

			if(index < 0) {
				index = dots.length - 1;
			}

			var reqItem = items.eq(index),
				reqDots = dots.eq(index);

			itemActive.removeClass(activeItem);
			dotsActive.removeClass(activeDots);
			reqItem.addClass(activeItem);
			reqDots.addClass(activeDots);
	});

	next.click(function() {
		var itemActive = items.filter('.' + activeItem),
			dotsActive = dots.filter('.' + activeDots),
			index = itemActive.index();

			index++;

			if(index>=items.length) {
				index = 0;
			}

			var reqItem = items.eq(index),
				reqDots = dots.eq(index);

			itemActive.removeClass(activeItem);
			dotsActive.removeClass(activeDots);
			reqItem.addClass(activeItem);
			reqDots.addClass(activeDots);
	});

	dots.click(function(){
		var index = $(this).index(),
			itemActive = items.filter('.' + activeItem),
			dotsActive = dots.filter('.' + activeDots);

		var reqItem = items.eq(index),
			reqDots = dots.eq(index);

		itemActive.removeClass(activeItem);
		dotsActive.removeClass(activeDots);
		reqItem.addClass(activeItem);
		reqDots.addClass(activeDots);
	});

})();