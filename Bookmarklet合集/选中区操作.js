// ==UserScript==
// @name         选中区操作
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  指定区域的指定操作!
// @author       Terry
// @match        *://*/*
// @grant        none
// @require       http://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

(function () {
    'use strict';

    //公共函数
    function get_selector(node){
        var s =  (node.tagName) + (node.className?("."+node.className):"");
        s = s.split(' ').join('.');
        return s;
    }

    function get_id_selector(node){
        var s =  (node.tagName) + (node.id?("#"+node.id):"") + (node.className?("."+node.className):"");
        s = s.split(' ').join('.');
        return s;
    }

    function is_only_selector(s){
        if($(s).length != 1){
            return false;
        }
        return true;
    }

    function get_only_selector(node){
        var s = get_selector(node);

        if(is_only_selector(s)){
            return s;
        }
        while(node.parentNode.tagName !== 'HTML'){
            var fn = node.parentNode;
            var fs = get_selector(fn);
            s = fs + ">" + s;
            if(is_only_selector(s)){
                return s;/* 可以精确定位到所选的元素了 */
            }
            /* 依次往上层遍历 */
            node = node.parentNode;
        }
        /* 如果整个HTML上诉完了还不能精确定位到所选的元素，说明元素具有兄弟元素，提示获取父元素 */
        console.log('元素可能有兄弟，请先获取父元素 !');
        return s;
    }

    function show_red_border(s){
        [].map.call($(s),function(snode){snode.setAttribute('style','border:1px solid #F00');});
    }

    /* 新添加的操作主界面div */
    function createMydiv(){
        var div = document.createElement('div');
        div.id = 'mydiv';
        div.style.cssText = "width:300px; height:300px; position:fixed; top:20%; right:40px";
        div.innerHTML = 
            '<button id="gotop">返回顶部</button><br/>' +
            '<button id="gps">开始定位</button><br/>' +
            '<button id="up">上</button>' +
            '<button id="down">下</button>' +
            '<button id="left">左</button>' +
            '<button id="right">右</button><br/>' +
            '<div id="log"></div>';
        document.body.appendChild(div);

        //绑定点击事件
        document.getElementById('gotop').onclick = function () {
            window.scrollTo(0, 0);
        };
        document.getElementById('gps').onclick = function () {
            localStorage.gps = localStorage.gps ? localStorage.gps : 1;
        };
        document.getElementById('up').onclick = function () {
            var s = get_selector(show_node.parentNode);
            show_node = $(s);
        };
    }

    function show_log(str){
        document.getElementById('log').innerHTML = "<p>"+str + "</p>";
    }

    var mydiv = document.getElementById("mydiv");
    if (mydiv !== null) {
        mydiv.parentNode.removeChild(mydiv);
    } else {

        var s = "";
        var show_node = null;
        createMydiv();

        /* 高亮点击的页面DOM区 */
        window.onmouseup = function (e) {
            var targ = e.target;

            if(targ.id == "mydiv" || targ.parentNode.id == "mydiv"){
                return ;
            }
            if(targ.tagName == "INPUT" || targ.tagName == "input"){
                return ;
            }

            /* 旧节点移除高亮，新节点添加高亮 */
            if (show_node !== null) {
                show_node.removeAttribute("border");
            }
            show_node = targ;

            var s = get_selector(show_node);
            show_log(s);
            show_red_border(s);



        };

    }
})();