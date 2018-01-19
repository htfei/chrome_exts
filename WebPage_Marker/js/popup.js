document.write("<script language=javascript src='js/common.js'></script>");
var current_tab;
var hostname;
//document.write("<script language=javascript src=’./background.js’></script>");

//获取当前活动的用户标签并显示到popup页面上
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //console.log(tabs[0]);
    //保存url
    current_tab = tabs[0];
    //显示当前网页
    $('#current_url img').get(0).src = tabs[0].favIconUrl;
    $('#current_url a').get(0).href = tabs[0].url;
    $('#current_url a').get(0).innerHTML = tabs[0].title;
    $('#current_url a').click(() => {chrome.tabs.create({url: tabs[0].url });});
    //更新page mark
    var value = JSON.parse(localStorage.getItem(current_tab.url));
    if(value){
      $('#current_mark').get(0).innerHTML += (value.rate == 1)?"已收藏":(value.rate == 2)?"已拉黑":"无";
      $('#current_tag').get(0).innerHTML += (value.tag?(value.tag):"无");
    }
    else{
      $('#current_mark').get(0).innerHTML += "无";
      $('#current_tag').get(0).innerHTML += "无";
    }
    //显示host
    var url = current_tab.url;
    var urlArr = url.split("/");
    hostname = urlArr[2];
    $('#host_link').get(0).href = "https://" + hostname ;
    $('#host_link').get(0).innerHTML = hostname;
    $('#host_link').click(() => {chrome.tabs.create({url:"https://" + hostname  });});
    //更新host mark
    var jstr = dispaly_host_status(url);
    $('#host_mark').get(0).innerHTML += jstr.tag;
}); //end query


//新标签打开百度
$('#open_baidu_in_newtab').click(() => {chrome.tabs.create({url: 'http://www.baidu.com' });});


/* like or hate or cancel = 1/2/0 */
/*
$('.pagemark_btn').click(() =>{//此种写法会导致this的调用者为()未指定，则默认window，此时无法得到正确的<input>对象
  console.log(this);
  console.log("a.title="+this.value);
  //...
});
*/
$('.pagemark_btn').click(function(){

  //确定是哪个按钮
  //console.log(this);
	//console.log(this.value);
  var btn = 0;
  if(this.id == "like_btn"){
    btn=1;
  }
  else if(this.id == "hate_btn"){
    btn=2;
  }
  //console.log(btn);
////});
  //更新url记录信息
  var flag = 1;
  var time = (new Date()).getTime();
  var value = JSON.parse(localStorage.getItem(current_tab.url));
  if(value){//localStorage已存在记录且rate有改动，则更新
    if(value.rate != btn){
      value.rate = btn;
      value.last_edit_time = time;
    }
    else{
      flag = 0; //不需要做任何更新操作
    }
  }
  else{//localStorage无记录，则新建
    value =  {
      "rate":btn,
      "title":current_tab.title,
      "favIconUrl":current_tab.favIconUrl,
      "host":hostname,
      "tag":"",
      "create_time":time,
      "last_edit_time":time,
      "pv":1
    };
  }

  //确认有改动，则更新并重新加载popup
  if(flag){
    localStorage.setItem(current_tab.url,JSON.stringify(value));
    location.reload();
  }

});


//添加新tag
$('#add_btn').click(() =>{
  var tag = $('#add_tag')[0].value ;
  if(tag == ""){
    return ;//text内容为空则跳过
  }
  var time = (new Date()).getTime();
  var value = JSON.parse(localStorage.getItem(current_tab.url));
  if(value){//localStorage有记录则追加tag
    // 若存在aaa,以下代码会导致aa无法添加，故注释掉
    //if(value.tag.indexOf(tag) >= 0){
    //  $('#add_tag')[0].value = "";//"已存在相同tag!";
    //  return ;
    //}
    value.tag += (" " + tag);
    //todo : 已有相同tag则忽略
    value.tag = [... new Set(value.tag.split(/[', ']/))].join(' ');
    value.last_edit_time = time;
  }
  else{//无记录则新建
    value =  {
      "rate":0,
      "title":current_tab.title,
      "favIconUrl":current_tab.favIconUrl,
      "host":hostname,
      "tag":tag,
      "create_time":time,
      "last_edit_time":time,
      "pv":1
    };
  }
  localStorage.setItem(current_tab.url,JSON.stringify(value));
  location.reload();
});
//添加新tag //2018.01.09add:加入回车键提交tag
document.getElementById("add_tag").onkeydown = function onkeydown_enter(){
  if(event.keyCode==13){
    document.getElementById("add_btn").click();
  }
}
