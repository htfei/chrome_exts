
var current_tab;
var hostname;

//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log(tabs[0]);
    //保存url
    current_tab = tabs[0];
    //显示当前网页
    $('#current_url img').get(0).src = tabs[0].favIconUrl;
    $('#current_url a').get(0).href = tabs[0].url;
    $('#current_url a').get(0).innerHTML = tabs[0].title;
    $('#current_url a').click(() => {
      chrome.tabs.create({url: tabs[0].url });
    });
    //更新page mark
    var value = JSON.parse(localStorage.getItem(current_tab.url));
    if(value){
      $('#current_mark').get(0).innerHTML += (value["rate"] == 1)?"已收藏":(value["rate"] == 2)?"已拉黑":"无";
      $('#current_tag').get(0).innerHTML += (value.tag?(value.tag):"无");
    }
    else{
      $('#current_mark').get(0).innerHTML += "无";
      $('#current_tag').get(0).innerHTML += "无";
    }
    //显示website
    var url = current_tab.url;
    var urlArr = url.split("/");
    hostname = urlArr[2];
    $('#host_link').get(0).href = "https://" + hostname ;
    $('#host_link').get(0).innerHTML = hostname;
    $('#host_link').click(() => {
      chrome.tabs.create({url:"https://" + hostname  });
    });
    //更新website mark
    for( var i = 0; i < localStorage.length; i++ ){
      var key = localStorage.key(i);
      if(key.indexOf(hostname) >= 0){
        var value = JSON.parse(localStorage.getItem(key));
        $('#host_mark').get(0).innerHTML += value.tag+" ";
      }
    }
}); //end query

//新标签打开百度
$('#open_baidu_in_newtab').click(() =>{
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
    value =  {"rate":1,"title":current_tab.title,"favIconUrl":current_tab.favIconUrl,"host":hostname};
  }
	localStorage.setItem(key,JSON.stringify(value));
  location.reload();
});
//hate
$('#hate_btn').click(() =>{
  //更新记录信息
  var key = current_tab.url;
  var value = JSON.parse(localStorage.getItem(key));
  if(value){
    value.rate = 2;
  }
  else{
    value =  {"rate":2,"title":current_tab.title,"favIconUrl":current_tab.favIconUrl,"host":hostname};
  }
	localStorage.setItem(key,JSON.stringify(value));
  location.reload();
});

//添加新tag
$('#add_btn').click(() =>{
	var value = JSON.parse(localStorage.getItem(current_tab.url));
  if(!value){
    value =  {"rate":0,"title":current_tab.title,"favIconUrl":current_tab.favIconUrl,"host":hostname};
  }
  //存在则追加，不存在则覆盖
  value.tag?(value.tag += " " + $('#add_tag')[0].value):(value.tag = $('#add_tag')[0].value);
	localStorage.setItem(current_tab.url,JSON.stringify(value));
	location.reload();
});
