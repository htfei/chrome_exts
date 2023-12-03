
document.write("<script language=javascript src='js/common.js'></script>");
//document.head.appendChild(document.createElement('script')).src = '/js/common.js';


//loadPopup();
setTimeout("loadPopup()",200);//等待common.js加载完毕


//一次加载的数量
var onceNums = localStorage.onceNums ? localStorage.onceNums : 10;
//当前加载的rssUrl
var nowRssUrl = "";

//绑定点击事件
window.onclick = function (e) {

    this.localStorage.lastBodystr = '';

    //加载items列表
    if (rssUrl = e.target.getAttribute('data-rss')) {   
        var rssTitle = e.target.getAttribute('data-title');
        var rssico = e.target.getAttribute('data-ico');
        sethead(rssTitle,rssUrl,rssico);
        localStorage.itemstr ="";
        loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条
        //隐藏rss列表
        document.getElementById('rss').innerHTML = ""; 
    }
    //加载更多
    if (e.target.id == 'loadmore') {
        var rssUrl = e.target.getAttribute('data-rssUrl');
        var index = e.target.getAttribute('data-index');
        index = Number(index) + Number(onceNums);
        loadItemsfromWebsql(rssUrl, index, onceNums); //10到20条 ... 
    }
    //标记当前列表为已读
    if (e.target.id == 'nothing') {
        var rssUrl = e.target.getAttribute('data-rssUrl');
        makeRssRead(rssUrl);
        loadRssfromWebsql();
    }
    //刷新
    if (e.target.id == "update") {
        rss_request();
        this.console.log("刷新页面, 重新生成popup页面...");
        setTimeout("loadRssfromWebsql()",3000);//等待common.js加载完毕
        //loadRssfromWebsql();
    }
    //刷新RSS
    if (e.target.id == "updateRss") {
        console.log("刷新单个Rss源, 3s后重新生成popup页面...");       
        let rssUrl = e.target.parentNode.getAttribute('data-rssUrl');
        nowRssUrl = rssUrl;

        /*fetch(rssUrl)
            .then(function (response) {
                var parser = new DOMParser();
                var rssxml = parser.parseFromString(response.text(), "text/xml");
                return (rssxml,response.url);
            })
            .then(function (rssxml,rssUrl) {//BUG:2个参数均为空
                console.log(rssxml);
                console.log(rssUrl);
                parseXmlstr(rssxml,rssUrl);
                return rssUrl;
            })
            .then(function(rssUrl){
                localStorage.itemstr = "";
                loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条
            })
            .catch(e => console.log("Oops, error", e));*/

        /*(async () =>{
            try {
                  let response = await fetch(rssUrl);
                  let data = await response.text();
                  var parser = new DOMParser();
                  var rssxml = await parser.parseFromString(data, "text/xml");
                  console.log(rssUrl);
                  parseXmlstr(rssxml,rssurl);//TODO: BUG:rssurl获取失败,上一步获取成功 2018.09.12

                  localStorage.itemstr = "";
                  console.log(rssUrl);
                  loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条

            }catch(e) {
                console.log("Oops, error", e);
            }
        })();*/

        //BUG: 第一次刷新，提示rssUrl未定义，后退在加载即可显示 2018.09.12//已经解决，使用全局变量
        httpRequest(rssUrl, parseXmlstr);
        localStorage.itemstr = "";
        console.log(rssUrl);
        setTimeout("loadItemsfromWebsql(nowRssUrl, 0, onceNums);",1000);//等待common.js加载完毕//rssUrl未定义，后退在加载即可
        //loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条//先执行


    }
    //访问item（同时标记已读）
    if (e.target.href) {     
        makeItemRead(e.target.href);
        if(e.target.firstChild.nodeName == 'SPAN'){
            e.target.removeChild(e.target.firstChild);
        }
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
    }
    //将对应item标记为已读
    if (e.target.getAttribute('title') == '标记为已读') {
        makeItemRead(e.target.parentNode.href);
        e.target.parentNode.removeChild(e.target);
    }
    if (e.target.getAttribute('title') == '将该RSS源标记为已读') {
        makeRssRead(e.target.parentNode.getAttribute('data-rss'));
        e.target.parentNode.removeChild(e.target);
        //loadRssfromWebsql();
    }
    if (e.target.getAttribute('title') == '将目录标记为已读') {
        makeDirRead(e.target.id.replace("nums", ""));
        loadRssfromWebsql();
    } 
    if (e.target.getAttribute('title') == '订阅这个新发现的rss源！') {
        var rssurl = e.target.parentNode.getAttribute('data-rss');
        var rsstitle = e.target.parentNode.getAttribute('data-title');
        var rssico = e.target.parentNode.getAttribute('data-ico');  
        var rssdir = "";
        db.transaction(function (tx) {
            tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,ico,dir) VALUES (?, ?, ?, ?)', [rssurl, rsstitle,rssico, rssdir],
                function (tx, results) {
                    alert('添加成功!');
                },
                function (tx, error) {
                    alert('添加失败!' + error.message)
                });
        });
    } 
}