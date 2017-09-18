﻿
//-------添加新的搜索项-------
chrome.contextMenus.create({
    'type':'normal',
    'title':'[添加新的搜索引擎项]',
    'contexts':['all'],
    'id':'test1',
    'onclick':function(info, tab){
  		window.open('./options.html', '_blank');
	}
});

/*
//-------百度一下-------
chrome.contextMenus.create({
    'type':'normal',
    'title':'百度一下'+'"%s"',
    'contexts':['selection'],
    'id':'test2',
    'onclick':function(info, tab){
      var url = 'https://www.baidu.com/s?wd=' + info.selectionText ;
      window.open(url, '_blank');
	}
});
*/

//----动态加载菜单项-----
function active_load_menus(){
  for( var i = 0; i < localStorage.length; i++ ){
  	var key = localStorage.key(i);
  	var value = localStorage.getItem(key);
  	(function(fvalue){
  	    chrome.contextMenus.create({
  	    	'type':'normal',
  	    	'title':key,//key+'"%s"'
  	    	'contexts':['selection'],
  	    	'id':'id'+i,
  	    	'onclick':function(info, tab){
  	    		var url = fvalue.replace("%s",info.selectionText);
  	    		window.open(url, '_blank');
  	    	}
  	    });
  	})(value)
  }
}

﻿window.onmouseup =  active_load_menus() ;
