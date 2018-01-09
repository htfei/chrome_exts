
/* 鼠标在一个link上悬停时，显示拉黑状态*/
window.onmouseover = function(e){
    if(!e){
      var e = window.event;
    }
    targ = e.target;
    //console.log(targ.href);
    if(targ.href){
      chrome.runtime.sendMessage(targ.href, function(response){
          //console.log(response);
          //var str = response.host + " 被喜欢"+response.like+"次，被拉黑"+response.hate+"次。";
          var str = "["+response.host + "]被收藏"+response.like+"个页面，被拉黑"+response.hate+"个页面。";
          /*
          var str = "";
          if(response.link){
            str = "当前页面"+((response.link.rate == 1)?"已收藏":(response.link.rate == 2)?"已拉黑":"未标记");
            str += ((response.link.tag == "")?"":("，标签："+ response.link.tag ));
          }
          else{
            str = response.host + " 收藏："+response.like+"，拉黑："+response.hate + ((response.tag == "")?"":("，标签："+ response.tag ));
          }
          */
          targ.title = str;
      });
    }
}


/* todo: 页面加载完毕后，将url发送到background.js，后者读取内存是否有此page记录，有则更新pv+1 */
/* 对于pv的统计，也可尝试直接定期读取history,记录内存中的page的pv及时间信息 */
