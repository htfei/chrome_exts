document.write("<script language=javascript src='js/common.js'></script>");

//定时(5min)请求rss源，更新websql
reqtime = Number(localStorage.reqtime?localStorage.reqtime:10);
reqtime *=60000;
setInterval("rss_request()",reqtime);//10min周期执行
//rss_request();

//init();
setTimeout("init()",100);//等待common.js加载完毕


//接收端的处理方式是一样的
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    //console.log(message); 
    if(message.cmd == "got_feeds_urls"){
        //将图标换成带“+”的
        chrome.browserAction.setIcon({path: {'19': 'images/icon-add.png'}});
        sendResponse("from background: ok,i will change ico right now !");
    }
    
    //将message.ctx存入localStorage
    //console.log(message.ctx);
    var data =JSON.stringify(message.ctx);
    //console.log(data);
    localStorage.feeds_urls = data ;

});
