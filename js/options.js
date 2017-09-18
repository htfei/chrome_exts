
//显示操作log 2s
function show_log(str){
	var log = '<p>log:'+ str +'</p>' ;
	document.getElementById('log').innerHTML += log;
	//setTimeout("var obj=$('#log');obj.removeChild(obj.childNodes[0]);",2000);//error
}

//读取localStorage中的键值对，加载到选项页面
function table_load_from_localStorage(){
	//show_log("loadtable...");
	if(localStorage.length == 0){
		//加载默认项到localStorage
		localStorage.setItem("百度一下","https://www.baidu.com/s?wd=%s");
	}

	var table = '<table><tr><th>名称</th><th>URL</th></tr>';
	for(var i= 0 ;i < localStorage.length; i++ ){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		table += '<tr>';
		table += '<td><input type="text" value="'+key+'"/></td>';
		table += '<td><input type="text" value="'+value+'" size=60 /></td>';
		table += '<td><input type="button" class="del_btn" value="删除" /></td>';
		table += '</tr>';
	}

	table += '</table>';
	document.getElementById('all').innerHTML = table;
}

//添加新的table项
// function table_add_list(key,value){
// 	var obj = document.createElement('tr');
// 	obj.innerHTML += '<tr>';
// 	obj.innerHTML += '<td>'+i+'</td>';
// 	obj.innerHTML += '<td><input type="text" value="'+key+'"/></td>';
// 	obj.innerHTML += '<td><input type="text" value="'+value+'" size=60 /></td>';
// 	obj.innerHTML += '<td><input type="button" class="del_btn" value="删除" /></td>';
// 	obj.innerHTML += '</tr>';
// 	$('table').append(obj);
// }

table_load_from_localStorage();

//添加新的键值对
document.getElementById('add_btn').onclick = function(){
	var key = document.getElementById('add_key').value;
	var value = document.getElementById('add_value').value;
	localStorage.setItem(key,value);
	location.reload();
	//table_add_list(key,value);
	//show_log(key+':'+ value+ '添加成功!');
};

//删除某一项键值对
$('.del_btn').click(function(){
	 var obj = this.parentNode.parentNode;
	 var key = obj.childNodes[0].childNodes[0].value ;
	 localStorage.removeItem(key);
	 location.reload();
	 //obj.parentNode.removeChild(obj);
	 //show_log(key+ ' 删除成功!');
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
		}
		reader.readAsText(file);
	}
};
