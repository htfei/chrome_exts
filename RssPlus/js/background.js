document.write("<script language=javascript src='js/common.js'></script>");

init();

//定时(5min)请求rss源，更新websql
reqtime = Number(localStorage.reqtime?localStorage.reqtime:10);
reqtime *=1000;
setInterval("rss_request()",reqtime);//10min周期执行
//rss_request();