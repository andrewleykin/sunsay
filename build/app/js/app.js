// Библиотека wow.js для анимации

(function () {
	new WOW().init();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvd2pzLmpzIiwic3ZnNGV2ZXJ5Ym9keS5qcyIsIm1haW4tc2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g0JHQuNCx0LvQuNC+0YLQtdC60LAgd293LmpzINC00LvRjyDQsNC90LjQvNCw0YbQuNC4XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdG5ldyBXT1coKS5pbml0KCk7XHJcbn0pKCk7IiwiLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0L7QutCw0LfQsCDRgdCy0LNcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHRzdmc0ZXZlcnlib2R5KCk7XHJcbn0pOyIsIi8vINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC70LDQudC00LXRgNCwINC90LAg0LPQu9Cw0LLQvdC+0LlcclxuXHJcbihmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gJCgnLm1haW4tc2xpZGVyX19saXN0JyksXHJcblx0XHRpdGVtcyA9ICQoJy5tYWluLXNsaWRlcl9faXRlbScpLFxyXG5cdFx0aXRlbXNBY3RpdmUgPSAnbWFpbi1zbGlkZXJfX2l0ZW0tLWFjdGl2ZScsXHJcblx0XHRkb3QgPSAkKCcubWFpbi1zbGlkZXJfX2RvdCcpLFxyXG5cdFx0cHJldiA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tcHJldicpLFxyXG5cdFx0bmV4dCA9ICQoJy5tYWluLXNsaWRlcl9fY29udHJvbC0tbmV4dCcpLFxyXG5cdFx0ZHVyYXRpb24gPSAyNDAwLFxyXG5cdFx0ZG90QW5pbWF0ZSA9ICdtYWluLXNsaWRlcl9fZG90LS1hbmltYXRlJyxcclxuXHRcdGFuaW1hdGVEb3QgPSBkb3QuZmlsdGVyKCcuJyArIGRvdEFuaW1hdGUpLFxyXG5cdFx0aW5kZXggPSAwO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGl0ZW1zKTtcclxuXHJcblx0dmFyIG1haW5TbGlkZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGFjdGl2ZURvdCA9IGRvdC5maWx0ZXIoJy4nICsgZG90QW5pbWF0ZSksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHJcblx0XHRpbmRleCsrO1xyXG5cclxuXHRcdHZhciByZXFEb3QgPSBkb3QuZXEoaW5kZXgpLFxyXG5cdFx0XHRyZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG5cclxuXHRcdGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5kZXggPSAwO1xyXG5cdFx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0XHRjbGVhcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cclxuXHRcdGFjdGl2ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdHJlcURvdC5hZGRDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdHJlcUl0ZW0uYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0sZHVyYXRpb24pO1xyXG5cclxuXHR2YXIgY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChtYWluU2xpZGVyKTtcclxuXHR9XHJcblxyXG5cdHZhciBtb3ZlID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHRcdHZhciBwZXJjID0gJy0nICsgMTAwICogaW5kZXggKyAnJSc7XHJcblx0XHRsaXN0LmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoJyArIHBlcmMgKyAnKScpO1xyXG5cdH1cclxuXHJcblx0ZG90LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdGFuaW1hdGVEb3QucmVtb3ZlQ2xhc3MoZG90QW5pbWF0ZSk7XHJcblx0XHR2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCksXHJcblx0XHRcdGFjdGl2ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKTtcclxuXHRcdG1vdmUoaW5kZXgpO1xyXG5cdFx0YWN0aXZlSXRlbXMucmVtb3ZlQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdFx0aXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHR9KTtcclxuXHJcblx0cHJldi5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyKCk7XHJcblx0XHR2YXIgYWN0aXZlSXRlbXMgPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpO1xyXG5cdFx0dmFyIGluZGV4ID0gaXRlbXMuZmlsdGVyKCcuJyArIGl0ZW1zQWN0aXZlKS5pbmRleCgpO1xyXG5cdFx0YW5pbWF0ZURvdC5yZW1vdmVDbGFzcyhkb3RBbmltYXRlKTtcclxuXHRcdGNvbnNvbGUubG9nKGluZGV4KTtcclxuXHRcdGluZGV4LS07XHJcblx0XHRpZihpbmRleCA8IDApIHtcclxuXHRcdFx0aW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG5cdFx0fVxyXG5cdFx0bW92ZShpbmRleCk7XHJcblx0XHRhY3RpdmVJdGVtcy5yZW1vdmVDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0XHRpdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoaXRlbXNBY3RpdmUpO1xyXG5cdH0pO1xyXG5cclxuXHRuZXh0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXIoKTtcclxuXHRcdHZhciBhY3RpdmVJdGVtcyA9IGl0ZW1zLmZpbHRlcignLicgKyBpdGVtc0FjdGl2ZSk7XHJcblx0XHR2YXIgaW5kZXggPSBpdGVtcy5maWx0ZXIoJy4nICsgaXRlbXNBY3RpdmUpLmluZGV4KCk7XHJcblx0XHRhbmltYXRlRG90LnJlbW92ZUNsYXNzKGRvdEFuaW1hdGUpO1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXgpO1xyXG5cdFx0aW5kZXgrKztcclxuXHRcdGlmKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRpbmRleCA9IDA7XHJcblx0XHR9XHJcblx0XHRtb3ZlKGluZGV4KTtcclxuXHRcdGFjdGl2ZUl0ZW1zLnJlbW92ZUNsYXNzKGl0ZW1zQWN0aXZlKTtcclxuXHRcdGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcyhpdGVtc0FjdGl2ZSk7XHJcblx0fSk7XHJcbn0pKCk7Il19
