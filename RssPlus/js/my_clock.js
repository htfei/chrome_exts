//从websql中读取rss源，并显示到页面
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
db.transaction(function (tx) {
    //没有rss表则新建
    //tx.executeSql('CREATE TABLE IF NOT EXISTS Rss (rss unique, title)');
    //插入一个rss源
    //var myrss = "http://feed43.com/5123185481381181.xml";
    //var myrsstitle = "网易新闻24H排行榜"
    //tx.executeSql('INSERT INTO Rss (rss,title) VALUES (?, ?)', [myrss, myrsstitle]);
    //tx.executeSql('INSERT INTO Rss (rss,title) VALUES (?, ?)', ["http://www.feed43.com/2770086871034514.xml", "抽屉24h最热"]);

    //tx.executeSql('drop table MYRSS');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS Feeds (url unique, title, pubtimestamp)');
    //tx.executeSql("ALTER TABLE Feeds ADD COLUMN pubtimestamp INT");
    tx.executeSql("ALTER TABLE Feeds ADD COLUMN rssUrl");
});

var rssstr = "";
//页面加载时读取rss源列表
function loadRssfromWebsql() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss', [], function (tx, results) {
            var len = results.rows.length;
            //console.log(len);
            var div = "<div>";
            for (i = 0; i < len; i++) {
                var rss = results.rows.item(i).rss;
                var title = results.rows.item(i).title;
                //console.log(title);
                div += '<li class="list-group-item btn btn-default" style="text-align: left;" data-rss="' + rss + '" >' + title + '</li>';
            }
            div += "<div>";
            document.getElementById('rss').innerHTML = div;
            rssstr = div;
            //console.log(rssstr);
        }, null);
    });
}
loadRssfromWebsql();

function loadItemsfromWebsql(rssUrl) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Feeds where rssUrl = ?', [rssUrl], function (tx, results) {
            var len = results.rows.length;
            //console.log(len);
            var div = "<div>";
            for (i = 0; i < len; i++) {
                var rss = results.rows.item(i).rss;
                var title = results.rows.item(i).title;
                //console.log(title);
                div += '<li class="list-group-item btn btn-default" style="text-align: left;" data-rss="' + rss + '" >' + title + '</li>';
            }
            div += "<div>";
            document.getElementById('rss').innerHTML = div;
            rssstr = div;
            //console.log(rssstr);
        }, null);
    });
}

//解析并显示最新feeds
function showItem(rssxml) {
    console.log(rssxml);
    //err console.log(rssxml.innerHTML);
    var feeds = [];
    if (rssxml) {
        var list = rssxml.getElementsByTagName('item');

        for (i = 0; i < list.length; i++) {
            var title = list[i].getElementsByTagName('title')[0].innerHTML;
            var pubdate = list[i].getElementsByTagName('pubDate')[0].innerHTML;
            var pubtimestamp = Math.round(new Date(pubdate).getTime() / 1000);
            var itemurl = list[i].getElementsByTagName('link')[0].innerHTML;
            //console.log(t,p,l);
            feeds.push([itemurl, title, pubtimestamp]);
            //显示加载项
            document.getElementById('item').innerHTML = '<a class="list-group-item" href="' + itemurl + '" >' + title + '</a>';
        }

        for (i = 0; i < list.length; i++) {
            //写成函数会导致赋值延后
            db.transaction(function (tx) {
                //将item写入websq
                tx.executeSql('INSERT OR IGNORE INTO Feeds (url,title,pubtimestamp) VALUES (?,?,?)', [itemurl, title, pubtimestamp],
                    null,
                    function (tx, error) {
                        console.log('添加数据失败: ' + error.message)
                    });
                //读取isread是否已读，未读则加载“新”标记
                tx.executeSql('SELECT isread FROM Feeds where url = ?', [itemurl],
                    function (tx, results) {
                        var isread = results.rows.item(0).isread;
                        //console.log(isread);
                        if (isread == 1) {
                            itemdiv +=
                        } else {
                            itemdiv += '<a class="list-group-item" href="' + itemurl + '" ><span class="badge pull-right">新</span>' + title + '</a>';
                        }
                    },
                    null);
            });
        }

    } else {
        document.getElementById('item').innerHTML = "加载失败";
    }
    return feeds;
}

//var rss = localStorage.rss;
//rss = rss ? rss : 'http://feed43.com/5123185481381181.xml';
//var url = rss;
//httpRequest(url, showItem);

function makeItemRead(itemUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, function (tx, error) {
            console.log('添加数据失败: ' + error.message)
        });
    });
}



//绑定点击事件
window.onclick = function (e) {
    //console.log(e.target);
    //console.log(e.target.getAttribute('data-rss'));
    if (rssUrl = e.target.getAttribute('data-rss')) {
        //加载某一个rss的内容
        document.getElementById('item').innerHTML = "loading ...";
        //httpRequest(rssUrl, showItem);
        loadItemsfromWebsql(rssUrl);
        //更改head
        div = '<p class="list-group-item">' + e.target.innerHTML + '</p>';
        document.getElementById('head').innerHTML = div;
        //隐藏rss列表
        document.getElementById('rss').innerHTML = "";
    }
    if (e.target.href) {
        //将对应item标记为已读
        //makeItemRead(e.target.href);
        //var msg = [];
        chrome.runtime.sendMessage({
            'cmd': "makeItemRead",
            'itemUrl': e.target.href
        }, null);
        //chrome.tabs.create({ url: e.target.href });
        //console.log(e.target.href);
    }
    if (e.target.id == 'head' || e.target.parentNode.id == 'head') {
        //this.console.log(e.target);
        //this.console.log(rssstr);
        //隐藏head,隐藏items列表,加载rss列表
        document.getElementById('head').innerHTML = "";
        document.getElementById('item').innerHTML = "";
        document.getElementById('rss').innerHTML = rssstr;
    } else {
        //this.console.log(e.target);
    }
}