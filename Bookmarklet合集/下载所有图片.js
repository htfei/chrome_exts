javascript: [].map.call($('img'), function (img) {
    var a = document.createElement('a');
    a.setAttribute('download', '');
    a.href = img.src;
    document.body.appendChild(a);
    a.click();
});


//煎蛋妹子图热榜1
javascript: {
    var node = document.getElementById("my_add_div");
    if (node != null) {
        node.parentNode.removeChild(node);
    } else {
        var list = [].map.call($('div#comments li div.text p a'), function (img) {
            var pic_url = 'http:' + $(img).attr('href');
            return pic_url;
        });
        var sdiv = '<div>';
        for (var i = 0; i < list.length; i++) {
            sdiv += '<a href="' + list[i] + '" download><img src="' + list[i] + '" height="500px" /></a>&nbsp';
        }
        sdiv += '</div>';
        var div = document.createElement('div');
        div.id = 'my_add_div';
        div.innerHTML = sdiv;
        div.style.left = '50px';
        div.style.top = '50px';
        div.style.width = '90%';
        div.style.background = "white";
        div.style.opacity = 1.0;
        var bo = document.body;
        bo.insertBefore(div, $("div#wrapper")[0]);
    }
}