
//接收端的处理方式是一样的
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("recv msg:" + message);
    if (message == "hello")
      sendResponse("hi,i am content.js !");
});
