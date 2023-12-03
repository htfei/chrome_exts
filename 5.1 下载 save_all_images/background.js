chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    'id':'saveall',
    'type':'normal',
    'title':'下载所有图片到目录：“下载/save_all_imges/标题” ',
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
  if(info.menuItemId == 'saveall'){
    chrome.tabs.executeScript(tab.id, {file: 'content_script.js'}, function(results){
      //console.log(results[0]);
      var title = results[0].title;
      var imglist = results[0].imglist;
      //console.log(title);
      //console.log(imglist);
      if (imglist && imglist.length){
        imglist.forEach(function(url) {
          var tmp = url.split('/');
          var name = tmp[tmp.length -1];
          var dirname =  "save_all_imges/" + title + "/" + name ;//保存到 “下载/save_all_imges/页面标题” 文件夹下
          //console.log(dirname);
          chrome.downloads.download({
            url: url,
            filename : dirname.replaceAll(":","：") , 
            conflictAction: 'uniquify',//唯一 ，覆盖 overwrite ，提示 prompt
            saveAs: false
          });
        });
      }
    });
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  for (var i = 0; i < details.requestHeaders.length; ++i) {
    if (details.requestHeaders[i].name === 'Referer') {
      details.requestHeaders[i].value = 'https://www.tujidao01.com/';
      break;
    }
  }
  return {
    requestHeaders: details.requestHeaders
  };
}, {
  urls: ['*://*.tujidao01.com/*']
}, ['blocking', 'requestHeaders','extraHeaders']);