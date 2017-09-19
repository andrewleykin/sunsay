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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwiY29jb2VuLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1haW4tc2xpZGVyLmpzIiwidGVjaC1zbGlkZXIuanMiLCJkaWFncmFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDQkdC40LHQu9C40L7RgtC10LrQsCB3b3cuanMg0LTQu9GPINCw0L3QuNC80LDRhtC40LhcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0bmV3IFdPVygpLmluaXQoKTtcclxufSkoKTsiLCIvLyDQkdC40LHQu9C40L7RgtC10LrQsCBjb2NlbiDQtNC70Y8gYmVmb3JlL2FmdGVyXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdCQoJy5jb2NvZW4nKS5jb2NvZW4oKTtcclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QvtC60LDQt9CwINGB0LLQs1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cdHN2ZzRldmVyeWJvZHkoKTtcclxufSk7IiwiLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0LvQsNC50LTQtdGA0LAg0L3QsCDQs9C70LDQstC90L7QuVxyXG5cclxuKGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSAkKCcubWFpbi1zbGlkZXJfX2xpc3QnKSxcclxuXHRcdGl0ZW1zID0gJCgnLm1haW4tc2xpZGVyX19pdGVtJyksXHJcblx0XHRpdGVtc0FjdGl2ZSA9ICdtYWluLXNsaWRlcl9faXRlbS0tYWN0aXZlJyxcclxuXHRcdGRvdCA9ICQoJy5tYWluLXNsaWRlcl9fZG90JyksXHJcblx0XHRwcmV2ID0gJCgnLm1haW4tc2xpZGVyX19jb250cm9sLS1wcmV2JyksXHJcblx0XHRuZXh0ID0gJCgnLm1haW4tc2xpZGVyX19jb250cm9sLS1uZXh0JyksXHJcblx0XHRkdXJhdGlvbiA9IDI0MDAsXHJcblx0XHRkb3RBbmltYXRlID0gJ21haW4tc2xpZGVyX19kb3QtLWFuaW1hdGUnLFxyXG5cdFx0YW5pbWF0ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRpbmRleCA9IDA7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coaXRlbXMpO1xyXG5cclxuXHR2YXIgbWFpblNsaWRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgYWN0aXZlRG90ID0gZG90LmZpbHRlcignLicgKyBkb3RBbmltYXRlKSxcclxuXHRcdFx0YWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cclxuXHRcdGluZGV4Kys7XHJcblxyXG5cdFx0dmFyIHJlcURvdCA9IGRvdC5lcShpbmRleCksXHJcblx0XHRcdHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCk7XHJcblxyXG5cdFx0aWYgKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRcdGNsZWFyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0bW92ZShpbmRleCk7XHJcblxyXG5cdFx0YWN0aXZlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0cmVxRG90LmFkZENsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0cmVxSXRlbS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSxkdXJhdGlvbik7XHJcblxyXG5cdHZhciBjbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjbGVhckludGVydmFsKG1haW5TbGlkZXIpO1xyXG5cdH1cclxuXHJcblx0dmFyIG1vdmUgPSBmdW5jdGlvbihpbmRleCkge1xyXG5cdFx0dmFyIHBlcmMgPSAnLScgKyAxMDAgKiBpbmRleCArICclJztcclxuXHRcdGxpc3QuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgnICsgcGVyYyArICcpJyk7XHJcblx0fVxyXG5cclxuXHRkb3QuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSxcclxuXHRcdFx0YWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRwcmV2LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xyXG5cdFx0aW5kZXgtLTtcclxuXHRcdGlmKGluZGV4IDwgMCkge1xyXG5cdFx0XHRpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSk7XHJcblxyXG5cdG5leHQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRjbGVhcigpO1xyXG5cdFx0dmFyIGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHRcdHZhciBpbmRleCA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSkuaW5kZXgoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHRjb25zb2xlLmxvZyhpbmRleCk7XHJcblx0XHRpbmRleCsrO1xyXG5cdFx0aWYoaW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdGluZGV4ID0gMDtcclxuXHRcdH1cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9KTtcclxufSkoKTsiLCIvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0YHQu9Cw0LnQtNC10YDQsCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0YLQtdGF0L3QvtC70L7Qs9C40LhcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBpdGVtcyA9ICQoJy50ZWNoLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0YWN0aXZlSXRlbSA9ICd0ZWNoLXNsaWRlcl9faXRlbS0tYWN0aXZlJyxcclxuXHRcdGRvdHMgPSAkKCcudGVjaC1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0YWN0aXZlRG90cyA9ICd0ZWNoLXNsaWRlcl9fZG90LS1hY3RpdmUnLFxyXG5cdFx0cHJldiA9ICQoJy50ZWNoLXNsaWRlcl9fcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy50ZWNoLXNsaWRlcl9fbmV4dCcpO1xyXG5cclxuXHRcdHByZXYuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBpdGVtQWN0aXZlID0gaXRlbXMuZmlsdGVyKCcuJyArIGFjdGl2ZUl0ZW0pLFxyXG5cdFx0XHRcdGRvdHNBY3RpdmUgPSBkb3RzLmZpbHRlcignLicgKyBhY3RpdmVEb3RzKSxcclxuXHRcdFx0XHRpbmRleCA9IGl0ZW1BY3RpdmUuaW5kZXgoKTtcclxuXHJcblx0XHRcdFx0aW5kZXgtLTtcclxuXHJcblx0XHRcdFx0aWYoaW5kZXggPCAwKSB7XHJcblx0XHRcdFx0XHRpbmRleCA9IGRvdHMubGVuZ3RoIC0gMTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG5cdFx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0XHRpdGVtQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZUl0ZW0pO1xyXG5cdFx0XHRcdGRvdHNBY3RpdmUucmVtb3ZlQ2xhc3MoYWN0aXZlRG90cyk7XHJcblx0XHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRyZXFEb3RzLmFkZENsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bmV4dC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpLFxyXG5cdFx0XHRcdGluZGV4ID0gaXRlbUFjdGl2ZS5pbmRleCgpO1xyXG5cclxuXHRcdFx0XHRpbmRleCsrO1xyXG5cclxuXHRcdFx0XHRpZihpbmRleD49aXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRpbmRleCA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuXHRcdFx0XHRcdHJlcURvdHMgPSBkb3RzLmVxKGluZGV4KTtcclxuXHJcblx0XHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0XHRkb3RzQWN0aXZlLnJlbW92ZUNsYXNzKGFjdGl2ZURvdHMpO1xyXG5cdFx0XHRcdHJlcUl0ZW0uYWRkQ2xhc3MoYWN0aXZlSXRlbSk7XHJcblx0XHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGRvdHMuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpLFxyXG5cdFx0XHRcdGl0ZW1BY3RpdmUgPSBpdGVtcy5maWx0ZXIoJy4nICsgYWN0aXZlSXRlbSksXHJcblx0XHRcdFx0ZG90c0FjdGl2ZSA9IGRvdHMuZmlsdGVyKCcuJyArIGFjdGl2ZURvdHMpO1xyXG5cclxuXHRcdFx0dmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcblx0XHRcdFx0cmVxRG90cyA9IGRvdHMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdFx0aXRlbUFjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0ZG90c0FjdGl2ZS5yZW1vdmVDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdFx0cmVxSXRlbS5hZGRDbGFzcyhhY3RpdmVJdGVtKTtcclxuXHRcdFx0cmVxRG90cy5hZGRDbGFzcyhhY3RpdmVEb3RzKTtcclxuXHRcdH0pO1xyXG59KSgpOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQtNC40LDQs9GA0LDQvCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0YHRgNCw0LLQvdC10L3QuNGPXHJcblxyXG4oZnVuY3Rpb24oKXtcclxuXHR2YXIgYmxvY2sgPSAkKCcuZGlhZ3JhbV9faW1nJyksXHJcblx0XHRjb3VudGVyID0gJCgnLmRpYWdyYW1fX3ByaWNlJyk7XHJcblxyXG5cclxuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHR2YXIgc2Nyb2xsVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRmb3IgKGk9MDsgaTxibG9jay5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdHZhciBibG9ja0VxID0gYmxvY2suZXEoaSksXHJcblx0XHRcdFx0Y291bnRlckVxID0gY291bnRlci5lcShpKSxcclxuXHRcdFx0XHRwYXJlbnQgPSBjb3VudGVyRXEuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0nKSxcclxuXHRcdFx0XHRoZWlnaHQgPSBibG9ja0VxLmF0dHIoJ2RhdGEtaGVpZ2h0JyksXHJcblx0XHRcdFx0ZGF0YUNvdW50ZXIgPSBjb3VudGVyLmVxKGkpLmF0dHIoJ2RhdGEtY291bnRlcicpO1xyXG5cclxuXHJcblx0XHRcdGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgYmxvY2tFcSkpIHtcclxuXHRcdFx0XHRibG9ja0VxLmFuaW1hdGUoe2hlaWdodDowLCBoZWlnaHR9LCAxMDAwKTtcclxuXHRcdFx0XHRjb3VudGVyRXEuYW5pbWF0ZSh7bnVtOiBkYXRhQ291bnRlciAtIDN9LCB7XHJcblx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcclxuXHRcdFx0XHRcdHN0ZXA6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLXByaWNlJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApICsgJyDRgtGL0YEnO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYodGhpcy5jbG9zZXN0KCcuZGlhZ3JhbV9faXRlbS0tY29zdCcpIHx8IHRoaXMuY2xvc2VzdCgnLmRpYWdyYW1fX2l0ZW0tLXNlcnZpY2UnKSB8fCB0aGlzLmNsb3Nlc3QoJy5kaWFncmFtX19pdGVtLS1tb250aCcpKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmlubmVySFRNTCA9IChudW0gKyAzKS50b0ZpeGVkKDApICsgJyDRgCc7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5pbm5lckhUTUwgPSAobnVtICsgMykudG9GaXhlZCgwKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHR2YXIgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uKHNjcm9sbFRvcCwgYmxvY2spIHtcclxuXHRcdHZhciBvZmZzZXQgPSBibG9jay5vZmZzZXQoKS50b3AsXHJcblx0XHRcdHdpbmRvd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKSxcclxuXHRcdFx0dG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd2luZG93TWFyZ2luIC0gODAwLFxyXG5cdFx0XHRib3R0b21FZGdlID0gYmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgKyBvZmZzZXQgKyAxMDAsXHJcblx0XHRcdGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdpbmRvd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG5cdFx0cmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwXHJcblx0fVxyXG59KSgpOyJdfQ==
