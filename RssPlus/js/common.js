
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);


//更换图标下的bar
function changeicobar(){
    db.transaction(function (tx) {
        tx.executeSql('SELECT COUNT(*) as nums FROM Feeds WHERE isread IS NULL',[],function (tx, results) {
                var nums = results.rows.item(0).nums;
                console.log("nums",nums);
                if(nums > 0 ){
                    chrome.browserAction.setBadgeBackgroundColor({color: [190, 190, 190, 128]});//rgb 灰色 50%透明
                    if(nums >= 100){
                        chrome.browserAction.setBadgeText({text: '99+'});
                    }else{
                        chrome.browserAction.setBadgeText({text: nums.toString()});
                    }
                }else{
                    chrome.browserAction.setBadgeBackgroundColor({color: [190, 190, 190, 256]});//rgb 灰色 100%透明
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
        tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        tx.executeSql('update Rss set unreadNums = unreadNums - 1 where rss = (select rssUrl from Feeds where url = ?)', [itemUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        changeicobar();
        //location.reload();//执行完毕后刷新
    });
}
//标记为已读
function makeRssItemsRead(rssUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where rssUrl = ?', [rssUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        tx.executeSql('update Rss set unreadNums = 0 where rss = ?', [rssUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        changeicobar();
        //location.reload();
    });
}

//储存items到websql
function items2websql(items){
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
function removeCDATA(fstr){
    return fstr.replace("<![CDATA[", "").replace("]]>", "")
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

            var pubdate = list[i].getElementsByTagName('pubDate')[0].innerHTML;
            var pubtimestamp = Math.round(new Date(pubdate).getTime() / 1000);

            var itemurl = list[i].getElementsByTagName('link')[0].innerHTML;
            //必须加https://，否则默认前缀为chrome-extension://dhjefkpchmfdghfipcdmaodhigmfbpef

            //console.log("item",i,titlefix);
            //executeSql第一条执行完毕之前for循环已经结束了，故只插入了一条记录，需先保存起来在一次插入
            items.push([itemurl, titlefix, pubtimestamp, rssurl]);
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
function testcallback(rssxml, rssurl){
    console.log("testcallback",rssxml); 
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

//页面加载时读取rss源列表
function loadRssfromWebsql() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss', [],
            function (tx, results) {
                var len = results.rows.length;
                var dirstr = "";//'武汉 房产 新闻'
                var nodirstr="";

                document.getElementById('rss').innerHTML  += 
                    '<div class="list-group-item list-group-item-info btn" >'+
                    '<a id="update" class="btn">立刻更新</a>'+
                    '<a id="star" class="btn">查看收藏</a>'+
                    '<a id="addrss" class="btn" href="./../options.html">管理RSS源</a></div><div>';

                for (i = 0; i < len; i++) {
                    var rss = results.rows.item(i).rss;
                    var title = results.rows.item(i).title;
                    var unreadNums = results.rows.item(i).unreadNums;
                    var dir = results.rows.item(i).dir;
                
                    //rsslist
                    if (unreadNums && unreadNums != 0) {
                        var rss1 = '<a class="list-group-item list-group-item-warning btn" style="text-align: left;" data-rss="' + rss + '" data-title="' + title + '"><span class="badge pull-right" title="将该RSS源标记为已读">' + unreadNums + '</span>' + title + '</a>';
                    } else {
                        var rss1 = '<a class="list-group-item list-group-item-warning btn" style="text-align: left;" data-rss="' + rss + '" data-title="' + title + '">' + title + '</a>';
                    }
                    
                    if(dir){
                        //指定了目录则先判断目录是否已添加
                        if(dirstr.indexOf(dir) >=0){
                            //已添加则直接加入该目录
                            var obj =document.getElementById(dir);
                            obj.innerHTML += rss1;
                            //更新目录bar
                            var a = document.getElementById(dir+'nums') ;
                            if(a){
                                a.innerHTML = Number(a.innerHTML) + unreadNums;
                            }else{
                                document.getElementById(dir+'head').innerHTML += ('<span id="'+dir+'nums" class="badge pull-right" title="将目录标记为已读">' + unreadNums + '</span>');
                            }
                            
                        }else{
                            dirstr += dir;
                            //未添加则先加目录在添加
                            if (unreadNums && unreadNums != 0) {
                                document.getElementById('rss').innerHTML  +='<div id="'+dir+'head" class="list-group-item list-group-item-success" data-toggle="collapse"  href="#'+dir+'"><span id="'+dir+'nums" class="badge pull-right" title="将目录标记为已读">' + unreadNums + '</span>' +dir+'</div>';
                            } else {
                                document.getElementById('rss').innerHTML  +='<div id="'+dir+'head" class="list-group-item list-group-item-success" data-toggle="collapse"  href="#'+dir+'">' +dir+'</div>';
                            }
                            
                            var obj = document.createElement('div');
                            obj.id = dir;
                            obj.classList="panel-collapse collapse in;";
                            obj.innerHTML = rss1;
                            document.getElementById('rss').innerHTML  += obj.outerHTML;
                        }
                    }
                    else{
                        //没指定目录则移到最后再添加
                        nodirstr += rss1;
                    }
                }
                document.getElementById('rss').innerHTML  += (nodirstr + "</div>");
                localStorage.rssstr = document.getElementById('rss').innerHTML;
            },null);
    });
}


//点击rss列表时加载标题及条目
function sethead(rssTitle){
    localStorage.headstr = '<div><a id="head" class="list-group-item list-group-item-info btn" style="text-align: center;">' + rssTitle + '</a>';
}
function loadItemsfromWebsql(rssUrl,index,nums) {
    //console.log("loadItemsfromWebsql=====",rssUrl,index);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Feeds where rssUrl = ? ORDER BY pubtimestamp DESC LIMIT ?,?', [rssUrl,index,nums], function (tx, results) {
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
                localStorage.footstr = '<a id="loadmore" class="list-group-item list-group-item-warning btn" style="text-align: center;" data-rssUrl="'+ rssUrl +'" data-index="'+index+'">加载更多</a></div>';
            } else {
                localStorage.footstr = '<a id="nothing" class="list-group-item list-group-item-warning btn" style="text-align: center;" title="点击返回主界面" >暂无更新！</a></div>';              
            }
            //console.log(localStorage.itemstr);
            document.getElementById('item').innerHTML = localStorage.headstr+localStorage.itemstr+localStorage.footstr;
        }, 
        function (tx, error) {
            console.log('失败!' , error.message)
        });
    });
}


function init(){
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