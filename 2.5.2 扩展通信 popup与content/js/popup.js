//发送消息到content.js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  console.log(tabs);
  chrome.tabs.sendMessage(tabs[0].id, "hello", function(response){
    document.write(response);
  });
});
