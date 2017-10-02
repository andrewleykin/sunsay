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
		next = $('.test__btn--next'),
		block = $('.test__row-block'),
		input = block.find('.test__radio'),
		label = block.find('.test__label');

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
// функция для swipe на главной

(function(){
	// $(".main-slider__list").swipe( {
	// 	swipeLeft:leftSwipe,
	// 	swipeRight:rightSwipe,
	// });
	// function leftSwipe(event){
	// 	alert('swipe left');
	// }
	// function rightSwipe(event){
	// 	alert('swipe right');
	// }
})();
// функция для проверки на нажатую галку

(function(){
	var btn = $('.js-check'),
		check = $('.check__input');

		if(check.length) {
			btn.click(function() {
				if(!(check.is(':checked'))) {
					window.alert('Дайте свое согласие на обработку данных!');
					return false;
				}
			});
		}
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1hc2suanMiLCJtYWluLXNsaWRlci5qcyIsInRlY2gtc2xpZGVyLmpzIiwiZGlhZ3JhbS5qcyIsImNvdW50ZXIuanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiLCJkaWxpdmVyeS10YWJzLmpzIiwiY29vcC10YWJzLmpzIiwibWVudS5qcyIsImZvb3Rlci5qcyIsImhlYXRpbmctbWVudS5qcyIsImNhbGN1bGF0b3IuanMiLCJzd2lwZS5qcyIsImNoZWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgd293LmpzINC00LvRjyDQsNC90LjQvNCw0YbQuNC4XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdG5ldyBXT1coKS5pbml0KCk7XHJcbn0pKCk7IiwiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgY29jZW4g0LTQu9GPIGJlZm9yZS9hZnRlclxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHQkKCcuY29jb2VuJykuY29jb2VuKCk7XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0L7QutCw0LfQsCDRgdCy0LNcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHRzdmc0ZXZlcnlib2R5KCk7XHJcbn0pOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvNCw0YHQutC4INGC0LXQu9C10YTQvtC90LAg0LIg0L7RhNC+0YDQvNC70LXQvdC40LUg0LfQsNC60LDQt9CwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcjcGhvbmUnKS5tYXNrKFwiKzcgKDk5OSkgOTk5LTk5LTk5XCIpO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINC90LAg0LPQu9Cw0LLQvdC+0LlcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gJCgnLm1haW4tc2xpZGVyX19saXN0JyksXHJcblx0XHRpdGVtcyA9ICQoJy5tYWluLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0aXRlbXNBY3RpdmUgPSAnbWFpbi1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3QgPSAkKCcubWFpbi1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0cHJldiA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tbmV4dCcpLFxyXG5cdFx0ZHVyYXRpb24gPSAyNDAwLFxyXG5cdFx0ZG90QW5pbWF0ZSA9ICdtYWluLXNsaWRlcl9fZG90LS1hbmltYXRlJyxcclxuXHRcdGRvdEFjdGl2ZSA9ICdtYWluLXNsaWRlcl9fZG90LS1hY3RpdmUnLFxyXG5cdFx0YW5pbWF0ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRpbmRleCA9IDA7XHJcblxyXG5cdHZhciBtYWluU2xpZGVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuXHRcdHZhciBhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFuaW1hdGUpLFxyXG5cdFx0XHRhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblxyXG5cdFx0aW5kZXgrKztcclxuXHJcblx0XHR2YXIgcmVxRG90ID0gZG90LmVxKGluZGV4KSxcclxuXHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KTtcclxuXHJcblx0XHRpZiAoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gMDtcclxuXHRcdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdFx0ZG90LmVxKGluZGV4KS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0XHRjbGVhcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKS5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0cmVxRG90LmFkZENsYXNzKGRvdEFuaW1hdGUpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRyZXFJdGVtLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9LGR1cmF0aW9uKTtcclxuXHJcblx0dmFyIGNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHRcdGNsZWFySW50ZXJ2YWwobWFpblNsaWRlcik7XHJcblx0fVxyXG5cclxuXHR2YXIgbW92ZSA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHR2YXIgcGVyYyA9ICctJyArIDEwMCAqIGluZGV4ICsgJyUnO1xyXG5cdFx0bGlzdC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKCcgKyBwZXJjICsgJyknKTtcclxuXHR9XHJcblxyXG5cdGRvdC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpLnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKSxcclxuXHRcdFx0YWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBY3RpdmUpO1xyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRkb3QuZXEoaW5kZXgpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0fSk7XHJcblxyXG5cdHByZXYuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKSxcclxuXHRcdFx0YWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKS5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aW5kZXgtLTtcclxuXHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGRvdC5lcShpbmRleCkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0bmV4dC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLFxyXG5cdFx0XHRhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpLnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpbmRleCsrO1xyXG5cdFx0aWYoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gMDtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0ZG90LmVxKGluZGV4KS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRsaXN0LnN3aXBlKCB7XHJcblx0XHRzd2lwZUxlZnQ6bGVmdFN3aXBlLFxyXG5cdFx0c3dpcGVSaWdodDpyaWdodFN3aXBlLFxyXG5cdH0pO1xyXG5cdGZ1bmN0aW9uIGxlZnRTd2lwZShldmVudCl7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKSxcclxuXHRcdFx0YWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKS5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aW5kZXgrKztcclxuXHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGRvdC5lcShpbmRleCkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gcmlnaHRTd2lwZShldmVudCl7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKSxcclxuXHRcdFx0YWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKS5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aW5kZXgtLTtcclxuXHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGRvdC5lcShpbmRleCkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHR9XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INGC0LXRhdC90L7Qu9C+0LPQuNC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgaXRlbXMgPSAkKCcudGVjaC1zbGlkZXJfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAndGVjaC1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3RzID0gJCgnLnRlY2gtc2xpZGVyX19kb3QnKSxcclxuXHRcdGFjdGl2ZURvdHMgPSAndGVjaC1zbGlkZXJfX2RvdC0tYWN0aXZlJyxcclxuXHRcdHByZXYgPSAkKCcudGVjaC1zbGlkZXJfX3ByZXYnKSxcclxuXHRcdG5leHQgPSAkKCcudGVjaC1zbGlkZXJfX25leHQnKTtcclxuXHJcblx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdHZhciBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyksXHJcblx0XHRcdGluZGV4ID0gaXRlbUFjdGl2ZS5pbmRleCgpO1xyXG5cclxuXHRcdFx0aW5kZXgtLTtcclxuXHJcblx0XHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGluZGV4ID0gZG90cy5sZW5ndGggLSAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdH0pO1xyXG5cclxuXHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKSxcclxuXHRcdFx0aW5kZXggPSBpdGVtQWN0aXZlLmluZGV4KCk7XHJcblxyXG5cdFx0XHRpbmRleCsrO1xyXG5cclxuXHRcdFx0aWYoaW5kZXg+PWl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdGluZGV4ID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHR9KTtcclxuXHJcblx0ZG90cy5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyk7XHJcblxyXG5cdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LTQuNCw0LPRgNCw0Lwg0L3QsCDRgdGC0YDQsNC90LjRhtC1INGB0YDQsNCy0L3QtdC90LjRj1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGJsb2NrID0gJCgnLmRpYWdyYW1fX2ltZycpLFxyXG5cdFx0Y291bnRlciA9ICQoJy5kaWFncmFtX19wcmljZScpO1xyXG5cclxuXHJcblx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0dmFyIHNjcm9sbFRvcCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0Zm9yIChpPTA7IGk8YmxvY2subGVuZ3RoO2krKykge1xyXG5cdFx0XHR2YXIgYmxvY2tFcSA9IGJsb2NrLmVxKGkpLFxyXG5cdFx0XHRcdGNvdW50ZXJFcSA9IGNvdW50ZXIuZXEoaSksXHJcblx0XHRcdFx0cGFyZW50ID0gY291bnRlckVxLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtJyksXHJcblx0XHRcdFx0aGVpZ2h0ID0gYmxvY2tFcS5hdHRyKCdkYXRhLWhlaWdodCcpLFxyXG5cdFx0XHRcdGRhdGFDb3VudGVyID0gY291bnRlci5lcShpKS5hdHRyKCdkYXRhLWNvdW50ZXInKTtcclxuXHJcblxyXG5cdFx0XHRpZiAoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsIGJsb2NrRXEpKSB7XHJcblx0XHRcdFx0YmxvY2tFcS5hbmltYXRlKHtoZWlnaHQ6MCwgaGVpZ2h0fSwgMTAwMCk7XHJcblx0XHRcdFx0Y291bnRlckVxLmFuaW1hdGUoe251bTogZGF0YUNvdW50ZXIgLSAzfSwge1xyXG5cdFx0XHRcdFx0ZHVyYXRpb246IDEwMDAsXHJcblx0XHRcdFx0XHRzdGVwOiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1wcmljZScpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKSArICcg0YLRi9GBJztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLWNvc3QnKSB8fCB0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1zZXJ2aWNlJykgfHwgdGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tbW9udGgnKSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKSArICcg0YAnO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0dmFyIGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbihzY3JvbGxUb3AsIGJsb2NrKSB7XHJcblx0XHR2YXIgb2Zmc2V0ID0gYmxvY2sub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHR3aW5kb3dNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyksXHJcblx0XHRcdHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdpbmRvd01hcmdpbiAtIDgwMCxcclxuXHRcdFx0Ym90dG9tRWRnZSA9IGJsb2NrLm91dGVySGVpZ2h0KHRydWUpICsgb2Zmc2V0ICsgMTAwLFxyXG5cdFx0XHRib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3aW5kb3dNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuXHRcdHJldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMFxyXG5cdH1cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHRh9C10YLRh9C40LrQsCBcclxuXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHJcblx0ZnVuY3Rpb24gY2F0YWxvZ0l0ZW1Db3VudGVyKGZpZWxkKXtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBmaWVsZENvdW50ID0gZnVuY3Rpb24oZWwpIHtcclxuXHJcblx0XHRcdFx0dmFyIFxyXG5cdFx0XHRcdFx0Ly8g0JzQuNC9LiDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRtaW4gPSBlbC5kYXRhKCdtaW4nKSB8fCBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvLyDQnNCw0LrRgS4g0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0bWF4ID0gZWwuZGF0YSgnbWF4JykgfHwgZmFsc2UsIFxyXG5cclxuXHRcdFx0XHRcdC8vINCa0L3QvtC/0LrQsCDRg9C80LXQvdGM0YjQtdC90LjRjyDQutC+0Lst0LLQsFxyXG5cdFx0XHRcdFx0ZGVjID0gZWwucHJldignLmRlYycpLCBcclxuXHJcblx0XHRcdFx0XHQvLyDQmtC90L7Qv9C60LAg0YPQstC10LvQuNGH0LXQvdC40Y8g0LrQvtC7LdCy0LBcclxuXHRcdFx0XHRcdGluYyA9IGVsLm5leHQoJy5pbmMnKTtcclxuXHJcblx0XHRcdFx0ZnVuY3Rpb24gaW5pdChlbCkge1xyXG5cdFx0XHRcdFx0aWYoIWVsLmF0dHIoJ2Rpc2FibGVkJykpe1xyXG5cdFx0XHRcdFx0XHRkZWMub24oJ2NsaWNrJywgZGVjcmVtZW50KTtcclxuXHRcdFx0XHRcdFx0aW5jLm9uKCdjbGljaycsIGluY3JlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8g0KPQvNC10L3RjNGI0LjQvCDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBkZWNyZW1lbnQoKSB7XHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsWzBdLnZhbHVlKTtcclxuXHRcdFx0XHRcdFx0dmFsdWUtLTtcclxuXHJcblx0XHRcdFx0XHRcdGlmKCFtaW4gfHwgdmFsdWUgPj0gbWluKSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxbMF0udmFsdWUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyDQo9Cy0LXQu9C40YfQuNC8INC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGluY3JlbWVudCgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQoZWxbMF0udmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR2YWx1ZSsrO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIW1heCB8fCB2YWx1ZSA8PSBtYXgpIHtcclxuXHRcdFx0XHRcdFx0XHRlbFswXS52YWx1ZSA9IHZhbHVlKys7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpbml0KCQodGhpcykpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JChmaWVsZCkuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGZpZWxkQ291bnQoJCh0aGlzKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdGNhdGFsb2dJdGVtQ291bnRlcignLmNvdW50ZXJfX2lucHV0Jyk7XHJcblxyXG5cdCQoJy5jb3VudGVyX19pbnB1dCcpLmJsdXIoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdmFsdWUgPSAkKHRoaXMpLnZhbCgpO1xyXG5cdFx0aWYoISgkLmlzTnVtZXJpYyh2YWx1ZSkpKSB7XHJcblx0XHRcdCQoJy5jb3VudGVyX19pbnB1dCcpLnZhbCgnMScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxufSkoKTtcclxuIiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LrRgNC+0LvQu9CwINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtC+0YDQt9C40L3QsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcjYmFza2V0LXNjcm9sbCcpLFxyXG5cdFx0YmxvY2sgPSAkKCcuYmFza2V0X19ibG9jay0taGlkZGVuJyksXHJcblx0XHRyb3cgPSAkKCcuYmFza2V0X19yb3ctLWhpZGRlbicpLFxyXG5cdFx0Ym9keSA9ICQoJ2JvZHksIGh0bWwnKSxcclxuXHRcdGR1cmF0aW9uID0gNTAwO1xyXG5cclxuXHJcblx0bGluay5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0YmxvY2suc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHJcblx0XHRyb3cuc2xpZGVEb3duKGR1cmF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hdHRyKCdzdHlsZScsICdkaXNwbGF5OiBmbGV4Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBibG9ja0hlaWdodCA9ICQoJy5iYXNrZXQtZm9ybV9fd3JhcCcpLm9mZnNldCgpLnRvcDtcclxuXHRcdFx0Ym9keS5hbmltYXRlKHtzY3JvbGxUb3A6IGJsb2NrSGVpZ2h0fSwgMTAwMCk7XHJcblx0XHR9LCBkdXJhdGlvbik7XHJcblx0fSk7XHJcblxyXG5cclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQsiDRgdC10LrRhtC40LggY2FyZCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQsCDRgtC+0LLQsNGA0LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJy5jYXJkX19kaXNwbGF5Jykuc2xpY2soe1xyXG5cdFx0c2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRhcnJvd3M6IHRydWUsXHJcblx0XHRmYWRlOiB0cnVlLFxyXG5cdFx0YXNOYXZGb3I6ICcuY2FyZF9fbW9yZSwgLmNhcmQtem9vbV9fbGlzdCcsXHJcblx0fSk7XHJcblxyXG5cdCQoJy5jYXJkX19tb3JlJykuc2xpY2soe1xyXG5cdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRhc05hdkZvcjogJy5jYXJkX19kaXNwbGF5LCAuY2FyZC16b29tX19saXN0JyxcclxuXHRcdGNlbnRlck1vZGU6IHRydWUsXHJcblx0XHRmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG5cdFx0cmVzcG9uc2l2ZTogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnJlYWtwb2ludDogMTAyNCxcclxuXHRcdFx0XHRzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdFx0XHRjZW50ZXJNb2RlOiB0cnVlLFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJyZWFrcG9pbnQ6IDk2MCxcclxuXHRcdFx0XHRzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdFx0XHRjZW50ZXJNb2RlOiB0cnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YnJlYWtwb2ludDogNzAwLFxyXG5cdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdGNlbnRlck1vZGU6IHRydWUsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC90LjQttC90LXQs9C+INGB0LvQsNC50LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJy5jYXJkLXNsaWRlcl9fbGlzdCcpLnNsaWNrKHtcclxuXHRcdGluZmluaXRlOiB0cnVlLFxyXG5cdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRjZW50ZXJNb2RlOiB0cnVlLFxyXG5cdFx0dmFyaWFibGVXaWR0aDogdHJ1ZVxyXG5cdH0pO1xyXG59KSgpO1xyXG4iLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQsNCx0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQuFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHRhYnMgPSAkKCcuY2FyZC10YWJzX19jb250cm9sJyksXHJcblx0XHRpdGVtcyA9ICQoJy5jYXJkLXRhYnNfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZVRhYiA9ICdjYXJkLXRhYnNfX2NvbnRyb2wtLWFjdGl2ZScsXHJcblx0XHRhY3RpdmVJdGVtID0gJ2NhcmQtdGFic19faXRlbS0tYWN0aXZlJztcclxuXHJcblx0XHR0YWJzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHR0YWJBY3RpdmUgPSB0YWJzLmZpbHRlcignLicgKyBhY3RpdmVUYWIpLFxyXG5cdFx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxVGFiID0gdGFicy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0dGFiQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFUYWIuYWRkQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgtCw0LHQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQlNC+0YHRgtCw0LLQutCwINC4INC+0L/Qu9Cw0YLQsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHRhYnMgPSAkKCcuZGVsaXZlcnlfX2RvdCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuZGVsaXZlcnlfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZVRhYiA9ICdkZWxpdmVyeV9fZG90LS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdkZWxpdmVyeV9faXRlbS0tYWN0aXZlJztcclxuXHJcblx0XHR0YWJzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHR0YWJBY3RpdmUgPSB0YWJzLmZpbHRlcignLicgKyBhY3RpdmVUYWIpLFxyXG5cdFx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxVGFiID0gdGFicy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0dGFiQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFUYWIuYWRkQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgtCw0LHQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQodC+0YLRgNGD0LTQvdC40YfQtdGB0YLQstC+XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgdGFicyA9ICQoJy5jb29wX19kb3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLmNvb3BfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZVRhYiA9ICdjb29wX19kb3QtLWFjdGl2ZScsXHJcblx0XHRhY3RpdmVJdGVtID0gJ2Nvb3BfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LzQtdC90Y4g0LIgaGVhZGVyXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJy5oZWFkZXJfX2J0bicpLFxyXG5cdFx0bGlzdCA9ICQoJy5oZWFkZXJfX2xpc3QgJyksXHJcblx0XHRhY3RpdmVMaW5rID0gJ2hlYWRlcl9fYnRuLS1hY3RpdmUnXHJcblx0XHRmbGFnID0gdHJ1ZTtcclxuXHJcblx0bGluay5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdGxpbmsuYWRkQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdGxpc3Quc2xpZGVEb3duKDUwMCk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdGxpc3Quc2xpZGVVcCgnNTAwJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0bGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRcdH0sNTAwKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyBmb290ZXJcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnLmZvb3Rlcl9fdGl0bGUnKSxcclxuXHRcdGFjdGl2ZUxpbmsgPSAnZm9vdGVyX190aXRsZS0tYWN0aXZlJyxcclxuXHRcdGR1cmF0aW9uID0gNDAwO1xyXG5cclxuXHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBmaW5kQmxvY2sgPSAkKHRoaXMpLm5leHQoJy5mb290ZXJfX2Jsb2NrLXdyYXAnKSxcclxuXHRcdFx0XHRmaW5kV3JhcHBlciA9ICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fdG9wJyk7XHJcblxyXG5cdFx0XHRpZiAoZmluZEJsb2NrLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdFx0ZmluZEJsb2NrLnNsaWRlVXAoZHVyYXRpb24pO1xyXG5cdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZmluZFdyYXBwZXIuZmluZCgnLmZvb3Rlcl9fYmxvY2std3JhcCcpLnNsaWRlVXAoZHVyYXRpb24pO1xyXG5cdFx0XHRcdGZpbmRCbG9jay5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPIG1lbnUg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgtCw0LvQvtCzINC+0YLQvtC/0LvQtdC90LjRj1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcuaGVhdGluZ19fc3VidGl0bGUnKSxcclxuXHRcdGFjdGl2ZUxpbmsgPSAnaGVhdGluZ19fc3VidGl0bGUtLWFjdGl2ZScsXHJcblx0XHRsaXN0ID0gJCgnLmhlYXRpbmdfX21lbnUnKS5jaGlsZHJlbignLmZvb3Rlcl9fbGlzdCcpO1xyXG5cdFx0ZHVyYXRpb24gPSA0MDAsXHJcblx0XHRmbGFnID0gdHJ1ZTtcclxuXHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRcdGxpbmsuYWRkQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdFx0bGlzdC5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cdFx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRcdGxpc3Quc2xpZGVVcChkdXJhdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0XHRcdH0sZHVyYXRpb24pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxufSkoKTsiLCIvL9Ck0YPQvdC60YbQuNGPINC00LvRjyDRgdGC0YDQsNC90LjRhtGLINGC0LXRgdGC0LBcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHR2YXIgciA9ICQoJy50ZXN0X19yYW5nZScpO1xyXG5cclxuXHRyLm9uKCdtb3VzZWVudGVyJyxmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHAgPSByLnZhbCgpO1xyXG5cdFx0ci5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHAgPSByLnZhbCgpO1xyXG5cdFx0XHRiZyhwKTtcclxuXHRcdH0pO1xyXG5cdFx0ci5vbignbW91c2Vtb3ZlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRwID0gci52YWwoKTtcclxuXHRcdFx0YmcocCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkaXNwbGF5ID0gJCgnLm5vdy1udW0nKVxyXG5cdFx0ZGlzcGxheS5odG1sKHIudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBiZyhuKXtcclxuXHRcdHIuY3NzKHtcclxuXHRcdFx0J2JhY2tncm91bmQtaW1hZ2UnOictd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0ICwjZjAwYjUyIDAlLCNmMDBiNTIgJytuIC8gMy41KyclLCNkN2Q3ZDcgJytuIC8gMy41KyclLCAjZDdkN2Q3IDEwMCUpJ1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblx0dmFyIGl0ZW1zID0gJCgnLnRlc3RfX2l0ZW0nKSxcclxuXHRcdGl0ZW1BY3RpdmUgPSAndGVzdF9faXRlbS0tYWN0aXZlJyxcclxuXHRcdHByZXYgPSAkKCcudGVzdF9fYnRuLS1wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLnRlc3RfX2J0bi0tbmV4dCcpLFxyXG5cdFx0YmxvY2sgPSAkKCcudGVzdF9fcm93LWJsb2NrJyksXHJcblx0XHRpbnB1dCA9IGJsb2NrLmZpbmQoJy50ZXN0X19yYWRpbycpLFxyXG5cdFx0bGFiZWwgPSBibG9jay5maW5kKCcudGVzdF9fbGFiZWwnKTtcclxuXHJcblx0XHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtQWN0aXZlKSxcclxuXHRcdFx0XHRpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKSxcclxuXHRcdFx0XHRhY3RpdmVDb3VudCA9IGFjdGl2ZUl0ZW0uZmluZCgnLnRlc3RfX251bScpO1xyXG5cclxuXHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlaGd0aCkge1xyXG5cdFx0XHRcdGluZGV4ID0gaXRlbXMtbGVuZ3RoIC0gMTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcUNvdW50ID0gcmVxSXRlbS5maW5kKCcudGVzdF9fbnVtJyk7XHJcblxyXG5cdFx0XHRpZihyZXFJdGVtLmZpbmQoJyNyYW5nZScpLmxlbmd0aCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIHJhbmdlVmFsdWUgPSByLnZhbCgpLFxyXG5cdFx0XHRcdFx0Y291bnRWYWw7XHJcblxyXG5cdFx0XHRcdGlmKHJhbmdlVmFsdWUgPCA1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAyMDA7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gNTAgJiYgcmFuZ2VWYWx1ZSA8IDcwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDUwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA3MCAmJiByYW5nZVZhbHVlIDwgMTAwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDEwMDA7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTAwICYmIHJhbmdlVmFsdWUgPCAxNTApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMjAwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxNTApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMzAwMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBjb3VudFZhbFN1bSA9IE51bWJlcihhY3RpdmVDb3VudC5odG1sKCkpICsgY291bnRWYWw7XHJcblx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbFN1bSArICcgJyk7XHJcblxyXG5cdFx0XHRcdHIub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR2YXIgcmFuZ2VWYWx1ZSA9IHIudmFsKCksXHJcblx0XHRcdFx0XHRcdGNvdW50VmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmKHJhbmdlVmFsdWUgPD0gNTApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAyMDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA1MCAmJiByYW5nZVZhbHVlIDw9IDcwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gNTAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gNzAgJiYgcmFuZ2VWYWx1ZSA8PSAxMDApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAxMDAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTAwICYmIHJhbmdlVmFsdWUgPD0gMTUwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gMjAwMDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDE1MCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDMwMDA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGNvdW50VmFsU3VtID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyBjb3VudFZhbDtcclxuXHRcdFx0XHRcdHJlcUNvdW50Lmh0bWwoY291bnRWYWxTdW0gKyAnICcpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChyZXFJdGVtLmZpbmQoJy50ZXN0X19pbmZvLW51bScpLmxlbmd0aCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIHN1bSA9ICQoJy50ZXN0X19pbmZvLW51bScpLFxyXG5cdFx0XHRcdFx0Y291bnRTdW0gPSBhY3RpdmVDb3VudC5odG1sKCk7XHJcblx0XHRcdFx0XHRzdW0uaHRtbChjb3VudFN1bSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGNvdW50VmFsID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyAyMDA7XHJcblx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbCArICcgJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblxyXG5cdFx0fSk7XHJcblx0XHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtQWN0aXZlKSxcclxuXHRcdFx0XHRpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcblx0XHRcdGluZGV4LS07XHJcblx0XHRcdGlmKGluZGV4IDw9IDApIHtcclxuXHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyBzd2lwZSDQvdCwINCz0LvQsNCy0L3QvtC5XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQvLyAkKFwiLm1haW4tc2xpZGVyX19saXN0XCIpLnN3aXBlKCB7XHJcblx0Ly8gXHRzd2lwZUxlZnQ6bGVmdFN3aXBlLFxyXG5cdC8vIFx0c3dpcGVSaWdodDpyaWdodFN3aXBlLFxyXG5cdC8vIH0pO1xyXG5cdC8vIGZ1bmN0aW9uIGxlZnRTd2lwZShldmVudCl7XHJcblx0Ly8gXHRhbGVydCgnc3dpcGUgbGVmdCcpO1xyXG5cdC8vIH1cclxuXHQvLyBmdW5jdGlvbiByaWdodFN3aXBlKGV2ZW50KXtcclxuXHQvLyBcdGFsZXJ0KCdzd2lwZSByaWdodCcpO1xyXG5cdC8vIH1cclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQvdCwINC90LDQttCw0YLRg9GOINCz0LDQu9C60YNcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBidG4gPSAkKCcuanMtY2hlY2snKSxcclxuXHRcdGNoZWNrID0gJCgnLmNoZWNrX19pbnB1dCcpO1xyXG5cclxuXHRcdGlmKGNoZWNrLmxlbmd0aCkge1xyXG5cdFx0XHRidG4uY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYoIShjaGVjay5pcygnOmNoZWNrZWQnKSkpIHtcclxuXHRcdFx0XHRcdHdpbmRvdy5hbGVydCgn0JTQsNC50YLQtSDRgdCy0L7QtSDRgdC+0LPQu9Cw0YHQuNC1INC90LAg0L7QsdGA0LDQsdC+0YLQutGDINC00LDQvdC90YvRhSEnKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG59KSgpOyJdfQ==
