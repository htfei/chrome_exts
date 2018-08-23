document.write("<script language=javascript src='js/common.js'></script>");

var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

//添加
document.getElementById('save').onclick = function () {
    var rssurl = document.getElementById('rssurl').value;
    var rsstitle = document.getElementById('rsstitle').value;
    var rssdir = document.getElementById('rssdir').value;
    var rssico = document.getElementById('rssico').value;
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,ico,dir) VALUES (?, ?, ?, ?)', [rssurl, rsstitle,rssico, rssdir],
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

//设置是否加载items描述信息
document.getElementById('loadDescbtn').onclick = function (){
    var loadDesc = document.getElementById('loadDesc').value;
    localStorage.loadDesc = Number(loadDesc);
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
                '<caption>管理订阅的RSS源(开发中)</caption><thead><tr><th>管理</th><th>目录</th><th>名称</th><th>RSS链接</th><th>RSS图标</th></tr></thead><tbody>';
                for (i = 0; i < results.rows.length; i++) {
                    var rss = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    var dir = results.rows.item(i).dir;
                    var ico = results.rows.item(i).ico;
                    divstr += '<tr><td><input type="button" class="up_btn" value="编辑" /></td><td>' + dir + '</td><td>' + title + '</td><td>' + rss + '</td><td>' + ico + '</td></tr>';
                }
                divstr += '</tbody></table>';
                document.getElementById('rss').innerHTML = divstr ;
                //更新某一项键值对
                $('.up_btn').click(function(){
                //此处不能使用 document.getElementsByClassName('up_btn').onclick = function(){ ，因为得到的是数组，无法直接调用onclick,需要循环绑定
                //该函数放到loadRss()外面无效，猜测executeSql查询数据库处理延后，导致该函数先执行时'.up_btn'还未生成，绑定失败，但是无提示信息？
                    var obj = this.parentNode.parentNode;//input.td.tr
                    document.getElementById('rssurl').value = obj.childNodes[3].innerHTML;
                    document.getElementById('rsstitle').value = obj.childNodes[2].innerHTML;
                    document.getElementById('rssdir').value = obj.childNodes[1].innerHTML;
                    document.getElementById('rssico').value = obj.childNodes[4].innerHTML;
                    console.log(obj);
                });
            },
            null
        );
    });
}

loadRss();

