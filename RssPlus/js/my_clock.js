
document.write("<script language=javascript src='js/common.js'></script>");
//document.head.appendChild(document.createElement('script')).src = '/js/common.js';


//loadPopup();
setTimeout("loadPopup()",100);//等待common.js加载完毕


//一次加载的数量
var onceNums = localStorage.onceNums ? localStorage.onceNums : 10;

//绑定点击事件
window.onclick = function (e) {

    //离开之间保存页面，下次直接加载该页面
    

    //加载items列表
    if (rssUrl = e.target.getAttribute('data-rss')) {   
           
        localStorage.lastBodystrtemp =localStorage.lastBodystr;//后退时需要用到

        var rssTitle = e.target.getAttribute('data-title');
        sethead(rssTitle,rssUrl);
        loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条
        //隐藏rss列表
        document.getElementById('rss').innerHTML = ""; 
    }
    //加载更多
    if (e.target.id == 'loadmore') {
        var rssUrl = e.target.getAttribute('data-rssUrl');
        var index = e.target.getAttribute('data-index');
        index = Number(index) + onceNums;
        loadItemsfromWebsql(rssUrl, index, onceNums); //10到20条 ... 
    }
    //刷新
    if (e.target.id == "update") {
        rss_request();
        localStorage.lastBodystr ="";
        this.console.log("刷新页面, 重新生成popup页面...");
        loadRssfromWebsql();
    }
    //刷新RSS
    if (e.target.id == "updateRss") {
        console.log("刷新单个Rss源, 3s后重新生成popup页面...");     

        var rssUrl = e.target.parentNode.getAttribute('data-rssUrl');
        httpRequest(rssUrl, parseXmlstr);

        localStorage.itemstr = "";
        loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条
    }
    //后退
    if (e.target.id == "goback") {
        localStorage.lastBodystr =localStorage.lastBodystrtemp;
        localStorage.headstr = "";
        localStorage.itemstr = "";
        localStorage.footstr = "";
        loadPopup();
    }
    //访问item（同时标记已读）
    if (e.target.href) {     
        makeItemRead(e.target.href);
        e.target.removeChild(e.target.firstChild);
        this.localStorage.lastBodystr = document.getElementById('body').innerHTML;
        chrome.tabs.create({
            url: e.target.href
        });
    }
    //隐藏items列表,加载rss列表
    if (e.target.id == 'head' || (e.target.parentNode && e.target.parentNode.id == 'head') || e.target.id == 'nothing') {
        //this.console.log(e.target);        
        localStorage.headstr = "";
        localStorage.itemstr = "";
        localStorage.footstr = "";
        document.getElementById('item').innerHTML = "";
        loadRssfromWebsql();
        //document.getElementById('rss').innerHTML = localStorage.rssstr;
    }
    //将对应item标记为已读
    if (e.target.getAttribute('title') == '标记为已读') {
        makeItemRead(e.target.parentNode.href);
        e.target.parentNode.removeChild(e.target);
    }
    if (e.target.getAttribute('title') == '将该RSS源标记为已读') {
        makeRssRead(e.target.parentNode.getAttribute('data-rss'));
        e.target.parentNode.removeChild(e.target);
    }
    if (e.target.getAttribute('title') == '将目录标记为已读') {
        makeDirRead(e.target.id.replace("nums", ""));
        e.target.parentNode.removeChild(e.target);
    } else {
        //this.console.log(e.target);
    }

    this.localStorage.lastBodystr = document.getElementById('body').innerHTML;
}