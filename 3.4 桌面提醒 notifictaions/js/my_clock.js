function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);

// 显示桌面通知
document.getElementById('show_notification').onclick = function(){
  if(window.webkitNotifications){
    var notification = webkitNotifications.createNotification(
        'icon48.png',
        'demo1',
        'Merry Christmas! 111111  '
    );
    notification.show();
    setTimeout(function(){notification.cancel();},3000);
  }
  else if(chrome.notifications){
    var opt = {
      type: 'image',
      iconUrl: 'images/icon16.png',
      title: 'demo2',
      message: 'Merry christmas! 222222 ',
      imageUrl: 'images/icon48.png'
    };
    chrome.notifications.create(null, opt,function(id){
      setTimeout(function(){chrome.notifications.clear(id);}, 1000);
    });
  }
  else{
    alert('亲，你的浏览器不支持啊！');
  }
}
