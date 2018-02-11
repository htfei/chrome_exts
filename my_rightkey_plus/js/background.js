
//百度识图


//----动态加载菜单项-----
function add_active_menus(){
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
      if(key.indexOf("识图") != -1){
        chrome.contextMenus.update('id'+i,{
          'contexts':['image'],//百度识图为image类型
          'onclick':function(info, tab){
            var url = fvalue.replace("%s",info.srcUrl);//image的url
  	    		window.open(url, '_blank');
  	    	}
        });
      }        
  	})(value)
  }
}

add_active_menus();

/* 2018.02.11：大部分情况并不需要重新加载，【站内搜索】需要获取网站的host ,此时需要传递消息 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    //chrome.contextMenus.removeAll();//删除所有菜单项
    //add_active_menus(message.host);
    for( var i = 0; i < localStorage.length; i++ ){
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      if(key.indexOf("站内") != -1 ){
        chrome.contextMenus.update('id'+i,{
          'onclick':function(info, tab){
            var url = value.replace("%s",info.selectionText).replace("%w",message.host);
            window.open(url, '_blank');
          }
        });
      }
      //break;//只有一个站内项
    }
});
