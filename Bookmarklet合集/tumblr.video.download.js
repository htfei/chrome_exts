/************ 
---tbr_video_downloads---a节点中有download：点击下载，无download：点击播放----

使用方法：
保存js书签，打开https://www.tumblr.com/，
加载网页完毕后，点击执行，
会列出已加载的视频，点击即可下载，右击‘新标签打开链接’即可播放.
*************/

javascript: {
    var node = document.getElementById("my_add_div");
    if (node != null) {
        node.parentNode.removeChild(node);
    }
    else {
        var list = document.getElementsByTagName("source");
        var sdiv = '<div>';
        for (var i = 0; i < list.length; i++) {
            sdiv += '<a href="' + list[i].src + '" download><img src="' + list[i].parentNode.poster + '" height="200px"  /></a>&nbsp';
        }
        sdiv += '</div>';

        var div = document.createElement('div');
        div.id = 'my_add_div';
        div.innerHTML = sdiv;

        div.style.position = 'fixed';
        div.style.left = '50px';
        div.style.top = '50px';
        div.style.width = '90%';
        div.style.background = "white";
        div.style.opacity = 1.0;
        var bo = document.body;
        bo.appendChild(div);
    }
}


//=======带记录版本=====
javascript: {
    var node = document.getElementById("my_add_div");
    if (node != null) {
        node.parentNode.removeChild(node);
    } else {
        var list = document.getElementsByTagName("source");
        var sdiv = '<div>';
        for (var i = 0; i < list.length; i++) {
            var value = localStorage.getItem(list[i].src);
            if (value) { /*已有记录，则加载图片*/
                localStorage.setItem(list[i].src, parseInt(value) + 1);
                sdiv += '<a href="' + list[i].src + '" download><img src="' + list[i].parentNode.poster + '" height="300" /></a>&nbsp';
            } else { /*没有记录，则加载视频*/
                localStorage.setItem(list[i].src, 0);
                sdiv += '<video height="300" controls="controls"><source src="' + list[i].src + '" type="video/mp4" /></video>&nbsp';
            }
        }
        sdiv += '</div>';
        var div = document.createElement('div');
        div.id = 'my_add_div';
        div.innerHTML = sdiv;
        div.style.position = 'fixed';
        div.style.left = '50px';
        div.style.top = '52px';
        div.style.width = '95%';
        div.style.height = '95%';
        div.style.background = "white";
        div.style.opacity = 1.0;
        div.style.overflow = 'auto';
        var bo = document.body;
        bo.appendChild(div);
    }
}

//=======为tumblr视频添加下载按钮 =====
//TODO: 监听，当页面加载更多时，为新视频执行添加按钮操作。
//TODO: 改为油猴脚本
javascript: {
    /* 获取指定class的祖宗节点 */
    function getparents(node, f_class_value) {
        while (node) {
            if (node.parentNode.classList.contains(f_class_value) == true) {
                return node.parentNode;
            }
            node = node.parentNode;
        }
        return null;
    }
    /* 获取指定class的子孙节点list */
    function getchilds(node, f_class_value) {
        return node.getElementsByClassName(f_class_value);        
    }        

    var list = document.getElementsByTagName("source");
    for (var i = 0; i < list.length; i++) {
        //获取添加位置的父节点
        var fn = getparents(list[i],"post_wrapper");
        //添加下载按钮    
        var div = document.createElement('div');
        div.innerHTML = '<a href="' + list[i].src + '" download>点击下载</a>';
        fn.appendChild(div);
    }
}