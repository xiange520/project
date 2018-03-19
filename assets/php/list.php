<?php

$word = $_POST['keyword'];

// 定义一个数组，模拟服务器的用户名
$data = ['北京','上海','广州','深圳','九江','南昌','景德镇'];

// 判断$username是否在$data中
// in_array():如果存在返回true，不存在返回false
if (in_array($word,$data)) {
	echo '{"success":1}';
} else {
	echo '{"success":0}';
}
