javascript: (function () {
    'use strict';

    function loadStyle(url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }
    loadStyle('http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css');

    document.head.appendChild(document.createElement('script')).src = 'http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js';
    document.head.appendChild(document.createElement('script')).src = 'http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js';

    var mydiv = document.getElementById("mydiv");
    var my_selector = "";
    if (mydiv !== null) {
        mydiv.parentNode.removeChild(mydiv);
    } else {
        var show_node = null;

        /* 新添加的操作主界面div */
        var div = document.createElement('div');
        div.id = 'mydiv';
        div.style.cssText = "width:300px; height:300px; position:fixed; top:20%; right:40px";
        div.innerHTML = '<div class="btn-group">\
            <button type="button" class="btn btn-default">按钮 1</button>\
            <button type="button" class="btn btn-default">按钮 2</button>\
            <button type="button" class="btn btn-default">按钮 3</button>\
            </div>';
        document.body.appendChild(div);
    }
})();