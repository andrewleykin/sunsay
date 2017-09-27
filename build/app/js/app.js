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
// Функция для маски телефона в оформление заказа

(function(){
	$('#phone').mask("+7 (999) 999-99-99");
})();
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
		asNavFor: '.card__more',
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
//Функция для страницы теста

(function() {
	var r = $('.test__range');

	r.on('mouseenter',function(){
		var p = r.val();
		r.on('click',function(){
			p = r.val();
			bg(p);
		});
		r.on('mousemove',function(){
			p = r.val();
			bg(p);
		});
	});

	r.on('mousemove', function(){
		var display = $('.now-num')
		display.html(r.val());
	});

	function bg(n){
		r.css({
			'background-image':'-webkit-linear-gradient(left ,#f00b52 0%,#f00b52 '+n / 3.5+'%,#d7d7d7 '+n / 3.5+'%, #d7d7d7 100%)'
		});
	}


	var items = $('.test__item'),
		itemActive = 'test__item--active',
		prev = $('.test__btn--prev'),
		next = $('.test__btn--next');

		next.click(function() {
			var activeItem = items.filter('.' + itemActive),
				index = activeItem.index(),
				activeCount = activeItem.find('.test__num');


			index++;
			if(index >= items.lehgth) {
				index = items-length - 1;
			}


			var reqItem = items.eq(index),
				reqCount = reqItem.find('.test__num');

			if(reqItem.find('#range').length == true) {
				var rangeValue = r.val(),
					countVal;

				if(rangeValue < 50) {
					countVal = 200;
				} else if (rangeValue > 50 && rangeValue < 70) {
					countVal = 500;
				} else if (rangeValue > 70 && rangeValue < 100) {
					countVal = 1000;
				} else if (rangeValue > 100 && rangeValue < 150) {
					countVal = 2000;
				} else if (rangeValue > 150) {
					countVal = 3000;
				}

				var countValSum = Number(activeCount.html()) + countVal;
				reqCount.html(countValSum + ' ');

				r.on('mousemove', function(){
					var rangeValue = r.val(),
						countVal;

					if(rangeValue <= 50) {
						countVal = 200;
					} else if (rangeValue > 50 && rangeValue <= 70) {
						countVal = 500;
					} else if (rangeValue > 70 && rangeValue <= 100) {
						countVal = 1000;
					} else if (rangeValue > 100 && rangeValue <= 150) {
						countVal = 2000;
					} else if (rangeValue > 150) {
						countVal = 3000;
					}

					var countValSum = Number(activeCount.html()) + countVal;
					reqCount.html(countValSum + ' ');
				});

			} else if (reqItem.find('.test__info-num').length == true) {
				var sum = $('.test__info-num'),
					countSum = activeCount.html();
					sum.html(countSum);
			} else {
				var countVal = Number(activeCount.html()) + 200;
				reqCount.html(countVal + ' ');
			}

			activeItem.removeClass(itemActive);
			reqItem.addClass(itemActive);

		});

		prev.click(function() {
			var activeItem = items.filter('.' + itemActive),
				index = activeItem.index();

			index--;
			if(index <= 0) {
				index = 0;
			}

			var reqItem = items.eq(index);

			activeItem.removeClass(itemActive);
			reqItem.addClass(itemActive);
		});
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1hc2suanMiLCJtYWluLXNsaWRlci5qcyIsInRlY2gtc2xpZGVyLmpzIiwiZGlhZ3JhbS5qcyIsImNvdW50ZXIuanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiLCJkaWxpdmVyeS10YWJzLmpzIiwiY29vcC10YWJzLmpzIiwibWVudS5qcyIsImZvb3Rlci5qcyIsImhlYXRpbmctbWVudS5qcyIsImNhbGN1bGF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgd293LmpzINC00LvRjyDQsNC90LjQvNCw0YbQuNC4XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdG5ldyBXT1coKS5pbml0KCk7XHJcbn0pKCk7IiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgY29jZW4g0LTQu9GPIGJlZm9yZS9hZnRlclxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHQkKCcuY29jb2VuJykuY29jb2VuKCk7XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0L7QutCw0LfQsCDRgdCy0LNcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHRzdmc0ZXZlcnlib2R5KCk7XHJcbn0pOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvNCw0YHQutC4INGC0LXQu9C10YTQvtC90LAg0LIg0L7RhNC+0YDQvNC70LXQvdC40LUg0LfQsNC60LDQt9CwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcjcGhvbmUnKS5tYXNrKFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIpO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINC90LAg0LPQu9Cw0LLQvdC+0LlcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gJCgnLm1haW4tc2xpZGVyX19saXN0JyksXHJcblx0XHRpdGVtcyA9ICQoJy5tYWluLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0aXRlbXNBY3RpdmUgPSAnbWFpbi1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3QgPSAkKCcubWFpbi1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0cHJldiA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tbmV4dCcpLFxyXG5cdFx0ZHVyYXRpb24gPSAyNDAwLFxyXG5cdFx0ZG90QW5pbWF0ZSA9ICdtYWluLXNsaWRlcl9fZG90LS1hbmltYXRlJyxcclxuXHRcdGFuaW1hdGVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFuaW1hdGUpLFxyXG5cdFx0aW5kZXggPSAwO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGl0ZW1zKTtcclxuXHJcblx0dmFyIG1haW5TbGlkZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHJcblx0XHRpbmRleCsrO1xyXG5cclxuXHRcdHZhciByZXFEb3QgPSBkb3QuZXEoaW5kZXgpLFxyXG5cdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0XHRjbGVhcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdHJlcURvdC5hZGRDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0sZHVyYXRpb24pO1xyXG5cclxuXHR2YXIgY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChtYWluU2xpZGVyKTtcclxuXHR9XHJcblxyXG5cdHZhciBtb3ZlID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHRcdHZhciBwZXJjID0gJy0nICsgMTAwICogaW5kZXggKyAnJSc7XHJcblx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoJyArIHBlcmMgKyAnKScpO1xyXG5cdH1cclxuXHJcblx0ZG90LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGNvbnNvbGUubG9nKGluZGV4KTtcclxuXHRcdGluZGV4LS07XHJcblx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0aW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xyXG5cdFx0aW5kZXgrKztcclxuXHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSk7XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INGC0LXRhdC90L7Qu9C+0LPQuNC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgaXRlbXMgPSAkKCcudGVjaC1zbGlkZXJfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAndGVjaC1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3RzID0gJCgnLnRlY2gtc2xpZGVyX19kb3QnKSxcclxuXHRcdGFjdGl2ZURvdHMgPSAndGVjaC1zbGlkZXJfX2RvdC0tYWN0aXZlJyxcclxuXHRcdHByZXYgPSAkKCcudGVjaC1zbGlkZXJfX3ByZXYnKSxcclxuXHRcdG5leHQgPSAkKCcudGVjaC1zbGlkZXJfX25leHQnKTtcclxuXHJcblx0XHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyksXHJcblx0XHRcdFx0aW5kZXggPSBpdGVtQWN0aXZlLmluZGV4KCk7XHJcblxyXG5cdFx0XHRcdGluZGV4LS07XHJcblxyXG5cdFx0XHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSBkb3RzLmxlbmd0aCAtIDE7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKSxcclxuXHRcdFx0XHRpbmRleCA9IGl0ZW1BY3RpdmUuaW5kZXgoKTtcclxuXHJcblx0XHRcdFx0aW5kZXgrKztcclxuXHJcblx0XHRcdFx0aWYoaW5kZXg+PWl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb3RzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKTtcclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LTQuNCw0LPRgNCw0Lwg0L3QsCDRgdGC0YDQsNC90LjRhtC1INGB0YDQsNCy0L3QtdC90LjRj1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGJsb2NrID0gJCgnLmRpYWdyYW1fX2ltZycpLFxyXG5cdFx0Y291bnRlciA9ICQoJy5kaWFncmFtX19wcmljZScpO1xyXG5cclxuXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0dmFyIHNjcm9sbFRvcCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0Zm9yIChpPTA7IGk8YmxvY2subGVuZ3RoO2krKykge1xyXG5cdFx0XHR2YXIgYmxvY2tFcSA9IGJsb2NrLmVxKGkpLFxyXG5cdFx0XHRcdGNvdW50ZXJFcSA9IGNvdW50ZXIuZXEoaSksXHJcblx0XHRcdFx0cGFyZW50ID0gY291bnRlckVxLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtJyksXHJcblx0XHRcdFx0aGVpZ2h0ID0gYmxvY2tFcS5hdHRyKCdkYXRhLWhlaWdodCcpLFxyXG5cdFx0XHRcdGRhdGFDb3VudGVyID0gY291bnRlci5lcShpKS5hdHRyKCdkYXRhLWNvdW50ZXInKTtcclxuXHJcblxyXG5cdFx0XHRpZiAoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsIGJsb2NrRXEpKSB7XHJcblx0XHRcdFx0YmxvY2tFcS5hbmltYXRlKHtoZWlnaHQ6MCwgaGVpZ2h0fSwgMTAwMCk7XHJcblx0XHRcdFx0Y291bnRlckVxLmFuaW1hdGUoe251bTogZGF0YUNvdW50ZXIgLSAzfSwge1xyXG5cdFx0XHRcdFx0ZHVyYXRpb246IDEwMDAsXHJcblx0XHRcdFx0XHRzdGVwOiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1wcmljZScpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKSArICcg0YLRi9GBJztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLWNvc3QnKSB8fCB0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1zZXJ2aWNlJykgfHwgdGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tbW9udGgnKSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKSArICcg0YAnO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0dmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGJsb2NrKSB7XHJcblx0XHR2YXIgb2Zmc2V0ID0gYmxvY2sub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHR3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyksXHJcblx0XHRcdHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdpbmRvd01hcmdpbiAtIDgwMCxcclxuXHRcdFx0Ym90dG9tRWRnZSA9IGJsb2NrLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0ICsgMTAwLFxyXG5cdFx0XHRib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuXHRcdHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMFxyXG5cdH1cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHRh9C10YLRh9C40LrQsCBcclxuXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHJcblx0ZnVuY3Rpb24gY2F0YWxvZ0l0ZW1Db3VudGVyKGZpZWxkKXtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBmaWVsZENvdW50ID0gZnVuY3Rpb24oZWwpIHtcclxuXHJcblx0XHRcdFx0dmFyIFxyXG5cdFx0XHRcdFx0Ly8g0JzQuNC9LiDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRtaW4gPSBlbC5kYXRhKCdtaW4nKSB8fCBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvLyDQnNCw0LrRgS4g0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0bWF4ID0gZWwuZGF0YSgnbWF4JykgfHwgZmFsc2UsIFxyXG5cclxuXHRcdFx0XHRcdC8vINCa0L3QvtC/0LrQsCDRg9C80LXQvdGM0YjQtdC90LjRjyDQutC+0Lst0LLQsFxyXG5cdFx0XHRcdFx0ZGVjID0gZWwucHJldignLmRlYycpLCBcclxuXHJcblx0XHRcdFx0XHQvLyDQmtC90L7Qv9C60LAg0YPQstC10LvQuNGH0LXQvdC40Y8g0LrQvtC7LdCy0LBcclxuXHRcdFx0XHRcdGluYyA9IGVsLm5leHQoJy5pbmMnKTtcclxuXHJcblx0XHRcdFx0ZnVuY3Rpb24gaW5pdChlbCkge1xyXG5cdFx0XHRcdFx0aWYoIWVsLmF0dHIoJ2Rpc2FibGVkJykpe1xyXG5cdFx0XHRcdFx0XHRkZWMub24oJ2NsaWNrJywgZGVjcmVtZW50KTtcclxuXHRcdFx0XHRcdFx0aW5jLm9uKCdjbGljaycsIGluY3JlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8g0KPQvNC10L3RjNGI0LjQvCDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBkZWNyZW1lbnQoKSB7XHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsWzBdLnZhbHVlKTtcclxuXHRcdFx0XHRcdFx0dmFsdWUtLTtcclxuXHJcblx0XHRcdFx0XHRcdGlmKCFtaW4gfHwgdmFsdWUgPj0gbWluKSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxbMF0udmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyDQo9Cy0LXQu9C40YfQuNC8INC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGluY3JlbWVudCgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQoZWxbMF0udmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR2YWx1ZSsrO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIW1heCB8fCB2YWx1ZSA8PSBtYXgpIHtcclxuXHRcdFx0XHRcdFx0XHRlbFswXS52YWx1ZSA9IHZhbHVlKys7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpbml0KCQodGhpcykpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JChmaWVsZCkuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZpZWxkQ291bnQoJCh0aGlzKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdGNhdGFsb2dJdGVtQ291bnRlcignLmNvdW50ZXJfX2lucHV0Jyk7XHJcblxyXG5cdCQoJy5jb3VudGVyX19pbnB1dCcpLmJsdXIoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0aWYoISgkLmlzTnVtZXJpYyh2YWx1ZSkpKSB7XHJcblx0XHRcdCQoJy5jb3VudGVyX19pbnB1dCcpLnZhbCgnMScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSkoKTtcclxuIiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LrRgNC+0LvQu9CwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtC+0YDQt9C40L3QsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcjYmFza2V0LXNjcm9sbCcpLFxyXG5cdFx0YmxvY2sgPSAkKCcuYmFza2V0X19ibG9jay0taGlkZGVuJyksXHJcblx0XHRyb3cgPSAkKCcuYmFza2V0X19yb3ctLWhpZGRlbicpLFxyXG5cdFx0Ym9keSA9ICQoJ2JvZHksIGh0bWwnKSxcclxuXHRcdGR1cmF0aW9uID0gNTAwO1xyXG5cclxuXHJcblx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0YmxvY2suc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHJcblx0XHRyb3cuc2xpZGVEb3duKGR1cmF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdzdHlsZScsICdkaXNwbGF5OiBmbGV4Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBibG9ja0hlaWdodCA9ICQoJy5iYXNrZXQtZm9ybV9fd3JhcCcpLm9mZnNldCgpLnRvcDtcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IGJsb2NrSGVpZ2h0fSwgMTAwMCk7XHJcblx0XHR9LCBkdXJhdGlvbik7XHJcblx0fSk7XHJcblxyXG5cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQsiDRgdC10LrRhtC40LggY2FyZCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQsCDRgtC+0LLQsNGA0LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJy5jYXJkX19kaXNwbGF5Jykuc2xpY2soe1xyXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRhcnJvd3M6IHRydWUsXHJcblx0XHRmYWRlOiB0cnVlLFxyXG5cdFx0YXNOYXZGb3I6ICcuY2FyZF9fbW9yZScsXHJcblx0fSk7XHJcblxyXG5cdCQoJy5jYXJkX19tb3JlJykuc2xpY2soe1xyXG5cdFx0c2xpZGVzVG9TaG93OiA1LFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRhc05hdkZvcjogJy5jYXJkX19kaXNwbGF5JyxcclxuXHRcdGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblx0XHRyZXNwb25zaXZlOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiAxMDI0LFxyXG5cdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDQsXHJcblx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMixcclxuXHRcdFx0XHRcdGluZmluaXRlOiB0cnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnJlYWtwb2ludDogOTYwLFxyXG5cdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdGluZmluaXRlOiB0cnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnJlYWtwb2ludDogNzAwLFxyXG5cdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDUsXHJcblx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdGluZmluaXRlOiB0cnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnJlYWtwb2ludDogNDgwLFxyXG5cdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdGluZmluaXRlOiB0cnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvdC40LbQvdC10LPQviDRgdC70LDQudC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcuY2FyZC1zbGlkZXJfX2xpc3QnKS5zbGljayh7XHJcblx0XHRpbmZpbml0ZTogdHJ1ZSxcclxuXHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0Y2VudGVyTW9kZTogdHJ1ZSxcclxuXHRcdHZhcmlhYmxlV2lkdGg6IHRydWVcclxuXHR9KTtcclxufSkoKTtcclxuIiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmNhcmQtdGFic19fY29udHJvbCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuY2FyZC10YWJzX19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnY2FyZC10YWJzX19jb250cm9sLS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdjYXJkLXRhYnNfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQsNCx0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JTQvtGB0YLQsNCy0LrQsCDQuCDQvtC/0LvQsNGC0LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmRlbGl2ZXJ5X19kb3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLmRlbGl2ZXJ5X19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnZGVsaXZlcnlfX2RvdC0tYWN0aXZlJyxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAnZGVsaXZlcnlfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQsNCx0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0KHQvtGC0YDRg9C00L3QuNGH0LXRgdGC0LLQvlxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHRhYnMgPSAkKCcuY29vcF9fZG90JyksXHJcblx0XHRpdGVtcyA9ICQoJy5jb29wX19pdGVtJyksXHJcblx0XHRhY3RpdmVUYWIgPSAnY29vcF9fZG90LS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdjb29wX19pdGVtLS1hY3RpdmUnO1xyXG5cclxuXHRcdHRhYnMuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdHRhYkFjdGl2ZSA9IHRhYnMuZmlsdGVyKCcuJyArIGFjdGl2ZVRhYiksXHJcblx0XHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFUYWIgPSB0YWJzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHR0YWJBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcVRhYi5hZGRDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC80LXQvdGOINCyIGhlYWRlclxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcuaGVhZGVyX19idG4nKSxcclxuXHRcdGxpc3QgPSAkKCcuaGVhZGVyX19saXN0ICcpLFxyXG5cdFx0YWN0aXZlTGluayA9ICdoZWFkZXJfX2J0bi0tYWN0aXZlJ1xyXG5cdFx0ZmxhZyA9IHRydWU7XHJcblxyXG5cdGxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRsaW5rLmFkZENsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRsaXN0LnNsaWRlRG93big1MDApO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRsaXN0LnNsaWRlVXAoJzUwMCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0XHR9LDUwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8gZm9vdGVyXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJy5mb290ZXJfX3RpdGxlJyksXHJcblx0XHRhY3RpdmVMaW5rID0gJ2Zvb3Rlcl9fdGl0bGUtLWFjdGl2ZScsXHJcblx0XHRkdXJhdGlvbiA9IDQwMDtcclxuXHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZmluZEJsb2NrID0gJCh0aGlzKS5uZXh0KCcuZm9vdGVyX19ibG9jay13cmFwJyksXHJcblx0XHRcdFx0ZmluZFdyYXBwZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5mb290ZXJfX3RvcCcpO1xyXG5cclxuXHRcdFx0aWYgKGZpbmRCbG9jay5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRcdGZpbmRCbG9jay5zbGlkZVVwKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGZpbmRXcmFwcGVyLmZpbmQoJy5mb290ZXJfX2Jsb2NrLXdyYXAnKS5zbGlkZVVwKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRmaW5kQmxvY2suc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyBtZW51INC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YLQsNC70L7QsyDQvtGC0L7Qv9C70LXQvdC40Y9cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnLmhlYXRpbmdfX3N1YnRpdGxlJyksXHJcblx0XHRhY3RpdmVMaW5rID0gJ2hlYXRpbmdfX3N1YnRpdGxlLS1hY3RpdmUnLFxyXG5cdFx0bGlzdCA9ICQoJy5oZWF0aW5nX19tZW51JykuY2hpbGRyZW4oJy5mb290ZXJfX2xpc3QnKTtcclxuXHRcdGR1cmF0aW9uID0gNDAwLFxyXG5cdFx0ZmxhZyA9IHRydWU7XHJcblxyXG5cdFx0bGluay5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGZsYWcpIHtcclxuXHRcdFx0XHRsaW5rLmFkZENsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRcdGxpc3Quc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHRcdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGluay5yZW1vdmVDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0XHRsaXN0LnNsaWRlVXAoZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdFx0XHR9LGR1cmF0aW9uKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRmbGFnID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy/QpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHRgtGA0LDQvdC40YbRiyDRgtC10YHRgtCwXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblx0dmFyIHIgPSAkKCcudGVzdF9fcmFuZ2UnKTtcclxuXHJcblx0ci5vbignbW91c2VlbnRlcicsZnVuY3Rpb24oKXtcclxuXHRcdHZhciBwID0gci52YWwoKTtcclxuXHRcdHIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRwID0gci52YWwoKTtcclxuXHRcdFx0YmcocCk7XHJcblx0XHR9KTtcclxuXHRcdHIub24oJ21vdXNlbW92ZScsZnVuY3Rpb24oKXtcclxuXHRcdFx0cCA9IHIudmFsKCk7XHJcblx0XHRcdGJnKHApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHIub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZGlzcGxheSA9ICQoJy5ub3ctbnVtJylcclxuXHRcdGRpc3BsYXkuaHRtbChyLnZhbCgpKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gYmcobil7XHJcblx0XHRyLmNzcyh7XHJcblx0XHRcdCdiYWNrZ3JvdW5kLWltYWdlJzonLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCAsI2YwMGI1MiAwJSwjZjAwYjUyICcrbiAvIDMuNSsnJSwjZDdkN2Q3ICcrbiAvIDMuNSsnJSwgI2Q3ZDdkNyAxMDAlKSdcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG5cdHZhciBpdGVtcyA9ICQoJy50ZXN0X19pdGVtJyksXHJcblx0XHRpdGVtQWN0aXZlID0gJ3Rlc3RfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRwcmV2ID0gJCgnLnRlc3RfX2J0bi0tcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy50ZXN0X19idG4tLW5leHQnKTtcclxuXHJcblx0XHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtQWN0aXZlKSxcclxuXHRcdFx0XHRpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKSxcclxuXHRcdFx0XHRhY3RpdmVDb3VudCA9IGFjdGl2ZUl0ZW0uZmluZCgnLnRlc3RfX251bScpO1xyXG5cclxuXHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlaGd0aCkge1xyXG5cdFx0XHRcdGluZGV4ID0gaXRlbXMtbGVuZ3RoIC0gMTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcUNvdW50ID0gcmVxSXRlbS5maW5kKCcudGVzdF9fbnVtJyk7XHJcblxyXG5cdFx0XHRpZihyZXFJdGVtLmZpbmQoJyNyYW5nZScpLmxlbmd0aCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIHJhbmdlVmFsdWUgPSByLnZhbCgpLFxyXG5cdFx0XHRcdFx0Y291bnRWYWw7XHJcblxyXG5cdFx0XHRcdGlmKHJhbmdlVmFsdWUgPCA1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAyMDA7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gNTAgJiYgcmFuZ2VWYWx1ZSA8IDcwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDUwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA3MCAmJiByYW5nZVZhbHVlIDwgMTAwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDEwMDA7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTAwICYmIHJhbmdlVmFsdWUgPCAxNTApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMjAwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxNTApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMzAwMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBjb3VudFZhbFN1bSA9IE51bWJlcihhY3RpdmVDb3VudC5odG1sKCkpICsgY291bnRWYWw7XHJcblx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbFN1bSArICcgJyk7XHJcblxyXG5cdFx0XHRcdHIub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR2YXIgcmFuZ2VWYWx1ZSA9IHIudmFsKCksXHJcblx0XHRcdFx0XHRcdGNvdW50VmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmKHJhbmdlVmFsdWUgPD0gNTApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAyMDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA1MCAmJiByYW5nZVZhbHVlIDw9IDcwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gNTAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gNzAgJiYgcmFuZ2VWYWx1ZSA8PSAxMDApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAxMDAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTAwICYmIHJhbmdlVmFsdWUgPD0gMTUwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gMjAwMDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDE1MCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDMwMDA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGNvdW50VmFsU3VtID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyBjb3VudFZhbDtcclxuXHRcdFx0XHRcdHJlcUNvdW50Lmh0bWwoY291bnRWYWxTdW0gKyAnICcpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChyZXFJdGVtLmZpbmQoJy50ZXN0X19pbmZvLW51bScpLmxlbmd0aCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIHN1bSA9ICQoJy50ZXN0X19pbmZvLW51bScpLFxyXG5cdFx0XHRcdFx0Y291bnRTdW0gPSBhY3RpdmVDb3VudC5odG1sKCk7XHJcblx0XHRcdFx0XHRzdW0uaHRtbChjb3VudFN1bSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGNvdW50VmFsID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyAyMDA7XHJcblx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbCArICcgJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbUFjdGl2ZSksXHJcblx0XHRcdFx0aW5kZXggPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG5cdFx0XHRpbmRleC0tO1xyXG5cdFx0XHRpZihpbmRleCA8PSAwKSB7XHJcblx0XHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblx0XHR9KTtcclxufSkoKTsiXX0=
