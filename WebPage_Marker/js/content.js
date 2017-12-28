
/* 在content页面选中文字后发送给background.js */
document.oncontextmenu = function(){
    var selection = window.getSelection();
    if(selection.anchorOffset != selection.extentOffset){
        chrome.runtime.sendMessage({
          cmd:"msg_from_content",
          selstr:selection.toString(),
          host:location.hostname
        });
    }
};

/* 在content页面加载完毕后 及 页面获得焦点后 将页面信息储存 */
function storage_nowpage(){
  var key_str = location.href;
  var value_obj = {
    "type":1,
    "pv":0,
    "hv":0,
    "rate":0,
    "hostname":location.hostname,
    "title":document.title
  };
  var kv_str = '{"' + key_str + '":' + JSON.stringify(value_obj) + '}';
  var kv_obj = JSON.parse(kv_str);
  chrome.storage.sync.set(kv_obj);
  chrome.storage.sync.set({"nowpage":location.href});
}
/* 在content页面加载完毕后 */
document.ready = function(){
  storage_nowpage();
}
/* 页面获得焦点后 */
document.addEventListener("visibilitychange", function(){
    if(!document.hidden){
      chrome.storage.sync.set({"nowpage":location.href});
    }
});
