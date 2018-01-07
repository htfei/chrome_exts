
function dispaly_host_status(linkurl){
    var urlArr = linkurl.split("/");
    var hostname = urlArr[2];
    //hostname = "www.baidu.com";
    var like_times = 0;
    var hate_times = 0;
    var host_tag = "";

    for( var i = 0; i < localStorage.length; i++ ){
      var key = localStorage.key(i);
      if(key.indexOf(hostname) >= 0){
        var value = JSON.parse(localStorage.getItem(key));
        (value.rate == 1)?like_times++:(value.rate == 2)?hate_times++:"";
        var tag = value.tag?value.tag:"";
        host_tag += (tag+" ");
        //console.log(like_times);
      }
    }
    //var str = hostname + " 被喜欢"+like_times+"次，被拉黑"+hate_times+"次。"
    return {"host":hostname,"like":like_times,"hate":hate_times,"tag":host_tag};
}

/* 查看是否黑名单 */
chrome.contextMenus.create({
  'type':'normal',
  'title':'查看是否黑名单',
  'contexts':['page','link'],
  'id':'blackpage',
  'onclick':function(info, tab){
    var url = info.linkUrl?info.linkUrl:info.pageUrl;
    var jstr = dispaly_host_status(url);
    var str = "["+jstr.host + "]被收藏"+jstr.like+"个页面，被拉黑"+jstr.hate+"个页面。";
    alert(str);
  }
});
/**************************/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log("bg rcv msg ==> "+message);
  var jstr = dispaly_host_status(message);
  sendResponse(jstr);
});
