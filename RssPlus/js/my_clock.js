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
    var div = '<div>';
    for (i = 0; i < list.length; i++) {
        var t = list[i].getElementsByTagName('title')[0].innerHTML;
        var p = list[i].getElementsByTagName('pubDate')[0].innerHTML;
        var l = list[i].getElementsByTagName('link')[0].innerHTML;
        console.log(t,p,l);
        div += '<a href="' + l + '">' + t + '</a><br/>';
        //a.click(() => {chrome.tabs.create({url: l });});
    }
    div += '</div>';
    document.getElementById('item').innerHTML = div;
}

var rss = localStorage.rss;
rss = rss ? rss : 'http://feed43.com/2770086871034514.xml';
var url = rss;
httpRequest(url, showItem);

//绑定点击事件
$('.del_btn').click(function(){
    var obj = this.parentNode.parentNode;//input.td.tr
    var key = obj.childNodes[1].childNodes[0].value ;//tr.td1.input.value
    localStorage.removeItem(key);
    location.reload();
});
