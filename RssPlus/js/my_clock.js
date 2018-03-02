


function my_clock(el) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = m >= 10 ? m : ('0' + m);
    s = s >= 10 ? s : ('0' + s);
    el.innerHTML = h + ":" + m + ":" + s;
    setTimeout(function () { my_clock(el) }, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);

function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseXML);//此处返回xml对象
        }
    }
    xhr.send();
}

function showItem(rssxml) {
    //console.log(rssxml);
    var list = rssxml.getElementsByTagName('item');
    //console.log(list[0]);

    var div = "<div>";
    for (i = 0; i < list.length; i++) {
        var title = list[i].getElementsByTagName('title')[0].innerHTML;
        //var pub = list[i].getElementsByTagName('pubDate')[0].innerHTML;
        var link = list[i].getElementsByTagName('link')[0].innerHTML;
        //console.log(t,p,l);
        div += '<a class="list-group-item" href="' + link + '" >' + title + '</a>';
    }
    div += "</div>"

    document.getElementById('item').innerHTML = div;
}

//var rss = localStorage.rss;
//rss = rss ? rss : 'http://feed43.com/5123185481381181.xml';
//var url = rss;
//httpRequest(url, showItem);

//绑定点击事件
window.onclick = function (e) {
    //console.log(e.target);
    //console.log(e.target.getAttribute('data-rss'));
    if(rss = e.target.getAttribute('data-rss')){
        //加载某一个rss的内容
        httpRequest(rss, showItem);
        //更改head
        document.getElementById('head').innerHTML = e.target.innerHTML;
        document.getElementById('item').innerHTML = "loading ...";
        //隐藏rss列表
        var rssdiv = document.getElementById('rss');
        rssdiv.parentNode.removeChild(rssdiv);
    }
    if (e.target.href) {
        chrome.tabs.create({ url: e.target.href });
    }
}


var myrss = "http://feed43.com/5123185481381181.xml";
var myrsstitle = "网易新闻24H排行榜"
var msg;
//从websql中读取rss源，并显示到页面
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
db.transaction(function (tx) {
    //没有rss表则新建
    tx.executeSql('CREATE TABLE IF NOT EXISTS MYRSS (rss unique, title)');
    //插入一个rss源
    //tx.executeSql('INSERT INTO MYRSS (rss,title) VALUES (?, ?)', [myrss, myrsstitle]);
    //tx.executeSql('INSERT INTO MYRSS (rss,title) VALUES (?, ?)', ["http://feed43.com/5123185481381182.xml", "新浪24h"]);
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
            div += '<a class="list-group-item" data-rss="' + rss + '" >' + title + '</a>';
        }
        div += "<div>";
        document.getElementById('rss').innerHTML = div;
    }, null);
});