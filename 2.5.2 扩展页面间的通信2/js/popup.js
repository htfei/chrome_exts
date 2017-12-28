chrome.runtime.sendMessage('Hello', function(response){
    document.write(response);
});

//与指定标签中的内容脚本（content script）通信
// $('#sendmsg').click(() =>{
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log(tabs[0].title);
//     chrome.tabs.sendMessage(tabs[0].id, "hello", function(response){
//       console.log(response);
//       $('#sendmsg_back').get(0).innerHTML ="recv msg :" + response;
//     });
//   });
// });

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}
// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}
// popup主动发消息给content-script
$('#send_message_to_content_script').click(() => {
	sendMessageToContentScript('hello', (response) => {
		if(response) alert('收到来自content-script的回复：'+response);
	});
});
