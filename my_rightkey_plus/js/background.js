
//-------添加新的搜索项-------
chrome.contextMenus.create({
    'type':'normal',
    'title':'[添加新的搜索项]',
    'contexts':['all'],
    'id':'test1',
    'onclick':function(info, tab){
      //window.open('./options.html', '_blank');
      window.open('chrome://extensions/?options=nobklgnfhnjmcapkppbpmckchijdebcj', '_blank');
	}
});


//-------百度一下-------
function add_baidu(){
  chrome.contextMenus.create({
      'type':'normal',
      'title':'百度一下'+'"%s"',
      'contexts':['selection'],
      'id':'baidu',
      'onclick':function(info, tab){
        var url = 'https://www.baidu.com/s?wd=' + info.selectionText ;
        window.open(url, '_blank');
  	}
  });
}

//----动态加载菜单项-----
function add_active_menus(hostname){
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
            if(hostname != null){
              url = url.replace("%w",hostname);
            }
  	    		window.open(url, '_blank');
  	    	}
  	    });
  	})(value)
  }
}

add_baidu();
add_active_menus(null);

/*
﻿window.onmouseup = active_load_menus();//error
background.js无法直接与当前页面的dom交互，所以无法直接调用window.onmouseup等dom事件，
故需要content.js脚本，在其中监听事件，并通过消息机制发送到background.js中来.
尚存bug：2017.10.11--omMessage并不是每次都能成功传递过来，与具体站点相关，且有时必须重启浏览器。
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    chrome.contextMenus.removeAll();
    add_baidu();
    //chrome.contextMenus.update('baidu',{'title':'百度一下 ['+message.selstr+'] '});
    add_active_menus(message.host);
});
