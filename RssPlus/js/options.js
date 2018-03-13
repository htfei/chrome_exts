
document.write("<script language=javascript src='js/common.js'></script>");

var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

//添加
document.getElementById('save').onclick = function(){
    var rssurl = document.getElementById('rssurl').value;
    var rsstitle = document.getElementById('rsstitle').value;
    var rssdir = document.getElementById('rssdir').value;
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,dir) VALUES (?, ?, ?)', [rssurl, rsstitle,rssdir],
        function (tx, results) {
            alert('添加成功!');
        }, 
        function (tx, error) {
            alert('添加失败!' + error.message)
        });        
    });
}
//删除
document.getElementById('del').onclick = function(){
    var rssurl = document.getElementById('rssurl').value;
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM Rss WHERE rss = ?;', [rssurl],
        function (tx, results) {          
            tx.executeSql('DELETE FROM Feeds WHERE rssUrl = ?;', [rssurl],null,null);
            alert('删除成功!');
        }, 
        function (tx, error) {
            alert('删除失败!'+ error.message);
        });        
    });
}