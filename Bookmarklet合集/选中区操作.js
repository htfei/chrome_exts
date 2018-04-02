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


    function get_selector(node){
        var s =  (node.tagName) + (node.className?("."+node.className):"");
        s = s.split(' ').join('.');
        return s;
    }

    function is_only_selector(str){
        if($(s).length != 1){
            return false;
        }
        return true;
    }

    function get_one_selector(node){
        var s = get_selector(node);

        if(is_only_selector(s)){
            return s;
        }
        while(node.parentNode.tagName !== 'HTML'){
            var fn = node.parentNode;
            var fs = get_selector(fn);
            s = fs + ">" + s;
            if($(s).length == 1){                     
                break;/* 可以精确定位到所选的元素了 */
            }
            /* 依次往上层遍历 */
            node = node.parentNode;
        }
        /* 如果整个HTML上诉完了还不能精确定位到所选的元素，说明元素具有兄弟元素，提示获取父元素 */
        console.log('元素可能有兄弟，请先获取父元素 !');
    }
        

    /* 新添加的操作主界面div */
    function createMydiv(){       
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

        function show_log(str){
            document.getElementById('log').innerHTML = "<p>"+str + "</p>";
        }
    }



    var mydiv = document.getElementById("mydiv");
    if (mydiv !== null) {
        mydiv.parentNode.removeChild(mydiv);
    } else {





        var s = "";
        var show_node = null;

        //绑定点击事件
        document.getElementById('gotop').onclick = function () {
            window.scrollTo(0, 0);
        };
        document.getElementById('gps').onclick = function () {
            localStorage.gps = localStorage.gps ? localStorage.gps : 1;
        };
        document.getElementById('gps').onclick = 

        /* 高亮点击的页面DOM区 */
        window.onmouseover = function (e) {
            if (e.target.tagName !='a') {
                return;
            }
            var targ = e.target;
            /* 1.普通的页面节点，则高亮该节点 */

            show_log(targ.tagName);

            var list = get_list_selector();
                /* 旧节点移除高亮，新节点添加高亮 */
                if (show_node !== null) {
                    show_node.removeAttribute("border");
                }
                targ.setAttribute('style','border:1px solid #F00');
                /* 选中该节点 */
                show_node = targ;
        };

    }
})();