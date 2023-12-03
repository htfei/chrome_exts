function GetRandomNum(a, b) {
	return a + Math.round(Math.random() * (b - a))
}

function GetRandUrl(){
	var ll = [];
	//ll.push("http://z9.syasn.com/b/b" + GetRandomNum(1, 966) + ".mp4"); gg
	var tmp =ll[GetRandomNum(1,ll.length) - 1];//随机取一个
	return tmp;
}

function loadurl(){
	var tmp = GetRandUrl();
	console.log(tmp);
	document.getElementById("vurl").innerHTML = "随机看妹纸,正在播放: " + tmp ;
	document.getElementById("video1").src = tmp;
	document.getElementById('video1').style.display = "block";
	document.getElementById('iframe1').style.display = "none";
}

document.getElementById("vnext").onclick =  function(){
	loadurl();
}

document.getElementById("like").onclick =  function(){
	key = document.getElementById("video1").src;
	var val = localStorage.getItem(key);
	val?localStorage.setItem(key,parseInt(val)+1):localStorage.setItem(key,1);
	document.getElementById("vurl").innerHTML = "已收藏!";//+ key;
}

//todo
document.getElementById("gotoweb").onclick =  function(){
	key = document.getElementById("video1").src;
	a = key.split('/')
	weburl = "http://sgp1.info/";
	console.log("weburl : ",weburl);
	window.open(weburl);
}

document.getElementById("sexy").onclick =  function(){
	document.getElementById('video1').style.display = "none";
	document.getElementById('iframe1').style.display = "block";
	var ll = [];

	ll.push("http://sgp1.info/#/video?videoid=" + GetRandomNum(139, 1607));//地址： http://sgp1.info/  水果派，需要梯子，有api可获取m3u8等信息

	var tmp =ll[GetRandomNum(1,ll.length) - 1];//随机取一个
	document.getElementById("iframe1").src = tmp;
	document.getElementById("vurl").innerHTML = "随机看视频,正在播放: " + tmp;
}

loadurl();