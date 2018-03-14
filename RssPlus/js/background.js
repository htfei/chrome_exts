document.write("<script language=javascript src='js/common.js'></script>");

//定时(5min)请求rss源，更新websql
setInterval("rss_request()",600000);//10min周期执行
//rss_request();