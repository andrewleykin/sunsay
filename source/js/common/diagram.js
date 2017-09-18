// Функция для диаграм на странице сравнения

(function(){
	var block = $('.diagram__img');

	$(window).scroll(function() {
		
		var scrollTop = $(this).scrollTop();
		if (checkDistance(scrollTop)) {
			for (i=0; i<block.length;i++) {
				var height = block.eq(i).attr('data-height');
				block.eq(i).animate({height:0, height}, 1000);
			}
		}
	});


	var checkDistance = function(scrollTop) {
		var offset = block.offset().top,
			windowMargin = Math.ceil($(window).height() / 3),
			topBorder = offset - scrollTop - windowMargin - 400,
			bottomEdge = block.outerHeight(true) + offset + 150,
			bottomBorder = scrollTop + windowMargin - bottomEdge;

		return topBorder <= 0 && bottomBorder <= 0
	}
})();