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
                var divstr = '<table class="table table-striped table-hover table-condensed">' +
                '<caption>管理订阅的RSS源(开发中)</caption><thead><tr><th>名称</th><th>目录</th><th>RSS链接</th></tr></thead><tbody>';
                for (i = 0; i < results.rows.length; i++) {
                    var rss = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    var dir = results.rows.item(i).dir;
                    divstr += '<tr><td>' + dir + '</td><td>' + title + '</td><td>' + rss + '</td><td><input type="button" class="edit" value="编辑" /></td></tr>';
                }
                divstr += '</tbody></table>';
                document.getElementById('rss').innerHTML = divstr ;
            },
            null
        );
    });
}

loadRss();

//更新某一项键值对
$('.edit').click(function(){
//document.getElementsByClassName('edit').onclick = function(){
    var obj = this.parentNode.parentNode;//input.td.tr
    document.getElementById('rssurl').value = obj.childNodes[2].value;
    document.getElementById('rsstitle').value = obj.childNodes[0].value;
    document.getElementById('rssdir').value = obj.childNodes[1].value;
    console.log(obj);
//}
});