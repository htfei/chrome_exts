// ==UserScript==
// @name         【DIY】绝对领域图片提取
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  绝对领域 （http://www.jdlingyu.xyz） 图片提取
// @author       You
// @match        http://www.jdlingyu.xyz
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    [].map.call($("div.main-body").find("img"),function(img) {
        var a = document.createElement('a');
        a.setAttribute('download', '');
        a.href = img.src;
        document.body.appendChild(a);
        a.click();
    });

})();