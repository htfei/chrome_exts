
chrome.runtime.sendMessage('Hello', function(response){
    console.log("收到回复："+response);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      console.log("收到消息："+message);
});


/* 在popup页面加载后将content页面信息显示出来 */
var nowpage_key ="";
chrome.storage.sync.get("nowpage",function(date){
	nowpage_key = date["nowpage"];
});
chrome.storage.sync.get(nowpage_key,function(date){
  var link = nowpage_key;
  var value = date[nowpage_key];
  var title = value["title"];
  var pv = value["pv"];
  var hv = value["hv"];
  var rate = value["rate"];
  var fav = (rate == 1)?"已收藏":(rate == 2)?"已拉黑":"未收藏";
  $('#content_page img').get(0).src = date.hostname +"/favicon.ico" ;
  $('#content_page a').get(0).href = link;
  $('#content_page a').get(0).innerHTML = title;
  $('#content_page p').get(0).innerHTML = "当前页：访问"+ pv +"/"+hv+"次,"+fav;
});

// 新标签打开网页
$('#content_page a').click(() => {
  chrome.tabs.create({url: $('#content_page a').get(0).href });
});


table_load_from_localStorage();


// 新标签打开网页
$('#open_url_new_tab').click(() => {
	chrome.tabs.create({url: 'https://www.baidu.com/'});
});
