document.write("<script language=javascript src='js/common.js'></script>");

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
    tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', ["http://dig.chouti.com/feed.xml", "抽屉feed"]);
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



//rss_request();
setInterval("rss_request()",300000);//5min周期执行