var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

var now_feed_lists = localStorage.now_feed_lists;
if (now_feed_lists != 0) {

    var feed_lists = JSON.parse(localStorage.getItem(now_feed_lists));
    console.log(feed_lists);
    feeds = feed_lists.ctx ;

    if (feeds.length > 0) {
        var html = "<ul>";
        for (i = 0; i < feeds.length; i++) {
            html += "<li>";
            html += '<img src ="'+ feed_lists.ico +'" height="16" width="16"/><a href="' + feeds[i].url + '" title="' + feeds[i].type + '" target="_blank">' + feeds[i].title + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="add_btn" value="添加" />';
            html += "</li>";
        }
        html += "</ul>";

        document.getElementById('feeds').innerHTML = html;

        //更新某一项键值对
        $('.add_btn').click(function () {
            var obj = this.parentNode; //input.li      
            console.log(obj);
            var rssico = "";//obj.childNodes[0].src;//TODO:此处有bug，获取的值为‘chrome-extension://dhjefkpchmfdghfipcdmaodhigmfbpef/add_new_rss.html’
            var rssurl = obj.childNodes[1].href;
            var rsstitle = obj.childNodes[1].innerText;
            var rssdir = "";
            db.transaction(function (tx) {
                tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,ico,dir) VALUES (?, ?, ?, ?)', [rssurl, rsstitle,rssico, rssdir],
                    function (tx, results) {
                        alert('添加成功!');
                    },
                    function (tx, error) {
                        alert('添加失败!' + error.message)
                    });
            });
        });
    }
}