function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);


//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs[0]);
    $('#content_page img').get(0).src = tabs[0].favIconUrl;
    $('#content_page a').get(0).href = tabs[0].url;
    $('#content_page a').get(0).innerHTML = tabs[0].title;
    $('#content_page a').click(() => {
      chrome.tabs.create({url: $('#content_page a').get(0).href });
    });
}); //end query

//创建新标签
$('#create_tab').click(() =>{
  chrome.tabs.create({
      url: 'http://www.baidu.com',
      active: true,
      pinned: false
  }, function(tab){
      console.log(tab);
  });
});


//获取指定窗口活动标签可见部分的截图
$('#cap').click(() =>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs[0].title);
    chrome.tabs.captureVisibleTab(
      tabs[0].windowId,
      {format: 'jpeg',quality: 50},
      function(dataUrl){
          window.open(dataUrl, 'tabCapture');
          //console.log(dataUrl);
    });
  });
});
