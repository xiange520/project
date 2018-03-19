$(function (){
	// 头部导航下拉框
	$('.header .header-nav .slide-shop').mouseenter(function (){
		$('.header .header-nav .slide-shop .shop').stop(true,true).fadeIn(500);
	}).mouseleave(function (){
		$('.header .header-nav .slide-shop .shop').fadeOut(500);
	})
	// 侧边栏选项卡
	var a = document.querySelectorAll('.wrapper .sidebar-nav a');
	var cart = document.querySelectorAll('.wrapper .sidebar .cart');
	var iconNav = document.querySelectorAll('.wrapper .sidebar-nav i');
	var indexNav = 0;
	var len = a.length;
	var times = 1;
	for(var i=0; i<len; i++) {
		a[i].indexNav = i;
		a[i].onclick = function (){
			cart[indexNav].style.display = 'none';
			a[indexNav].style.color = '#333';
			a[indexNav].style.borderBottomColor = 'transparent';
			iconNav[indexNav].style.borderTopColor = '#999';
			indexNav = this.indexNav;
			cart[indexNav].style.display = 'block';
			a[indexNav].style.color = '#ff9d00';
			a[indexNav].style.borderBottomColor = '#ff9d00';
			iconNav[indexNav].style.borderTopColor = '#ff9d00';
			times ++;
			if(times%2 == 1) {
				cart[indexNav].style.display = 'none';
				a[indexNav].style.color = '#333';
				a[indexNav].style.borderBottomColor = 'transparent';
				iconNav[indexNav].style.borderTopColor = '#999';
			}
		}
	} 
	// 轮播图左边导航栏的搜索框 键盘抬起时发送AJAX请求
	$('.swiper .subnav .sub-search .search-keyword').keyup(function (){
		var valueKey = $(this).val();
		$.post('assets/php/list.php',{keyword:valueKey},function (msg){
			if(msg.success == 1) {
				$('.swiper .subnav .sub-search .search-result').show().html('此攻略存在');
			} else {
				$('.swiper .subnav .sub-search .search-result').show().html('此攻略还没有上线，敬请期待');
			}
		},'json')
	}).blur(function (){
		$('.swiper .subnav .sub-search .search-result').hide();
	})

	/*轮播图模块*/
	var timerSlide; 
	var indexSlide = 0;
	var lenSlide = $('.swiper .slide .slide-index li').length;
	runSlide();
	function runSlide(){
		clearInterval(timerSlide);
		timerSlide = setInterval(function (){
			$('.swiper .slide .slide-img').stop(true,true);
			$('.swiper .slide .slide-index li').eq(indexSlide).removeClass('active');
			indexSlide++;
			if(indexSlide >= lenSlide) {
				indexSlide = 0;
			}
			$('.swiper .slide .slide-index li').eq(indexSlide).addClass('active');
			$('.swiper .slide .slide-img').animate({left:-700*indexSlide},500);
		},3000)
	}
	$('.swiper .slide').mouseenter(function (){
		clearInterval(timerSlide);
	}).mouseleave(function (){
		runSlide();
	})
	$('.swiper .slide .slide-index li').click(function (){
		$('.swiper .slide .slide-index li').eq(indexSlide).removeClass('active');
		indexSlide = $(this).index();
		$('.swiper .slide .slide-index li').eq(indexSlide).addClass('active');
		$('.swiper .slide .slide-img').animate({left:-700*indexSlide},500);
	})
	//瀑布流
	var onload = true;
	$(window).scroll(function (){
		var dest = $(document).height()-$(window).height()-$(window).scrollTop();
		if (dest <= 500 && onload) {
			onload = false;
			loadData();
			$('.recommend .onload').hide();
			$('.recommend .onloadmore').css('display','block');
		}
	})	

	$('.recommend .onloadmore').click(function (){
		$('.recommend .onloadmore').hide();
		$('.recommend .onload').show();
		loadData();
		$('.recommend .onload').hide();
		$('.recommend .onloadmore').css('display','block');
	})

	function loadData(){
		$.get('assets/php/list.json',function (data){
			var str = '';
			data.forEach(function (value,key){
				if(value.logo == 'cart') {
					str += '<li class="cart">';
					str += '<a href="">';
					str += '<div class="topbar clearfix">';
					str += '<div class="topbar-left"><i></i>来自<span>'+value.from+'</span></div>';
					str += '<div class="topbar-right"><span class="number">'+value.number+'</span> '+value.exp+'<i></i></div>';
					str += '</div>';
					str += '<div class="list-title">'+value.title+'</div>';
					str += '<p class="recom-detail">'+value.detail+'</p>';
					str += '<div class="recom-img">';
					str	+= '<img src="'+value.image1+'" alt="">';
					str	+= '<img src="'+value.image2+'" alt="">';
					str	+= '<img src="'+value.image3+'" alt="">';
					str	+= '<span class="look">'+value.look+'</span>';
					str	+= '</div>';
					str += '</a>';	
					str += '</li>';
					str += '<div class="hr"></div>';
				} else if (value.logo == 'zan') {
					str += '<li class="zan">';
					str += '<a href="">';
					str += '<div class="zan-topbar clearfix">';
					str += '<div class="zan-topbar-left"><i></i>来自<span>'+value.from+'</span></div>';
					str += '<div class="zan-topbar-right"><span class="number">'+value.number+'</span> '+value.exp+'<i></i></div>';
					str += '</div>';
					str += '<div class="zan-list-title">'+value.title+'</div>';
					str += '<div class="zan-recom-img">';
					str += '<img src="'+value.image1+'" alt="">';
					str += '<p class="zan-img-detail">'+value.detail+'</p>';
					str += '<p class="zan-user">';
					str += '<img src="'+value.image2+'" alt="">';
					str += '<span class="username">'+value.username+'</span>';
					str += '<span class="nums">'+value.nums+'</span>';
					str += '</p>';
					str += '</div>';
					str += '</a>';	
					str += '</li>';
					str += '<div class="hr"></div>';
				}
			})
			$('.recommend .recom-list').append(str);
		})		
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