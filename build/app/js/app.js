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
// Функция для меню в header

(function(){
	var link = $('.header__btn'),
		list = $('.header__list '),
		activeLink = 'header__btn--active'
		flag = true;

	link.click(function() {
		if (flag) {
			link.addClass(activeLink);
			list.slideDown(500);
			flag = false;
		} else {
			link.removeClass(activeLink);
			list.slideUp('500', function() {
				setTimeout(function(){
					list.removeAttr('style');
				},500);
			});
			flag = true;
		}
	});
})();
// Функция для footer

(function(){
	var link = $('.footer__title'),
		activeLink = 'footer__title--active',
		duration = 400;

		link.click(function() {
			var findBlock = $(this).next('.footer__block-wrap'),
				findWrapper = $(this).closest('.footer__top');

			if (findBlock.is(':visible')) {
				findBlock.slideUp(duration);
				link.removeClass(activeLink);
			} else {
				findWrapper.find('.footer__block-wrap').slideUp(duration);
				findBlock.slideDown(duration);
				link.removeClass(activeLink);
				$(this).addClass(activeLink);
			}
		});
})();
// Функция для menu на странице Каталог отопления

(function(){
	var link = $('.heating__subtitle'),
		activeLink = 'heating__subtitle--active',
		list = $('.heating__menu').children('.footer__list');
		duration = 400,
		flag = true;

		link.click(function() {
			if (flag) {
				link.addClass(activeLink);
				list.slideDown(duration);
				flag = false;
			} else {
				link.removeClass(activeLink);
				list.slideUp(duration, function() {
					setTimeout(function(){
						list.removeAttr('style');
					},duration);
				});
				flag = true;
			}
		});
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1haW4tc2xpZGVyLmpzIiwidGVjaC1zbGlkZXIuanMiLCJkaWFncmFtLmpzIiwiY291bnRlci5qcyIsIm1hc2suanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiLCJkaWxpdmVyeS10YWJzLmpzIiwiY29vcC10YWJzLmpzIiwibWVudS5qcyIsImZvb3Rlci5qcyIsImhlYXRpbmctbWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDQkdC40LHQu9C40L7RgtC10LrQsCB3b3cuanMg0LTQu9GPINCw0L3QuNC80LDRhtC40LhcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0bmV3IFdPVygpLmluaXQoKTtcclxufSkoKTsiLCIvLyDQkdC40LHQu9C40L7RgtC10LrQsCBjb2NlbiDQtNC70Y8gYmVmb3JlL2FmdGVyXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdCQoJy5jb2NvZW4nKS5jb2NvZW4oKTtcclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC60LDQt9CwINGB0LLQs1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdHN2ZzRldmVyeWJvZHkoKTtcclxufSk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0L3QsCDQs9C70LDQstC90L7QuVxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSAkKCcubWFpbi1zbGlkZXJfX2xpc3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLm1haW4tc2xpZGVyX19pdGVtJyksXHJcblx0XHRpdGVtc0FjdGl2ZSA9ICdtYWluLXNsaWRlcl9faXRlbS0tYWN0aXZlJyxcclxuXHRcdGRvdCA9ICQoJy5tYWluLXNsaWRlcl9fZG90JyksXHJcblx0XHRwcmV2ID0gJCgnLm1haW4tc2xpZGVyX19jb250cm9sLS1wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLm1haW4tc2xpZGVyX19jb250cm9sLS1uZXh0JyksXHJcblx0XHRkdXJhdGlvbiA9IDI0MDAsXHJcblx0XHRkb3RBbmltYXRlID0gJ21haW4tc2xpZGVyX19kb3QtLWFuaW1hdGUnLFxyXG5cdFx0YW5pbWF0ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRpbmRleCA9IDA7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coaXRlbXMpO1xyXG5cclxuXHR2YXIgbWFpblNsaWRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBbmltYXRlKSxcclxuXHRcdFx0YWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cclxuXHRcdGluZGV4Kys7XHJcblxyXG5cdFx0dmFyIHJlcURvdCA9IGRvdC5lcShpbmRleCksXHJcblx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCk7XHJcblxyXG5cdFx0aWYgKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRcdGNsZWFyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW92ZShpbmRleCk7XHJcblxyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0cmVxRG90LmFkZENsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSxkdXJhdGlvbik7XHJcblxyXG5cdHZhciBjbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjbGVhckludGVydmFsKG1haW5TbGlkZXIpO1xyXG5cdH1cclxuXHJcblx0dmFyIG1vdmUgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0dmFyIHBlcmMgPSAnLScgKyAxMDAgKiBpbmRleCArICclJztcclxuXHRcdGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgcGVyYyArICcpJyk7XHJcblx0fVxyXG5cclxuXHRkb3QuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0YWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xyXG5cdFx0aW5kZXgtLTtcclxuXHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSk7XHJcblxyXG5cdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHRjb25zb2xlLmxvZyhpbmRleCk7XHJcblx0XHRpbmRleCsrO1xyXG5cdFx0aWYoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gMDtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9KTtcclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0YLQtdGF0L3QvtC70L7Qs9C40LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBpdGVtcyA9ICQoJy50ZWNoLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICd0ZWNoLXNsaWRlcl9faXRlbS0tYWN0aXZlJyxcclxuXHRcdGRvdHMgPSAkKCcudGVjaC1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0YWN0aXZlRG90cyA9ICd0ZWNoLXNsaWRlcl9fZG90LS1hY3RpdmUnLFxyXG5cdFx0cHJldiA9ICQoJy50ZWNoLXNsaWRlcl9fcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy50ZWNoLXNsaWRlcl9fbmV4dCcpO1xyXG5cclxuXHRcdHByZXYuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKSxcclxuXHRcdFx0XHRpbmRleCA9IGl0ZW1BY3RpdmUuaW5kZXgoKTtcclxuXHJcblx0XHRcdFx0aW5kZXgtLTtcclxuXHJcblx0XHRcdFx0aWYoaW5kZXggPCAwKSB7XHJcblx0XHRcdFx0XHRpbmRleCA9IGRvdHMubGVuZ3RoIC0gMTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bmV4dC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpLFxyXG5cdFx0XHRcdGluZGV4ID0gaXRlbUFjdGl2ZS5pbmRleCgpO1xyXG5cclxuXHRcdFx0XHRpbmRleCsrO1xyXG5cclxuXHRcdFx0XHRpZihpbmRleD49aXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvdHMuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpO1xyXG5cclxuXHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQtNC40LDQs9GA0LDQvCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0YHRgNCw0LLQvdC10L3QuNGPXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgYmxvY2sgPSAkKCcuZGlhZ3JhbV9faW1nJyksXHJcblx0XHRjb3VudGVyID0gJCgnLmRpYWdyYW1fX3ByaWNlJyk7XHJcblxyXG5cclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHR2YXIgc2Nyb2xsVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRmb3IgKGk9MDsgaTxibG9jay5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdHZhciBibG9ja0VxID0gYmxvY2suZXEoaSksXHJcblx0XHRcdFx0Y291bnRlckVxID0gY291bnRlci5lcShpKSxcclxuXHRcdFx0XHRwYXJlbnQgPSBjb3VudGVyRXEuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0nKSxcclxuXHRcdFx0XHRoZWlnaHQgPSBibG9ja0VxLmF0dHIoJ2RhdGEtaGVpZ2h0JyksXHJcblx0XHRcdFx0ZGF0YUNvdW50ZXIgPSBjb3VudGVyLmVxKGkpLmF0dHIoJ2RhdGEtY291bnRlcicpO1xyXG5cclxuXHJcblx0XHRcdGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgYmxvY2tFcSkpIHtcclxuXHRcdFx0XHRibG9ja0VxLmFuaW1hdGUoe2hlaWdodDowLCBoZWlnaHR9LCAxMDAwKTtcclxuXHRcdFx0XHRjb3VudGVyRXEuYW5pbWF0ZSh7bnVtOiBkYXRhQ291bnRlciAtIDN9LCB7XHJcblx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcclxuXHRcdFx0XHRcdHN0ZXA6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLXByaWNlJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApICsgJyDRgtGL0YEnO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYodGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tY29zdCcpIHx8IHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLXNlcnZpY2UnKSB8fCB0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1tb250aCcpKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApICsgJyDRgCc7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHR2YXIgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCwgYmxvY2spIHtcclxuXHRcdHZhciBvZmZzZXQgPSBibG9jay5vZmZzZXQoKS50b3AsXHJcblx0XHRcdHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKSxcclxuXHRcdFx0dG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luIC0gODAwLFxyXG5cdFx0XHRib3R0b21FZGdlID0gYmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQgKyAxMDAsXHJcblx0XHRcdGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG5cdFx0cmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwXHJcblx0fVxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdGH0LXRgtGH0LjQutCwIFxyXG5cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cclxuXHRmdW5jdGlvbiBjYXRhbG9nSXRlbUNvdW50ZXIoZmllbGQpe1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGZpZWxkQ291bnQgPSBmdW5jdGlvbihlbCkge1xyXG5cclxuXHRcdFx0XHR2YXIgXHJcblx0XHRcdFx0XHQvLyDQnNC40L0uINC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdG1pbiA9IGVsLmRhdGEoJ21pbicpIHx8IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8vINCc0LDQutGBLiDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRtYXggPSBlbC5kYXRhKCdtYXgnKSB8fCBmYWxzZSwgXHJcblxyXG5cdFx0XHRcdFx0Ly8g0JrQvdC+0L/QutCwINGD0LzQtdC90YzRiNC10L3QuNGPINC60L7Quy3QstCwXHJcblx0XHRcdFx0XHRkZWMgPSBlbC5wcmV2KCcuZGVjJyksIFxyXG5cclxuXHRcdFx0XHRcdC8vINCa0L3QvtC/0LrQsCDRg9Cy0LXQu9C40YfQtdC90LjRjyDQutC+0Lst0LLQsFxyXG5cdFx0XHRcdFx0aW5jID0gZWwubmV4dCgnLmluYycpO1xyXG5cclxuXHRcdFx0XHRmdW5jdGlvbiBpbml0KGVsKSB7XHJcblx0XHRcdFx0XHRpZighZWwuYXR0cignZGlzYWJsZWQnKSl7XHJcblx0XHRcdFx0XHRcdGRlYy5vbignY2xpY2snLCBkZWNyZW1lbnQpO1xyXG5cdFx0XHRcdFx0XHRpbmMub24oJ2NsaWNrJywgaW5jcmVtZW50KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyDQo9C80LXQvdGM0YjQuNC8INC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGRlY3JlbWVudCgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQoZWxbMF0udmFsdWUpO1xyXG5cdFx0XHRcdFx0XHR2YWx1ZS0tO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIW1pbiB8fCB2YWx1ZSA+PSBtaW4pIHtcclxuXHRcdFx0XHRcdFx0XHRlbFswXS52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vINCj0LLQtdC70LjRh9C40Lwg0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gaW5jcmVtZW50KCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUludChlbFswXS52YWx1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhbHVlKys7XHJcblxyXG5cdFx0XHRcdFx0XHRpZighbWF4IHx8IHZhbHVlIDw9IG1heCkge1xyXG5cdFx0XHRcdFx0XHRcdGVsWzBdLnZhbHVlID0gdmFsdWUrKztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWwuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGluaXQoJCh0aGlzKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkKGZpZWxkKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0ZmllbGRDb3VudCgkKHRoaXMpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0Y2F0YWxvZ0l0ZW1Db3VudGVyKCcuY291bnRlcl9faW5wdXQnKTtcclxuXHJcblx0JCgnLmNvdW50ZXJfX2lucHV0JykuYmx1cihmdW5jdGlvbigpIHtcclxuXHRcdHZhciB2YWx1ZSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRpZighKCQuaXNOdW1lcmljKHZhbHVlKSkpIHtcclxuXHRcdFx0JCgnLmNvdW50ZXJfX2lucHV0JykudmFsKCcxJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LzQsNGB0LrQuCDRgtC10LvQtdGE0L7QvdCwINCyINC+0YTQvtGA0LzQu9C10L3QuNC1INC30LDQutCw0LfQsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0JCgnI3Bob25lJykubWFzayhcIis3ICg5OTkpIDk5OS05OS05OVwiKVxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC60YDQvtC70LvQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQvtGA0LfQuNC90LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnI2Jhc2tldC1zY3JvbGwnKSxcclxuXHRcdGJsb2NrID0gJCgnLmJhc2tldF9fYmxvY2stLWhpZGRlbicpLFxyXG5cdFx0cm93ID0gJCgnLmJhc2tldF9fcm93LS1oaWRkZW4nKSxcclxuXHRcdGJvZHkgPSAkKCdib2R5LCBodG1sJyksXHJcblx0XHRkdXJhdGlvbiA9IDUwMDtcclxuXHJcblxyXG5cdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGJsb2NrLnNsaWRlRG93bihkdXJhdGlvbik7XHJcblxyXG5cdFx0cm93LnNsaWRlRG93bihkdXJhdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykuYXR0cignc3R5bGUnLCAnZGlzcGxheTogZmxleCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgYmxvY2tIZWlnaHQgPSAkKCcuYmFza2V0LWZvcm1fX3dyYXAnKS5vZmZzZXQoKS50b3A7XHJcblx0XHRcdGJvZHkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBibG9ja0hlaWdodH0sIDEwMDApO1xyXG5cdFx0fSwgZHVyYXRpb24pO1xyXG5cdH0pO1xyXG5cclxuXHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0LIg0YHQtdC60YbQuNC4IGNhcmQg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LAg0YLQvtCy0LDRgNCwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcuY2FyZF9fZGlzcGxheScpLnNsaWNrKHtcclxuXHRcdHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0YXJyb3dzOiB0cnVlLFxyXG5cdFx0ZmFkZTogdHJ1ZSxcclxuXHRcdGFzTmF2Rm9yOiAnLmNhcmRfX21vcmUnXHJcblx0fSk7XHJcblxyXG5cdCQoJy5jYXJkX19tb3JlJykuc2xpY2soe1xyXG5cdFx0c2xpZGVzVG9TaG93OiA1LFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRhc05hdkZvcjogJy5jYXJkX19kaXNwbGF5JyxcclxuXHRcdGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvdC40LbQvdC10LPQviDRgdC70LDQudC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcuY2FyZC1zbGlkZXJfX2xpc3QnKS5zbGljayh7XHJcblx0XHRpbmZpbml0ZTogdHJ1ZSxcclxuXHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0Y2VudGVyTW9kZTogdHJ1ZSxcclxuXHRcdHZhcmlhYmxlV2lkdGg6IHRydWVcclxuXHR9KTtcclxufSkoKTtcclxuIiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmNhcmQtdGFic19fY29udHJvbCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuY2FyZC10YWJzX19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnY2FyZC10YWJzX19jb250cm9sLS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdjYXJkLXRhYnNfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQsNCx0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JTQvtGB0YLQsNCy0LrQsCDQuCDQvtC/0LvQsNGC0LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmRlbGl2ZXJ5X19kb3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLmRlbGl2ZXJ5X19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnZGVsaXZlcnlfX2RvdC0tYWN0aXZlJyxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAnZGVsaXZlcnlfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQsNCx0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0KHQvtGC0YDRg9C00L3QuNGH0LXRgdGC0LLQvlxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHRhYnMgPSAkKCcuY29vcF9fZG90JyksXHJcblx0XHRpdGVtcyA9ICQoJy5jb29wX19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnY29vcF9fZG90LS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdjb29wX19pdGVtLS1hY3RpdmUnO1xyXG5cclxuXHRcdHRhYnMuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdHRhYkFjdGl2ZSA9IHRhYnMuZmlsdGVyKCcuJyArIGFjdGl2ZVRhYiksXHJcblx0XHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFUYWIgPSB0YWJzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHR0YWJBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcVRhYi5hZGRDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC80LXQvdGOINCyIGhlYWRlclxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcuaGVhZGVyX19idG4nKSxcclxuXHRcdGxpc3QgPSAkKCcuaGVhZGVyX19saXN0ICcpLFxyXG5cdFx0YWN0aXZlTGluayA9ICdoZWFkZXJfX2J0bi0tYWN0aXZlJ1xyXG5cdFx0ZmxhZyA9IHRydWU7XHJcblxyXG5cdGxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRsaW5rLmFkZENsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRsaXN0LnNsaWRlRG93big1MDApO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRsaXN0LnNsaWRlVXAoJzUwMCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0XHR9LDUwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8gZm9vdGVyXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJy5mb290ZXJfX3RpdGxlJyksXHJcblx0XHRhY3RpdmVMaW5rID0gJ2Zvb3Rlcl9fdGl0bGUtLWFjdGl2ZScsXHJcblx0XHRkdXJhdGlvbiA9IDQwMDtcclxuXHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZmluZEJsb2NrID0gJCh0aGlzKS5uZXh0KCcuZm9vdGVyX19ibG9jay13cmFwJyksXHJcblx0XHRcdFx0ZmluZFdyYXBwZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX3RvcCcpO1xyXG5cclxuXHRcdFx0aWYgKGZpbmRCbG9jay5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRcdGZpbmRCbG9jay5zbGlkZVVwKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZpbmRXcmFwcGVyLmZpbmQoJy5mb290ZXJfX2Jsb2NrLXdyYXAnKS5zbGlkZVVwKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRmaW5kQmxvY2suc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyBtZW51INC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YLQsNC70L7QsyDQvtGC0L7Qv9C70LXQvdC40Y9cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnLmhlYXRpbmdfX3N1YnRpdGxlJyksXHJcblx0XHRhY3RpdmVMaW5rID0gJ2hlYXRpbmdfX3N1YnRpdGxlLS1hY3RpdmUnLFxyXG5cdFx0bGlzdCA9ICQoJy5oZWF0aW5nX19tZW51JykuY2hpbGRyZW4oJy5mb290ZXJfX2xpc3QnKTtcclxuXHRcdGR1cmF0aW9uID0gNDAwLFxyXG5cdFx0ZmxhZyA9IHRydWU7XHJcblxyXG5cdFx0bGluay5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGZsYWcpIHtcclxuXHRcdFx0XHRsaW5rLmFkZENsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRcdGxpc3Quc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGluay5yZW1vdmVDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0XHRsaXN0LnNsaWRlVXAoZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdFx0XHR9LGR1cmF0aW9uKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbn0pKCk7Il19
