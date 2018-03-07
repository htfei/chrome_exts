var myrss = "http://feed43.com/5123185481381181.xml";
var myrsstitle = "网易新闻24H排行榜"
//从websql中读取rss源，并显示到页面
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
db.transaction(function (tx) {
    //没有rss表则新建
    tx.executeSql('CREATE TABLE IF NOT EXISTS MYRSS (rss unique, title)');
    //插入一个rss源
    //tx.executeSql('INSERT INTO MYRSS (rss,title) VALUES (?, ?)', [myrss, myrsstitle]);
    //tx.executeSql('INSERT INTO MYRSS (rss,title) VALUES (?, ?)', ["http://www.feed43.com/2770086871034514.xml", "抽屉24h最热"]);
});

//读取
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM MYRSS', [], function (tx, results) {
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
    }, null);
});

//请求RSS源
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var feeds = callback(xhr.responseXML);//此处返回xml对象
            console.log(feeds);
            //console.log(feeds.length);
            //没有rss表则新建
            db.transaction(function (tx) {         
                tx.executeSql('CREATE TABLE IF NOT EXISTS Feeds (url unique, title)');
                 //插入一个rss源
                for (i = 0; i < feeds.length; i++) {
                    tx.executeSql('INSERT INTO Feeds (url,title) VALUES (?,?)',feeds[i],null,null);
                    //null -> function (tx, error) { console.log('添加数据失败: ' + error.message)}   
                }
            });
        }
    }
    xhr.send();
}

//解析并显示最新feeds
function showItem(rssxml) {
    //console.log(rssxml);
    var list = rssxml.getElementsByTagName('item');
    //console.log(list[0]);
    var feeds = [];
    var div = "<div>";
    for (i = 0; i < list.length; i++) {
        var title = list[i].getElementsByTagName('title')[0].innerHTML;
        var pubdate = list[i].getElementsByTagName('pubDate')[0].innerHTML;
        var link = list[i].getElementsByTagName('link')[0].innerHTML;
        //console.log(t,p,l);
        div += '<a class="list-group-item" href="' + link + '" >' + title + '</a>';
        feeds.push([link, title]);
    }
    div += "</div>"

    document.getElementById('item').innerHTML = div;
    return feeds;
}

//var rss = localStorage.rss;
//rss = rss ? rss : 'http://feed43.com/5123185481381181.xml';
//var url = rss;
//httpRequest(url, showItem);

//绑定点击事件
window.onclick = function (e) {
    //console.log(e.target);
    //console.log(e.target.getAttribute('data-rss'));
    if (rss = e.target.getAttribute('data-rss')) {
        //加载某一个rss的内容
        document.getElementById('item').innerHTML = "loading ...";
        httpRequest(rss, showItem);
        //更改head
        div = '<p class="list-group-item">' + e.target.innerHTML + '</p>';
        document.getElementById('head').innerHTML = div;
        //隐藏rss列表
        var rssdiv = document.getElementById('rss');
        rssdiv.parentNode.removeChild(rssdiv);
    }
    if (e.target.href) {
        chrome.tabs.create({ url: e.target.href });
    }
}


