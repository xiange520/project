var swiper = new Swiper('.swiper-container', {
 	  loop: true,
 	  autoplay: true,	
      pagination: {
        el: '.swiper-pagination',
      },
    });
$(window).scroll(function (){
	var scrollTop = $(window).scrollTop();
	if (scrollTop <= $('.destination').offset().top - $(window).height()) {
		$('.backtop').hide();
	} else {
		$('.backtop').show();
	}
})

$('.backtop').click(function (){
	var scrollTop = $(window).scrollTop(); 
	var backtopPos = $('.backtop').offset().top;
	var step = 800;
	timer = setInterval(function (){
		backtopPos -= step;
		if (backtopPos <0) {
			backtopPos = 0;
			clearInterval(timer);
			// $(window).scrollTop(backtopPos);
		}
		$(window).scrollTop(backtopPos);
	},30)
})