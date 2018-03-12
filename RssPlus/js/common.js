//标记为已读
function makeItemRead(itemUrl) {
    db.transaction(function (tx) {
        tx.executeSql('update Feeds set isread = 1 where url = ?', [itemUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        tx.executeSql('update Rss set unreadNums = unreadNums - 1 where rss = (select rssUrl from Feeds where url = ?)', [itemUrl], null, function (tx, error) {
            console.log('失败!' , error.message)
        });
        location.reload();//执行完毕后刷新
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
        location.reload();
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
var xml;
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

function testcallback(rssxml, rssurl){
    console.log("testcallback",rssxml); 
    xml = rssxml;
}
//httpRequest("http://dig.chouti.com/feed.xml",testcallback);

//读取rss列表并依次执行请求
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
    });
    //console.log("请求rss源数据完毕！5mim后再次执行！")
}