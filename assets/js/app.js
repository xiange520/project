$(function (){
	// 头部导航下拉框
	$('.header .header-nav .slide-shop').mouseenter(function (){
		$('.header .header-nav .slide-shop .shop').stop(true,true);
		$('.header .header-nav .slide-shop .shop').fadeIn(500);
	}).mouseleave(function (){
		$('.header .header-nav .slide-shop .shop').fadeOut(500);
	})

	//移入android后的下拉框
	$('.app-content .download .androidli').mouseenter(function (){
		$('.app-content .download .way').stop(true,true);
		$('.app-content .download .way').fadeIn(500);
	}).mouseleave(function (){
		$('.app-content .download .way').fadeOut(500);
	})

	//手机框内的轮播图
		//加载页面swiper自动下来
	$('.container .swiper').animate({top:85},3000,'swing',function (){
		$('.container .swiper .swiper-index').fadeIn();
		$('.container .swiper .swiper-code').fadeIn();
	}); 

	var timer;
	var index = 0;
	var len = $('.container .swiper .swiper-index li').length;
	runP();
	$('.container .swiper .imgs-list li:eq(0)').clone(true).appendTo($('.container .swiper .imgs-list'));
	function runP(){
		timer = setInterval(function (){
			$('.container .swiper .imgs-list').stop(true,true);
			$('.container .swiper .swiper-index li').eq(index%len).removeClass('action');
			index++;
			if(index > len) {
				index = 1;
				$('.container .swiper .imgs-list').css('margin-left',0);
			}
			$('.container .swiper .swiper-index li').eq(index%len).addClass('action');
			$('.container .swiper .imgs-list').animate({'margin-left':-170*index},500);
		},5000);
	}
	//鼠标移入box轮播图停止
	$('.container .swiper .swiper-imgs .box').mouseenter(function (){
		clearInterval(timer);
	}).mouseleave(function (){
		runP();
	})
	//点击轮播图索引
	$('.container .swiper .swiper-index li').click(function (){
		$('.container .swiper .imgs-list').stop(true,true);
		$('.container .swiper .swiper-index li').eq(index%len).removeClass('action');
		index = $(this).index();
		$('.container .swiper .swiper-index li').eq(index%len).addClass('action');
		$('.container .swiper .imgs-list').animate({'margin-left':-170*index},500);
	})

	//点击右边菜单 背景图片改变
	var indexM = 0;
	$('.main .app-menu li').click(function (){
		$('.main .app-menu li').eq(indexM).removeClass('special');
		indexM = $(this).index();
		$('.main .app-menu li').eq(indexM).addClass('special');
	})

	// 固定定位的fixed 
	run();
	$(window).scroll(run);
	function run(){
		var scrollTop = $(this).scrollTop();
		if (scrollTop < 478) {
			$('.fixed .return').hide();
			$('.fixed img').css('top',-104);
		} else {
			$('.fixed .return').show();
			$('.fixed img').css('top',-59);
		}
		if (scrollTop >= $('.footer').offset().top-$(window).height()) {
			var bottom = scrollTop + $(window).height()-$('.footer').offset().top;
			$('.fixed').css('bottom',bottom+30);
		} else {
			$('.fixed').css('bottom',20);
		}
	}
	//回到顶部
	var timerReturn;
	$('.fixed .return').click(function (){
		var step = 200;
		clearInterval(timerReturn);
		timerReturn = setInterval(function (){
			var nowPos = $(window).scrollTop();
			nowPos -= step;
			if(nowPos <= 0) {
				nowPos = 0;
				$(window).scrollTop(nowPos);
				clearInterval(timerReturn);
			}
			$(window).scrollTop(nowPos);
		},20);
	})
	//意见反馈  遮罩层
	$('.fixed .advice').click(function (){
		$('.advicefixed').fadeIn();
	})
	$('.advicefixed .advice-close').click(function (){
		$('.advicefixed').fadeOut();
	})
})