document.write("<script language=javascript src='js/common.js'></script>");

var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

//添加
document.getElementById('save').onclick = function () {
    var rssurl = document.getElementById('rssurl').value;
    var rsstitle = document.getElementById('rsstitle').value;
    var rssdir = document.getElementById('rssdir').value;
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,dir) VALUES (?, ?, ?)', [rssurl, rsstitle, rssdir],
            function (tx, results) {
                alert('添加成功!');
            },
            function (tx, error) {
                alert('添加失败!' + error.message)
            });
    });
}
//删除
document.getElementById('del').onclick = function () {
    var rssurl = document.getElementById('rssurl').value;
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM Rss WHERE rss = ?;', [rssurl],
            function (tx, results) {
                tx.executeSql('DELETE FROM Feeds WHERE rssUrl = ?;', [rssurl], null, null);
                alert('删除成功!');
            },
            function (tx, error) {
                alert('删除失败!' + error.message);
            });
    });
}

//清空feeds缓存
document.getElementById('clearfeeds').onclick = function () {
    db.transaction(function (tx) {
        tx.executeSql('delete from feeds',[],alert('清空feeds缓存成功!'),null); //清空数据
    });
}

//设置请求时间间隔
document.getElementById('reqtimebtn').onclick = function (){
    var reqtime = document.getElementById('reqtime').value;
    localStorage.reqtime = Number(reqtime);
    alert('设置成功!');
}

//设置请求时间间隔
document.getElementById('onceNumsbtn').onclick = function (){
    var onceNums = document.getElementById('onceNums').value;
    localStorage.onceNums = Number(onceNums);
    alert('设置成功!');
}


//页面加载时读取rss列表
function loadRss() {
    document.getElementById('reqtime').value = localStorage.reqtime?localStorage.reqtime:5;
    document.getElementById('onceNums').value = localStorage.onceNums?localStorage.onceNums:5;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss', [],
            function (tx, results) {
                for (i = 0; i < results.rows.length; i++) {
                    var rss = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    var dir = results.rows.item(i).dir;
                    document.getElementById('rss').innerHTML += '<div>' + dir + '\t' + title + '\t' + rss + '</div>';
                }
            },
            null
        );
    });
}

loadRss();