// ==UserScript==
// @name         【DIY】光谷社区楼层排版优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       jackson<why2fly@aliyun.com>
// @match        *://www.guanggoo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var a = $('.reply-item span:nth-child(3)').get().map(i=>i.innerHTML);
    var b = $('.reply-item .content').get().map(i=>i.innerHTML);
    var c = $('.reply-item .username').get().map(i=>i.innerHTML);

    var d = $('.reply-item .content');
    var m = $('.reply-item');

    var e = $('.reply-item .username');
    var x = $('.ui-header .username a')[0].innerHTML;
    var y = $('.ui-header .username')[1].innerHTML;
    var z = "jackson";

    var i = 1;
    while(i< m.length){

        if( c[i] == x )
        {
            e[i].setAttribute('style','color:blue');
        }
        else if( c[i] == y )
        {
            e[i].setAttribute('style','color:red');
        }
        else if( c[i] == z )
        {
            e[i].setAttribute('style','color:yellow');
        }

        if(b[i].match("楼上"))
        {
            console.log(a[i]+" have @楼上 #"+i);
            d[i-1].append(m[i]);
        }

        for(var j=i-1;j>=0;j--){
            if(b[i].match(c[j])){
                console.log(a[i]+" have @"+c[j] + " #"+(j+1));
                d[j].append(m[i]);
                break;
            }
        }
        i++;
    }
})();