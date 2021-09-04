
/*************************/
//数据过滤
function data_filtering(str){
	if(str.match(/4/)){
		console.log("这个字符串包含4 ！");
	}
	else{
		var a = [
			/(\d)\1{2,}/,//匹配AAA+
			/(\d)\1\1(\d)/,//匹配AAAB
			/(\d)(\d)\2\2/,//匹配ABBB

			/(\d)\1(\d)\2/,//匹配AABB

			/(\d)\1(\d)\1/,//匹配AABA
			/(\d)(\d)\2\1/,//匹配ABBA

			/(\d)(\d)\1\2/,//匹配ABAB
			];
		for( var i = 0; i < a.length; i++ ){
			var data = a[i].exec(str);
			if(data){
				console.log(str + "-" + data[0]);
				localStorage.setItem(str,data[0]);
				break;
			}
		}
	}
}

//刷新1s后采集数据
function getdata(){
    var list = document.getElementsByClassName("number-list")[0].childNodes;
	for( var i = 0; i < list.length; i++ ){
		data_filtering(list[i].innerText);
	}
}
function rfs_btn(){
	setTimeout("getdata()", 1000);
}
document.getElementById('refresh').onclick = rfs_btn;

//自动刷新定时器
function rfs_click_timer(){
    node = document.getElementById("refresh");
	node.click();
}
setInterval("rfs_click_timer()",1000);
