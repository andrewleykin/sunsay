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
		focusOnSelect: true,
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
// Функция для табов на странице Доставка и оплата

(function(){
	var tabs = $('.delivery__dot'),
		items = $('.delivery__item'),
		activeTab = 'delivery__dot--active',
		activeItem = 'delivery__item--active';

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
// Функция для табов на странице Сотрудничество

(function(){
	var tabs = $('.coop__dot'),
		items = $('.coop__item'),
		activeTab = 'coop__dot--active',
		activeItem = 'coop__item--active';

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1haW4tc2xpZGVyLmpzIiwidGVjaC1zbGlkZXIuanMiLCJkaWFncmFtLmpzIiwiY291bnRlci5qcyIsIm1hc2suanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiLCJkaWxpdmVyeS10YWJzLmpzIiwiY29vcC10YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgd293LmpzINC00LvRjyDQsNC90LjQvNCw0YbQuNC4XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdG5ldyBXT1coKS5pbml0KCk7XHJcbn0pKCk7IiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgY29jZW4g0LTQu9GPIGJlZm9yZS9hZnRlclxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHQkKCcuY29jb2VuJykuY29jb2VuKCk7XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0L7QutCw0LfQsCDRgdCy0LNcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHRzdmc0ZXZlcnlib2R5KCk7XHJcbn0pOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINC90LAg0LPQu9Cw0LLQvdC+0LlcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gJCgnLm1haW4tc2xpZGVyX19saXN0JyksXHJcblx0XHRpdGVtcyA9ICQoJy5tYWluLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0aXRlbXNBY3RpdmUgPSAnbWFpbi1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3QgPSAkKCcubWFpbi1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0cHJldiA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tbmV4dCcpLFxyXG5cdFx0ZHVyYXRpb24gPSAyNDAwLFxyXG5cdFx0ZG90QW5pbWF0ZSA9ICdtYWluLXNsaWRlcl9fZG90LS1hbmltYXRlJyxcclxuXHRcdGFuaW1hdGVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFuaW1hdGUpLFxyXG5cdFx0aW5kZXggPSAwO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGl0ZW1zKTtcclxuXHJcblx0dmFyIG1haW5TbGlkZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHJcblx0XHRpbmRleCsrO1xyXG5cclxuXHRcdHZhciByZXFEb3QgPSBkb3QuZXEoaW5kZXgpLFxyXG5cdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0XHRjbGVhcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdHJlcURvdC5hZGRDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0sZHVyYXRpb24pO1xyXG5cclxuXHR2YXIgY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChtYWluU2xpZGVyKTtcclxuXHR9XHJcblxyXG5cdHZhciBtb3ZlID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHRcdHZhciBwZXJjID0gJy0nICsgMTAwICogaW5kZXggKyAnJSc7XHJcblx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoJyArIHBlcmMgKyAnKScpO1xyXG5cdH1cclxuXHJcblx0ZG90LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGNvbnNvbGUubG9nKGluZGV4KTtcclxuXHRcdGluZGV4LS07XHJcblx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0aW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xyXG5cdFx0aW5kZXgrKztcclxuXHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSk7XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INGC0LXRhdC90L7Qu9C+0LPQuNC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgaXRlbXMgPSAkKCcudGVjaC1zbGlkZXJfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAndGVjaC1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3RzID0gJCgnLnRlY2gtc2xpZGVyX19kb3QnKSxcclxuXHRcdGFjdGl2ZURvdHMgPSAndGVjaC1zbGlkZXJfX2RvdC0tYWN0aXZlJyxcclxuXHRcdHByZXYgPSAkKCcudGVjaC1zbGlkZXJfX3ByZXYnKSxcclxuXHRcdG5leHQgPSAkKCcudGVjaC1zbGlkZXJfX25leHQnKTtcclxuXHJcblx0XHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyksXHJcblx0XHRcdFx0aW5kZXggPSBpdGVtQWN0aXZlLmluZGV4KCk7XHJcblxyXG5cdFx0XHRcdGluZGV4LS07XHJcblxyXG5cdFx0XHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSBkb3RzLmxlbmd0aCAtIDE7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKSxcclxuXHRcdFx0XHRpbmRleCA9IGl0ZW1BY3RpdmUuaW5kZXgoKTtcclxuXHJcblx0XHRcdFx0aW5kZXgrKztcclxuXHJcblx0XHRcdFx0aWYoaW5kZXg+PWl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb3RzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKTtcclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LTQuNCw0LPRgNCw0Lwg0L3QsCDRgdGC0YDQsNC90LjRhtC1INGB0YDQsNCy0L3QtdC90LjRj1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGJsb2NrID0gJCgnLmRpYWdyYW1fX2ltZycpLFxyXG5cdFx0Y291bnRlciA9ICQoJy5kaWFncmFtX19wcmljZScpO1xyXG5cclxuXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0dmFyIHNjcm9sbFRvcCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0Zm9yIChpPTA7IGk8YmxvY2subGVuZ3RoO2krKykge1xyXG5cdFx0XHR2YXIgYmxvY2tFcSA9IGJsb2NrLmVxKGkpLFxyXG5cdFx0XHRcdGNvdW50ZXJFcSA9IGNvdW50ZXIuZXEoaSksXHJcblx0XHRcdFx0cGFyZW50ID0gY291bnRlckVxLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtJyksXHJcblx0XHRcdFx0aGVpZ2h0ID0gYmxvY2tFcS5hdHRyKCdkYXRhLWhlaWdodCcpLFxyXG5cdFx0XHRcdGRhdGFDb3VudGVyID0gY291bnRlci5lcShpKS5hdHRyKCdkYXRhLWNvdW50ZXInKTtcclxuXHJcblxyXG5cdFx0XHRpZiAoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsIGJsb2NrRXEpKSB7XHJcblx0XHRcdFx0YmxvY2tFcS5hbmltYXRlKHtoZWlnaHQ6MCwgaGVpZ2h0fSwgMTAwMCk7XHJcblx0XHRcdFx0Y291bnRlckVxLmFuaW1hdGUoe251bTogZGF0YUNvdW50ZXIgLSAzfSwge1xyXG5cdFx0XHRcdFx0ZHVyYXRpb246IDEwMDAsXHJcblx0XHRcdFx0XHRzdGVwOiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1wcmljZScpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKSArICcg0YLRi9GBJztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLWNvc3QnKSB8fCB0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1zZXJ2aWNlJykgfHwgdGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tbW9udGgnKSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKSArICcg0YAnO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0dmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGJsb2NrKSB7XHJcblx0XHR2YXIgb2Zmc2V0ID0gYmxvY2sub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHR3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyksXHJcblx0XHRcdHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdpbmRvd01hcmdpbiAtIDgwMCxcclxuXHRcdFx0Ym90dG9tRWRnZSA9IGJsb2NrLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0ICsgMTAwLFxyXG5cdFx0XHRib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuXHRcdHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMFxyXG5cdH1cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHRh9C10YLRh9C40LrQsCBcclxuXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHJcblx0ZnVuY3Rpb24gY2F0YWxvZ0l0ZW1Db3VudGVyKGZpZWxkKXtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBmaWVsZENvdW50ID0gZnVuY3Rpb24oZWwpIHtcclxuXHJcblx0XHRcdFx0dmFyIFxyXG5cdFx0XHRcdFx0Ly8g0JzQuNC9LiDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRtaW4gPSBlbC5kYXRhKCdtaW4nKSB8fCBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvLyDQnNCw0LrRgS4g0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0bWF4ID0gZWwuZGF0YSgnbWF4JykgfHwgZmFsc2UsIFxyXG5cclxuXHRcdFx0XHRcdC8vINCa0L3QvtC/0LrQsCDRg9C80LXQvdGM0YjQtdC90LjRjyDQutC+0Lst0LLQsFxyXG5cdFx0XHRcdFx0ZGVjID0gZWwucHJldignLmRlYycpLCBcclxuXHJcblx0XHRcdFx0XHQvLyDQmtC90L7Qv9C60LAg0YPQstC10LvQuNGH0LXQvdC40Y8g0LrQvtC7LdCy0LBcclxuXHRcdFx0XHRcdGluYyA9IGVsLm5leHQoJy5pbmMnKTtcclxuXHJcblx0XHRcdFx0ZnVuY3Rpb24gaW5pdChlbCkge1xyXG5cdFx0XHRcdFx0aWYoIWVsLmF0dHIoJ2Rpc2FibGVkJykpe1xyXG5cdFx0XHRcdFx0XHRkZWMub24oJ2NsaWNrJywgZGVjcmVtZW50KTtcclxuXHRcdFx0XHRcdFx0aW5jLm9uKCdjbGljaycsIGluY3JlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8g0KPQvNC10L3RjNGI0LjQvCDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBkZWNyZW1lbnQoKSB7XHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsWzBdLnZhbHVlKTtcclxuXHRcdFx0XHRcdFx0dmFsdWUtLTtcclxuXHJcblx0XHRcdFx0XHRcdGlmKCFtaW4gfHwgdmFsdWUgPj0gbWluKSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxbMF0udmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyDQo9Cy0LXQu9C40YfQuNC8INC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGluY3JlbWVudCgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQoZWxbMF0udmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR2YWx1ZSsrO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIW1heCB8fCB2YWx1ZSA8PSBtYXgpIHtcclxuXHRcdFx0XHRcdFx0XHRlbFswXS52YWx1ZSA9IHZhbHVlKys7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpbml0KCQodGhpcykpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JChmaWVsZCkuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZpZWxkQ291bnQoJCh0aGlzKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdGNhdGFsb2dJdGVtQ291bnRlcignLmNvdW50ZXJfX2lucHV0Jyk7XHJcblxyXG5cdCQoJy5jb3VudGVyX19pbnB1dCcpLmJsdXIoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0aWYoISgkLmlzTnVtZXJpYyh2YWx1ZSkpKSB7XHJcblx0XHRcdCQoJy5jb3VudGVyX19pbnB1dCcpLnZhbCgnMScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSkoKTtcclxuIiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC80LDRgdC60Lgg0YLQtdC70LXRhNC+0L3QsCDQsiDQvtGE0L7RgNC80LvQtdC90LjQtSDQt9Cw0LrQsNC30LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJyNwaG9uZScpLm1hc2soXCIrNyAoOTk5KSA5OTktOTktOTlcIilcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0L7RgNC30LjQvdCwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJyNiYXNrZXQtc2Nyb2xsJyksXHJcblx0XHRibG9jayA9ICQoJy5iYXNrZXRfX2Jsb2NrLS1oaWRkZW4nKSxcclxuXHRcdHJvdyA9ICQoJy5iYXNrZXRfX3Jvdy0taGlkZGVuJyksXHJcblx0XHRib2R5ID0gJCgnYm9keSwgaHRtbCcpLFxyXG5cdFx0ZHVyYXRpb24gPSA1MDA7XHJcblxyXG5cclxuXHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRibG9jay5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cclxuXHRcdHJvdy5zbGlkZURvd24oZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ3N0eWxlJywgJ2Rpc3BsYXk6IGZsZXgnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGJsb2NrSGVpZ2h0ID0gJCgnLmJhc2tldC1mb3JtX193cmFwJykub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHRib2R5LmFuaW1hdGUoe3Njcm9sbFRvcDogYmxvY2tIZWlnaHR9LCAxMDAwKTtcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHR9KTtcclxuXHJcblxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINCyINGB0LXQutGG0LjQuCBjYXJkINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutCwINGC0L7QstCw0YDQsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0JCgnLmNhcmRfX2Rpc3BsYXknKS5zbGljayh7XHJcblx0XHRzbGlkZXNUb1Nob3c6IDEsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGFycm93czogdHJ1ZSxcclxuXHRcdGZhZGU6IHRydWUsXHJcblx0XHRhc05hdkZvcjogJy5jYXJkX19tb3JlJ1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuY2FyZF9fbW9yZScpLnNsaWNrKHtcclxuXHRcdHNsaWRlc1RvU2hvdzogNSxcclxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0YXNOYXZGb3I6ICcuY2FyZF9fZGlzcGxheScsXHJcblx0XHRmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L3QuNC20L3QtdCz0L4g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQuFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0JCgnLmNhcmQtc2xpZGVyX19saXN0Jykuc2xpY2soe1xyXG5cdFx0aW5maW5pdGU6IHRydWUsXHJcblx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGNlbnRlck1vZGU6IHRydWUsXHJcblx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlXHJcblx0fSk7XHJcbn0pKCk7XHJcbiIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgtCw0LHQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgdGFicyA9ICQoJy5jYXJkLXRhYnNfX2NvbnRyb2wnKSxcclxuXHRcdGl0ZW1zID0gJCgnLmNhcmQtdGFic19faXRlbScpLFxyXG5cdFx0YWN0aXZlVGFiID0gJ2NhcmQtdGFic19fY29udHJvbC0tYWN0aXZlJyxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAnY2FyZC10YWJzX19pdGVtLS1hY3RpdmUnO1xyXG5cclxuXHRcdHRhYnMuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdHRhYkFjdGl2ZSA9IHRhYnMuZmlsdGVyKCcuJyArIGFjdGl2ZVRhYiksXHJcblx0XHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFUYWIgPSB0YWJzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHR0YWJBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcVRhYi5hZGRDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCU0L7RgdGC0LDQstC60LAg0Lgg0L7Qv9C70LDRgtCwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgdGFicyA9ICQoJy5kZWxpdmVyeV9fZG90JyksXHJcblx0XHRpdGVtcyA9ICQoJy5kZWxpdmVyeV9faXRlbScpLFxyXG5cdFx0YWN0aXZlVGFiID0gJ2RlbGl2ZXJ5X19kb3QtLWFjdGl2ZScsXHJcblx0XHRhY3RpdmVJdGVtID0gJ2RlbGl2ZXJ5X19pdGVtLS1hY3RpdmUnO1xyXG5cclxuXHRcdHRhYnMuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdHRhYkFjdGl2ZSA9IHRhYnMuZmlsdGVyKCcuJyArIGFjdGl2ZVRhYiksXHJcblx0XHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFUYWIgPSB0YWJzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHR0YWJBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcVRhYi5hZGRDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCh0L7RgtGA0YPQtNC90LjRh9C10YHRgtCy0L5cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmNvb3BfX2RvdCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuY29vcF9faXRlbScpLFxyXG5cdFx0YWN0aXZlVGFiID0gJ2Nvb3BfX2RvdC0tYWN0aXZlJyxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAnY29vcF9faXRlbS0tYWN0aXZlJztcclxuXHJcblx0XHR0YWJzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHR0YWJBY3RpdmUgPSB0YWJzLmZpbHRlcignLicgKyBhY3RpdmVUYWIpLFxyXG5cdFx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxVGFiID0gdGFicy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0dGFiQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFUYWIuYWRkQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdH0pO1xyXG59KSgpOyJdfQ==
