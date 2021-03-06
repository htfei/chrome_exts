
//显示操作log 2s
function show_log(str){
	var log = '<p>log:'+ str +'</p>' ;
	document.getElementById('log').innerHTML += log;
}

//读取localStorage中的键值对，加载到选项页面
function table_load_from_localStorage(){
	//show_log("loadtable...");
	if(localStorage.length == 0){
		//加载默认项到localStorage
		localStorage.setItem("查翻译","http://www.iciba.com/%s");
		localStorage.setItem("查地图","http://ditu.amap.com/search?query=%s");
		localStorage.setItem("查电影","http://neets.cc/search?key=%s");
		localStorage.setItem("查房价","http://wh.fang.lianjia.com/loupan/rs%s");
		localStorage.setItem("转二维码","http://qr.liantu.com/api.php?text=%s");
	}
	var table = '<table><tr><th> </th><th>名称</th><th>URL</th></tr>';
	for(var i= 0 ;i < localStorage.length; i++ ){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		table += '<tr>';
		table += '<td>'+i+'</td>';
		table += '<td><input type="text" value="'+key+'"/></td>';
		table += '<td><input type="text" value="'+value+'" size=60 /></td>';
		table += '<td><input type="button" class="del_btn" value="删除" /></td>';
		table += '<td><input type="button" class="up_btn" value="更新" /></td>';
		table += '</tr>';
	}
	table += '</table>';
	document.getElementById('all').innerHTML = table;
}


table_load_from_localStorage();

//添加新的键值对
document.getElementById('add_btn').onclick = function(){
	var key = document.getElementById('add_key').value;
	var value = document.getElementById('add_value').value;
	localStorage.setItem(key,value);
	location.reload();
};

//删除某一项键值对
$('.del_btn').click(function(){
	 var obj = this.parentNode.parentNode;//input.td.tr
	 var key = obj.childNodes[1].childNodes[0].value ;//tr.td1.input.value
	 localStorage.removeItem(key);
	 location.reload();
});

//更新某一项键值对
$('.up_btn').click(function(){
	 var obj = this.parentNode.parentNode;
	 var num = obj.childNodes[0].innerHTML;
	 //先删除再添加
	 var old_key = localStorage.key(num);
	 localStorage.removeItem(old_key);
	 var new_key = obj.childNodes[1].childNodes[0].value ;
	 var new_val = obj.childNodes[2].childNodes[0].value ;
	 localStorage.setItem(new_key,new_val);
	 location.reload();
});

//一键清空表单
$('#onkey_del_btn').click(function(){
	localStorage.clear();
	location.reload();
});

//导入表单文件到localStorage，并刷新页面
document.getElementById('loadfile').onchange = function jsReadFiles() {
	//show_log("jsReadFiles...");
	if (this.files.length) {
		var file = this.files[0];
		var reader = new FileReader();
		reader.onload = function() {
				var json = JSON.parse(this.result);
				//show_log(json.tools[0].key);
				for(var i = 0 ;i < json.tools.length; i++ ){
					var key = json.tools[i].key;
					var value = json.tools[i].value;
					localStorage.setItem(key,value);
				}
				location.reload();
		};
		reader.readAsText(file);
	}
};

// 导出localStorage到文件
function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
        );
    obj.dispatchEvent(ev);
}
function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
}
document.getElementById('export_file').onclick = function(){
	var name = "search.json";
	var list = [];
	for( var i = 0; i < localStorage.length; i++ ){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		list.push({"key":key,"value":value});
	}
	var data =JSON.stringify({"tools":list});
	console.log(data);
	export_raw(name, data);
}
