$(function (){
	// 头部导航下拉框
	$('.header .header-nav .slide-shop').mouseenter(function (){
		$('.header .header-nav .slide-shop .shop').stop(true,true);
		$('.header .header-nav .slide-shop .shop').fadeIn(500);
	}).mouseleave(function (){
		$('.header .header-nav .slide-shop .shop').fadeOut(500);
	})
	//索引栏导航 移入分享之后出现气泡框
	var share = document.querySelector('.catalog .index-nav .share');
	var pop = document.querySelector('.catalog .index-nav .index-pop');
	var timerPop;
	share.onmouseenter = function (){
		clearTimeout(timerPop);
		pop.style.display = 'block';
	} 
	share.onmouseleave = function (){
		timerPop = setTimeout(function (){
			pop.style.display = 'none';
		},3000)
	} 
	//索引栏导航 点击书写按钮跳转到评论框
	var write = document.querySelector('.catalog .index-nav .write');
	var copyDesc = document.querySelector('.sidebar .copyright .copy-desc');
	var timerWrite;
	write.onclick = function (){
		clearInterval(timerWrite);
		var descPos = copyDesc.offsetTop;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var step1 = 4000; 
		timerWrite = setInterval(function (){
			scrollTop += step1;
			if (scrollTop >= descPos){
				clearInterval(timerWrite);
				scrollTop = descPos;
			}
			document.documentElement.scrollTop = scrollTop + 60;
			document.body.scrollTop = scrollTop + 60;
		},50)
	}
	//滚动目录 
		//位置的变化
	$(window).scroll(function (){
		var rightPos = ($(window).width()-1000)/2;
		var sidebarTitle = $('.main .sidebar .sidebar-title').offset().top;
		var catalogTop = $('.main .catalog').offset().top;
		var scrollTop = $(this).scrollTop();
		var extraHead = $('.extra .extra-head').offset().top;
		console.log(scrollTop,extraHead);
		if (scrollTop < sidebarTitle){
			$('.main .catalog').removeClass('fixedone');
			$('.main .catalog').css('right',0);
		} else if (scrollTop >= sidebarTitle && scrollTop < 20226) {
			$('.main .catalog').addClass('fixedone');
			$('.main .catalog').css({'top':10,'right':rightPos});
		} else {
			$('.main .catalog').removeClass('fixedone');
			$('.main .catalog').css({'top':20112,'right':0});
		}	
	})
	var skiphead = document.querySelectorAll('.sidebar .sidebar-content .skiphead');
	var skipbig = document.querySelectorAll('.sidebar .sidebar-content .skipbig');
	var head = document.querySelectorAll('.catalog .scroll .scroll-list .head');
	var icon = document.querySelectorAll('.catalog .scroll .scroll-list .big .circle');
	var big = document.querySelectorAll('.catalog .scroll .scroll-list .big');
	console.log(icon,head);
	var timerSkip;
	for (var i=0; i<head.length; i++) {
		head[i].index = i;
		head[i].onclick = function (){
			var index = this.index;
			var nowPos = document.documentElement.scrollTop || document.body.scrollTop;
			var top = skiphead[index].offsetTop;
			var step = 500;
			if (nowPos > top) {
				step*=-1;
			} else if (nowPos == top) {
				return;
			}
			timerSkip = setInterval(function(){
				nowPos += step;
				if (Math.abs(nowPos-top) < Math.abs(step)) {
					clearInterval(timerSkip);
					document.documentElement.scrollTop = top + 50;
					document.body.scrollTop = top + 50;
				} else {
					document.documentElement.scrollTop = nowPos + 50;
					document.body.scrollTop = nowPos + 50;
				}
			}, 50);
		}
	}
	var indexIcon = 0;
	for (var j=0;j<big.length;j++){
		big[j].index = j;
		big[j].onclick = function (){
			icon[indexIcon].style.backgroundPosition = '-46px -25px';
			indexIcon = this.index;
			icon[indexIcon].style.backgroundPosition = '-30px -25px';
			var index = this.index;
			var nowPos = document.documentElement.scrollTop || document.body.scrollTop;
			var top = skipbig[index].offsetTop;
			var step = 500;
			if (nowPos > top) {
				step*=-1;
			} else if (nowPos == top) {
				return;
			}
			timerSkip = setInterval(function(){
				nowPos += step;
				if (Math.abs(nowPos-top) < Math.abs(step)) {
					clearInterval(timerSkip);
					document.documentElement.scrollTop = top + 50;
					document.body.scrollTop = top + 50;
				} else {
					document.documentElement.scrollTop = nowPos + 50;
					document.body.scrollTop = nowPos + 50;
				}
			}, 50);
		}
	}
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
		var step = 1000;
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