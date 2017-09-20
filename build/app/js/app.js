// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();
// Библиотека cocen для before/after

(function () {
	$('.cocoen').cocoen();
})();
// функция для показа свг

$(function(){
	svg4everybody();
});
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
		animateDot = dot.filter('.' + dotAnimate),
		index = 0;

		console.log(items);

	var mainSlider = setInterval(function(){
		var activeDot = dot.filter('.' + dotAnimate),
			activeItems = items.filter('.' + itemsActive);

		index++;

		var reqDot = dot.eq(index),
			reqItem = items.eq(index);

		if (index >= items.length) {
			index = 0;
			items.eq(index).addClass(itemsActive);
			clear();
		}

		move(index);

		activeDot.removeClass(dotAnimate);
		activeItems.removeClass(itemsActive);
		reqDot.addClass(dotAnimate);
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
		animateDot.removeClass(dotAnimate);
		var index = $(this).index(),
			activeItems = items.filter('.' + itemsActive);
		move(index);
		activeItems.removeClass(itemsActive);
		items.eq(index).addClass(itemsActive);
	});

	prev.click(function() {
		clear();
		var activeItems = items.filter('.' + itemsActive);
		var index = items.filter('.' + itemsActive).index();
		animateDot.removeClass(dotAnimate);
		console.log(index);
		index--;
		if(index < 0) {
			index = items.length - 1;
		}
		move(index);
		activeItems.removeClass(itemsActive);
		items.eq(index).addClass(itemsActive);
	});

	next.click(function() {
		clear();
		var activeItems = items.filter('.' + itemsActive);
		var index = items.filter('.' + itemsActive).index();
		animateDot.removeClass(dotAnimate);
		console.log(index);
		index++;
		if(index >= items.length) {
			index = 0;
		}
		move(index);
		activeItems.removeClass(itemsActive);
		items.eq(index).addClass(itemsActive);
	});
})();
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
// Функция для диаграм на странице сравнения

(function(){
	var block = $('.diagram__img'),
		counter = $('.diagram__price');


	$(window).scroll(function() {
		
		var scrollTop = $(this).scrollTop();

		for (i=0; i<block.length;i++) {
			var blockEq = block.eq(i),
				counterEq = counter.eq(i),
				parent = counterEq.closest('.diagram__item'),
				height = blockEq.attr('data-height'),
				dataCounter = counter.eq(i).attr('data-counter');


			if (checkDistance(scrollTop, blockEq)) {
				blockEq.animate({height:0, height}, 1000);
				counterEq.animate({num: dataCounter - 3}, {
					duration: 1000,
					step: function (num) {
						if (this.closest('.diagram__item--price')) {
							this.innerHTML = (num + 3).toFixed(0) + ' тыс';
						} else if(this.closest('.diagram__item--cost') || this.closest('.diagram__item--service') || this.closest('.diagram__item--month')){
							this.innerHTML = (num + 3).toFixed(0) + ' р';
						} else {
							this.innerHTML = (num + 3).toFixed(0);
						}
					}
				});
			}
		}
	});


	var checkDistance = function(scrollTop, block) {
		var offset = block.offset().top,
			windowMargin = Math.ceil($(window).height() / 3),
			topBorder = offset - scrollTop - windowMargin - 800,
			bottomEdge = block.outerHeight(true) + offset + 100,
			bottomBorder = scrollTop + windowMargin - bottomEdge;

		return topBorder <= 0 && bottomBorder <= 0
	}
})();
// Функция для счетчика 


(function(){

	function catalogItemCounter(field){
			
			var fieldCount = function(el) {

				var 
					// Мин. значение
					min = el.data('min') || false,

					// Макс. значение
					max = el.data('max') || false, 

					// Кнопка уменьшения кол-ва
					dec = el.prev('.dec'), 

					// Кнопка увеличения кол-ва
					inc = el.next('.inc');

				function init(el) {
					if(!el.attr('disabled')){
						dec.on('click', decrement);
						inc.on('click', increment);
					}

					// Уменьшим значение
					function decrement() {
						var value = parseInt(el[0].value);
						value--;

						if(!min || value >= min) {
							el[0].value = value;
						}
					};

					// Увеличим значение
					function increment() {
						var value = parseInt(el[0].value);
							
						value++;

						if(!max || value <= max) {
							el[0].value = value++;
						}
					};
					
				}

				el.each(function() {
					init($(this));
				});
			};

			$(field).each(function(){
				fieldCount($(this));
			});
		}
	catalogItemCounter('.counter__input');

	$('.counter__input').blur(function() {
		var value = $(this).val();
		if(!($.isNumeric(value))) {
			$('.counter__input').val('1');
		}
	});

})();

// Функция для маски телефона в оформление заказа

(function(){
	$('#phone').mask("+7 (999) 999-99-99")
})();
// Функция для скролла на странице Корзина

(function(){
	var link = $('#basket-scroll'),
		block = $('.basket__block--hidden'),
		row = $('.basket__row--hidden'),
		body = $('body, html'),
		duration = 500;


	link.click(function(e) {
		e.preventDefault();

		block.slideDown(duration);

		row.slideDown(duration, function() {
			$(this).attr('style', 'display: flex');
		});

		setTimeout(function(){
			var blockHeight = $('.basket-form__wrap').offset().top;
			body.animate({scrollTop: blockHeight}, 1000);
		}, duration);
	});


})();
// Функция для слайдера в секции card на странице Карточка товара

(function(){
	$('.card__display').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: '.card__more'
	});

	$('.card__more').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.card__display',
		focusOnSelect: true
	});
})();
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

// Функция для табов на странице Карточки

(function(){
	var tabs = $('.card-tabs__control'),
		items = $('.card-tabs__item'),
		activeTab = 'card-tabs__control--active',
		activeItem = 'card-tabs__item--active';

		tabs.click(function() {
			var index = $(this).index(),
				itemActive = items.filter('.' + activeItem),
				tabActive = tabs.filter('.' + activeTab),
				reqItem = items.eq(index),
				reqTab = tabs.eq(index);

				itemActive.removeClass(activeItem);
				tabActive.removeClass(activeTab);
				reqItem.addClass(activeItem);
				reqTab.addClass(activeTab);
		});
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1haW4tc2xpZGVyLmpzIiwidGVjaC1zbGlkZXIuanMiLCJkaWFncmFtLmpzIiwiY291bnRlci5qcyIsIm1hc2suanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIHdvdy5qcyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuFxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHRuZXcgV09XKCkuaW5pdCgpO1xyXG59KSgpOyIsIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIGNvY2VuINC00LvRjyBiZWZvcmUvYWZ0ZXJcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0JCgnLmNvY29lbicpLmNvY29lbigpO1xyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C+0LrQsNC30LAg0YHQstCzXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINCz0LvQsNCy0L3QvtC5XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9ICQoJy5tYWluLXNsaWRlcl9fbGlzdCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcubWFpbi1zbGlkZXJfX2l0ZW0nKSxcclxuXHRcdGl0ZW1zQWN0aXZlID0gJ21haW4tc2xpZGVyX19pdGVtLS1hY3RpdmUnLFxyXG5cdFx0ZG90ID0gJCgnLm1haW4tc2xpZGVyX19kb3QnKSxcclxuXHRcdHByZXYgPSAkKCcubWFpbi1zbGlkZXJfX2NvbnRyb2wtLXByZXYnKSxcclxuXHRcdG5leHQgPSAkKCcubWFpbi1zbGlkZXJfX2NvbnRyb2wtLW5leHQnKSxcclxuXHRcdGR1cmF0aW9uID0gMjQwMCxcclxuXHRcdGRvdEFuaW1hdGUgPSAnbWFpbi1zbGlkZXJfX2RvdC0tYW5pbWF0ZScsXHJcblx0XHRhbmltYXRlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBbmltYXRlKSxcclxuXHRcdGluZGV4ID0gMDtcclxuXHJcblx0XHRjb25zb2xlLmxvZyhpdGVtcyk7XHJcblxyXG5cdHZhciBtYWluU2xpZGVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFuaW1hdGUpLFxyXG5cdFx0XHRhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblxyXG5cdFx0aW5kZXgrKztcclxuXHJcblx0XHR2YXIgcmVxRG90ID0gZG90LmVxKGluZGV4KSxcclxuXHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KTtcclxuXHJcblx0XHRpZiAoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gMDtcclxuXHRcdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdFx0Y2xlYXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRyZXFEb3QuYWRkQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHRyZXFJdGVtLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9LGR1cmF0aW9uKTtcclxuXHJcblx0dmFyIGNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHRcdGNsZWFySW50ZXJ2YWwobWFpblNsaWRlcik7XHJcblx0fVxyXG5cclxuXHR2YXIgbW92ZSA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHR2YXIgcGVyYyA9ICctJyArIDEwMCAqIGluZGV4ICsgJyUnO1xyXG5cdFx0bGlzdC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKCcgKyBwZXJjICsgJyknKTtcclxuXHR9XHJcblxyXG5cdGRvdC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSk7XHJcblxyXG5cdHByZXYuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHRjb25zb2xlLmxvZyhpbmRleCk7XHJcblx0XHRpbmRleC0tO1xyXG5cdFx0aWYoaW5kZXggPCAwKSB7XHJcblx0XHRcdGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0bmV4dC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGNvbnNvbGUubG9nKGluZGV4KTtcclxuXHRcdGluZGV4Kys7XHJcblx0XHRpZihpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0pO1xyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDRgtC10YXQvdC+0LvQvtCz0LjQuFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGl0ZW1zID0gJCgnLnRlY2gtc2xpZGVyX19pdGVtJyksXHJcblx0XHRhY3RpdmVJdGVtID0gJ3RlY2gtc2xpZGVyX19pdGVtLS1hY3RpdmUnLFxyXG5cdFx0ZG90cyA9ICQoJy50ZWNoLXNsaWRlcl9fZG90JyksXHJcblx0XHRhY3RpdmVEb3RzID0gJ3RlY2gtc2xpZGVyX19kb3QtLWFjdGl2ZScsXHJcblx0XHRwcmV2ID0gJCgnLnRlY2gtc2xpZGVyX19wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLnRlY2gtc2xpZGVyX19uZXh0Jyk7XHJcblxyXG5cdFx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpLFxyXG5cdFx0XHRcdGluZGV4ID0gaXRlbUFjdGl2ZS5pbmRleCgpO1xyXG5cclxuXHRcdFx0XHRpbmRleC0tO1xyXG5cclxuXHRcdFx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0XHRcdGluZGV4ID0gZG90cy5sZW5ndGggLSAxO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyksXHJcblx0XHRcdFx0aW5kZXggPSBpdGVtQWN0aXZlLmluZGV4KCk7XHJcblxyXG5cdFx0XHRcdGluZGV4Kys7XHJcblxyXG5cdFx0XHRcdGlmKGluZGV4Pj1pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGluZGV4ID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG90cy5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyk7XHJcblxyXG5cdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC00LjQsNCz0YDQsNC8INC90LAg0YHRgtGA0LDQvdC40YbQtSDRgdGA0LDQstC90LXQvdC40Y9cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBibG9jayA9ICQoJy5kaWFncmFtX19pbWcnKSxcclxuXHRcdGNvdW50ZXIgPSAkKCcuZGlhZ3JhbV9fcHJpY2UnKTtcclxuXHJcblxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdHZhciBzY3JvbGxUb3AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdGZvciAoaT0wOyBpPGJsb2NrLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0dmFyIGJsb2NrRXEgPSBibG9jay5lcShpKSxcclxuXHRcdFx0XHRjb3VudGVyRXEgPSBjb3VudGVyLmVxKGkpLFxyXG5cdFx0XHRcdHBhcmVudCA9IGNvdW50ZXJFcS5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbScpLFxyXG5cdFx0XHRcdGhlaWdodCA9IGJsb2NrRXEuYXR0cignZGF0YS1oZWlnaHQnKSxcclxuXHRcdFx0XHRkYXRhQ291bnRlciA9IGNvdW50ZXIuZXEoaSkuYXR0cignZGF0YS1jb3VudGVyJyk7XHJcblxyXG5cclxuXHRcdFx0aWYgKGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wLCBibG9ja0VxKSkge1xyXG5cdFx0XHRcdGJsb2NrRXEuYW5pbWF0ZSh7aGVpZ2h0OjAsIGhlaWdodH0sIDEwMDApO1xyXG5cdFx0XHRcdGNvdW50ZXJFcS5hbmltYXRlKHtudW06IGRhdGFDb3VudGVyIC0gM30sIHtcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxyXG5cdFx0XHRcdFx0c3RlcDogZnVuY3Rpb24gKG51bSkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tcHJpY2UnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCkgKyAnINGC0YvRgSc7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZih0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1jb3N0JykgfHwgdGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tc2VydmljZScpIHx8IHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLW1vbnRoJykpe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCkgKyAnINGAJztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdHZhciBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24oc2Nyb2xsVG9wLCBibG9jaykge1xyXG5cdFx0dmFyIG9mZnNldCA9IGJsb2NrLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0d2luZG93TWFyZ2luID0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpLFxyXG5cdFx0XHR0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW4gLSA4MDAsXHJcblx0XHRcdGJvdHRvbUVkZ2UgPSBibG9jay5vdXRlckhlaWdodCh0cnVlKSArIG9mZnNldCArIDEwMCxcclxuXHRcdFx0Ym90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcblx0XHRyZXR1cm4gdG9wQm9yZGVyIDw9IDAgJiYgYm90dG9tQm9yZGVyIDw9IDBcclxuXHR9XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0YfQtdGC0YfQuNC60LAgXHJcblxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdGZ1bmN0aW9uIGNhdGFsb2dJdGVtQ291bnRlcihmaWVsZCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZmllbGRDb3VudCA9IGZ1bmN0aW9uKGVsKSB7XHJcblxyXG5cdFx0XHRcdHZhciBcclxuXHRcdFx0XHRcdC8vINCc0LjQvS4g0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0bWluID0gZWwuZGF0YSgnbWluJykgfHwgZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0Ly8g0JzQsNC60YEuINC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdG1heCA9IGVsLmRhdGEoJ21heCcpIHx8IGZhbHNlLCBcclxuXHJcblx0XHRcdFx0XHQvLyDQmtC90L7Qv9C60LAg0YPQvNC10L3RjNGI0LXQvdC40Y8g0LrQvtC7LdCy0LBcclxuXHRcdFx0XHRcdGRlYyA9IGVsLnByZXYoJy5kZWMnKSwgXHJcblxyXG5cdFx0XHRcdFx0Ly8g0JrQvdC+0L/QutCwINGD0LLQtdC70LjRh9C10L3QuNGPINC60L7Quy3QstCwXHJcblx0XHRcdFx0XHRpbmMgPSBlbC5uZXh0KCcuaW5jJyk7XHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGluaXQoZWwpIHtcclxuXHRcdFx0XHRcdGlmKCFlbC5hdHRyKCdkaXNhYmxlZCcpKXtcclxuXHRcdFx0XHRcdFx0ZGVjLm9uKCdjbGljaycsIGRlY3JlbWVudCk7XHJcblx0XHRcdFx0XHRcdGluYy5vbignY2xpY2snLCBpbmNyZW1lbnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vINCj0LzQtdC90YzRiNC40Lwg0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gZGVjcmVtZW50KCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUludChlbFswXS52YWx1ZSk7XHJcblx0XHRcdFx0XHRcdHZhbHVlLS07XHJcblxyXG5cdFx0XHRcdFx0XHRpZighbWluIHx8IHZhbHVlID49IG1pbikge1xyXG5cdFx0XHRcdFx0XHRcdGVsWzBdLnZhbHVlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8g0KPQstC10LvQuNGH0LjQvCDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBpbmNyZW1lbnQoKSB7XHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsWzBdLnZhbHVlKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0dmFsdWUrKztcclxuXHJcblx0XHRcdFx0XHRcdGlmKCFtYXggfHwgdmFsdWUgPD0gbWF4KSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxbMF0udmFsdWUgPSB2YWx1ZSsrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aW5pdCgkKHRoaXMpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCQoZmllbGQpLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmaWVsZENvdW50KCQodGhpcykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRjYXRhbG9nSXRlbUNvdW50ZXIoJy5jb3VudGVyX19pbnB1dCcpO1xyXG5cclxuXHQkKCcuY291bnRlcl9faW5wdXQnKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcclxuXHRcdGlmKCEoJC5pc051bWVyaWModmFsdWUpKSkge1xyXG5cdFx0XHQkKCcuY291bnRlcl9faW5wdXQnKS52YWwoJzEnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvNCw0YHQutC4INGC0LXQu9C10YTQvtC90LAg0LIg0L7RhNC+0YDQvNC70LXQvdC40LUg0LfQsNC60LDQt9CwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcjcGhvbmUnKS5tYXNrKFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIpXHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LrRgNC+0LvQu9CwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtC+0YDQt9C40L3QsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcjYmFza2V0LXNjcm9sbCcpLFxyXG5cdFx0YmxvY2sgPSAkKCcuYmFza2V0X19ibG9jay0taGlkZGVuJyksXHJcblx0XHRyb3cgPSAkKCcuYmFza2V0X19yb3ctLWhpZGRlbicpLFxyXG5cdFx0Ym9keSA9ICQoJ2JvZHksIGh0bWwnKSxcclxuXHRcdGR1cmF0aW9uID0gNTAwO1xyXG5cclxuXHJcblx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0YmxvY2suc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHJcblx0XHRyb3cuc2xpZGVEb3duKGR1cmF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdzdHlsZScsICdkaXNwbGF5OiBmbGV4Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBibG9ja0hlaWdodCA9ICQoJy5iYXNrZXQtZm9ybV9fd3JhcCcpLm9mZnNldCgpLnRvcDtcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IGJsb2NrSGVpZ2h0fSwgMTAwMCk7XHJcblx0XHR9LCBkdXJhdGlvbik7XHJcblx0fSk7XHJcblxyXG5cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQsiDRgdC10LrRhtC40LggY2FyZCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQsCDRgtC+0LLQsNGA0LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJy5jYXJkX19kaXNwbGF5Jykuc2xpY2soe1xyXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRhcnJvd3M6IHRydWUsXHJcblx0XHRmYWRlOiB0cnVlLFxyXG5cdFx0YXNOYXZGb3I6ICcuY2FyZF9fbW9yZSdcclxuXHR9KTtcclxuXHJcblx0JCgnLmNhcmRfX21vcmUnKS5zbGljayh7XHJcblx0XHRzbGlkZXNUb1Nob3c6IDUsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGFzTmF2Rm9yOiAnLmNhcmRfX2Rpc3BsYXknLFxyXG5cdFx0Zm9jdXNPblNlbGVjdDogdHJ1ZVxyXG5cdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvdC40LbQvdC10LPQviDRgdC70LDQudC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcuY2FyZC1zbGlkZXJfX2xpc3QnKS5zbGljayh7XHJcblx0XHRpbmZpbml0ZTogdHJ1ZSxcclxuXHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0Y2VudGVyTW9kZTogdHJ1ZSxcclxuXHRcdHZhcmlhYmxlV2lkdGg6IHRydWVcclxuXHR9KTtcclxufSkoKTtcclxuIiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmNhcmQtdGFic19fY29udHJvbCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuY2FyZC10YWJzX19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnY2FyZC10YWJzX19jb250cm9sLS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdjYXJkLXRhYnNfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiXX0=
