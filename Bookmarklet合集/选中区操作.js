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

    var mydiv = document.getElementById("mydiv");
    if (mydiv !== null) {
        mydiv.parentNode.removeChild(mydiv);
    } else {
        function get_node_selector(node){
            var n = select_node;
            var s =  (n.tagName) + (n.id?("#"+n.id):"") + (n.className?("."+n.className):"");
        }
        function show_onlyone_selector(select_node){
            var n = select_node;
            my_selector = (n.tagName) + (n.id?("#"+n.id):"") + (n.className?("."+n.className):"");
            /* 类有多个时className中的[空格]需改为[.] ,不然选择器失效 */
            my_selector = my_selector.split(' ').join('.');

            /* 当前的选择器无法唯一定位，尝试加入父节点增加精确度 */
            if($(my_selector).length != 1){
                while(n.parentNode.tagName !== 'HTML'){
                    var fn = n.parentNode;
                    var fn_str = (fn.tagName) + (fn.id?("#"+fn.id):"") + (fn.className?("."+fn.className):"");
                    fn_str = fn_str.split(' ').join('.');
                    my_selector = fn_str + ">" + my_selector;
                    if($(my_selector).length == 1){
                        /* 可以精确定位到所选的元素了 */
                        break;
                    }
                    /* 依次往上层遍历 */
                    n = n.parentNode;
                }
                /* 如果整个HTML上诉完了还不能精确定位到所选的元素，说明元素具有兄弟元素，提示获取父元素 */
                console.log('your select area maybe have brothers ,please try to get [上层元素] frist!');
            }
            /* 将选择器保存到当前网页的localStorage中去 */
            document.getElementById('log').innerHTML = my_selector ;
            localStorage.setItem("my_one_key_down_selector",my_selector);
            /* 完成之后将选中元素重置 */
            /* 感觉没必要 */
        }

        var my_selector = "";
        var show_node = null;

        /* 新添加的操作主界面div */
        var div = document.createElement('div');
        div.id = 'mydiv';
        div.style.cssText = "width:300px; height:300px; position:fixed; top:20%; right:40px";
        div.innerHTML = '<div class="btn-group">' +
            '<button id="gotop">返回顶部</button>' +
            '<button id="gps">开始定位</button>' +
            '<button id="up">上</button>' +
            '<button id="down">下</button>' +
            '<button id="left">左</button>' +
            '<button id="right">右</button>' +
            '<div id="log"></div></div>';
        document.body.appendChild(div);



        //绑定点击事件
        document.getElementById('gotop').onclick = function () {
            window.scrollTo(0, 0);
        };
        document.getElementById('gps').onclick = function () {
            localStorage.gps = localStorage.gps ? localStorage.gps : 1;
        };
        document.getElementById('gps').onclick = show_onlyone_selector();

        /* 高亮点击的页面DOM区 */
        window.onmouseup = function (e) {
            if (!e) {
                e = window.event;
            }
            if (e.button !== 0) return; /* 只监听鼠标左键 */
            var targ = e.target;
            /* 1.普通的页面节点，则高亮该节点 */
            if (targ.id != "mydiv" && targ.parentNode.id != "mydiv") {

                document.getElementById('log').innerHTML = targ.tagName;

                if (targ.tagName != "INPUT" && targ.tagName != "input") {
                    /* 旧节点移除高亮，新节点添加高亮 */
                    if (show_node !== null) {
                        show_node.removeAttribute("border");
                    }
                    targ.setAttribute('style','border:1px solid #F00');
                    /* 选中该节点 */
                    show_node = targ;
                }
            }
        };

    }
})();