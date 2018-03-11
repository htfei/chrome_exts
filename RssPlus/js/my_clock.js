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
                rssstr = '<div><a id="head1" class="list-group-item btn active" style="text-align: center;">待设计的标题栏</a>';
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

var itemstr = "";

function loadItemsfromWebsql(rssUrl,rssTitle) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Feeds where rssUrl = ? ORDER BY pubtimestamp DESC LIMIT 5', [rssUrl], function (tx, results) {
            var len = results.rows.length;
            console.log(len);
            if (len) {
                itemstr = '<div><a id="head" class="list-group-item active btn" style="text-align: center;">' + rssTitle + '</a>';
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
                itemstr += '<a id="foot" class="list-group-item" style="text-align: center;">加载更多</a></div>';
                document.getElementById('item').innerHTML = itemstr;
            } else {
                document.getElementById('item').innerHTML = '<a class="list-group-item">暂无更新！</a>';
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
        tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, null);
    });
}
//标记为已读
function makeRssItemsRead(rssUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where rssUrl = ?', [rssUrl], null, null);
        tx.executeSql('update Rss set unreadNums = 0 where rss = ?', [rssUrl], null, null);
    });
}


//绑定点击事件
window.onclick = function (e) {
    //console.log(e.target);
    if (rssUrl = e.target.getAttribute('data-rss')) {
        //加载某一个rss的内容
        var rssTitle = e.target.getAttribute('data-title');
        loadItemsfromWebsql(rssUrl,rssTitle);
        //隐藏rss列表
        document.getElementById('rss').innerHTML = "";
    }
    if (e.target.href) {
        //将对应item标记为已读
        makeItemRead(e.target.href);
        chrome.tabs.create({
            url: e.target.href
        });
    }
    if (e.target.id == 'head' || e.target.parentNode.id == 'head') {
        //隐藏items列表,加载rss列表
        document.getElementById('item').innerHTML = "";
        document.getElementById('rss').innerHTML = rssstr;
    }
    //将对应item标记为已读
    if (e.target.getAttribute('title') == '标记为已读') {
        makeItemRead(e.target.parentNode.href);
    }
    if (e.target.getAttribute('title') == '将所有项标记为已读') {
        makeRssItemsRead(e.target.parentNode.getAttribute('data-rss'));
    } else {
        this.console.log(e.target);
    }
}