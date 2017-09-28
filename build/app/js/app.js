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
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.card__display, .card-zoom__list',
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
		label.click(function() {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1hc2suanMiLCJtYWluLXNsaWRlci5qcyIsInRlY2gtc2xpZGVyLmpzIiwiZGlhZ3JhbS5qcyIsImNvdW50ZXIuanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiLCJkaWxpdmVyeS10YWJzLmpzIiwiY29vcC10YWJzLmpzIiwibWVudS5qcyIsImZvb3Rlci5qcyIsImhlYXRpbmctbWVudS5qcyIsImNhbGN1bGF0b3IuanMiLCJzd2lwZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDQkdC40LHQu9C40L7RgtC10LrQsCB3b3cuanMg0LTQu9GPINCw0L3QuNC80LDRhtC40LhcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0bmV3IFdPVygpLmluaXQoKTtcclxufSkoKTsiLCIvLyDQkdC40LHQu9C40L7RgtC10LrQsCBjb2NlbiDQtNC70Y8gYmVmb3JlL2FmdGVyXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdCQoJy5jb2NvZW4nKS5jb2NvZW4oKTtcclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC60LDQt9CwINGB0LLQs1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdHN2ZzRldmVyeWJvZHkoKTtcclxufSk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC80LDRgdC60Lgg0YLQtdC70LXRhNC+0L3QsCDQsiDQvtGE0L7RgNC80LvQtdC90LjQtSDQt9Cw0LrQsNC30LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJyNwaG9uZScpLm1hc2soXCIrNyAoOTk5KSA5OTktOTktOTlcIik7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0L3QsCDQs9C70LDQstC90L7QuVxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSAkKCcubWFpbi1zbGlkZXJfX2xpc3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLm1haW4tc2xpZGVyX19pdGVtJyksXHJcblx0XHRpdGVtc0FjdGl2ZSA9ICdtYWluLXNsaWRlcl9faXRlbS0tYWN0aXZlJyxcclxuXHRcdGRvdCA9ICQoJy5tYWluLXNsaWRlcl9fZG90JyksXHJcblx0XHRwcmV2ID0gJCgnLm1haW4tc2xpZGVyX19jb250cm9sLS1wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLm1haW4tc2xpZGVyX19jb250cm9sLS1uZXh0JyksXHJcblx0XHRkdXJhdGlvbiA9IDI0MDAsXHJcblx0XHRkb3RBbmltYXRlID0gJ21haW4tc2xpZGVyX19kb3QtLWFuaW1hdGUnLFxyXG5cdFx0ZG90QWN0aXZlID0gJ21haW4tc2xpZGVyX19kb3QtLWFjdGl2ZScsXHJcblx0XHRhbmltYXRlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBbmltYXRlKSxcclxuXHRcdGluZGV4ID0gMDtcclxuXHJcblx0dmFyIG1haW5TbGlkZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHJcblx0XHRpbmRleCsrO1xyXG5cclxuXHRcdHZhciByZXFEb3QgPSBkb3QuZXEoaW5kZXgpLFxyXG5cdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0XHRkb3QuZXEoaW5kZXgpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRcdGNsZWFyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW92ZShpbmRleCk7XHJcblxyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpLnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRyZXFEb3QuYWRkQ2xhc3MoZG90QW5pbWF0ZSkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0sZHVyYXRpb24pO1xyXG5cclxuXHR2YXIgY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChtYWluU2xpZGVyKTtcclxuXHR9XHJcblxyXG5cdHZhciBtb3ZlID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHRcdHZhciBwZXJjID0gJy0nICsgMTAwICogaW5kZXggKyAnJSc7XHJcblx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoJyArIHBlcmMgKyAnKScpO1xyXG5cdH1cclxuXHJcblx0ZG90LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSkucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0YWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLFxyXG5cdFx0XHRhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFjdGl2ZSk7XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGRvdC5lcShpbmRleCkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLFxyXG5cdFx0XHRhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpLnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpbmRleC0tO1xyXG5cdFx0aWYoaW5kZXggPCAwKSB7XHJcblx0XHRcdGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0ZG90LmVxKGluZGV4KS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSksXHJcblx0XHRcdGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSkucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGluZGV4Kys7XHJcblx0XHRpZihpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRkb3QuZXEoaW5kZXgpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0fSk7XHJcblxyXG5cdGxpc3Quc3dpcGUoIHtcclxuXHRcdHN3aXBlTGVmdDpsZWZ0U3dpcGUsXHJcblx0XHRzd2lwZVJpZ2h0OnJpZ2h0U3dpcGUsXHJcblx0fSk7XHJcblx0ZnVuY3Rpb24gbGVmdFN3aXBlKGV2ZW50KXtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLFxyXG5cdFx0XHRhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpLnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpbmRleCsrO1xyXG5cdFx0aWYoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gMDtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0ZG90LmVxKGluZGV4KS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdH1cclxuXHRmdW5jdGlvbiByaWdodFN3aXBlKGV2ZW50KXtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLFxyXG5cdFx0XHRhY3RpdmVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpLnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpbmRleC0tO1xyXG5cdFx0aWYoaW5kZXggPCAwKSB7XHJcblx0XHRcdGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0ZG90LmVxKGluZGV4KS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdH1cclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0YLQtdGF0L3QvtC70L7Qs9C40LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBpdGVtcyA9ICQoJy50ZWNoLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICd0ZWNoLXNsaWRlcl9faXRlbS0tYWN0aXZlJyxcclxuXHRcdGRvdHMgPSAkKCcudGVjaC1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0YWN0aXZlRG90cyA9ICd0ZWNoLXNsaWRlcl9fZG90LS1hY3RpdmUnLFxyXG5cdFx0cHJldiA9ICQoJy50ZWNoLXNsaWRlcl9fcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy50ZWNoLXNsaWRlcl9fbmV4dCcpO1xyXG5cclxuXHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKSxcclxuXHRcdFx0aW5kZXggPSBpdGVtQWN0aXZlLmluZGV4KCk7XHJcblxyXG5cdFx0XHRpbmRleC0tO1xyXG5cclxuXHRcdFx0aWYoaW5kZXggPCAwKSB7XHJcblx0XHRcdFx0aW5kZXggPSBkb3RzLmxlbmd0aCAtIDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0fSk7XHJcblxyXG5cdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpLFxyXG5cdFx0XHRpbmRleCA9IGl0ZW1BY3RpdmUuaW5kZXgoKTtcclxuXHJcblx0XHRcdGluZGV4Kys7XHJcblxyXG5cdFx0XHRpZihpbmRleD49aXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdH0pO1xyXG5cclxuXHRkb3RzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKTtcclxuXHJcblx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0fSk7XHJcblxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQtNC40LDQs9GA0LDQvCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0YHRgNCw0LLQvdC10L3QuNGPXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgYmxvY2sgPSAkKCcuZGlhZ3JhbV9faW1nJyksXHJcblx0XHRjb3VudGVyID0gJCgnLmRpYWdyYW1fX3ByaWNlJyk7XHJcblxyXG5cclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHR2YXIgc2Nyb2xsVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRmb3IgKGk9MDsgaTxibG9jay5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdHZhciBibG9ja0VxID0gYmxvY2suZXEoaSksXHJcblx0XHRcdFx0Y291bnRlckVxID0gY291bnRlci5lcShpKSxcclxuXHRcdFx0XHRwYXJlbnQgPSBjb3VudGVyRXEuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0nKSxcclxuXHRcdFx0XHRoZWlnaHQgPSBibG9ja0VxLmF0dHIoJ2RhdGEtaGVpZ2h0JyksXHJcblx0XHRcdFx0ZGF0YUNvdW50ZXIgPSBjb3VudGVyLmVxKGkpLmF0dHIoJ2RhdGEtY291bnRlcicpO1xyXG5cclxuXHJcblx0XHRcdGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgYmxvY2tFcSkpIHtcclxuXHRcdFx0XHRibG9ja0VxLmFuaW1hdGUoe2hlaWdodDowLCBoZWlnaHR9LCAxMDAwKTtcclxuXHRcdFx0XHRjb3VudGVyRXEuYW5pbWF0ZSh7bnVtOiBkYXRhQ291bnRlciAtIDN9LCB7XHJcblx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcclxuXHRcdFx0XHRcdHN0ZXA6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLXByaWNlJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApICsgJyDRgtGL0YEnO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYodGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tY29zdCcpIHx8IHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLXNlcnZpY2UnKSB8fCB0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1tb250aCcpKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApICsgJyDRgCc7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHR2YXIgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCwgYmxvY2spIHtcclxuXHRcdHZhciBvZmZzZXQgPSBibG9jay5vZmZzZXQoKS50b3AsXHJcblx0XHRcdHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKSxcclxuXHRcdFx0dG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luIC0gODAwLFxyXG5cdFx0XHRib3R0b21FZGdlID0gYmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQgKyAxMDAsXHJcblx0XHRcdGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG5cdFx0cmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwXHJcblx0fVxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdGH0LXRgtGH0LjQutCwIFxyXG5cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cclxuXHRmdW5jdGlvbiBjYXRhbG9nSXRlbUNvdW50ZXIoZmllbGQpe1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGZpZWxkQ291bnQgPSBmdW5jdGlvbihlbCkge1xyXG5cclxuXHRcdFx0XHR2YXIgXHJcblx0XHRcdFx0XHQvLyDQnNC40L0uINC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdG1pbiA9IGVsLmRhdGEoJ21pbicpIHx8IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8vINCc0LDQutGBLiDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRtYXggPSBlbC5kYXRhKCdtYXgnKSB8fCBmYWxzZSwgXHJcblxyXG5cdFx0XHRcdFx0Ly8g0JrQvdC+0L/QutCwINGD0LzQtdC90YzRiNC10L3QuNGPINC60L7Quy3QstCwXHJcblx0XHRcdFx0XHRkZWMgPSBlbC5wcmV2KCcuZGVjJyksIFxyXG5cclxuXHRcdFx0XHRcdC8vINCa0L3QvtC/0LrQsCDRg9Cy0LXQu9C40YfQtdC90LjRjyDQutC+0Lst0LLQsFxyXG5cdFx0XHRcdFx0aW5jID0gZWwubmV4dCgnLmluYycpO1xyXG5cclxuXHRcdFx0XHRmdW5jdGlvbiBpbml0KGVsKSB7XHJcblx0XHRcdFx0XHRpZighZWwuYXR0cignZGlzYWJsZWQnKSl7XHJcblx0XHRcdFx0XHRcdGRlYy5vbignY2xpY2snLCBkZWNyZW1lbnQpO1xyXG5cdFx0XHRcdFx0XHRpbmMub24oJ2NsaWNrJywgaW5jcmVtZW50KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyDQo9C80LXQvdGM0YjQuNC8INC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGRlY3JlbWVudCgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQoZWxbMF0udmFsdWUpO1xyXG5cdFx0XHRcdFx0XHR2YWx1ZS0tO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIW1pbiB8fCB2YWx1ZSA+PSBtaW4pIHtcclxuXHRcdFx0XHRcdFx0XHRlbFswXS52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vINCj0LLQtdC70LjRh9C40Lwg0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gaW5jcmVtZW50KCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUludChlbFswXS52YWx1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhbHVlKys7XHJcblxyXG5cdFx0XHRcdFx0XHRpZighbWF4IHx8IHZhbHVlIDw9IG1heCkge1xyXG5cdFx0XHRcdFx0XHRcdGVsWzBdLnZhbHVlID0gdmFsdWUrKztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWwuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGluaXQoJCh0aGlzKSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkKGZpZWxkKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0ZmllbGRDb3VudCgkKHRoaXMpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0Y2F0YWxvZ0l0ZW1Db3VudGVyKCcuY291bnRlcl9faW5wdXQnKTtcclxuXHJcblx0JCgnLmNvdW50ZXJfX2lucHV0JykuYmx1cihmdW5jdGlvbigpIHtcclxuXHRcdHZhciB2YWx1ZSA9ICQodGhpcykudmFsKCk7XHJcblx0XHRpZighKCQuaXNOdW1lcmljKHZhbHVlKSkpIHtcclxuXHRcdFx0JCgnLmNvdW50ZXJfX2lucHV0JykudmFsKCcxJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KSgpO1xyXG4iLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQutGA0L7Qu9C70LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0L7RgNC30LjQvdCwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJyNiYXNrZXQtc2Nyb2xsJyksXHJcblx0XHRibG9jayA9ICQoJy5iYXNrZXRfX2Jsb2NrLS1oaWRkZW4nKSxcclxuXHRcdHJvdyA9ICQoJy5iYXNrZXRfX3Jvdy0taGlkZGVuJyksXHJcblx0XHRib2R5ID0gJCgnYm9keSwgaHRtbCcpLFxyXG5cdFx0ZHVyYXRpb24gPSA1MDA7XHJcblxyXG5cclxuXHRsaW5rLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRibG9jay5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cclxuXHRcdHJvdy5zbGlkZURvd24oZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLmF0dHIoJ3N0eWxlJywgJ2Rpc3BsYXk6IGZsZXgnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGJsb2NrSGVpZ2h0ID0gJCgnLmJhc2tldC1mb3JtX193cmFwJykub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHRib2R5LmFuaW1hdGUoe3Njcm9sbFRvcDogYmxvY2tIZWlnaHR9LCAxMDAwKTtcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHR9KTtcclxuXHJcblxyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINCyINGB0LXQutGG0LjQuCBjYXJkINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutCwINGC0L7QstCw0YDQsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0JCgnLmNhcmRfX2Rpc3BsYXknKS5zbGljayh7XHJcblx0XHRzbGlkZXNUb1Nob3c6IDEsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGFycm93czogdHJ1ZSxcclxuXHRcdGZhZGU6IHRydWUsXHJcblx0XHRhc05hdkZvcjogJy5jYXJkX19tb3JlLCAuY2FyZC16b29tX19saXN0JyxcclxuXHR9KTtcclxuXHJcblx0JCgnLmNhcmRfX21vcmUnKS5zbGljayh7XHJcblx0XHRzbGlkZXNUb1Nob3c6IDUsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGFzTmF2Rm9yOiAnLmNhcmRfX2Rpc3BsYXksIC5jYXJkLXpvb21fX2xpc3QnLFxyXG5cdFx0Zm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuXHRcdHJlc3BvbnNpdmU6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJyZWFrcG9pbnQ6IDEwMjQsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogNCxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAyLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiA5NjAsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiA3MDAsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogNSxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiA0ODAsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L3QuNC20L3QtdCz0L4g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQuFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0JCgnLmNhcmQtc2xpZGVyX19saXN0Jykuc2xpY2soe1xyXG5cdFx0aW5maW5pdGU6IHRydWUsXHJcblx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGNlbnRlck1vZGU6IHRydWUsXHJcblx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlXHJcblx0fSk7XHJcbn0pKCk7XHJcbiIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgtCw0LHQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQmtCw0YDRgtC+0YfQutC4XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgdGFicyA9ICQoJy5jYXJkLXRhYnNfX2NvbnRyb2wnKSxcclxuXHRcdGl0ZW1zID0gJCgnLmNhcmQtdGFic19faXRlbScpLFxyXG5cdFx0YWN0aXZlVGFiID0gJ2NhcmQtdGFic19fY29udHJvbC0tYWN0aXZlJyxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAnY2FyZC10YWJzX19pdGVtLS1hY3RpdmUnO1xyXG5cclxuXHRcdHRhYnMuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdHRhYkFjdGl2ZSA9IHRhYnMuZmlsdGVyKCcuJyArIGFjdGl2ZVRhYiksXHJcblx0XHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFUYWIgPSB0YWJzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHR0YWJBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcVRhYi5hZGRDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCU0L7RgdGC0LDQstC60LAg0Lgg0L7Qv9C70LDRgtCwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgdGFicyA9ICQoJy5kZWxpdmVyeV9fZG90JyksXHJcblx0XHRpdGVtcyA9ICQoJy5kZWxpdmVyeV9faXRlbScpLFxyXG5cdFx0YWN0aXZlVGFiID0gJ2RlbGl2ZXJ5X19kb3QtLWFjdGl2ZScsXHJcblx0XHRhY3RpdmVJdGVtID0gJ2RlbGl2ZXJ5X19pdGVtLS1hY3RpdmUnO1xyXG5cclxuXHRcdHRhYnMuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0XHRpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdHRhYkFjdGl2ZSA9IHRhYnMuZmlsdGVyKCcuJyArIGFjdGl2ZVRhYiksXHJcblx0XHRcdFx0cmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRyZXFUYWIgPSB0YWJzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHR0YWJBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdFx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHJlcVRhYi5hZGRDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGC0LDQsdC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCh0L7RgtGA0YPQtNC90LjRh9C10YHRgtCy0L5cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciB0YWJzID0gJCgnLmNvb3BfX2RvdCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuY29vcF9faXRlbScpLFxyXG5cdFx0YWN0aXZlVGFiID0gJ2Nvb3BfX2RvdC0tYWN0aXZlJyxcclxuXHRcdGFjdGl2ZUl0ZW0gPSAnY29vcF9faXRlbS0tYWN0aXZlJztcclxuXHJcblx0XHR0YWJzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHR0YWJBY3RpdmUgPSB0YWJzLmZpbHRlcignLicgKyBhY3RpdmVUYWIpLFxyXG5cdFx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxVGFiID0gdGFicy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0dGFiQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFUYWIuYWRkQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvNC10L3RjiDQsiBoZWFkZXJcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnLmhlYWRlcl9fYnRuJyksXHJcblx0XHRsaXN0ID0gJCgnLmhlYWRlcl9fbGlzdCAnKSxcclxuXHRcdGFjdGl2ZUxpbmsgPSAnaGVhZGVyX19idG4tLWFjdGl2ZSdcclxuXHRcdGZsYWcgPSB0cnVlO1xyXG5cclxuXHRsaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGZsYWcpIHtcclxuXHRcdFx0bGluay5hZGRDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0bGlzdC5zbGlkZURvd24oNTAwKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGluay5yZW1vdmVDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0bGlzdC5zbGlkZVVwKCc1MDAnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblx0XHRcdFx0fSw1MDApO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPIGZvb3RlclxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcuZm9vdGVyX190aXRsZScpLFxyXG5cdFx0YWN0aXZlTGluayA9ICdmb290ZXJfX3RpdGxlLS1hY3RpdmUnLFxyXG5cdFx0ZHVyYXRpb24gPSA0MDA7XHJcblxyXG5cdFx0bGluay5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGZpbmRCbG9jayA9ICQodGhpcykubmV4dCgnLmZvb3Rlcl9fYmxvY2std3JhcCcpLFxyXG5cdFx0XHRcdGZpbmRXcmFwcGVyID0gJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX190b3AnKTtcclxuXHJcblx0XHRcdGlmIChmaW5kQmxvY2suaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0XHRmaW5kQmxvY2suc2xpZGVVcChkdXJhdGlvbik7XHJcblx0XHRcdFx0bGluay5yZW1vdmVDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmaW5kV3JhcHBlci5maW5kKCcuZm9vdGVyX19ibG9jay13cmFwJykuc2xpZGVVcChkdXJhdGlvbik7XHJcblx0XHRcdFx0ZmluZEJsb2NrLnNsaWRlRG93bihkdXJhdGlvbik7XHJcblx0XHRcdFx0bGluay5yZW1vdmVDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8gbWVudSDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGC0LDQu9C+0LMg0L7RgtC+0L/Qu9C10L3QuNGPXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJy5oZWF0aW5nX19zdWJ0aXRsZScpLFxyXG5cdFx0YWN0aXZlTGluayA9ICdoZWF0aW5nX19zdWJ0aXRsZS0tYWN0aXZlJyxcclxuXHRcdGxpc3QgPSAkKCcuaGVhdGluZ19fbWVudScpLmNoaWxkcmVuKCcuZm9vdGVyX19saXN0Jyk7XHJcblx0XHRkdXJhdGlvbiA9IDQwMCxcclxuXHRcdGZsYWcgPSB0cnVlO1xyXG5cclxuXHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdFx0bGluay5hZGRDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0XHRsaXN0LnNsaWRlRG93bihkdXJhdGlvbik7XHJcblx0XHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdFx0bGlzdC5zbGlkZVVwKGR1cmF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0bGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRcdFx0fSxkdXJhdGlvbik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0ZmxhZyA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG59KSgpOyIsIi8v0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0YLRgNCw0L3QuNGG0Ysg0YLQtdGB0YLQsFxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cdHZhciByID0gJCgnLnRlc3RfX3JhbmdlJyk7XHJcblxyXG5cdHIub24oJ21vdXNlZW50ZXInLGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgcCA9IHIudmFsKCk7XHJcblx0XHRyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdFx0cCA9IHIudmFsKCk7XHJcblx0XHRcdGJnKHApO1xyXG5cdFx0fSk7XHJcblx0XHRyLm9uKCdtb3VzZW1vdmUnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHAgPSByLnZhbCgpO1xyXG5cdFx0XHRiZyhwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxuXHRyLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRpc3BsYXkgPSAkKCcubm93LW51bScpXHJcblx0XHRkaXNwbGF5Lmh0bWwoci52YWwoKSk7XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGJnKG4pe1xyXG5cdFx0ci5jc3Moe1xyXG5cdFx0XHQnYmFja2dyb3VuZC1pbWFnZSc6Jy13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQgLCNmMDBiNTIgMCUsI2YwMGI1MiAnK24gLyAzLjUrJyUsI2Q3ZDdkNyAnK24gLyAzLjUrJyUsICNkN2Q3ZDcgMTAwJSknXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuXHR2YXIgaXRlbXMgPSAkKCcudGVzdF9faXRlbScpLFxyXG5cdFx0aXRlbUFjdGl2ZSA9ICd0ZXN0X19pdGVtLS1hY3RpdmUnLFxyXG5cdFx0cHJldiA9ICQoJy50ZXN0X19idG4tLXByZXYnKSxcclxuXHRcdG5leHQgPSAkKCcudGVzdF9fYnRuLS1uZXh0JyksXHJcblx0XHRibG9jayA9ICQoJy50ZXN0X19yb3ctYmxvY2snKSxcclxuXHRcdGlucHV0ID0gYmxvY2suZmluZCgnLnRlc3RfX3JhZGlvJyksXHJcblx0XHRsYWJlbCA9IGJsb2NrLmZpbmQoJy50ZXN0X19sYWJlbCcpO1xyXG5cclxuXHRcdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1BY3RpdmUpLFxyXG5cdFx0XHRcdGluZGV4ID0gYWN0aXZlSXRlbS5pbmRleCgpLFxyXG5cdFx0XHRcdGFjdGl2ZUNvdW50ID0gYWN0aXZlSXRlbS5maW5kKCcudGVzdF9fbnVtJyk7XHJcblxyXG5cclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdFx0aWYoaW5kZXggPj0gaXRlbXMubGVoZ3RoKSB7XHJcblx0XHRcdFx0aW5kZXggPSBpdGVtcy1sZW5ndGggLSAxO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxQ291bnQgPSByZXFJdGVtLmZpbmQoJy50ZXN0X19udW0nKTtcclxuXHJcblx0XHRcdGlmKHJlcUl0ZW0uZmluZCgnI3JhbmdlJykubGVuZ3RoID09IHRydWUpIHtcclxuXHRcdFx0XHR2YXIgcmFuZ2VWYWx1ZSA9IHIudmFsKCksXHJcblx0XHRcdFx0XHRjb3VudFZhbDtcclxuXHJcblx0XHRcdFx0aWYocmFuZ2VWYWx1ZSA8IDUwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDIwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA1MCAmJiByYW5nZVZhbHVlIDwgNzApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gNTAwO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDcwICYmIHJhbmdlVmFsdWUgPCAxMDApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMTAwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxMDAgJiYgcmFuZ2VWYWx1ZSA8IDE1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAyMDAwO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDE1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAzMDAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIGNvdW50VmFsU3VtID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyBjb3VudFZhbDtcclxuXHRcdFx0XHRyZXFDb3VudC5odG1sKGNvdW50VmFsU3VtICsgJyAnKTtcclxuXHJcblx0XHRcdFx0ci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHZhciByYW5nZVZhbHVlID0gci52YWwoKSxcclxuXHRcdFx0XHRcdFx0Y291bnRWYWw7XHJcblxyXG5cdFx0XHRcdFx0aWYocmFuZ2VWYWx1ZSA8PSA1MCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDIwMDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDUwICYmIHJhbmdlVmFsdWUgPD0gNzApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSA1MDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA3MCAmJiByYW5nZVZhbHVlIDw9IDEwMCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDEwMDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxMDAgJiYgcmFuZ2VWYWx1ZSA8PSAxNTApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAyMDAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTUwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gMzAwMDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgY291bnRWYWxTdW0gPSBOdW1iZXIoYWN0aXZlQ291bnQuaHRtbCgpKSArIGNvdW50VmFsO1xyXG5cdFx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbFN1bSArICcgJyk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKHJlcUl0ZW0uZmluZCgnLnRlc3RfX2luZm8tbnVtJykubGVuZ3RoID09IHRydWUpIHtcclxuXHRcdFx0XHR2YXIgc3VtID0gJCgnLnRlc3RfX2luZm8tbnVtJyksXHJcblx0XHRcdFx0XHRjb3VudFN1bSA9IGFjdGl2ZUNvdW50Lmh0bWwoKTtcclxuXHRcdFx0XHRcdHN1bS5odG1sKGNvdW50U3VtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgY291bnRWYWwgPSBOdW1iZXIoYWN0aXZlQ291bnQuaHRtbCgpKSArIDIwMDtcclxuXHRcdFx0XHRyZXFDb3VudC5odG1sKGNvdW50VmFsICsgJyAnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdGxhYmVsLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtQWN0aXZlKSxcclxuXHRcdFx0XHRpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKSxcclxuXHRcdFx0XHRhY3RpdmVDb3VudCA9IGFjdGl2ZUl0ZW0uZmluZCgnLnRlc3RfX251bScpO1xyXG5cclxuXHJcblx0XHRcdGluZGV4Kys7XHJcblx0XHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlaGd0aCkge1xyXG5cdFx0XHRcdGluZGV4ID0gaXRlbXMtbGVuZ3RoIC0gMTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcUNvdW50ID0gcmVxSXRlbS5maW5kKCcudGVzdF9fbnVtJyk7XHJcblxyXG5cdFx0XHRpZihyZXFJdGVtLmZpbmQoJyNyYW5nZScpLmxlbmd0aCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIHJhbmdlVmFsdWUgPSByLnZhbCgpLFxyXG5cdFx0XHRcdFx0Y291bnRWYWw7XHJcblxyXG5cdFx0XHRcdGlmKHJhbmdlVmFsdWUgPCA1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAyMDA7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gNTAgJiYgcmFuZ2VWYWx1ZSA8IDcwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDUwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA3MCAmJiByYW5nZVZhbHVlIDwgMTAwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDEwMDA7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTAwICYmIHJhbmdlVmFsdWUgPCAxNTApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMjAwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxNTApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMzAwMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBjb3VudFZhbFN1bSA9IE51bWJlcihhY3RpdmVDb3VudC5odG1sKCkpICsgY291bnRWYWw7XHJcblx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbFN1bSArICcgJyk7XHJcblxyXG5cdFx0XHRcdHIub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR2YXIgcmFuZ2VWYWx1ZSA9IHIudmFsKCksXHJcblx0XHRcdFx0XHRcdGNvdW50VmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmKHJhbmdlVmFsdWUgPD0gNTApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAyMDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA1MCAmJiByYW5nZVZhbHVlIDw9IDcwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gNTAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gNzAgJiYgcmFuZ2VWYWx1ZSA8PSAxMDApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAxMDAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTAwICYmIHJhbmdlVmFsdWUgPD0gMTUwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gMjAwMDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDE1MCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDMwMDA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGNvdW50VmFsU3VtID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyBjb3VudFZhbDtcclxuXHRcdFx0XHRcdHJlcUNvdW50Lmh0bWwoY291bnRWYWxTdW0gKyAnICcpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChyZXFJdGVtLmZpbmQoJy50ZXN0X19pbmZvLW51bScpLmxlbmd0aCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIHN1bSA9ICQoJy50ZXN0X19pbmZvLW51bScpLFxyXG5cdFx0XHRcdFx0Y291bnRTdW0gPSBhY3RpdmVDb3VudC5odG1sKCk7XHJcblx0XHRcdFx0XHRzdW0uaHRtbChjb3VudFN1bSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGNvdW50VmFsID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyAyMDA7XHJcblx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbCArICcgJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbUFjdGl2ZSk7XHJcblxyXG5cdFx0fSk7XHJcblx0XHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtQWN0aXZlKSxcclxuXHRcdFx0XHRpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcblx0XHRcdGluZGV4LS07XHJcblx0XHRcdGlmKGluZGV4IDw9IDApIHtcclxuXHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyBzd2lwZSDQvdCwINCz0LvQsNCy0L3QvtC5XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQvLyAkKFwiLm1haW4tc2xpZGVyX19saXN0XCIpLnN3aXBlKCB7XHJcblx0Ly8gXHRzd2lwZUxlZnQ6bGVmdFN3aXBlLFxyXG5cdC8vIFx0c3dpcGVSaWdodDpyaWdodFN3aXBlLFxyXG5cdC8vIH0pO1xyXG5cdC8vIGZ1bmN0aW9uIGxlZnRTd2lwZShldmVudCl7XHJcblx0Ly8gXHRhbGVydCgnc3dpcGUgbGVmdCcpO1xyXG5cdC8vIH1cclxuXHQvLyBmdW5jdGlvbiByaWdodFN3aXBlKGV2ZW50KXtcclxuXHQvLyBcdGFsZXJ0KCdzd2lwZSByaWdodCcpO1xyXG5cdC8vIH1cclxufSkoKTsiXX0=
