//2.0
javascript: void ((function () {
    var element = document.createElement('script');
    element.id = 'outfox_seed_js';
    element.charset = 'utf-8';
    element.setAttribute('src', 'https://fanyi.youdao.com/web2/seed.js?' + Date.parse(new Date()));
    document.body.appendChild(element);
})())

//3.0 从2.0中提取修改，可翻译https域网址，本地文件
javascript: (function () {
    var j = [];
    var h = "https://fanyi.youdao.com/web2";
    var e = new Image();
    e.src = "https://fanyi.youdao.com/web2/rl.do?action=init&relatedURL=" + encodeURIComponent(document.location.href) + "&ts=" + (new Date()).getTime();
    j[0] = e;
    if (!window.OUTFOX_JavascriptTranslatoR) {
        var d = document.createElement("script");
        d.setAttribute("src", h + "/scripts/all-packed-utf-8.js?572877&" + Date.parse(new Date()));
        d.setAttribute("type", "text/javascript");
        d.setAttribute("charset", "utf-8");
        document.body.appendChild(d)
    } else {
        var k = "https://fanyi.youdao.com";
        var a = "/web2/conn.html";
        var l = h + "/index.do";
        var g = k + "/jtr";
        var c = h + "/rl.do";
        var f = h + "/styles/all-packed.css";
        J.loadCSS(document, f);
        window.OUTFOX_JavascriptTranslatoR = new J.TR.UI(document.body, {
            domain: k,
            update: false,
            updateTipMsg: "增加关闭按钮",
            updateDate: "2011-3-15",
            cssURL: f,
            tipsURL: l,
            transURL: g,
            logURL: c,
            connFilePath: a,
            reqSize: 20
        })
    }
})();
