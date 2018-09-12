document.write("<script language=javascript src='js/common.js'></script>");

var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

//添加
document.getElementById('save').onclick = function () {
    var rssurl = document.getElementById('rssurl').value;
    var rsstitle = document.getElementById('rsstitle').value;
    var rssdir = document.getElementById('rssdir').value;
    var rssico = document.getElementById('rssico').value;
    db.transaction(function (tx) {
        tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,ico,dir) VALUES (?, ?, ?, ?)', [rssurl, rsstitle, rssico, rssdir],
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
        tx.executeSql('delete from feeds', [], alert('清空feeds缓存成功!'), null); //清空数据
    });
}

//设置请求时间间隔
document.getElementById('reqtimebtn').onclick = function () {
    var reqtime = document.getElementById('reqtime').value;
    localStorage.reqtime = Number(reqtime);
    alert('设置成功!');
}

//设置请求时间间隔
document.getElementById('onceNumsbtn').onclick = function () {
    var onceNums = document.getElementById('onceNums').value;
    localStorage.onceNums = Number(onceNums);
    alert('设置成功!');
}

//设置是否加载items描述信息
document.getElementById('loadDescbtn').onclick = function () {
    var loadDesc = document.getElementById('loadDesc').value;
    localStorage.loadDesc = Number(loadDesc);
    alert('设置成功!');
}

//设置是否加载已读的items条目
document.getElementById('loadisReadbtn').onclick = function () {
    var loadisRead = document.getElementById('loadisRead').value;
    localStorage.loadisRead = Number(loadisRead);
    alert('设置成功!');
}

//目录重命名
document.getElementById('dirRenamebtn').onclick = function () {

    var dirOldname = document.getElementById('dirOldname').value;
    var dirNewname = document.getElementById('dirNewname').value;
    db.transaction(function (tx) {
        tx.executeSql('UPDATE Rss SET dir = ? WHERE dir = ?;', [dirNewname, dirOldname], alert('目录重命名成功!'), null);
    });
}



//页面加载时读取rss列表
function loadRss() {

    document.getElementById('reqtime').value = localStorage.reqtime ? localStorage.reqtime : 5;
    document.getElementById('onceNums').value = localStorage.onceNums ? localStorage.onceNums : 5;
    document.getElementById('loadDesc').value = localStorage.loadDesc ? localStorage.loadDesc : 1;
    document.getElementById('loadisRead').value = localStorage.loadisRead ? localStorage.loadisRead : 1;
    document.getElementById('loadDescimgmax').value = localStorage.loadDescimgmax ? localStorage.loadDescimgmax : 300;

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
                document.getElementById('rss').innerHTML = divstr;
                //更新某一项键值对
                $('.up_btn').click(function () {
                    //此处不能使用 document.getElementsByClassName('up_btn').onclick = function(){ ，因为得到的是数组，无法直接调用onclick,需要循环绑定
                    //该函数放到loadRss()外面无效，猜测executeSql查询数据库处理延后，导致该函数先执行时'.up_btn'还未生成，绑定失败，但是无提示信息？
                    var obj = this.parentNode.parentNode; //input.td.tr
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


//储存rss到websql
function rss2websql(rsslist) {
    console.log(rsslist);
    db.transaction(function (tx) {
        for (i = 0; i < rsslist.length; i++) {
            tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,ico,dir) VALUES (?, ?, ?, ?)', rsslist[i],
                null,
                function (tx, error) {
                    alert('导入opml失败! Error: ' + error.message)
                });
        }
        alert('导入成功！');
        location.reload();
    });
}

//导入表单文件到localStorage，并刷新页面
document.getElementById('loadfile').onchange = function jsReadFiles() {
    if (this.files.length) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            //console.log(this.result);
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(this.result, 'text/xml');
            //console.log(xmlDoc);

            var rssstr = xmlDoc.getElementsByTagName('outline');
            var rsslist = [];
            console.log(rssstr.length);
            for (i = 0; i < rssstr.length; i++) {
                if (rssstr[i].attributes['xmlUrl']) {
                    //todo:兼容性处理，若不存在以下某个属性，可以能导致导入失败;
                    //var text = rssstr[i].attributes['text'].value;
                    var title = rssstr[i].attributes['title'].value;
                    //var type = rssstr[i].attributes['type'].value;
                    var xmlUrl = rssstr[i].attributes['xmlUrl'].value;
                    //var htmlUrl = rssstr[i].attributes['htmlUrl'].value;
                    //var numPosts = rssstr[i].attributes['rssfr-numPosts'].value;
                    var favicon = rssstr[i].attributes['rssfr-favicon'];
                    favicon = favicon ? favicon.value : "";
                    //var useNotifications = rssstr[i].attributes['rssfr-useNotifications'].value;
                    //var updateInterval = rssstr[i].attributes['rssfr-updateInterval'].value;

                    var dir = rssstr[i].parentNode.attributes['title']
                    dir = dir ? dir.value : "";

                    rsslist.push([xmlUrl, title, favicon, dir]);

                }
                if (i == rssstr.length - 1) {
                    rss2websql(rsslist);
                }
            }
            //location.reload();
        };
        reader.readAsText(file);
    }
};

// 导出localStorage到文件
function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
}

//非法的 XML 字符必须被替换为实体引用（entity reference）
function str2EntityReference(str) {
    var entitystr = str.replace(/&amp/g, "&").replace(/&/g, "&amp;"); //防止 &amp; 被替换为 &amp;amp; 
    entitystr = entitystr.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;"); //不加g则只替换第一次匹配
    return entitystr;
}
document.getElementById('export_file').onclick = function () {
    var date = new Date().toLocaleString(); //.replace(/\//g,'-');//此处可以不处理,下载文件名中的/:等特殊字符会被自动替换为_
    var name = "RssPlus_" + date + ".opml";
    var opml_str = `<?xml version="1.0" encoding="UTF-8"?>
    <opml version="1.0">
    
    <head>
    <title> Powered by RssPlus , Author: why2fly </title>
    </head>

    <body>\n`;

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss ORDER BY dir desc', [],
            function (tx, results) {
                var dirstr = "";
                var flag = 1;
                var nodir_flag = 1;

                for (i = 0; i < results.rows.length; i++) {

                    var text = str2EntityReference(results.rows.item(i).title);
                    var title = str2EntityReference(results.rows.item(i).title);
                    var xmlUrl = str2EntityReference(results.rows.item(i).rss);
                    var htmlUrl = str2EntityReference(results.rows.item(i).rss);
                    var ico = str2EntityReference(results.rows.item(i).ico);
                    var dir = str2EntityReference(results.rows.item(i).dir);

                    if (dir) { //有分组
                        if (dirstr.indexOf(dir) >= 0) { //分组已存在

                            opml_str += `            <outline text="` +
                                text + `" title="` +
                                title + `" type="rss" xmlUrl="` +
                                xmlUrl + `" htmlUrl="` +
                                htmlUrl + `" rssfr-numPosts="30" rssfr-favicon="` +
                                ico + `" rssfr-useNotifications="1" rssfr-updateInterval="600000"/>\n`;

                        } else { //分组还未添加

                            dirstr += dir;

                            if (flag) { //若为第一次添加
                                flag = 0;
                                opml_str += `        <outline title="` + dir + `" text="` + dir + `">\n            <outline text="` +
                                    text + `" title="` +
                                    title + `" type="rss" xmlUrl="` +
                                    xmlUrl + `" htmlUrl="` +
                                    htmlUrl + `" rssfr-numPosts="30" rssfr-favicon="` +
                                    ico + `" rssfr-useNotifications="1" rssfr-updateInterval="600000"/>\n`;
                            } else { //若为第n次添加,为上一分组添加关闭节点
                                opml_str += `        </outline>\n        <outline title="` + dir + `" text="` + dir + `">\n            <outline text="` +
                                    text + `" title="` +
                                    title + `" type="rss" xmlUrl="` +
                                    xmlUrl + `" htmlUrl="` +
                                    htmlUrl + `" rssfr-numPosts="30" rssfr-favicon="` +
                                    ico + `" rssfr-useNotifications="1" rssfr-updateInterval="600000"/>\n`;
                            }
                        }
                    } else { //没有分组，直接添加
                        if (nodir_flag) {
                            nodir_flag = 0;
                            opml_str += `        </outline>\n        <outline text="` +
                                text + `" title="` +
                                title + `" type="rss" xmlUrl="` +
                                xmlUrl + `" htmlUrl="` +
                                htmlUrl + `" rssfr-numPosts="30" rssfr-favicon="` +
                                ico + `" rssfr-useNotifications="1" rssfr-updateInterval="600000"/>\n`;
                        } else {
                            opml_str += `        <outline text="` +
                                text + `" title="` +
                                title + `" type="rss" xmlUrl="` +
                                xmlUrl + `" htmlUrl="` +
                                htmlUrl + `" rssfr-numPosts="30" rssfr-favicon="` +
                                ico + `" rssfr-useNotifications="1" rssfr-updateInterval="600000"/>\n`;
                        }
                    }
                }

                if (nodir_flag) {
                    opml_str += `        </outline>\n    </body>\n</opml>`;
                } else {
                    opml_str += `    </body>\n</opml>`;
                }

                //导出 //不能放在外面，否则数据还未读取完毕就先执行导出了
                console.log(opml_str);
                export_raw(name, opml_str);
            },
            null
        );
    });



}