
document.write("<script language=javascript src='js/common.js'></script>");

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
  //console.log("bg rcv msg ==> "+message);
  var jstr = dispaly_host_status(message);
  sendResponse(jstr);
});
