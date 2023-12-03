var auto = true;
var gi = 0;
var urlobj = [
    //1.spurl 就是视频源，可直接访问，自动跳转到视频链接并播放
    //2.requrl 是需要请求之后得到视频源的src, 不可自动播放  (已知问题：requrl部分由于存在CROS跨域问题，导致无法查看，电脑端可安装插件解决)
    //404{ name: "六音", spurl: "http://tools.sixyin.com/rewu/video.php" },
    //404{ name: "没角度", spurl: "http://youzan6.meijiaodu.com/shiping/video.php" },   //mp4 质量高，速度快
    { name: "404ol", spurl: "https://img.404ol.com/mm/Random.php" },              //
    { name: "你好污啊", spurl: "https://www.nihaowua.com/v/video.php" },             //mp4 质量高，速度快
    { name: "男人之家", spurl: "http://v.nrzj.vip/video.php" },                      //感觉无更新，视频少，质量一般，速度快
    //{ name: "tiktok", spurl: "https://tvv.tw/xjj/tiktok/video.php" },

    { name: "精品", requrl: "https://tvv.tw/xjj/get/get0.php" },
    //{name:"tiktok", requrl:"https://tvv.tw/xjj/get/get1.php"},    //https://jiejie.de/xjj/get/get1.php          
    { name: "小姐姐1-12", requrl: "https://tvv.tw/xjj/get/get"+ parseInt(Math.random()*13) +".php" }, 
];

$(document).ready(function () {

    //请求RSS源
    function httpRequest(requrl, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", requrl, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback(xhr, requrl); //此处返回Text对象
            }
        }
        xhr.send();
    }

    function testcallback(xhr, requrl) {
        var rsptext = xhr.responseText;
        var fixurl = rsptext.startsWith("//") ? ("http:" + rsptext) :      // "https://tvv.tw/xjj/get/get0.php" 存在"//"开头的url
            rsptext.startsWith("https:http") ? rsptext.slice(6) :          // "https://tvv.tw/xjj/get/get4.php" 存在这种错误的url
                rsptext.startsWith("http:http") ? rsptext.slice(5) :
                    rsptext.startsWith("https://") ? rsptext :
                        rsptext.startsWith("http://") ? rsptext :
                            "http://" + rsptext;
        console.log("req=", requrl, "\nrspfix=", fixurl);
        player.src = fixurl;
        player.play();
    }

    function randomm() {
        if (urlobj[gi].spurl) {
            player.src = urlobj[gi].spurl + "?_t=" + Math.random();
            player.play();
        }
        else if (urlobj[gi].requrl) {
            httpRequest(urlobj[gi].requrl + "?_t=" + Math.random(), testcallback);
        }
    }

    $('#player').error(function () {
        randomm();
        //setInterval("randomm()", 3000);
    })

    document.getElementById("player").onended = function () {
        if (auto) randomm();
    }

    $('#next').click(function () {
        randomm();
    })

    $('#switch').click(function () {
        auto = !auto;
        this.innerText = '连播: ' + (auto ? 'on' : 'off');
    })

    $('#yuan').click(function () {
        gi = ++gi % urlobj.length;
        this.innerText = "源:" + urlobj[gi].name;
        //requrl = urlobj[gi].requrl;
        //console.log(url);
    })
    
})