var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

//储存items到websql
function items2websql(items) {
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

/*从<![CDATA[%s]]>中取出%s*/
function removeCDATA(fstr) {
    return fstr.replace("<![CDATA[", "").replace("]]>", "")
}

function addhttphead(url) {
    if (url.substr(0, 8) != 'https://' && url.substr(0, 7) != 'http://') {
        if (url.substr(0, 2) == '//') {
            return 'https:' + url;
        } else {
            return 'https://' + url;
        }
    }else{
        return url;
    }   
}

//解析items
function showItem(rssxml, rssurl) {
    console.log(rssxml); //err console.log(rssxml.innerHTML);
    if (rssxml) {
        var list = rssxml.getElementsByTagName('item');
        var items = [];
        for (i = 0; i < list.length; i++) {

            var title = list[i].getElementsByTagName('title')[0].innerHTML;
            var titlefix = removeCDATA(title);

            var pub = list[i].getElementsByTagName('pubDate');
            if(pub.length == 0 ){
                console.log("这是一个坏的items!")
                continue;
            }
            var pubdate = pub[0].innerHTML;
            var pubtimestamp = Math.round(new Date(pubdate).getTime() / 1000);

            var itemurl = list[i].getElementsByTagName('link')[0].innerHTML;
            //必须加https://，否则默认前缀为chrome-extension://dhjefkpchmfdghfipcdmaodhigmfbpef
            itemurlfix = addhttphead(itemurl);
            
            //console.log("item",i,titlefix);
            //executeSql第一条执行完毕之前for循环已经结束了，故只插入了一条记录，需先保存起来在一次插入
            items.push([itemurlfix, titlefix, pubtimestamp, rssurl]);
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

//测试httpRequest
var xml;

function testcallback(rssxml, rssurl) {
    console.log("testcallback", rssxml);
    xml = rssxml;
}
//httpRequest("http://dig.chouti.com/feed.xml",testcallback);

//定期 读取rss列表并依次执行请求
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
        //插入数据后更新未读条数
        tx.executeSql('UPDATE Rss SET unreadNums = ( SELECT COUNT(*) FROM Feeds WHERE isread IS NULL AND Feeds.rssUrl = Rss.rss)', []);
        //更换图标下的bar
        changeicobar();
    });
    //console.log("请求rss源数据完毕！5mim后再次执行！")
}



function init() {
    db.transaction(function (tx) {

        //新建表
        tx.executeSql('CREATE TABLE IF NOT EXISTS Rss (rss unique, title,unreadNums)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Feeds (url unique, title, pubtimestamp,isread,rssUrl)');

        //插入一个rss源
        //tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/5123185481381181.xml", "网易新闻24H排行榜"]);
        tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/2770086871034514.xml", "抽屉24h最热"]);
        tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/3680851688572686.xml", "天涯实时热帖榜"]);
        //tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/4677052036764060.xml", "光谷社区"]);
        tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/6770026287054361.xml", "光谷7天最热--得意生活"]);
        //tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/2866623024361680.xml", "光谷二手房--得意生活"]);
        tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/1011517213012743.xml", "武汉房管局公告"]);
        //tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["https://feed43.com/3864107213381284.xml", "武汉亿房论坛"]);

        //更新数据
        //tx.executeSql('UPDATE Rss SET rss=? where rowid=2', ["http://feed43.com/2770086871034514.xml"]);
        //tx.executeSql('UPDATE Feeds SET rssUrl=?', ["http://feed43.com/5123185481381181.xml"]);
        //tx.executeSql('UPDATE Feeds SET rssUrl=? where rowid = 363 ', ["https://feed43.com/3680851688572686.xml"]);
        //删除数据
        //tx.executeSql('DELETE FROM Feeds WHERE rssUrl = "https://feed43.com/5123185481381181.xml"');

        //删除表
        //tx.executeSql('drop table MYRSS');

        //增加列
        //tx.executeSql("ALTER TABLE Feeds ADD COLUMN pubtimestamp INT");
        //tx.executeSql("ALTER TABLE Feeds ADD COLUMN rssUrl");

    });
}