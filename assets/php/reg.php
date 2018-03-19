<?php 

// 服务器接收前端传递的数据，并且打印出来
// print_r($_GET);

// 定义变量的方式
// 接收前端传递的用户名
$username = $_POST['phonenumber'];

// 定义一个数组，模拟服务器的用户名
$data = [17687928514,13812345678,13712345678,13612345678];

// 判断$username是否在$data中
// in_array():如果存在返回true，不存在返回false
if (in_array($username,$data)) {
	echo '{"success":1}';
} else {
	echo '{"success":0}';
}

