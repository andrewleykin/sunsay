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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1hc2suanMiLCJtYWluLXNsaWRlci5qcyIsInRlY2gtc2xpZGVyLmpzIiwiZGlhZ3JhbS5qcyIsImNvdW50ZXIuanMiLCJiYXNrZXQtc2Nyb2xsLmpzIiwiY2FyZC1zaG93LmpzIiwiY2FyZC1zbGlkZXIuanMiLCJjYXJkLXRhYnMuanMiLCJkaWxpdmVyeS10YWJzLmpzIiwiY29vcC10YWJzLmpzIiwibWVudS5qcyIsImZvb3Rlci5qcyIsImhlYXRpbmctbWVudS5qcyIsImNhbGN1bGF0b3IuanMiLCJzd2lwZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIHdvdy5qcyDQtNC70Y8g0LDQvdC40LzQsNGG0LjQuFxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHRuZXcgV09XKCkuaW5pdCgpO1xyXG59KSgpOyIsIi8vINCR0LjQsdC70LjQvtGC0LXQutCwIGNvY2VuINC00LvRjyBiZWZvcmUvYWZ0ZXJcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0JCgnLmNvY29lbicpLmNvY29lbigpO1xyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C+0LrQsNC30LAg0YHQstCzXHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcblx0c3ZnNGV2ZXJ5Ym9keSgpO1xyXG59KTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LzQsNGB0LrQuCDRgtC10LvQtdGE0L7QvdCwINCyINC+0YTQvtGA0LzQu9C10L3QuNC1INC30LDQutCw0LfQsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0JCgnI3Bob25lJykubWFzayhcIis3ICg5OTkpIDk5OS05OS05OVwiKTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINCz0LvQsNCy0L3QvtC5XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9ICQoJy5tYWluLXNsaWRlcl9fbGlzdCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcubWFpbi1zbGlkZXJfX2l0ZW0nKSxcclxuXHRcdGl0ZW1zQWN0aXZlID0gJ21haW4tc2xpZGVyX19pdGVtLS1hY3RpdmUnLFxyXG5cdFx0ZG90ID0gJCgnLm1haW4tc2xpZGVyX19kb3QnKSxcclxuXHRcdHByZXYgPSAkKCcubWFpbi1zbGlkZXJfX2NvbnRyb2wtLXByZXYnKSxcclxuXHRcdG5leHQgPSAkKCcubWFpbi1zbGlkZXJfX2NvbnRyb2wtLW5leHQnKSxcclxuXHRcdGR1cmF0aW9uID0gMjQwMCxcclxuXHRcdGRvdEFuaW1hdGUgPSAnbWFpbi1zbGlkZXJfX2RvdC0tYW5pbWF0ZScsXHJcblx0XHRkb3RBY3RpdmUgPSAnbWFpbi1zbGlkZXJfX2RvdC0tYWN0aXZlJyxcclxuXHRcdGFuaW1hdGVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFuaW1hdGUpLFxyXG5cdFx0aW5kZXggPSAwO1xyXG5cclxuXHR2YXIgbWFpblNsaWRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBbmltYXRlKSxcclxuXHRcdFx0YWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cclxuXHRcdGluZGV4Kys7XHJcblxyXG5cdFx0dmFyIHJlcURvdCA9IGRvdC5lcShpbmRleCksXHJcblx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCk7XHJcblxyXG5cdFx0aWYgKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRcdGRvdC5lcShpbmRleCkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdFx0Y2xlYXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSkucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdHJlcURvdC5hZGRDbGFzcyhkb3RBbmltYXRlKS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSxkdXJhdGlvbik7XHJcblxyXG5cdHZhciBjbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjbGVhckludGVydmFsKG1haW5TbGlkZXIpO1xyXG5cdH1cclxuXHJcblx0dmFyIG1vdmUgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0dmFyIHBlcmMgPSAnLScgKyAxMDAgKiBpbmRleCArICclJztcclxuXHRcdGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgcGVyYyArICcpJyk7XHJcblx0fVxyXG5cclxuXHRkb3QuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKS5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSksXHJcblx0XHRcdGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QWN0aXZlKTtcclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0ZG90LmVxKGluZGV4KS5hZGRDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSksXHJcblx0XHRcdGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSkucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGluZGV4LS07XHJcblx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0aW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRkb3QuZXEoaW5kZXgpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0fSk7XHJcblxyXG5cdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKSxcclxuXHRcdFx0YWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKS5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aW5kZXgrKztcclxuXHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGRvdC5lcShpbmRleCkuYWRkQ2xhc3MoZG90QWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0bGlzdC5zd2lwZSgge1xyXG5cdFx0c3dpcGVMZWZ0OmxlZnRTd2lwZSxcclxuXHRcdHN3aXBlUmlnaHQ6cmlnaHRTd2lwZSxcclxuXHR9KTtcclxuXHRmdW5jdGlvbiBsZWZ0U3dpcGUoZXZlbnQpe1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSksXHJcblx0XHRcdGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSkucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGluZGV4Kys7XHJcblx0XHRpZihpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRkb3QuZXEoaW5kZXgpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIHJpZ2h0U3dpcGUoZXZlbnQpe1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSksXHJcblx0XHRcdGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSkucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGluZGV4LS07XHJcblx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0aW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRhY3RpdmVEb3QucmVtb3ZlQ2xhc3MoZG90QWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRkb3QuZXEoaW5kZXgpLmFkZENsYXNzKGRvdEFjdGl2ZSk7XHJcblx0fVxyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINC90LAg0YHRgtGA0LDQvdC40YbQtSDRgtC10YXQvdC+0LvQvtCz0LjQuFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGl0ZW1zID0gJCgnLnRlY2gtc2xpZGVyX19pdGVtJyksXHJcblx0XHRhY3RpdmVJdGVtID0gJ3RlY2gtc2xpZGVyX19pdGVtLS1hY3RpdmUnLFxyXG5cdFx0ZG90cyA9ICQoJy50ZWNoLXNsaWRlcl9fZG90JyksXHJcblx0XHRhY3RpdmVEb3RzID0gJ3RlY2gtc2xpZGVyX19kb3QtLWFjdGl2ZScsXHJcblx0XHRwcmV2ID0gJCgnLnRlY2gtc2xpZGVyX19wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLnRlY2gtc2xpZGVyX19uZXh0Jyk7XHJcblxyXG5cdHByZXYuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgaXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpLFxyXG5cdFx0XHRpbmRleCA9IGl0ZW1BY3RpdmUuaW5kZXgoKTtcclxuXHJcblx0XHRcdGluZGV4LS07XHJcblxyXG5cdFx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0XHRpbmRleCA9IGRvdHMubGVuZ3RoIC0gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHR9KTtcclxuXHJcblx0bmV4dC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdHZhciBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRkb3RzQWN0aXZlID0gZG90cy5maWx0ZXIoJy4nICsgYWN0aXZlRG90cyksXHJcblx0XHRcdGluZGV4ID0gaXRlbUFjdGl2ZS5pbmRleCgpO1xyXG5cclxuXHRcdFx0aW5kZXgrKztcclxuXHJcblx0XHRcdGlmKGluZGV4Pj1pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdHJlcURvdHMuYWRkQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0fSk7XHJcblxyXG5cdGRvdHMuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpO1xyXG5cclxuXHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRyZXFEb3RzID0gZG90cy5lcShpbmRleCk7XHJcblxyXG5cdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRyZXFJdGVtLmFkZENsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC00LjQsNCz0YDQsNC8INC90LAg0YHRgtGA0LDQvdC40YbQtSDRgdGA0LDQstC90LXQvdC40Y9cclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBibG9jayA9ICQoJy5kaWFncmFtX19pbWcnKSxcclxuXHRcdGNvdW50ZXIgPSAkKCcuZGlhZ3JhbV9fcHJpY2UnKTtcclxuXHJcblxyXG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdHZhciBzY3JvbGxUb3AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdGZvciAoaT0wOyBpPGJsb2NrLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0dmFyIGJsb2NrRXEgPSBibG9jay5lcShpKSxcclxuXHRcdFx0XHRjb3VudGVyRXEgPSBjb3VudGVyLmVxKGkpLFxyXG5cdFx0XHRcdHBhcmVudCA9IGNvdW50ZXJFcS5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbScpLFxyXG5cdFx0XHRcdGhlaWdodCA9IGJsb2NrRXEuYXR0cignZGF0YS1oZWlnaHQnKSxcclxuXHRcdFx0XHRkYXRhQ291bnRlciA9IGNvdW50ZXIuZXEoaSkuYXR0cignZGF0YS1jb3VudGVyJyk7XHJcblxyXG5cclxuXHRcdFx0aWYgKGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wLCBibG9ja0VxKSkge1xyXG5cdFx0XHRcdGJsb2NrRXEuYW5pbWF0ZSh7aGVpZ2h0OjAsIGhlaWdodH0sIDEwMDApO1xyXG5cdFx0XHRcdGNvdW50ZXJFcS5hbmltYXRlKHtudW06IGRhdGFDb3VudGVyIC0gM30sIHtcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxyXG5cdFx0XHRcdFx0c3RlcDogZnVuY3Rpb24gKG51bSkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tcHJpY2UnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCkgKyAnINGC0YvRgSc7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZih0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1jb3N0JykgfHwgdGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tc2VydmljZScpIHx8IHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLW1vbnRoJykpe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKG51bSArIDMpLnRvRml4ZWQoMCkgKyAnINGAJztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG5cdHZhciBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24oc2Nyb2xsVG9wLCBibG9jaykge1xyXG5cdFx0dmFyIG9mZnNldCA9IGJsb2NrLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0d2luZG93TWFyZ2luID0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpLFxyXG5cdFx0XHR0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3aW5kb3dNYXJnaW4gLSA4MDAsXHJcblx0XHRcdGJvdHRvbUVkZ2UgPSBibG9jay5vdXRlckhlaWdodCh0cnVlKSArIG9mZnNldCArIDEwMCxcclxuXHRcdFx0Ym90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd2luZG93TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcblx0XHRyZXR1cm4gdG9wQm9yZGVyIDw9IDAgJiYgYm90dG9tQm9yZGVyIDw9IDBcclxuXHR9XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0YfQtdGC0YfQuNC60LAgXHJcblxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblxyXG5cdGZ1bmN0aW9uIGNhdGFsb2dJdGVtQ291bnRlcihmaWVsZCl7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZmllbGRDb3VudCA9IGZ1bmN0aW9uKGVsKSB7XHJcblxyXG5cdFx0XHRcdHZhciBcclxuXHRcdFx0XHRcdC8vINCc0LjQvS4g0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0bWluID0gZWwuZGF0YSgnbWluJykgfHwgZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0Ly8g0JzQsNC60YEuINC30L3QsNGH0LXQvdC40LVcclxuXHRcdFx0XHRcdG1heCA9IGVsLmRhdGEoJ21heCcpIHx8IGZhbHNlLCBcclxuXHJcblx0XHRcdFx0XHQvLyDQmtC90L7Qv9C60LAg0YPQvNC10L3RjNGI0LXQvdC40Y8g0LrQvtC7LdCy0LBcclxuXHRcdFx0XHRcdGRlYyA9IGVsLnByZXYoJy5kZWMnKSwgXHJcblxyXG5cdFx0XHRcdFx0Ly8g0JrQvdC+0L/QutCwINGD0LLQtdC70LjRh9C10L3QuNGPINC60L7Quy3QstCwXHJcblx0XHRcdFx0XHRpbmMgPSBlbC5uZXh0KCcuaW5jJyk7XHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGluaXQoZWwpIHtcclxuXHRcdFx0XHRcdGlmKCFlbC5hdHRyKCdkaXNhYmxlZCcpKXtcclxuXHRcdFx0XHRcdFx0ZGVjLm9uKCdjbGljaycsIGRlY3JlbWVudCk7XHJcblx0XHRcdFx0XHRcdGluYy5vbignY2xpY2snLCBpbmNyZW1lbnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vINCj0LzQtdC90YzRiNC40Lwg0LfQvdCw0YfQtdC90LjQtVxyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gZGVjcmVtZW50KCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUludChlbFswXS52YWx1ZSk7XHJcblx0XHRcdFx0XHRcdHZhbHVlLS07XHJcblxyXG5cdFx0XHRcdFx0XHRpZighbWluIHx8IHZhbHVlID49IG1pbikge1xyXG5cdFx0XHRcdFx0XHRcdGVsWzBdLnZhbHVlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8g0KPQstC10LvQuNGH0LjQvCDQt9C90LDRh9C10L3QuNC1XHJcblx0XHRcdFx0XHRmdW5jdGlvbiBpbmNyZW1lbnQoKSB7XHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IHBhcnNlSW50KGVsWzBdLnZhbHVlKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0dmFsdWUrKztcclxuXHJcblx0XHRcdFx0XHRcdGlmKCFtYXggfHwgdmFsdWUgPD0gbWF4KSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxbMF0udmFsdWUgPSB2YWx1ZSsrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aW5pdCgkKHRoaXMpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdCQoZmllbGQpLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRmaWVsZENvdW50KCQodGhpcykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRjYXRhbG9nSXRlbUNvdW50ZXIoJy5jb3VudGVyX19pbnB1dCcpO1xyXG5cclxuXHQkKCcuY291bnRlcl9faW5wdXQnKS5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHZhbHVlID0gJCh0aGlzKS52YWwoKTtcclxuXHRcdGlmKCEoJC5pc051bWVyaWModmFsdWUpKSkge1xyXG5cdFx0XHQkKCcuY291bnRlcl9faW5wdXQnKS52YWwoJzEnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcbn0pKCk7XHJcbiIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC60YDQvtC70LvQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQvtGA0LfQuNC90LBcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnI2Jhc2tldC1zY3JvbGwnKSxcclxuXHRcdGJsb2NrID0gJCgnLmJhc2tldF9fYmxvY2stLWhpZGRlbicpLFxyXG5cdFx0cm93ID0gJCgnLmJhc2tldF9fcm93LS1oaWRkZW4nKSxcclxuXHRcdGJvZHkgPSAkKCdib2R5LCBodG1sJyksXHJcblx0XHRkdXJhdGlvbiA9IDUwMDtcclxuXHJcblxyXG5cdGxpbmsuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGJsb2NrLnNsaWRlRG93bihkdXJhdGlvbik7XHJcblxyXG5cdFx0cm93LnNsaWRlRG93bihkdXJhdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykuYXR0cignc3R5bGUnLCAnZGlzcGxheTogZmxleCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgYmxvY2tIZWlnaHQgPSAkKCcuYmFza2V0LWZvcm1fX3dyYXAnKS5vZmZzZXQoKS50b3A7XHJcblx0XHRcdGJvZHkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBibG9ja0hlaWdodH0sIDEwMDApO1xyXG5cdFx0fSwgZHVyYXRpb24pO1xyXG5cdH0pO1xyXG5cclxuXHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0LIg0YHQtdC60YbQuNC4IGNhcmQg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LAg0YLQvtCy0LDRgNCwXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQkKCcuY2FyZF9fZGlzcGxheScpLnNsaWNrKHtcclxuXHRcdHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0YXJyb3dzOiB0cnVlLFxyXG5cdFx0ZmFkZTogdHJ1ZSxcclxuXHRcdGFzTmF2Rm9yOiAnLmNhcmRfX21vcmUnLFxyXG5cdH0pIC5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgdHlwZTogJ2ltYWdlJyxcclxuICAgICAgZGVsZWdhdGU6ICdhOm5vdCguc2xpY2stY2xvbmVkKScsXHJcbiAgICAgIGdhbGxlcnk6IHtcclxuICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSAkKCcuY2FyZF9fZGlzcGxheScpLnNsaWNrKCdzbGlja0N1cnJlbnRTbGlkZScpO1xyXG4gICAgICAgICAgJCgnLmNhcmRfX2Rpc3BsYXknKS5tYWduaWZpY1BvcHVwKCdnb1RvJywgY3VycmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkKCcuY2FyZF9fZGlzcGxheScpLnNsaWNrKCdzbGlja0dvVG8nLCBwYXJzZUludCh0aGlzLmluZGV4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblx0XHR9KTtcclxuXHJcblx0JCgnLmNhcmRfX21vcmUnKS5zbGljayh7XHJcblx0XHRzbGlkZXNUb1Nob3c6IDUsXHJcblx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdGFzTmF2Rm9yOiAnLmNhcmRfX2Rpc3BsYXknLFxyXG5cdFx0Zm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuXHRcdHJlc3BvbnNpdmU6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJyZWFrcG9pbnQ6IDEwMjQsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogNCxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAyLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiA5NjAsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiA3MDAsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogNSxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRicmVha3BvaW50OiA0ODAsXHJcblx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0aW5maW5pdGU6IHRydWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9KTtcclxuXHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC90LjQttC90LXQs9C+INGB0LvQsNC50LTQtdGA0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgNGC0L7Rh9C60LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdCQoJy5jYXJkLXNsaWRlcl9fbGlzdCcpLnNsaWNrKHtcclxuXHRcdGluZmluaXRlOiB0cnVlLFxyXG5cdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRjZW50ZXJNb2RlOiB0cnVlLFxyXG5cdFx0dmFyaWFibGVXaWR0aDogdHJ1ZVxyXG5cdH0pO1xyXG59KSgpO1xyXG4iLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0YLQsNCx0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0JrQsNGA0YLQvtGH0LrQuFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHRhYnMgPSAkKCcuY2FyZC10YWJzX19jb250cm9sJyksXHJcblx0XHRpdGVtcyA9ICQoJy5jYXJkLXRhYnNfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZVRhYiA9ICdjYXJkLXRhYnNfX2NvbnRyb2wtLWFjdGl2ZScsXHJcblx0XHRhY3RpdmVJdGVtID0gJ2NhcmQtdGFic19faXRlbS0tYWN0aXZlJztcclxuXHJcblx0XHR0YWJzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHR0YWJBY3RpdmUgPSB0YWJzLmZpbHRlcignLicgKyBhY3RpdmVUYWIpLFxyXG5cdFx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxVGFiID0gdGFicy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0dGFiQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFUYWIuYWRkQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgtCw0LHQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQlNC+0YHRgtCw0LLQutCwINC4INC+0L/Qu9Cw0YLQsFxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIHRhYnMgPSAkKCcuZGVsaXZlcnlfX2RvdCcpLFxyXG5cdFx0aXRlbXMgPSAkKCcuZGVsaXZlcnlfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZVRhYiA9ICdkZWxpdmVyeV9fZG90LS1hY3RpdmUnLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICdkZWxpdmVyeV9faXRlbS0tYWN0aXZlJztcclxuXHJcblx0XHR0YWJzLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdFx0aXRlbUFjdGl2ZSA9IGl0ZW1zLmZpbHRlcignLicgKyBhY3RpdmVJdGVtKSxcclxuXHRcdFx0XHR0YWJBY3RpdmUgPSB0YWJzLmZpbHRlcignLicgKyBhY3RpdmVUYWIpLFxyXG5cdFx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxVGFiID0gdGFicy5lcShpbmRleCk7XHJcblxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0dGFiQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFUYWIuYWRkQ2xhc3MoYWN0aXZlVGFiKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgtCw0LHQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtSDQodC+0YLRgNGD0LTQvdC40YfQtdGB0YLQstC+XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgdGFicyA9ICQoJy5jb29wX19kb3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLmNvb3BfX2l0ZW0nKSxcclxuXHRcdGFjdGl2ZVRhYiA9ICdjb29wX19kb3QtLWFjdGl2ZScsXHJcblx0XHRhY3RpdmVJdGVtID0gJ2Nvb3BfX2l0ZW0tLWFjdGl2ZSc7XHJcblxyXG5cdFx0dGFicy5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0dGFiQWN0aXZlID0gdGFicy5maWx0ZXIoJy4nICsgYWN0aXZlVGFiKSxcclxuXHRcdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdHJlcVRhYiA9IHRhYnMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdHRhYkFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVUYWIpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxVGFiLmFkZENsYXNzKGFjdGl2ZVRhYik7XHJcblx0XHR9KTtcclxufSkoKTsiLCIvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LzQtdC90Y4g0LIgaGVhZGVyXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgbGluayA9ICQoJy5oZWFkZXJfX2J0bicpLFxyXG5cdFx0bGlzdCA9ICQoJy5oZWFkZXJfX2xpc3QgJyksXHJcblx0XHRhY3RpdmVMaW5rID0gJ2hlYWRlcl9fYnRuLS1hY3RpdmUnXHJcblx0XHRmbGFnID0gdHJ1ZTtcclxuXHJcblx0bGluay5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdGxpbmsuYWRkQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdGxpc3Quc2xpZGVEb3duKDUwMCk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdGxpc3Quc2xpZGVVcCgnNTAwJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0bGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cdFx0XHRcdH0sNTAwKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyBmb290ZXJcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaW5rID0gJCgnLmZvb3Rlcl9fdGl0bGUnKSxcclxuXHRcdGFjdGl2ZUxpbmsgPSAnZm9vdGVyX190aXRsZS0tYWN0aXZlJyxcclxuXHRcdGR1cmF0aW9uID0gNDAwO1xyXG5cclxuXHRcdGxpbmsuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBmaW5kQmxvY2sgPSAkKHRoaXMpLm5leHQoJy5mb290ZXJfX2Jsb2NrLXdyYXAnKSxcclxuXHRcdFx0XHRmaW5kV3JhcHBlciA9ICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fdG9wJyk7XHJcblxyXG5cdFx0XHRpZiAoZmluZEJsb2NrLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdFx0ZmluZEJsb2NrLnNsaWRlVXAoZHVyYXRpb24pO1xyXG5cdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZmluZFdyYXBwZXIuZmluZCgnLmZvb3Rlcl9fYmxvY2std3JhcCcpLnNsaWRlVXAoZHVyYXRpb24pO1xyXG5cdFx0XHRcdGZpbmRCbG9jay5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cdFx0XHRcdGxpbmsucmVtb3ZlQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVMaW5rKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbn0pKCk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPIG1lbnUg0L3QsCDRgdGC0YDQsNC90LjRhtC1INCa0LDRgtCw0LvQvtCzINC+0YLQvtC/0LvQtdC90LjRj1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpbmsgPSAkKCcuaGVhdGluZ19fc3VidGl0bGUnKSxcclxuXHRcdGFjdGl2ZUxpbmsgPSAnaGVhdGluZ19fc3VidGl0bGUtLWFjdGl2ZScsXHJcblx0XHRsaXN0ID0gJCgnLmhlYXRpbmdfX21lbnUnKS5jaGlsZHJlbignLmZvb3Rlcl9fbGlzdCcpO1xyXG5cdFx0ZHVyYXRpb24gPSA0MDAsXHJcblx0XHRmbGFnID0gdHJ1ZTtcclxuXHJcblx0XHRsaW5rLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRcdGxpbmsuYWRkQ2xhc3MoYWN0aXZlTGluayk7XHJcblx0XHRcdFx0bGlzdC5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cdFx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsaW5rLnJlbW92ZUNsYXNzKGFjdGl2ZUxpbmspO1xyXG5cdFx0XHRcdGxpc3Quc2xpZGVVcChkdXJhdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHRcdFx0XHRcdH0sZHVyYXRpb24pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGZsYWcgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxufSkoKTsiLCIvL9Ck0YPQvdC60YbQuNGPINC00LvRjyDRgdGC0YDQsNC90LjRhtGLINGC0LXRgdGC0LBcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHR2YXIgciA9ICQoJy50ZXN0X19yYW5nZScpO1xyXG5cclxuXHRyLm9uKCdtb3VzZWVudGVyJyxmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHAgPSByLnZhbCgpO1xyXG5cdFx0ci5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHAgPSByLnZhbCgpO1xyXG5cdFx0XHRiZyhwKTtcclxuXHRcdH0pO1xyXG5cdFx0ci5vbignbW91c2Vtb3ZlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRwID0gci52YWwoKTtcclxuXHRcdFx0YmcocCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkaXNwbGF5ID0gJCgnLm5vdy1udW0nKVxyXG5cdFx0ZGlzcGxheS5odG1sKHIudmFsKCkpO1xyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBiZyhuKXtcclxuXHRcdHIuY3NzKHtcclxuXHRcdFx0J2JhY2tncm91bmQtaW1hZ2UnOictd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0ICwjZjAwYjUyIDAlLCNmMDBiNTIgJytuIC8gMy41KyclLCNkN2Q3ZDcgJytuIC8gMy41KyclLCAjZDdkN2Q3IDEwMCUpJ1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHJcblx0dmFyIGl0ZW1zID0gJCgnLnRlc3RfX2l0ZW0nKSxcclxuXHRcdGl0ZW1BY3RpdmUgPSAndGVzdF9faXRlbS0tYWN0aXZlJyxcclxuXHRcdHByZXYgPSAkKCcudGVzdF9fYnRuLS1wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLnRlc3RfX2J0bi0tbmV4dCcpO1xyXG5cclxuXHRcdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1BY3RpdmUpLFxyXG5cdFx0XHRcdGluZGV4ID0gYWN0aXZlSXRlbS5pbmRleCgpLFxyXG5cdFx0XHRcdGFjdGl2ZUNvdW50ID0gYWN0aXZlSXRlbS5maW5kKCcudGVzdF9fbnVtJyk7XHJcblxyXG5cclxuXHRcdFx0aW5kZXgrKztcclxuXHRcdFx0aWYoaW5kZXggPj0gaXRlbXMubGVoZ3RoKSB7XHJcblx0XHRcdFx0aW5kZXggPSBpdGVtcy1sZW5ndGggLSAxO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxQ291bnQgPSByZXFJdGVtLmZpbmQoJy50ZXN0X19udW0nKTtcclxuXHJcblx0XHRcdGlmKHJlcUl0ZW0uZmluZCgnI3JhbmdlJykubGVuZ3RoID09IHRydWUpIHtcclxuXHRcdFx0XHR2YXIgcmFuZ2VWYWx1ZSA9IHIudmFsKCksXHJcblx0XHRcdFx0XHRjb3VudFZhbDtcclxuXHJcblx0XHRcdFx0aWYocmFuZ2VWYWx1ZSA8IDUwKSB7XHJcblx0XHRcdFx0XHRjb3VudFZhbCA9IDIwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA1MCAmJiByYW5nZVZhbHVlIDwgNzApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gNTAwO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDcwICYmIHJhbmdlVmFsdWUgPCAxMDApIHtcclxuXHRcdFx0XHRcdGNvdW50VmFsID0gMTAwMDtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxMDAgJiYgcmFuZ2VWYWx1ZSA8IDE1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAyMDAwO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDE1MCkge1xyXG5cdFx0XHRcdFx0Y291bnRWYWwgPSAzMDAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIGNvdW50VmFsU3VtID0gTnVtYmVyKGFjdGl2ZUNvdW50Lmh0bWwoKSkgKyBjb3VudFZhbDtcclxuXHRcdFx0XHRyZXFDb3VudC5odG1sKGNvdW50VmFsU3VtICsgJyAnKTtcclxuXHJcblx0XHRcdFx0ci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHZhciByYW5nZVZhbHVlID0gci52YWwoKSxcclxuXHRcdFx0XHRcdFx0Y291bnRWYWw7XHJcblxyXG5cdFx0XHRcdFx0aWYocmFuZ2VWYWx1ZSA8PSA1MCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDIwMDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocmFuZ2VWYWx1ZSA+IDUwICYmIHJhbmdlVmFsdWUgPD0gNzApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSA1MDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiA3MCAmJiByYW5nZVZhbHVlIDw9IDEwMCkge1xyXG5cdFx0XHRcdFx0XHRjb3VudFZhbCA9IDEwMDA7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJhbmdlVmFsdWUgPiAxMDAgJiYgcmFuZ2VWYWx1ZSA8PSAxNTApIHtcclxuXHRcdFx0XHRcdFx0Y291bnRWYWwgPSAyMDAwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZVZhbHVlID4gMTUwKSB7XHJcblx0XHRcdFx0XHRcdGNvdW50VmFsID0gMzAwMDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgY291bnRWYWxTdW0gPSBOdW1iZXIoYWN0aXZlQ291bnQuaHRtbCgpKSArIGNvdW50VmFsO1xyXG5cdFx0XHRcdFx0cmVxQ291bnQuaHRtbChjb3VudFZhbFN1bSArICcgJyk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKHJlcUl0ZW0uZmluZCgnLnRlc3RfX2luZm8tbnVtJykubGVuZ3RoID09IHRydWUpIHtcclxuXHRcdFx0XHR2YXIgc3VtID0gJCgnLnRlc3RfX2luZm8tbnVtJyksXHJcblx0XHRcdFx0XHRjb3VudFN1bSA9IGFjdGl2ZUNvdW50Lmh0bWwoKTtcclxuXHRcdFx0XHRcdHN1bS5odG1sKGNvdW50U3VtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgY291bnRWYWwgPSBOdW1iZXIoYWN0aXZlQ291bnQuaHRtbCgpKSArIDIwMDtcclxuXHRcdFx0XHRyZXFDb3VudC5odG1sKGNvdW50VmFsICsgJyAnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtQWN0aXZlKSxcclxuXHRcdFx0XHRpbmRleCA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcblx0XHRcdGluZGV4LS07XHJcblx0XHRcdGlmKGluZGV4IDw9IDApIHtcclxuXHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0YWN0aXZlSXRlbS5yZW1vdmVDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtQWN0aXZlKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINGE0YPQvdC60YbQuNGPINC00LvRjyBzd2lwZSDQvdCwINCz0LvQsNCy0L3QvtC5XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHQvLyAkKFwiLm1haW4tc2xpZGVyX19saXN0XCIpLnN3aXBlKCB7XHJcblx0Ly8gXHRzd2lwZUxlZnQ6bGVmdFN3aXBlLFxyXG5cdC8vIFx0c3dpcGVSaWdodDpyaWdodFN3aXBlLFxyXG5cdC8vIH0pO1xyXG5cdC8vIGZ1bmN0aW9uIGxlZnRTd2lwZShldmVudCl7XHJcblx0Ly8gXHRhbGVydCgnc3dpcGUgbGVmdCcpO1xyXG5cdC8vIH1cclxuXHQvLyBmdW5jdGlvbiByaWdodFN3aXBlKGV2ZW50KXtcclxuXHQvLyBcdGFsZXJ0KCdzd2lwZSByaWdodCcpO1xyXG5cdC8vIH1cclxufSkoKTsiXX0=
