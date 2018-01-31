
document.write("<script language=javascript src='js/common.js'></script>");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  //console.log("bg rcv msg ==> "+message);
  var hostname = calc_host(message);
  var jstr = dispaly_host_status(hostname);
  sendResponse(jstr);
});

/**************************/

/* 查看是否黑名单 */
/*chrome.contextMenus.create({
  'type':'normal',
  'title':'查看是否黑名单',
  'contexts':['page','link'],
  'id':'isblackpage',
  'onclick':function(info, tab){
    var url = info.linkUrl?info.linkUrl:info.pageUrl;
    var hostname = calc_host(url);
    var jstr = dispaly_host_status(hostname);
    var str = "["+jstr.host + "]被收藏"+jstr.like+"个页面，被拉黑"+jstr.hate+"个页面。";
    alert(str);
  }
});*/

/* 加入黑名单 */
chrome.contextMenus.create({
  'type':'normal',
  'title':'将本网页加入黑名单',
  'contexts':['page','link'],
  'id':'pushblackpage',
  'onclick':function(info, tab){pushblackpage(tab,2);}
});
/* 加入收藏 */
/*
chrome.contextMenus.create({
  'type':'normal',
  'title':'将本网页加入收藏',
  'contexts':['page'],
  'id':'pushfavpage',
  'onclick':function(info, tab){pushblackpage(tab,1);}
});
*/
/* 添加标签 */
chrome.contextMenus.create({
  'type':'normal',
  'title':'为本网页添加标签'+'"%s"',
  'contexts':['selection'],
  'id':'addtag',
  'onclick':function(info, tab){add_tag(tab,info.selectionText);}
});
