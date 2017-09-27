// Функция для слайдера на главной

(function(){
	var list = $('.main-slider__list'),
		items = $('.main-slider__item'),
		itemsActive = 'main-slider__item--active',
		dot = $('.main-slider__dot'),
		prev = $('.main-slider__control--prev'),
		next = $('.main-slider__control--next'),
		duration = 2400,
		dotAnimate = 'main-slider__dot--animate',
		dotActive = 'main-slider__dot--active',
		animateDot = dot.filter('.' + dotAnimate),
		index = 0;

	var mainSlider = setInterval(function(){
		var activeDot = dot.filter('.' + dotAnimate),
			activeItems = items.filter('.' + itemsActive);

		index++;

		var reqDot = dot.eq(index),
			reqItem = items.eq(index);

		if (index >= items.length) {
			index = 0;
			items.eq(index).addClass(itemsActive);
			dot.eq(index).addClass(dotActive);
			clear();
		}

		move(index);

		activeDot.removeClass(dotAnimate).removeClass(dotActive);
		activeItems.removeClass(itemsActive);
		reqDot.addClass(dotAnimate).addClass(dotActive);
		reqItem.addClass(itemsActive);
	},duration);

	var clear = function(){
		clearInterval(mainSlider);
	}

	var move = function(index) {
		var perc = '-' + 100 * index + '%';
		list.css('transform', 'translateX(' + perc + ')');
	}

	dot.click(function() {
		clear();
		animateDot.removeClass(dotAnimate).removeClass(dotActive);
		var index = $(this).index(),
			activeItems = items.filter('.' + itemsActive),
			activeDot = dot.filter('.' + dotActive);
		move(index);
		activeItems.removeClass(itemsActive);
		activeDot.removeClass(dotActive);
		items.eq(index).addClass(itemsActive);
		dot.eq(index).addClass(dotActive);
	});

	prev.click(function() {
		clear();
		var activeItems = items.filter('.' + itemsActive),
			activeDot = dot.filter('.' + dotActive);
		var index = items.filter('.' + itemsActive).index();
		animateDot.removeClass(dotAnimate).removeClass(dotActive);
		index--;
		if(index < 0) {
			index = items.length - 1;
		}
		move(index);
		activeItems.removeClass(itemsActive);
		activeDot.removeClass(dotActive);
		items.eq(index).addClass(itemsActive);
		dot.eq(index).addClass(dotActive);
	});

	next.click(function() {
		clear();
		var activeItems = items.filter('.' + itemsActive),
			activeDot = dot.filter('.' + dotActive);
		var index = items.filter('.' + itemsActive).index();
		animateDot.removeClass(dotAnimate).removeClass(dotActive);
		index++;
		if(index >= items.length) {
			index = 0;
		}
		move(index);
		activeItems.removeClass(itemsActive);
		activeDot.removeClass(dotActive);
		items.eq(index).addClass(itemsActive);
		dot.eq(index).addClass(dotActive);
	});

	list.swipe( {
		swipeLeft:leftSwipe,
		swipeRight:rightSwipe,
	});
	function leftSwipe(event){
		clear();
		var activeItems = items.filter('.' + itemsActive),
			activeDot = dot.filter('.' + dotActive);
		var index = items.filter('.' + itemsActive).index();
		animateDot.removeClass(dotAnimate).removeClass(dotActive);
		index++;
		if(index >= items.length) {
			index = 0;
		}
		move(index);
		activeItems.removeClass(itemsActive);
		activeDot.removeClass(dotActive);
		items.eq(index).addClass(itemsActive);
		dot.eq(index).addClass(dotActive);
	}
	function rightSwipe(event){
		clear();
		var activeItems = items.filter('.' + itemsActive),
			activeDot = dot.filter('.' + dotActive);
		var index = items.filter('.' + itemsActive).index();
		animateDot.removeClass(dotAnimate).removeClass(dotActive);
		index--;
		if(index < 0) {
			index = items.length - 1;
		}
		move(index);
		activeItems.removeClass(itemsActive);
		activeDot.removeClass(dotActive);
		items.eq(index).addClass(itemsActive);
		dot.eq(index).addClass(dotActive);
	}
})();