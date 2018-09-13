document.write("<script language=javascript src='js/common.js'></script>");

//定时(5min)请求rss源，更新websql
reqtime = Number(localStorage.reqtime ? localStorage.reqtime : 10);
reqtime *= 60000;
setInterval("rss_request()", reqtime); //10min周期执行
//rss_request();

//init();
setTimeout("init()", 100); //等待common.js加载完毕


//接收端的处理方式是一样的
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //console.log(message); 
    if (message.cmd == "got_feeds_urls") {

        sendResponse("from background: ok,i will change ico right now !");

        //将图标换成带“+”的
        chrome.browserAction.setIcon({
            path: {
                '19': 'images/icon-add.png'
            }
        });

        //将message.ctx存入localStorage    
        var key = message.key;
        console.log(key);
        //存在则更新，不存在则添加
        var value = JSON.stringify({
            date:Date().toString(),
            ico:message.ico,
            ctx:message.ctx
        });
        console.log(value);
        localStorage.setItem(key, value); //TODO: 若同一个host下发现新的rss，则现在会替换掉之前的rss,考虑是否需要增量添加//麻烦且伪需求，不考虑修改2018.09.12
        localStorage.now_feed_lists = key;
    }
});

function setIconCallback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}

//提取当前url对应的host
function calc_host(url){
    var urlArr = url.split("/");
    var hostname = urlArr[2];
    return hostname;
}

//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    chrome.tabs.getSelected(selectInfo.windowId, function (tab) {
        console.log(tab.url);
        //console.log(tab.favIconUrl);
        var mykey = calc_host(tab.url);//key已经改成hostname了，但这里忘记修改了。
        //console.log(mykey);
        var myvalue = localStorage.getItem(mykey);
        if (myvalue) {
            //content.js中无法调用chrome.tabs.xxx函数,获取图标操作延后到标签切换和poppup加载页面
            var myrss = JSON.parse(myvalue);
            console.log(myrss);
            if(myrss.ico == "" || myrss.ico == null ){
                var newvalue = JSON.stringify({
                    date:myrss.date,
                    ico:tab.favIconUrl,//实际只更新了ico
                    ctx:myrss.ctx
                });
                localStorage.setItem(mykey, newvalue);
            }

            //console.log(myrss.length);
            //将图标换成带“+”的
            chrome.browserAction.setIcon({
                    path: {
                        "19": "images/icon-add.png",
                        "38": "images/icon-add.png"
                    }
                },
                setIconCallback);
            localStorage.now_feed_lists = mykey;
        } else {
            //将图标换成不带“+”的
            chrome.browserAction.setIcon({
                path: {
                    "19": "images/icon.png",
                    "38": "images/icon.png"
                }
            }, setIconCallback);

            /*if (tab.url.indexOf("chrome-extension:") < 0 ) {
                //当前url不为扩展url时，
                localStorage.now_feed_lists = 0;
            }*/
            localStorage.now_feed_lists = 0;
        }
    });
});