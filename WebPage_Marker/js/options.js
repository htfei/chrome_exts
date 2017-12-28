
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
		var key = "翻译";
		var value = {"type":0,"str":"http://www.iciba.com/%s"};
		localStorage.setItem(key,JSON.stringify(value));
	}
	var table = '<table><tr><th> </th><th>名称</th><th>URL</th></tr>';
	for(var i= 0 ;i < localStorage.length; i++ ){
		var key = localStorage.key(i);
		var value = JSON.parse(localStorage.getItem(key));
		if(value.type != 0) continue;
		table += '<tr>';
		table += '<td>'+i+'</td>';
		table += '<td><input type="text" value="'+key+'"/></td>';
		table += '<td><input type="text" value="'+value.str+'" size=60 /></td>';
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
	var value = {"type":0,"str":document.getElementById('add_value').value};
	localStorage.setItem(key,JSON.stringify(value));
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
	 var new_val = {"type":0,"str":obj.childNodes[2].childNodes[0].value} ;
	 localStorage.setItem(new_key,JSON.stringify(new_val));
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
					var value = {"type":0,"str":json.tools[i].value};
					localStorage.setItem(key,JSON.stringify(value));
				}
				/* 加入link */
				for(var i = 0 ;i < json.page.length; i++ ){
					var key = json.page[i].key;
					var value = json.page[i].value;
					localStorage.setItem(key,value);
				}
				location.reload();
		};
		reader.readAsText(file);
	}
};
