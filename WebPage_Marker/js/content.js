
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
          targ.title = response;
      });
    }
}
