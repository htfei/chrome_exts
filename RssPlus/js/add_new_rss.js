
 var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

var feeds =  JSON.parse(localStorage.feeds_urls);
console.log(feeds);
if (feeds.length > 0)
{
    var html = "<ul>";
    for (i = 0; i < feeds.length; i++)
    {
        html += "<li>";
        html +=   '<a href="'+feeds[i].url+'" title="'+feeds[i].type+'" target="_blank">'+feeds[i].title+'</a><input type="text" /><input type="button" class="add_btn" value="添加" />';
        html += "</li>";
    }
    html += "</ul>";

    document.getElementById('feeds').innerHTML = html;

    //更新某一项键值对
    $('.add_btn').click(function(){
        var obj = this.parentNode;//input.li      
        console.log(obj);
        var rssurl = obj.childNodes[0].href;
        var rsstitle = obj.childNodes[0].innerText;
        var rssdir = obj.childNodes[1].value;
        db.transaction(function (tx) {
            tx.executeSql('INSERT OR REPLACE INTO Rss (rss,title,dir) VALUES (?, ?, ?)', [rssurl, rsstitle, rssdir],
                function (tx, results) {
                    alert('添加成功!');
                },
                function (tx, error) {
                    alert('添加失败!' + error.message)
                });
        });

        
    });

}

