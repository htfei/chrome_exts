
//显示操作log 2s
function show_log(str){
	var log = '<p>log:'+ str +'</p>' ;
	document.getElementById('log').innerHTML += log;
}

//导入文件到localStorage
document.getElementById('loadfile').onchange = function jsReadFiles() {
	//show_log("jsReadFiles...");
	if (this.files.length) {
		var file = this.files[0];
		var reader = new FileReader();
		reader.onload = function() {
				var json = JSON.parse(this.result);
				//show_log(json.page[0].key);
				for(var i = 0 ;i < json.page.length; i++ ){
					var key = json.page[i].key;
					var value = json.page[i].value;
					localStorage.setItem(key,JSON.stringify(value));
				}
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
	var name = "pageMaker.json";
	var list = [];
	for( var i = 0; i < localStorage.length; i++ ){
		var key = localStorage.key(i);
		var value = JSON.parse(localStorage.getItem(key));
		list.push({"key":key,"value":value});
	}
	var data =JSON.stringify({"page":list}) ;
	console.log(data);
	export_raw(name, data);
}
