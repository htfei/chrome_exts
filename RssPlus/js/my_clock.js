//document.write("<script language=javascript src='js/common.js'></script>");
document.head.appendChild(document.createElement('script')).src = '/js/common.js';

//页面加载时读取rss源列表
function loadRssfromWebsql() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss', [],
            function (tx, results) {
                var len = results.rows.length;
                var dirstr = ""; //'武汉 房产 新闻'
                var nodirstr = "";

                document.getElementById('rss').innerHTML =
                    '<div class="list-group-item list-group-item-info btn" >' +
                    '<a id="addrss" class="btn" href="./../options.html">设置</a>' +
                    '<a id="listh" class="btn">列表</a>' +
                    '<a id="star" class="btn">收藏</a>' +
                    '<a id="update" class="btn">刷新</a></div><div>';

                for (i = 0; i < len; i++) {
                    var rss = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    var unreadNums = results.rows.item(i).unreadNums;
                    var dir = results.rows.item(i).dir;

                    //rsslist
                    if (unreadNums && unreadNums > 0) {
                        var rss1 = '<a class="list-group-item list-group-item-warning btn" style="text-align: left;" data-rss="' + rss + '" data-title="' + title + '"><span class="badge pull-right" title="将该RSS源标记为已读">' + unreadNums + '</span>' + title + '</a>';
                    } else {
                        var rss1 = '<a class="list-group-item list-group-item-warning btn" style="text-align: left;" data-rss="' + rss + '" data-title="' + title + '">' + title + '</a>';
                    }

                    if (dir) {
                        //指定了目录则先判断目录是否已添加
                        if (dirstr.indexOf(dir) >= 0) {
                            //已添加则直接加入该目录
                            var obj = document.getElementById(dir);
                            obj.innerHTML += rss1;
                            //更新目录bar
                            var a = document.getElementById(dir + 'nums');
                            if (a) {
                                a.innerHTML = Number(a.innerHTML) + unreadNums;
                            } else {
                                document.getElementById(dir + 'head').innerHTML += ('<span id="' + dir + 'nums" class="badge pull-right btn" title="将目录标记为已读">' + unreadNums + '</span>');
                            }

                        } else {
                            dirstr += dir;
                            //未添加则先加目录在添加
                            if (unreadNums && unreadNums > 0) {
                                document.getElementById('rss').innerHTML += '<div id="' + dir + 'head" class="list-group-item list-group-item-success" data-toggle="collapse"  href="#' + dir + '"><img src="/images/folder-icon.png" width="16" height="16"/>  ' + dir + '<span id="' + dir + 'nums" class="badge pull-right btn" title="将目录标记为已读">' + unreadNums + '</span></div>';
                            } else {
                                document.getElementById('rss').innerHTML += '<div id="' + dir + 'head" class="list-group-item list-group-item-success" data-toggle="collapse"  href="#' + dir + '"><img src="/images/folder-icon.png" width="16" height="16"/>  '+ dir + '</div>';
                            }

                            var obj = document.createElement('div');
                            obj.id = dir;
                            obj.classList = "panel-collapse collapse in;";
                            obj.innerHTML = rss1;
                            document.getElementById('rss').innerHTML += obj.outerHTML;
                        }
                    } else {
                        //没指定目录则移到最后再添加
                        nodirstr += rss1;
                    }
                }
                document.getElementById('rss').innerHTML += (nodirstr + "</div>");
                localStorage.rssstr = document.getElementById('rss').innerHTML;
            }, null);
    });
}

//点击rss列表时加载标题及条目
function sethead(rssTitle) {
    localStorage.headstr = '<div><a id="head" class="list-group-item list-group-item-info btn" style="text-align: center;">' + rssTitle + '</a>';
}

function loadItemsfromWebsql(rssUrl, index, nums) {
    //console.log("loadItemsfromWebsql=====",rssUrl,index);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Feeds where rssUrl = ? ORDER BY pubtimestamp DESC LIMIT ?,?', [rssUrl, index, nums], function (tx, results) {
                var len = results.rows.length;
                //console.log(len);           
                if (len) {
                    for (i = 0; i < len; i++) {
                        var itemurl = results.rows.item(i).url;
                        var title = results.rows.item(i).title;
                        var isread = results.rows.item(i).isread;
                        if (isread == 1) {
                            localStorage.itemstr += '<a class="list-group-item list-group-item-warning" href="' + itemurl + '" >' + title + '</a>';
                        } else {
                            localStorage.itemstr += '<a class="list-group-item list-group-item-warning" href="' + itemurl + '" ><span class="badge pull-right" title="标记为已读">新</span>' + title + '</a>';
                        }
                    }
                    localStorage.footstr = '<a id="loadmore" class="list-group-item list-group-item-warning btn" style="text-align: center;" data-rssUrl="' + rssUrl + '" data-index="' + index + '">加载更多</a></div>';
                } else {
                    localStorage.footstr = '<a id="nothing" class="list-group-item list-group-item-warning btn" style="text-align: center;" title="点击返回主界面" >暂无更新！</a></div>';
                }
                //console.log(localStorage.itemstr);
                document.getElementById('item').innerHTML = localStorage.headstr + localStorage.itemstr + localStorage.footstr;
            },
            function (tx, error) {
                console.log('失败!', error.message)
            });
    });
}

//更换图标下的bar
function changeicobar() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT COUNT(*) as nums FROM Feeds WHERE isread IS NULL', [], function (tx, results) {
                var nums = results.rows.item(0).nums;
                console.log("unreadnums", nums);
                if (nums > 0) {
                    chrome.browserAction.setBadgeBackgroundColor({
                        color: [190, 190, 190, 128]
                    }); //rgb 灰色 50%透明
                    if (nums >= 100) {
                        chrome.browserAction.setBadgeText({
                            text: '99+'
                        });
                    } else {
                        chrome.browserAction.setBadgeText({
                            text: nums.toString()
                        });
                    }
                } else {
                    chrome.browserAction.setBadgeBackgroundColor({
                        color: [190, 190, 190, 256]
                    }); //rgb 灰色 100%透明
                }
            },
            function (tx, error) {
                console.log('更改badge失败: ', error.message)
            });
    });

}

//标记为已读
function makeItemRead(itemUrl) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT isread FROM Feeds WHERE url = ?', [itemUrl], function (tx, results) {
            var isread = results.rows.item(0).isread;
            if (isread == null) {
                tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, function (tx, error) {
                    console.log('失败!', error.message)
                });
                //插入数据后更新未读条数
                tx.executeSql('UPDATE Rss SET unreadNums = ( SELECT COUNT(*) FROM Feeds WHERE isread IS NULL AND Feeds.rssUrl = Rss.rss)', []);
    
                changeicobar();
            }
        }, null);
    });
}
//标记为RSS已读
function makeRssRead(rssUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where rssUrl = ?', [rssUrl], null, function (tx, error) {
            console.log('失败!', error.message)
        });
        tx.executeSql('update Rss set unreadNums = 0 where rss = ?', [rssUrl], null, function (tx, error) {
            console.log('失败!', error.message)
        });
        changeicobar();
    });
}
//标记目录为已读
function makeDirRead(dirstr) {
    console.log("标记目录为已读",dirstr);
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 WHERE Feeds.rssUrl = (SELECT rss FROM Rss WHERE dir = ?)', [dirstr], null, function (tx, error) {
            console.log('失败!', error.message)
        });
        //插入数据后更新未读条数//2018.03.19 sql语句待优化：将指定目录类下的所有rss的unreadnums设为0.而不是更新所有
        tx.executeSql('UPDATE Rss SET unreadNums = ( SELECT COUNT(*) FROM Feeds WHERE isread IS NULL AND Feeds.rssUrl = Rss.rss)', []);
        changeicobar();
    });
}

function loadPopup() {
    //上次最后的访问页面
    if (localStorage.lastBodystr && localStorage.lastBodystr.length >= 1000) {
        document.getElementById('body').innerHTML = localStorage.lastBodystr;
    } else {
        loadRssfromWebsql();
    }
}

var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
loadPopup();
/*
function loadScript(url,callback) {
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
    callback();
}
loadScript('/js/common.js',loadPopup);
*/

//一次加载的数量
var onceNums = localStorage.onceNums ? localStorage.onceNums : 10;

//绑定点击事件
window.onclick = function (e) {

    //离开之间保存页面，下次直接加载该页面
    this.localStorage.lastBodystr = document.getElementById('body').innerHTML;

    //console.log(e.target);
    if (rssUrl = e.target.getAttribute('data-rss')) {
        //加载某一个rss的内容
        var rssTitle = e.target.getAttribute('data-title');
        sethead(rssTitle);
        loadItemsfromWebsql(rssUrl, 0, onceNums); //0到10条
        //隐藏rss列表
        document.getElementById('rss').innerHTML = "";
    }
    if (e.target.id == 'loadmore') {
        //加载某一个rss的内容
        var rssUrl = e.target.getAttribute('data-rssUrl');
        var index = e.target.getAttribute('data-index');
        index = Number(index) + onceNums;
        loadItemsfromWebsql(rssUrl, index, onceNums); //10到20条 ... 
    }
    if (e.target.id == "update") {
        //rss_request();
        localStorage.lastBodystr ="";
        this.console.log("刷新页面, 重新生成popup页面...");
        loadRssfromWebsql();
        //this.setTimeout("location.reload();",3000); //3s后刷新  
    }
    if (e.target.href) {
        //将对应item标记为已读
        makeItemRead(e.target.href);
        e.target.removeChild(e.target.firstChild);
        chrome.tabs.create({
            url: e.target.href
        });
    }
    if (e.target.id == 'head' || (e.target.parentNode && e.target.parentNode.id == 'head') || e.target.id == 'nothing') {
        //隐藏items列表,加载rss列表
        //this.console.log(e.target);        
        localStorage.headstr = "";
        localStorage.itemstr = "";
        localStorage.footstr = "";
        document.getElementById('item').innerHTML = "";
        loadRssfromWebsql();
        //document.getElementById('rss').innerHTML = localStorage.rssstr;
    }
    //将对应item标记为已读
    if (e.target.getAttribute('title') == '标记为已读') {
        makeItemRead(e.target.parentNode.href);
        e.target.parentNode.removeChild(e.target);
    }
    if (e.target.getAttribute('title') == '将该RSS源标记为已读') {
        makeRssRead(e.target.parentNode.getAttribute('data-rss'));
        e.target.parentNode.removeChild(e.target);
    }
    if (e.target.getAttribute('title') == '将目录标记为已读') {
        makeDirRead(e.target.id.replace("nums", ""));
        e.target.parentNode.removeChild(e.target);
    } else {
        //this.console.log(e.target);
    }
}