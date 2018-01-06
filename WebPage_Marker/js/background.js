
function dispaly_website_status(linkurl){
    var urlArr = linkurl.split("/");
    var hostname = urlArr[2];
    //hostname = "www.baidu.com";
    var like_times = 0;
    var hate_times = 0;
    for( var i = 0; i < localStorage.length; i++ ){
      var key = localStorage.key(i);
      if(key.indexOf(hostname) >= 0){
        var value = JSON.parse(localStorage.getItem(key));
        (value.rate == 1)?like_times++:(value.rate == 2)?hate_times++:"";
        //console.log(like_times);
      }
    }
    var str = hostname + " 被喜欢"+like_times+"次，被拉黑"+hate_times+"次。"
    //alert(str);
    return str;
}

/* 查看是否黑名单 */
chrome.contextMenus.create({
  'type':'normal',
  'title':'查看是否黑名单',
  'contexts':['page','link'],
  'id':'blackpage',
  'onclick':function(info, tab){
    var url = info.linkUrl?info.linkUrl:info.pageUrl;
    var str = dispaly_website_status(url);
    alert(str);
  }
});
/**************************/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log("bg rcv msg ==> "+message);
  var str = dispaly_website_status(message);
  sendResponse(str);
});
