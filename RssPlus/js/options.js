//显示
var rss = localStorage.rss;
rss = rss?rss:'http://feed43.com/2770086871034514.xml';
document.getElementById('rss').value = rss;

//保存
document.getElementById('save').onclick = function(){
    localStorage.rss = document.getElementById('rss').value;
    alert('保存成功。');
}