$(function (){
	var numberBool = false;
	$('input').focus(function (){
		$('input').css({'border':'1px solid #ffa200','box-shadow':'0 0 5px #ffa200'});
	}).blur(function (){
		numberBool = false;
		$('input').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
		var reg = /^(13[0-9]|14[57]|15[012356789]|17[35678]|18[0-9]|199)[0-9]{8}$/;
		var value = $(this).val().trim();
		if (value.length == 0) {
			$('.wrapper .mainform .error').show().text('手机号码不能为空');
			return ;
		}

		if (!reg.test(value)){
			$('.wrapper .mainform .error').show().text('手机号码格式不正确');
			return;
		} else {
			$('input').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
			$('.wrapper .mainform .error').hide();
			numberBool = true;
		}

		$.post('assets/php/reg.php',{phonenumber:value},function (msg){
			if(msg.success == 1) {
				$('.wrapper .mainform .error').show().text('用户名已注册');
			} else {
				$('.wrapper .mainform .error').show().text('用户名可用');
			}
		},'json')
	})

	$('form').submit(function (){
		if (!numberBool) {
			return false;
		}
	})

	$('button').click(function (){
		var value = $('input').val().trim();
		if (value == '') {
			$('.wrapper .mainform .error').show().text('手机号码不能为空');
		} 
	})

	function rand(m,n){
		return Math.floor(Math.random()*(n-m+1)+m);
	}
	$('.container').css('background-image','url(./assets/images/reg/'+rand(1,20)+'.jpg)');
})