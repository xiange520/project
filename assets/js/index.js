$(function (){
	laydate({
	   elem: '#demo'
	})

	// 下拉列表
	$('.header .header-nav .slide-shop').mouseenter(function (){
		$('.header .header-nav .slide-shop .shop').stop(true,true);
		$('.header .header-nav .slide-shop .shop').fadeIn(500);
	}).mouseleave(function (){
		$('.header .header-nav .slide-shop .shop').fadeOut(500);
	})
	// 轮播图 
	var index = 0;
	var timer;
	var len = $('.lunbo .lunbo-image li').length;
	runL();
	function runL(){
		timer = setInterval(function (){
			$('.lunbo .lunbo-image li').eq(index).delay(1000).fadeOut(500);
			$('.lunbo .lunbo-imageRight li').eq(index).removeClass('active');
			index++;
			index = index>=len ? 0 : index;
			if (index == 0){
				$('.lunbo .lunbo-imageRight li').eq(index).css('border-radius','2px solid #ff9d00');
			}
			if (index == len-1){
				$('.lunbo .lunbo-imageRight li').eq(index).css('border-radius','2px solid #ff9d00');
			}
			$('.lunbo .lunbo-image li').eq(index).delay(1000).fadeIn(500);
			$('.lunbo .lunbo-imageRight li').eq(index).addClass('active');
		},3000);
	}

	$('.lunbo').mouseenter(function (){
		clearInterval(timer);
	}).mouseleave(function (){
		runL();
	});

	$('.lunbo .lunbo-imageRight li').click(function (){
		$('.lunbo .lunbo-image li').stop(true,true);
		$('.lunbo .lunbo-image li').eq(index).fadeOut(500);
		$('.lunbo .lunbo-imageRight li').eq(index).removeClass('active');
		index = $(this).index();
		$('.lunbo .lunbo-image li').eq(index).fadeIn(500);
		$('.lunbo .lunbo-imageRight li').eq(index).addClass('active');
	})
	//轮播图选项卡
	var indexI = 0;
	$('.lunbo .lunbo-search .select i').click(function (){
		$('.lunbo .lunbo-search .select i').removeClass('active');
		$('.lunbo .lunbo-search .input').eq(indexI).removeClass('active');
		indexI = $(this).parent().index();
		$('.lunbo .lunbo-search .select i').eq(indexI).addClass('active');
		$('.lunbo .lunbo-search .input').eq(indexI).addClass('active');
	})
	//侧边栏 旅行家专栏下滚动栏
	var indexT = 0;
	var timerT;
	var lenT = $('.traveller .scroll ul li').length;
	runT();
	function runT(){
		timerT = setInterval(function (){
			$('.traveller .scroll ul').stop(true,true);
			$('.traveller .scroll .scroll-index li').eq(indexT).removeClass('active');
			indexT++;
			if (indexT >= lenT) {
				indexT = 0;
			}
			$('.traveller .scroll .scroll-index li').eq(indexT).addClass('active');
			$('.traveller .scroll ul').animate({left:-260*indexT},500);
		},4000)
	}

	$('.traveller .scroll .scroll-index li').mousedown(function (){
			clearInterval(timerT);
			$('.traveller .scroll .scroll-index li').eq(indexT).removeClass('active');
			indexT = $(this).index();
			$('.traveller .scroll .scroll-index li').eq(indexT).addClass('active');
			$('.traveller .scroll ul').animate({left:-260*indexT},500);
	}).mouseup(function (){
		runT();
	})
	//侧边栏右边内容下选项卡 中筛选按钮 
	$('.hot-travel .hot-nav .header span').mousedown(function (e){
		$('.hot-travel .hot-nav .filter').show();
		e.stopPropagation();
	})

	$('.hot-travel .hot-nav .close').click(function (me){
		$('.hot-travel .hot-nav .filter').hide();
		me.stopPrapagation();
	})

	$('.hot-travel .hot-nav .filter').mousedown(function (fe){
		fe.stopPropagation();
	})

	$(window).mousedown(function (e){
		$('.hot-travel .hot-nav .filter').hide();
	})

	//侧边栏右边内容下选项卡
	var indexC = 0; 
	var timerC;
	$('.hot-travel .hot-nav .header li').click(function (){
		clearInterval(timerC);
		$('.hot-travel .travel-list').stop(true,true);
		$('.hot-travel .hot-nav .header li').eq(indexC).removeClass('active');
		$('.hot-travel .travel-list').eq(indexC).delay(200).fadeOut(1000);
		indexC = $(this).index();
		$('.hot-travel .hot-nav .header li').eq(indexC).addClass('active');
		$('.hot-travel .travel-list').eq(indexC).delay(200).fadeIn(1000,function (){
				var step = 10;
				timerC = setInterval(function (){
					var nowPos = $(window).scrollTop();
					nowPos += step;
					if(nowPos >= 781) {
						nowPos = 781;
						$(window).scrollTop(nowPos);
						clearInterval(timerC);
					}
					$(window).scrollTop(nowPos);
			},20);
		});
	})
	//侧边栏右边内容下索引a链接 
	var timerIndex;
	$('.content .index a').click(function (){
		var step = 50;
		clearInterval(timerIndex);
		timerIndex = setInterval(function (){
			var nowPos = $(window).scrollTop();
			nowPos -= step;
			if(nowPos <= 781) {
				nowPos = 781;
				$(window).scrollTop(nowPos);
				clearInterval(timerIndex);
			}
			$(window).scrollTop(nowPos);
		},20);
	})
	//侧边栏右边内容下索引123456789
	var indexTrans = 0;
	$('.content .index .trans').click(function (){
		$('.content .index .trans').siblings('.active').removeClass('active');
		$('.content .index .trans').eq(indexTrans).removeClass('active');
		$('.content .index .trans').eq(indexTrans).css('cursor','pointer');
		indexTrans = $(this).index()-2;
		if(indexTrans >= 1){
			$('.content .index .first').show();
			$('.content .index .first').css('display','inline-block');
		} else if (indexTrans == 0){
			$('.content .index .first').hide();
		}
		$('.content .index .trans').eq(indexTrans).addClass('active');
		$('.content .index .trans').eq(indexTrans).css('cursor','text');
	})

	//点击上一页 
	$('.content .index .first').click(function (){
		$('.content .index .first').parent().siblings('.active').prev().addClass('active').css('cursor','text');
		$('.content .index .first').parent().siblings('.active').next().removeClass('active').css('cursor','pointer');
		if($('.content .index .first').parent().siblings('.active').index() == 2) {
			$('.content .index .first').hide();
		}
	})

	//点击下一页
	$('.content .index .last').click(function (){
		$('.content .index .last').parent().siblings('.active').next().addClass('active').css('cursor','text');
		$('.content .index .last').parent().siblings('.active').prev().removeClass('active').css('cursor','pointer');
		if ($('.content .index .first').parent().siblings('.active').index() == 3){
			$('.content .index .first').css('display','inline-block');
		}
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
	//图片的懒加载 
	function lazyLoading() {
        $('.img').each(function(value, key) {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                var newSrc = $(this).attr('data-src');
                $(this).attr('src', newSrc);
                $(this).removeClass("img");
                $(this).hide().fadeIn(800);
            }
        })
    }
    lazyLoading();
    $(window).scroll(function() {
        lazyLoading();
    })
})