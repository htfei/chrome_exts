
//定时(5min)请求rss源，更新websql
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
    //tx.executeSql("ALTER TABLE Feeds ADD COLUMN isread BOOL");
});



//请求RSS源
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseXML); //此处返回xml对象
        }
    }
    xhr.send();
}

function makeItemRead(itemUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, function (tx, error) {
            console.log('添加数据失败: ' + error.message)
        });
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'Hello'){
        sendResponse(rssstr);
    }
    if(message.cmd == 'makeItemRead'){
        makeItemRead(message.itemUrl);
    }
});
