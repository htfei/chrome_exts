
/* 鼠标在一个link上悬停时，显示拉黑状态*/
window.onmouseover = function(e){
    if(!e){
      var e = window.event;
    }
    targ = e.target;
    //console.log(targ.href);
    if(targ.href){
      chrome.runtime.sendMessage(targ.href, function(response){
          console.log(response);
          var str = "["+response.host + "]被收藏"+response.like+"个页面，被拉黑"+response.hate+"个页面。";
          //var str = response.host + " 被喜欢"+response.like+"次，被拉黑"+response.hate+"次。";
          targ.title = str;
      });
    }
}
