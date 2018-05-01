/**
 * Get RSS feeds URLs
 */
function getFeedsURLs() {
    var feeds_urls = [];
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
    var links = document.querySelectorAll("link[type]");
    console.log(links);
    console.log(links.length);
    for (var i = 0; i < links.length; i++) {
        if (links[i].hasAttribute('type') && types.indexOf(links[i].getAttribute('type')) !== -1) {
            feed_url = links[i].getAttribute('href');
            if (feed_url.indexOf("//") == 0)
                feed_url = "http:" + feed_url;
            else if (/^(http|https):\/\//i.test(feed_url))
                feed_url = feed_url;
            else
                feed_url = url + "/" + feed_url.replace(/^\//g, '');

            var feed = {
                type: links[i].getAttribute('type'),
                url: feed_url,
                title: links[i].getAttribute('title') || feed_url
            };

            feeds_urls.push(feed);
        }
    }
    console.log(feeds_urls);

    
    if(feeds_urls.length >= 1){
        var feeds_urls_msg={
            cmd:"got_feeds_urls",
            ctx:feeds_urls
        }
        //发送消息到popup.js
        chrome.runtime.sendMessage(feeds_urls_msg, function (response) {
            console.log(response);
        }); 
    }
}

getFeedsURLs();
