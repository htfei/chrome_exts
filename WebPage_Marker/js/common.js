//提取当前url对应的host
function calc_host(url){
  var urlArr = url.split("/");
  var hostname = urlArr[2];
  return hostname;
}

// 统计当前host的所有page的记录信息
function dispaly_host_status(hostname){
  var like_times = 0;
  var hate_times = 0;
  var host_tag = "";
  for( var i = 0; i < localStorage.length; i++ ){
    var key = localStorage.key(i);
    if(key.indexOf(hostname) >= 0){ //key为当前host的page
      var value = JSON.parse(localStorage.getItem(key));
      (value.rate == 1)?like_times++:(value.rate == 2)?hate_times++:"";
      var tag = value.tag?value.tag:"";
      host_tag += (tag+" ");
      //console.log(like_times);
    }
  }
  host_tag = [... new Set(host_tag.split(/[', ']/))].join(' ');//对tag去重
  return {"host":hostname,"like":like_times,"hate":hate_times,"tag":host_tag};
}

// 更新url记录的收藏拉黑信息
function pushblackpage(current_tab,rate){
  var url = current_tab.url;
  var flag = 1;
  var time = (new Date()).getTime();
  var value = JSON.parse(localStorage.getItem(url));
  if(value){//localStorage已存在记录且rate有改动，则更新
    if(value.rate != rate){
      value.rate = rate;
      value.last_edit_time = time;
      value.pv += 1 ;
    }
    else{
      flag = 0; //不需要做任何更新操作
    }
  }
  else{//localStorage无记录，则新建
    value =  {
      "rate":rate,
      "title":current_tab.title,
      "favIconUrl":current_tab.favIconUrl,
      "host":calc_host(url),
      "tag":"",
      "create_time":time,
      "last_edit_time":time,
      "pv":1
    };
  }
  //确认有改动，则更新并重新加载popup
  if(flag){
    localStorage.setItem(url,JSON.stringify(value));
    return true;
  }
}

// 为指定url添加tag信息，若url不存在则新建
function add_tag(current_tab,tag){
  var url = current_tab.url;
  var time = (new Date()).getTime();
  var value = JSON.parse(localStorage.getItem(url));
  if(value){//localStorage有记录则追加tag
    value.tag += (" " + tag);
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
}
