function dispaly_host_status(linkurl){

  //page有记录，则优先显示page信息
  var value = JSON.parse(localStorage.getItem(linkurl));

  var urlArr = linkurl.split("/");
  var hostname = urlArr[2];
  //hostname = "www.baidu.com";
  var like_times = 0;
  var hate_times = 0;
  var host_tag = "";

  for( var i = 0; i < localStorage.length; i++ ){
    var key = localStorage.key(i);
    if(key.indexOf(hostname) >= 0){
      var value = JSON.parse(localStorage.getItem(key));
      (value.rate == 1)?like_times++:(value.rate == 2)?hate_times++:"";
      var tag = value.tag?value.tag:"";
      host_tag += (tag+" ");
      //console.log(like_times);
    }
  }
  host_tag = [... new Set(host_tag.split(/[', ']/))].join(' ');//对tag去重
  //var str = hostname + " 被喜欢"+like_times+"次，被拉黑"+hate_times+"次。"
  return {"link":value,"host":hostname,"like":like_times,"hate":hate_times,"tag":host_tag};
}
