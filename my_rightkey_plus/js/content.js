window.onmouseup = function(){
    var selection = window.getSelection();
    if(selection.anchorOffset != selection.extentOffset){
        chrome.runtime.sendMessage({
          selstr:selection.toString(),
          host:location.hostname
        });
    }
}
