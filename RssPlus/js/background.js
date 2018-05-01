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
        //将图标换成带“+”的
        chrome.browserAction.setIcon({
            path: {
                '19': 'images/icon-add.png'
            }
        });
        sendResponse("from background: ok,i will change ico right now !");

        //将message.ctx存入localStorage    
        var key = message.page_url;
        var value = JSON.stringify(message.ctx);
        console.log(key);
        console.log(value);
        localStorage.setItem(key, value);
        localStorage.feeds_urls = key;
    }
});

function setIconCallback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}

//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    chrome.tabs.getSelected(selectInfo.windowId, function (tab) {
        var mykey = tab.url;
        console.log(mykey);
        var myvalue = localStorage.getItem(mykey);
        if (myvalue) {
            var myrss = JSON.parse(myvalue);
            console.log(myrss);
            console.log(myrss.length);
            //将图标换成带“+”的
            chrome.browserAction.setIcon({
                    path: {
                        "19": "images/icon-add.png",
                        "38": "images/icon-add.png"
                    }
                },
                setIconCallback);
            localStorage.feeds_urls = mykey;
        } else {
            //将图标换成不带“+”的
            chrome.browserAction.setIcon({
                path: {
                    "19": "images/icon.png",
                    "38": "images/icon.png"
                }
            }, setIconCallback);

            if (mykey.indexOf("chrome-extension:") < 0 ) {
                //当前url不为扩展url时，
                localStorage.feeds_urls = 0;
            }
        }
    });
});

/* test icon
function chgIcon(index){
    if(index % 2 ==0){
        chrome.browserAction.setIcon({path: {'19': 'images/icon.png'}});
        chrome.browserAction.setIcon({path: {'38': 'images/icon.png'}});
        console.log(index);
    }
    else{
        //图片过大可能会导致报Icon invalid.错误
        chrome.browserAction.setIcon({path: {'19': 'images/icon-add.png'}});
        chrome.browserAction.setIcon({path: {'38': 'images/icon-add.png'}});  
        console.log(index);  
    }
	setTimeout(function(){chgIcon(index+1)},2000);
}

chgIcon(1);
*/