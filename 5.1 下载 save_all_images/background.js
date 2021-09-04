chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    'id':'saveall',
    'type':'normal',
    'title':'下载当前页面所有图片到 “下载/save_all_imges/页面标题” 文件夹下',
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
            filename : dirname , 
            conflictAction: 'uniquify',
            saveAs: false
          });
        });
      }
    });
  }
});
