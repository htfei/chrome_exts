
var current_tab;

//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs[0]);
    $('#content_page img').get(0).src = tabs[0].favIconUrl;
    $('#content_page a').get(0).href = tabs[0].url;
    $('#content_page a').get(0).innerHTML = tabs[0].title;
    $('#content_page a').click(() => {
      chrome.tabs.create({url: $('#content_page a').get(0).href });
    });
    current_tab = tabs[0];
    //更新记录信息
    var value = JSON.parse(localStorage.getItem(current_tab.url));
    if(value){
      $('#content_page p').get(0).innerHTML = ((value.rate == 1)?"已收藏":"已拉黑");
    }
    else{
      $('#content_page p').get(0).innerHTML = "未记录";
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
  var key = current_tab.url;
	var value =  {"type":1,"pv":0,"rate":1,"title":current_tab.title,"favIconUrl":current_tab.favIconUrl};
	localStorage.setItem(key,JSON.stringify(value));
});
//hate
$('#hate_btn').click(() =>{
  var key = current_tab.url;
	var value =  {"type":1,"pv":0,"rate":10,"title":current_tab.title,"favIconUrl":current_tab.favIconUrl};
	localStorage.setItem(key,JSON.stringify(value));
});
//添加新tag
$('#add_btn').click(() =>{
  var key = current_tab.url;
	var value = {"type":0,"str":document.getElementById('add_value').value};
	localStorage.setItem(key,JSON.stringify(value));
	location.reload();
});
