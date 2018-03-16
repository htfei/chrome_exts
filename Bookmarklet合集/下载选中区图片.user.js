// ==UserScript==
// @name         下载选中区图片
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一键下载网页指定区域（主要的内容区）的所有图片!
//    选中区记忆---------记忆选中区后，访问站内其他网页时可自动定位选中区，不需再次手动选择。
//    图片区域过滤-------完美过滤选中区以外的其他区域的图片
//    图片大小过滤-------自动过滤小于200*400的图片，免去了常规图片下载工具的手动筛选图片大小等操作。
//    图片重命名---------为网页标题+图片名称.类型。
// @author       Terry
// @match        *://*/*
// @grant        none
// @require       http://code.jquery.com/jquery-3.1.0.min.js

// 2017.11.04 已知bug: 有些网页的图片重命名为网页标题失败，下载的图片名称仍然是原始url中的名称。----浏览器安全限制，跨域会导致download失效，chrome中表现为下载文件名不变，firefox中打开而不是下载。2017.11.04
// 2017.11.04 已知bug: 有些网站（如www.ciyuanjie.cn）没有jquery库，$操作会提示失败，需加入JQ库。----已添加
// 2017.11.04 已知bug: 可能导致百度一下按钮失效，原因不明。

// TODO：站点统计，当前网页访问次数统计

// ==/UserScript==



(function() {
    'use strict';

    // Your code here...
    var my_add_node = document.getElementById("my_add_div");
    var my_selector = "";

    if(my_add_node !== null){
        my_add_node.parentNode.removeChild(my_add_node);
    }
    else{
        var show_node = null;

        /**********************************************/
        /* 新添加的操作主界面div */
        var div = document.createElement('div');
        div.id = 'my_add_div';
        /* div.style.background = "#B3B3B3"; */
        div.style.width = '150px';
        div.style.height = '200px';
        div.style.position = 'fixed';
        div.style.top = '20%';
        div.style.right = '40px';
        div.style.borderRadius = '3px 3px 3px 3px';
        div.style.cursor = 'pointer';
        div.style.textAlign = 'center';
        div.style.fontSize = '18px';
        div.style.fontFamily = 'Tahoma';
        var bo = document.body;
        bo.appendChild(div);

        /**********************************************/
        /* 5.返回顶部 */
        var fa5 = document.createElement('a');
        fa5.href = "#top";
        fa5.innerHTML = "返回顶部";
        div.appendChild(fa5);
        var br = document.createElement("br");
        div.appendChild(br);

        /**********************************************/
        /* 1.显示上层元素 */
        var fa = document.createElement('button');
        fa.innerHTML = "定位到上层";
        fa.style="width:100%;height:30px";
        fa.onclick = function (){
            show_log('now node ='+show_node.tagName);
            if(show_node === null){
                show_log('请先选择一个区域 or 读取记忆选中区！');
                return;
            }
            /* 父节点为<html>则取消操作 */
            if(show_node.tagName == 'HTML'){
                show_log('now node is <HTML> !');
                return;
            }
            /* 移除自身高亮，显示父节点高亮 */
            show_node.removeAttribute("style");
            show_node = show_node.parentNode;
            show_node.setAttribute('style','border:2px solid #F00');
        };
        div.appendChild(fa);
        div.appendChild(br.cloneNode(true));/* 克隆<br/>节点 */

        /**********************************************/
        /* 2.记忆当前选中区 */
        var fa1 = document.createElement('button');
        fa1.innerHTML = "记忆选中的区域";
        fa1.style="width:100%;height:30px";
        div.appendChild(fa1);
        fa1.onclick =function(){
            var n = show_node;
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
            show_log('my_selector='+ my_selector );
            localStorage.setItem("my_one_key_down_selector",my_selector);
            /* 完成之后将选中元素重置 */
            /* 感觉没必要 */
        };
        /* div.appendChild(br.cloneNode(true));克隆<br/>节点 */

        /**********************************************/
        /* 3.显示记忆选中区 */
        var fa3 = document.createElement('button');
        fa3.innerHTML = "显示站点记忆";
        fa3.style="width:100%;height:30px";
        div.appendChild(fa3);
        fa3.onclick =function(){
            /* 从站点的localStorage中去获取记忆选择区 */
            var str = localStorage.getItem("my_one_key_down_selector");
            if(str === null){
                show_log('当前网站没有记忆区，请先进行一次记忆！');
            }
            else{
                console.log('你在当前站点的选择器为'+ str );
                if($(str).length === 0){
                    show_log('当前网站的记忆区在本页面无匹配项！');
                }
                else if($(str).length > 1){
                    show_log('当前网站的记忆区匹配到多个，已高亮第一个匹配区！');
                    /* 旧节点移除高亮，新节点添加高亮 */
                    if(show_node !== null){
                        show_node.removeAttribute("style");
                    }
                    show_node = $(str)[0];
                    show_node.setAttribute('style','border:2px solid #F00');
                    my_selector = str ;
                }
                else if($(str).length == 1){
                    show_log('当前网站的记忆区已高亮显示！');
                    /* 旧节点移除高亮，新节点添加高亮 */
                    if(show_node !== null){
                        show_node.removeAttribute("style");
                    }
                    show_node = $(str)[0];
                    show_node.setAttribute('style','border:2px solid #F00');
                    my_selector = str ;
                }
            }
        };
        div.appendChild(br.cloneNode(true));/* 克隆<br/>节点 */

        /**********************************************/
        /* 4.下载选中区图片 */
        var fa4 = document.createElement('button');
        fa4.innerHTML = "下载区域图片";
        fa4.style="width:100%;height:30px";
        div.appendChild(fa4);
        fa4.onclick =function(){
            if(show_node === null){
                show_log('请先选择一个区域 or 读取记忆选中区！');
            }
            else{
                /* 获取选中区的图片列表，并依次下载*/
                [].map.call($(my_selector).find("img"),function(img,index){
                    /* 宽高小于300px的图片自动过滤掉 */
                    if(img.naturalHeight * img.naturalWidth >= 400*200){
                        var a = document.createElement('a');
                        var img_type = img.src.toLowerCase().split('.').pop();
                        /* 如果图片链接有更高清的原图，则下载原图 */
                        if(img.parentNode.tagName == "a" && img.parentNode.href !== null && img.parentNode.href.toLowerCase().split('.').pop() == img_type ){
                            a.href =  img.parentNode.href;
                        }
                        else{
                            a.href = img.src;
                        }
                        /* 图片重命名 */
                        var img_src = a.href;
                        var img_fullname = document.title + index +"_(" + img.naturalWidth + "x"+ img.naturalHeight +"px)."+img_type;
                        show_log('down img:' + img_fullname);
                        a.setAttribute('download',img_fullname);
                        /* 下载图片*/
                        document.body.appendChild(a);
                        a.click();
                    }
                    else{
                        show_log('选中区中没有找到大于400x200px的图片！');
                    }
                });
            }
        };
        div.appendChild(br.cloneNode(true));/* 克隆<br/>节点 */
        /**********************************************/
        /* 6.显示操作记录 */
        var fa6 = document.createElement('div');
        fa6.style="width:100%;height:200px";
        div.appendChild(fa6);
        div.appendChild(br);

        function show_log(str){
             fa6.innerHTML = "<p>"+str + "</p>";
        }
        /**********************************************/

        /**********************************************/
        /* 打开页面后自动匹配记忆选择区 */
        var str = localStorage.getItem("my_one_key_down_selector");
        if(str === null){
            show_log('当前网站没有记忆区，请先进行一次记忆！');
        }
        else{
            //console.log('你在当前站点的选择器为'+ str );
            if($(str).length === 0){
                show_log('智能记忆区在本页面无效！');
            }
            else if($(str).length > 1){
                show_log('当前网站的记忆区匹配到多个，已高亮第一个匹配区！');
                /* 旧节点移除高亮，新节点添加高亮 */
                if(show_node !== null){
                    show_node.removeAttribute("style");
                }
                show_node = $(str)[0];
                show_node.setAttribute('style','border:2px solid #F00');
                my_selector = str ;
            }
            else if($(str).length == 1){
                show_log('当前网站的记忆区已高亮显示！');
                /* 旧节点移除高亮，新节点添加高亮 */
                if(show_node !== null){
                    show_node.removeAttribute("style");
                }
                show_node = $(str)[0];
                show_node.setAttribute('style','border:2px solid #F00');
                my_selector = str ;
            }
        }
        /**********************************************/
        /* 高亮点击的页面DOM区 */
        window.onmouseup  = function(e){
            if(!e){
                e = window.event;
            }
            if(e.button !== 0) return; /* 只监听鼠标左键 */
            var targ = e.target;
            /* 1.普通的页面节点，则高亮该节点 */
            if(targ.id != "my_add_div" && targ.parentNode.id != "my_add_div"){
                show_log('targ.tagName='+targ.tagName);
                if(targ.tagName != "INPUT" && targ.tagName != "input"){
                    /* 旧节点移除高亮，新节点添加高亮 */
                    if(show_node !== null){
                        show_node.removeAttribute("style");
                    }
                    targ.setAttribute('style','border:1px solid #F00');
                    /* 选中该节点 */
                    show_node = targ;
                }
            }
        };
        /**********************************************/

    }
})();