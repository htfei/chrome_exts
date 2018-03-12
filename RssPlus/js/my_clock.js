document.write("<script language=javascript src='js/common.js'></script>");

//从websql中读取rss源，并显示到页面
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

var rssstr = "";
//页面加载时读取rss源列表
function loadRssfromWebsql() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss', [],
            function (tx, results) {
                var len = results.rows.length;
                //console.log(len);
                rssstr = '<div>'+
                '<a id="update" type="button" class="btn btn-primary">立即更新</a>'+
                '<a id="showstar" type="button" class="btn btn-primary">显示收藏</a>'+
                '<a id="addrss" type="button" class="btn btn-primary" href="./../options.html">添加新的RSS源</a>'+
                '</div>';
                for (i = 0; i < len; i++) {
                    var rss = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    var unreadNums = results.rows.item(i).unreadNums;
                    tx.executeSql('UPDATE Rss SET unreadNums=(SELECT COUNT(*) FROM Feeds WHERE rssUrl=? AND isread IS NULL) WHERE rss=?', [rss, rss]);
                    //console.log(title);
                    if (unreadNums && unreadNums != 0) {
                        rssstr += '<a class="list-group-item btn" style="text-align: left;" data-rss="' + rss + '" data-title="' + title + '"><span class="badge pull-right" title="将所有项标记为已读">' + unreadNums + '</span>' + title + '</a>';
                    } else {
                        rssstr += '<a class="list-group-item btn" style="text-align: left;" data-rss="' + rss + '" data-title="' + title + '">' + title + '</a>';
                    }
                }
                rssstr += "</div>";
                document.getElementById('rss').innerHTML = rssstr;
                //console.log(rssstr);
            },null);
    });
}
loadRssfromWebsql();

var headstr = "";
var itemstr = "";
var footstr = "";
function sethead(rssTitle){
    headstr = '<div><a id="head" class="list-group-item active btn" style="text-align: center;">' + rssTitle + '</a>';
}
function loadItemsfromWebsql(rssUrl,index,nums) {
    //console.log("loadItemsfromWebsql=====",rssUrl,index);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Feeds where rssUrl = ? ORDER BY pubtimestamp DESC LIMIT ?,?', [rssUrl,index,nums], function (tx, results) {
            var len = results.rows.length;
            //console.log(len);           
            if (len) {
                for (i = 0; i < len; i++) {
                    var itemurl = results.rows.item(i).url;
                    var title = results.rows.item(i).title;
                    var isread = results.rows.item(i).isread;
                    if (isread == 1) {
                        itemstr += '<a class="list-group-item" href="' + itemurl + '" >' + title + '</a>';
                    } else {
                        itemstr += '<a class="list-group-item" href="' + itemurl + '" ><span class="badge pull-right" title="标记为已读">新</span>' + title + '</a>';
                    }
                }
                footstr = '<a id="loadmore" class="list-group-item btn" style="text-align: center;" data-rssUrl="'+ rssUrl +'" data-index="'+index+'">加载更多</a></div>';
                document.getElementById('item').innerHTML = headstr+itemstr+footstr;
            } else {
                footstr = '<a id="nothing" class="list-group-item btn" style="text-align: center;" title="点击返回主界面" >暂无更新！</a></div>';
                document.getElementById('item').innerHTML = headstr+itemstr+footstr;
            }
            //console.log(itemstr);
        }, 
        function (tx, error) {
            console.log('失败!' , error.message)
        });
    });
}

//标记为已读
function makeItemRead(itemUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        tx.executeSql('update Rss set unreadNums = unreadNums - 1 where rss = (select rssUrl from Feeds where url = ?)', [itemUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        location.reload();//执行完毕后刷新
    });
}
//标记为已读
function makeRssItemsRead(rssUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where rssUrl = ?', [rssUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        tx.executeSql('update Rss set unreadNums = 0 where rss = ?', [rssUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        location.reload();
    });
}

var onceNums =5;
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
        this.setTimeout("location.reload();",5000); //5s后刷新  
    }
    if (e.target.href) {
        //将对应item标记为已读
        makeItemRead(e.target.href);
        chrome.tabs.create({
            url: e.target.href
        });
    }
    if (e.target.id == 'head' || (e.target.parentNode&&e.target.parentNode.id == 'head') || e.target.id == 'nothing') {
        //隐藏items列表,加载rss列表
        this.console.log(e.target);
        headstr = "";
        itemstr = "";
        footstr = "";
        document.getElementById('item').innerHTML = "";
        document.getElementById('rss').innerHTML = rssstr;
    }
    //将对应item标记为已读
    if (e.target.getAttribute('title') == '标记为已读') {
        makeItemRead(e.target.parentNode.href);
    }
    if (e.target.getAttribute('title') == '将所有项标记为已读') {
        makeRssItemsRead(e.target.parentNode.getAttribute('data-rss'));
    }     
    else {
        //this.console.log(e.target);
    }
}