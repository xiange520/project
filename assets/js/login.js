$(function (){
	var userBool = false;
	var passBool = false;
	$('.username').focus(function (){
		$('.username').css({'border':'1px solid #ffa200','box-shadow':'0 0 5px #ffa200'});
	}).blur(function (){
		userBool = false;
		$('.username').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
		var value = $(this).val().trim();
		var reg1 = /^(13[0-9]|14[57]|15[012356789]|17[35678]|18[0-9]|199)[0-9]{8}$/;
		var reg2 = /^[a-zA-Z0-9\.]+@[a-z0-9]+\.[a-z]{2,6}$/;
		if (value.length == 0) {
			$('.wrapper .mainform .error').show().toggleClass('shake').text('账号不能为空');
			return;
		}
		if (!(reg1.test(value) || reg2.test(value))){
			$('.username').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
			$('.wrapper .mainform .error').show().toggleClass('shake').text('账号格式不正确');
			return;
		} else {
			$('.wrapper .mainform .error').hide();
			userBool = true;
		} 
	})

	$('.password').focus(function (){
		$('.password').css({'border':'1px solid #ffa200','box-shadow':'0 0 5px #ffa200'});
	}).blur(function (){
		passBool = false;
		var value = $(this).val().trim();
		var reg = /.{4,}/;
		if (value.length == 0) {
			$('.password').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
			$('.wrapper .mainform .error').show().text('密码不能为空');
			return;
		}
		if (!reg.test(value)){
			$('.password').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
			$('.wrapper .mainform .error').show().text('密码不能小于4个字符');
			return;
		} else {
			$('.password').css({'border':'1px solid #d8d8d8','box-shadow':'none'});
			$('.wrapper .mainform .error').hide();
			passBool = true;
		}
	})

	$('form').submit(function (){
		if (!(userBool && passBool)){
			return false;
		} 
	})
	function rand(m,n){
		return Math.floor(Math.random()*(n-m+1)+m);
	}
	$('.container').css('background-image','url(./assets/images/reg/'+rand(1,20)+'.jpg)');
})