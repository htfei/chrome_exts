
document.write("<script language=javascript src='js/common.js'></script>");

var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

//保存
document.getElementById('save').onclick = function(){
    var rssurl = document.getElementById('rssurl').value;
    var rsstitle = document.getElementById('rsstitle').value;
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR IGNORE INTO Rss (rss,title) VALUES (?, ?)', [rssurl, rsstitle]);
        alert('保存成功。');
    });
}