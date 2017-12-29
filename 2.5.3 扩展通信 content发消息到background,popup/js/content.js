//发送消息到popup.js //设置循环定时器
function rfs_timer(){
  chrome.runtime.sendMessage('hello', function(response){
      console.log(response); //注：当popup和background都设置监听函数时，可同时收到消息，但此处只会处理第一个response
  });
}
setInterval("rfs_timer()",5000);
