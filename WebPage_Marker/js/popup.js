
var current_tab;
var hostname;

//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs[0]);
    //保存url
    current_tab = tabs[0];
    //显示当前网页
    $('#content_page img').get(0).src = tabs[0].favIconUrl;
    $('#content_page a').get(0).href = tabs[0].url;
    $('#content_page a').get(0).innerHTML = tabs[0].title;
    $('#content_page a').click(() => {
      chrome.tabs.create({url: $('#content_page a').get(0).href });
    });
    //显示host
    var url = current_tab.url;
    var urlArr = url.split("/");
    hostname = urlArr[2];
    $('#content_page p a').get(0).href = "https://" + hostname ;
    $('#content_page p a').get(0).innerHTML = hostname ;
    $('#content_page p a').click(() => {
      chrome.tabs.create({url: $('#content_page p a').get(0).href });
    });
    //更新记录信息
    var value = JSON.parse(localStorage.getItem(current_tab.url));
    if(value){
      $('#content_page p').get(1).innerHTML += "已收藏本页 ";
      $('#content_page p').get(2).innerHTML += (value.tag?(value.tag):"暂无");
    }
    var hostname_obj = JSON.parse(localStorage.getItem(hostname));
    if(hostname_obj){
      $('#content_page p').get(1).innerHTML += "已拉黑本站 ";
      //chrome.browserAction.setIcon({path: 'images/error.png'});
    }
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

//like
$('#like_btn').click(() =>{
  //更新记录信息
  var key = current_tab.url;
  var value = JSON.parse(localStorage.getItem(key));
  if(value){
    value.rate = 1;
  }
  else{
    value =  {"rate":1,"title":current_tab.title,"favIconUrl":current_tab.favIconUrl};
  }
	localStorage.setItem(key,JSON.stringify(value));
  location.reload();
});
//hate
$('#hate_btn').click(() =>{
  //更新记录信息
  var key = hostname;
  var value =  {"rate":10,"sonpage":current_tab.url};
	localStorage.setItem(key,JSON.stringify(value));
  location.reload();
});
//添加新tag
$('#add_btn').click(() =>{
	var value = JSON.parse(localStorage.getItem(current_tab.url));
  //存在则追加，不存在则覆盖
  value.tag?(value.tag += " " + $('#add_tag')[0].value):(value.tag = $('#add_tag')[0].value);
	localStorage.setItem(current_tab.url,JSON.stringify(value));
	location.reload();
});
