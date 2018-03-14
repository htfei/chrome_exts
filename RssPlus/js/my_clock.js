document.write("<script language=javascript src='js/common.js'></script>");

//上次最后的访问页面
if(localStorage.lastBodystr){
    document.getElementById('body').innerHTML = localStorage.lastBodystr;
}
else{
    loadRssfromWebsql();
}

//一次加载的数量
var onceNums = localStorage.onceNums?localStorage.onceNums:10;

//绑定点击事件
window.onclick = function (e) {
    //console.log(e.target);
    if (rssUrl = e.target.getAttribute('data-rss')) {
        //加载某一个rss的内容
        var rssTitle = e.target.getAttribute('data-title');
        sethead(rssTitle);
        loadItemsfromWebsql(rssUrl,0,onceNums);//0到10条
        //隐藏rss列表
        document.getElementById('rss').innerHTML = "";
    }
    if (e.target.id == 'loadmore') {
        //加载某一个rss的内容
        var rssUrl = e.target.getAttribute('data-rssUrl');
        var index = e.target.getAttribute('data-index');
        index = Number(index)+onceNums;
        loadItemsfromWebsql(rssUrl,index,onceNums);//10到20条 ... 
    }
    if(e.target.id=="update"){
        rss_request();
        //this.setTimeout("location.reload();",3000); //3s后刷新  
    }
    if (e.target.href) {
        //将对应item标记为已读
        makeItemRead(e.target.href);
        e.target.parentNode.removeChild(e.target);
        chrome.tabs.create({
            url: e.target.href
        });
    }
    if (e.target.id == 'head' || (e.target.parentNode&&e.target.parentNode.id == 'head') || e.target.id == 'nothing') {
        //隐藏items列表,加载rss列表
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
        makeRssItemsRead(e.target.parentNode.getAttribute('data-rss'));
        e.target.parentNode.removeChild(e.target);
    }     
    else {
        //this.console.log(e.target);
    }

    //离开之间保存页面，下次直接加载该页面
    this.localStorage.lastBodystr = document.getElementById('body').innerHTML;
}