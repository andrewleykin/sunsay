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