$(function() {
	//当文档加载完成之后才会执行
	function resize() {
		var windowWidth = $(window).width();
		//或者采用 var windowWidth = window.innerWidth;
		//判断屏幕大小
		var isSmallScreen = windowWidth < 768;

		//根据屏幕大小设置不同图片
		$("#main_ad > .carousel-inner > .item").each(function(index, item) {
			// $()获取到的是jquery伪数组对象，对象中的每一个元素是DOM对象，因此item是DOM对象，
			// 要想使用jquery应该转换$(xxx)方法转换。 或者使用jqery本身提供的方法$("#test").get(0)//表示获取到第0个元素，其结果是DOM
			var $item = $(item);
			var url = $item.data(isSmallScreen ? 'image-sm' : 'image-lg');

			if (isSmallScreen) {
				//当小于768的时候加上img标签 并清除div的背景
				$item.html('<img src="' + url + '"alt=""/>');
				$item.css('backgroundImage', 'url(' + '' + ')');
			} else {
				//当大于768的时候，清除里面的img标签。同时加上背景。至于div的高度变化则交给css的媒体查询。
				// $item.children().remove();
				$item.empty();
				$item.css('backgroundImage', 'url(' + url + ')');
				//这里要注意backgroundImage 不能被直接赋值地址 应该采用url的方式
			}
		});


		// 设置滚动栏
		var $ulcontainer = $(".nav-tabs");
		var width = 0;
		$ulcontainer.children().each(function(index, item) {
			// console.log(item.clientWidth);DOM方式获取元素宽度
			// console.log($(item).width());$提供的方式
			width += item.clientWidth;
		});
		// 当所有li的宽度之和大于屏幕的宽度的时候才给ul设置一个固定的宽度
		if (width > windowWidth) {
			$ulcontainer.css("width", width);
		} else {
			$ulcontainer.css("width", "auto");
		}
	}
	// 注册window.onResize事件
	$(window).on('resize', resize).trigger('resize'); //绑定元素 然后顺便执行一次


	$('[data-toggle="tooltip"]').tooltip(); // bootstrop要求的

	//给a注册点击事件 news nav-pills a
	var $title = $("#news .news-title");
	$("#news .nav-pills a").each(function(index, item) { //也可以用$("#news .nav-pills a").on("click", function() {})这种方法
		$(item).on("click", function() {
			var titleText = $(this).data("title");
			$title.text(titleText); //只设置文本用text更安全
		});
	});

	var currentStart = 0,
		currentEnd = 0,
		offset = 50;
	var $carousel = $(".carousel");
	$carousel.on("touchstart", function(even) {
		currentStart = event.touches[0].clientX;
	});
	$carousel.on("touchmove", function() {
		currentEnd = event.touches[0].clientX;
	});
	$carousel.on("touchend", function() {
		var distance = Math.abs(currentEnd - currentStart);
		if (distance > offset) {
			$(this).carousel(currentEnd > currentStart ? "prev" : "next");
		}
	});
});