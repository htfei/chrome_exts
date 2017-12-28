

//-------添加新的搜索项-------
function add_set(){
  /* 添加新的搜索项 */
  chrome.contextMenus.create({
      'type':'normal',
      'title':'[添加新的搜索项]',
      'contexts':['all'],
      'id':'set',
      'onclick':function(info, tab){
        var url = './options.html';
        window.open(url, '_blank');
  	}
  });
  /* 网址转二维码 */
  chrome.contextMenus.create({
      'type':'normal',
      'title':'网址转二维码',
      'contexts':['page','link'],
      'id':'qrcode',
      'onclick':function(info, tab){
        var url = 'http://qr.liantu.com/api.php?text=' + tab.url ;
        window.open(url, '_blank');
    }
  });
  /* 拉黑网址 */
  chrome.contextMenus.create({
      'type':'normal',
      'title':'拉黑网址',
      'contexts':['page','link'],
      'id':'blackpage',
      'onclick':function(info, tab){
        var key = tab.url;
        var value = {"type":1,"pv":0,"rate":0,"title":tab.title,"favIconUrl":tab.favIconUrl};
        localStorage.setItem(key,JSON.stringify(value));
    }
  });
  /**************************/
}


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
  	var value = JSON.parse(localStorage.getItem(key));
    if(value.type != 0) continue;
    value = value.str;
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

add_active_menus(null);

/*
﻿window.onmouseup = active_load_menus();//error
background.js无法直接与当前页面的dom交互，所以无法直接调用window.onmouseup等dom事件，
故需要content.js脚本，在其中监听事件，并通过消息机制发送到background.js中来.
尚存bug：2017.10.11--omMessage并不是每次都能成功传递过来，与具体站点相关，且有时必须重启浏览器。
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message == 'Hello'){
      sendResponse('Hi from background.');
  }
  else if(message.cmd == 'msg_from_content')
  {
    chrome.contextMenus.removeAll();
    add_set();
    //chrome.contextMenus.update('baidu',{'title':'百度一下 ['+message.selstr+'] '});
    add_active_menus(message.host);
  }
});


/* background.js定时检查当前网址状态 */
/* storage任何变化都将触发该事件 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    if(key == "nowpage"){
      console.log('%s.%s Changed,newValue=[%s].',
      namespace, //数据的存储空间类型，枚举值"sync", "local", "managed"
      key, //数据的索引key
      storageChange.oldValue,//变化前的值
      storageChange.newValue); //变化后的值
      /* 提取nowpage的信息 */
      var nowpage_key = storageChange.newValue;
      chrome.storage.sync.get(nowpage_key,function(date){
        var value = date[nowpage_key];
        var fav = (value["rate"] == 1)?"已收藏":(value["rate"] == 2)?"已拉黑":"未收藏";
        console.log("link:%s\ntitle:%s\nfav:%s",nowpage_key,value["title"],fav);
      });
    }
  }
});
