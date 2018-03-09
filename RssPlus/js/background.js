//定时(5min)请求rss源，更新websql
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
db.transaction(function (tx) {

    //新建表
    tx.executeSql('CREATE TABLE IF NOT EXISTS Rss (rss unique, title,unreadNums)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Feeds (url unique, title, pubtimestamp,isread,rssUrl)');

    //插入一个rss源
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/5123185481381181.xml", "网易新闻24H排行榜"]);
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/2770086871034514.xml", "抽屉24h最热"]);
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/3680851688572686.xml", "天涯实时热帖榜"]);
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/4677052036764060.xml", "光谷社区"]);
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/1011517213012743.xml", "武汉房管局公告"]);
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/3864107213381284.xml", "武汉亿房论坛"]);
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://www.deyi.com/forum-rss-fid-914-auth-b83fHPXPmN6UUVorxMFhVur6T3zO67J3eklrr0nOU0gF3JwuR2JqdNTgCWoeJO5TSQ.html", "得意生活二手房"]);

    //更新值
    //tx.executeSql('UPDATE Rss SET rss=? where rowid=2', ["http://feed43.com/2770086871034514.xml"]);
    //tx.executeSql('UPDATE Feeds SET rssUrl=?', ["http://feed43.com/5123185481381181.xml"]);
    //tx.executeSql('UPDATE Feeds SET rssUrl=? where rowid = 363 ', ["https://feed43.com/3680851688572686.xml"]);
    

    //删除表
    //tx.executeSql('drop table MYRSS');
      
    //增加列
    //tx.executeSql("ALTER TABLE Feeds ADD COLUMN pubtimestamp INT");
    //tx.executeSql("ALTER TABLE Feeds ADD COLUMN rssUrl");

});

//储存items到websql
function items2websql(items){
    db.transaction(function (tx) {
        for (i = 0; i < items.length; i++) {
            tx.executeSql('INSERT OR IGNORE INTO Feeds (url,title,pubtimestamp,rssUrl) VALUES (?,?,?,?)', items[i],
                null,
                function (tx, error) {
                    console.log('添加数据失败: ' + error.message)
                });
        }
    });
}

//解析items
function showItem(rssxml, rssurl) {
    //console.log(rssxml); //err console.log(rssxml.innerHTML);
    if (rssxml) {
        var list = rssxml.getElementsByTagName('item');
        var items = [];
        for (i = 0; i < list.length; i++) {
            var title = list[i].getElementsByTagName('title')[0].innerHTML;
            var pubdate = list[i].getElementsByTagName('pubDate')[0].innerHTML;
            var pubtimestamp = Math.round(new Date(pubdate).getTime() / 1000);
            var itemurl = list[i].getElementsByTagName('link')[0].innerHTML;
            //console.log("item",i,title);
            //executeSql第一条执行完毕之前for循环已经结束了，故只插入了一条记录，需先保存起来在一次插入
            items.push([itemurl, title, pubtimestamp, rssurl]);
        }
        items2websql(items);
        console.log(rssurl, "更新成功！");

    } else {
        console.log(rssurl, "更新失败!");
    }
}


//请求RSS源
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseXML, url); //此处返回xml对象
        }
    }
    xhr.send();
}

//读取rss列表并依次执行请求
function rss_request() {
    console.log("开始请求rss源数据...")
    db.transaction(function (tx) {
        tx.executeSql('SELECT rss FROM Rss', [], function (tx, results) {
                var len = results.rows.length;
                //console.log(len);
                for (i = 0; i < len; i++) {
                    var rssUrl = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    //console.log("请求",title,rssUrl);
                    httpRequest(rssUrl, showItem);
                }
            },
            function (tx, error) {
                console.log('查询数据失败: ', error.message)
            });
    });
    //console.log("请求rss源数据完毕！5mim后再次执行！")
}

//rss_request();
setInterval("rss_request()",300000);//5min周期执行