
function my_clock(el) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = m >= 10 ? m : ('0' + m);
    s = s >= 10 ? s : ('0' + s);
    el.innerHTML = h + ":" + m + ":" + s;
    setTimeout(function () { my_clock(el) }, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);

function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseXML);//此处返回xml对象
        }
    }
    xhr.send();
}

function showItem(rssxml) {
    //console.log(rssxml);
    var list = rssxml.getElementsByTagName('item');
    console.log(list[0]);

    var div = "<div>";
    for (i = 0; i < list.length; i++) {
        var title = list[i].getElementsByTagName('title')[0].innerHTML;
        //var pub = list[i].getElementsByTagName('pubDate')[0].innerHTML;
        var link = list[i].getElementsByTagName('link')[0].innerHTML;
        //console.log(t,p,l);
        div += '<a class="list-group-item" href="'+ link +'" >'+ title +'</a>';
    }
    div +="</div>"

    document.getElementById('item').innerHTML = div;
}

var rss = localStorage.rss;
rss = rss ? rss : 'http://feed43.com/5123185481381181.xml';
var url = rss;
httpRequest(url, showItem);

//绑定点击事件
window.onclick = function(e){
    console.log(e.target);
    if(e.target.href){
        chrome.tabs.create({ url: e.target.href });
    }       
}
