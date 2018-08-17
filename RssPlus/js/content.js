/**
 * Get RSS feeds URLs
 */
function getFeedsURLs() {
    var feed_lists = [];
    var feed_ico;
    var types = [
        'application/rss+xml',
        'application/atom+xml',
        'application/rdf+xml',
        'application/rss',
        'application/atom',
        'application/rdf',
        'text/rss+xml',
        'text/atom+xml',
        'text/rdf+xml',
        'text/rss',
        'text/atom',
        'text/rdf'
    ];
    var links = document.querySelectorAll("link[type]"); //获取当前页面所有的有type属性的<link>节点
    //console.log(links);
    //console.log(links.length);
    for (var i = 0; i < links.length; i++) {

        //有type属性且属于数组中的某一个
        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
        if (links[i].hasAttribute('type') && types.indexOf(links[i].getAttribute('type')) !== -1) {     
            
            feed_url = links[i].getAttribute('href');
            if (feed_url.indexOf("//") == 0)    // url以 // 开头，需要补全 http: 
                feed_url = "http:" + feed_url;
            else if (/^(http|https):\/\//i.test(feed_url)) //若url中包含 http:// 或者 https:// ,则保持不变
                feed_url = feed_url;
            else
                feed_url = url + "/" + feed_url.replace(/^\//g, '');


            feed_title = links[i].getAttribute('title')
            if ( ['RSS','RSS news feed'].indexOf(feed_title) !== -1 )    // title是这2个的话无意义，换成网页标题
                feed_title = document.title;
            var feed = {
                type: links[i].getAttribute('type'),
                url: feed_url,
                title: feed_title
            };

            feed_lists.push(feed);
        }

        //网页图标
        if(links[i].hasAttribute('type') && links[i].getAttribute('type') =='image/x-icon'){
            feed_ico = links[i].getAttribute('href');
            if (feed_ico.indexOf("//") == 0)    // url以 // 开头，需要补全 http: 
                feed_ico = "http:" + feed_ico;
            else if (/^(http|https):\/\//i.test(feed_ico)) //若url中包含 http:// 或者 https:// ,则保持不变
                feed_ico = feed_ico;
            else
                feed_ico = url + "/" + feed_ico.replace(/^\//g, '');
        }




    }
    console.log(feed_lists);


    if (feed_lists.length >= 1) {
        var feeds_urls_msg = {
            cmd: "got_feeds_urls",
            host: location.hostname, //location.href, 同一网站下的多个页面会返回同一个feed,若用href做key，将产生大量不必要的重复;
            ico: feed_ico,
            ctx: feed_lists,
        }
        //发送消息到background.js
        chrome.runtime.sendMessage(feeds_urls_msg, function (response) {
            console.log(response);
        });
    }
}

//页面加载后检测rss，发送给background.js
getFeedsURLs();

//2.若页面本身就是xml文件，则判断是否为rss源
fetch(location.href)
    .then(response => response.text())
    .then(function (data) {
        var parser = new DOMParser();
        var rssxml = parser.parseFromString(data, "text/xml");
        var type = rssxml.getElementsByTagName('rss');
        if (type.length >= 1) {
            var feed_lists = [];
            var feed_ico = "";
            var feed_title = rssxml.getElementsByTagName('title')[0].childNodes[0].nodeValue;
            var feed_url = rssxml.getElementsByTagName('link')[0].childNodes[0].nodeValue;
            console.log(feed_title, feed_url);

            var feed = {
                type: "text/xml",
                url: feed_url,
                title: feed_title
            };
            feed_lists.push(feed);
            var feeds_urls_msg = {
                cmd: "got_feeds_urls",
                host: location.hostname,
                ico: feed_ico,
                ctx: feed_lists,
            }
            //发送消息到background.js
            chrome.runtime.sendMessage(feeds_urls_msg, function (response) {
                console.log(response);
            });

        }
    })
    .catch(e => console.log("Oops, error", e));