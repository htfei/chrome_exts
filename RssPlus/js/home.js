document.write("<script language=javascript src='js/common.js'></script>");
var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
var index = 0 ;
var nums = 20 ;
var nowstamp = Date.parse(new Date())/1000;//单位秒
var rssid = null;
var hasloadall = false;

var itemsval = [];
var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!',
      items: itemsval
    },
    methods:{
        loadrss:function(item_rssid){
            if(rssid == item_rssid){
                // console.log("当前rssid就是"+ item_rssid +",不需要切换!");
                // return ;
                rssid = null;//再次点击切换所有
            }
            else{
                rssid = item_rssid;
            }
            // console.log(rssid);
            itemsval = [];
            vm.site = [];
            hasloadall = false;
            loadItemsfromWebsqlforhome(index,nums,rssid);
            setTimeout("initial_position()",100); 
        },
        deleteItem:function(itemurl,index){
            del_feeds_by_itemurl(itemurl);
            this.items.splice(index,1);
            setTimeout("initial_position()",100); 
        },
        likeItem:function(itemurl,index){
            //console.log(this.items[index].likes);
            old_flag = this.items[index].likes?1:0;
            this.items[index].likes = old_flag?0:1;
            new_flag = this.items[index].likes?1:0;
            likeItem_by_itemurl(itemurl,new_flag);
        }
    }
});

//like
function likeItem_by_itemurl(itemurl,flag) {
    db.transaction(function (tx, results) {
        tx.executeSql(
            'UPDATE Feeds SET likes = ? WHERE url  = ?;', [flag,itemurl],
            ()=>{
                //console.log('执行成功!');
                if (flag == 1){
                    sqlstr = 'INSERT OR IGNORE INTO item_likes SELECT * FROM Feeds WHERE url ="' + itemurl +'"';
                    console.log(sqlstr);
                    tx.executeSql(sqlstr,[],()=>{console.log('执行成功!');},function (tx, error) {alert('执行失败!' + error.message);});
                }else{
                    sqlstr = 'delete from item_likes WHERE url ="' + itemurl +'"';
                    console.log(sqlstr);
                    tx.executeSql(sqlstr,[],()=>{console.log('执行成功!');},function (tx, error) {alert('执行失败!' + error.message);});
                }
                //tx.executeSql(sqlstr,[],()=>{},function (tx, error) {alert('执行失败!' + error.message);});
        }, //location.reload();
            function (tx, error) {alert('执行失败!' + error.message);}
        );
    });


}

//删除
function del_feeds_by_itemurl(itemurl) {
    db.transaction(function (tx, results) {
        tx.executeSql(
            'DELETE FROM Feeds WHERE url =?;', [itemurl],
            ()=>{console.log('删除成功!');}, //location.reload();
            function (tx, error) {alert('删除失败!' + error.message);}
        );
    });
}

function getIMGfromString(string){
    if(!string){//debug:null.match()报错 2018.12.11
        return null;
    }
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = string.match(imgReg);  // arr 为包含所有img标签的数组
    if(!arr){
        return null;
    }
    var list =[]
    for (var i = 0; i < arr.length; i++){
        var src = arr[i].match(srcReg);
        //获取图片地址
        // console.log('图片地址'+(i+1)+'：'+src[1]);
        list.push(src[1]);
    }
    return list
}


//将时间显示优化
function beautimey(ptmstamp){
    var xt = Math.round((nowstamp - ptmstamp)/60) ;//相差分钟数
    if(xt < 60)
        return xt + "分钟前"
    else if(xt/60 < 24)
        return Math.round(xt/60) + "小时前"
    else if(xt/60/24 < 2)
        return "昨天"
    else if(xt/60/24 < 3)
        return "前天"
    else if(xt/60/24 < 7){
        return Math.round(xt/60/24) + "天前";
    }
    else{
        var myDate = new Date(ptmstamp*1000);
        if (myDate.getFullYear() != new Date().getFullYear() )
            return myDate.getFullYear() + "年" + (myDate.getMonth()+1) + "月" + myDate.getDate() + "日";
        return (myDate.getMonth()+1) + "月" + myDate.getDate() + "日";
    }
}

function loadItemsfromWebsqlforhome(index, nums, rssid = null) {
    var rssidstr = rssid?"and Rss.id="+rssid:"";
    var sqlstr = `SELECT 
                    Rss.ico,
                    Rss.id,
                    Rss.link,
                    Rss.rss,
                    Rss.title as rsstitle,
                    Feeds.title,
                    Feeds.description,
					Feeds.content,
                    Feeds.url,
                    Feeds.pubtimestamp,
                    Feeds.likes
                FROM Feeds 
                LEFT JOIN Rss ON Feeds.rssUrl = Rss.rss
                where isread ISNULL `
                + rssidstr +
                ` ORDER BY Feeds.pubtimestamp DESC 
                LIMIT ?,? `;
    // console.log(sqlstr);
    // console.log(index, nums, rssid);
    db.transaction(function (tx) {
        tx.executeSql(sqlstr, [index, nums], function (tx, results) {
                var len = results.rows.length;
                // console.log(len); 
                // console.log(sqlstr);
                if (len) {
                    for (i = 0; i < len; i++) {
                        var itemval = {};
                        itemval.rssico = results.rows.item(i).ico;
                        if (itemval.rssico == null || itemval.rssico == "" || itemval.rssico == "undefined") {
                            itemval.rssico = "./../images/icon.png";
                        }
                        itemval.rsstitle = results.rows.item(i).rsstitle;
                        itemval.rssid = results.rows.item(i).id;
                        itemval.rsslink = results.rows.item(i).link;
                        itemval.rssfeed = results.rows.item(i).rss;
                        itemval.itemurl = results.rows.item(i).url;
                        itemval.title = results.rows.item(i).title;
						
						desc = results.rows.item(i).description;
                        imglist=getIMGfromString(desc);
						//if(i==0){
						//	console.log(desc);
						//	console.log(imglist);
						//}
						if(!imglist){
							content = results.rows.item(i).content;
							imglist=getIMGfromString(content);
						}
                        itemval.descimg = imglist?imglist[0]:"";//若存在则提取第一张jpg
						
                        fdesc = desc?desc.replace(/<.*?>/g, ""):"点击查看详情";//删除所有标签
                        itemval.desc = fdesc.length > 100 ? fdesc.substring(0,100)+"...":fdesc; //最大100个字符
						
                        ptmstamp = results.rows.item(i).pubtimestamp;
                        itemval.timestr = beautimey(ptmstamp);//new Date(ptmstamp*1000).toLocaleString();
                        itemval.likes = results.rows.item(i).likes;
                        itemsval.push(itemval);
                    }              
                    // console.log(itemsval);
                    vm.items = itemsval;
                    if(len<nums){
                        console.log("已全部加载完毕!");
                        hasloadall = true;
                    }
                }
            },
            function (tx, error) {
                console.log('失败!', error.message)
            });
    });
}

//此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
//BUG：滚三次没效果了?各种奇怪问题。//DEBUG:==改为>=,MD滚远了
$(window).scroll(function () {
    if(hasloadall){
        console.log("已全部加载完毕!不再执行滚动加载！");
        return ;
    }
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    // console.log(scrollTop,windowHeight,scrollHeight);
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        index += nums;
        // console.log(index,nums);
        loadItemsfromWebsqlforhome(index,nums,rssid);
        setTimeout("initial_position()",100);
    }
});

//----------------
// ready之前没有这些dom
// $('.unit > div >a').click(function(){
//     rssid = $(this).attr('id');
//     console.log(rssid);
//     itemsval = [];
//     vm.site = [];
//     loadItemsfromWebsqlforhome(index,nums,rssid);
//     setTimeout("initial_position()",100);
// });
//----------------
var unit_wid = 400;//单元格子宽度
var unit_edge = 30;//单元格子间隔
var unit_rate = 0.90;


$(document).ready(function(){
    loadItemsfromWebsqlforhome(index,nums,rssid);
    setTimeout("initial_position()",100);
});

function initial_position(){
    var wd = $(window).width();
    var wf_wid = wd*unit_rate;//可用于计算页面总宽度
    var num = Math.floor(wf_wid / unit_wid);//每行格子个数
    var wf_edge = (wd - (unit_wid * num + unit_edge * (num - 1))) / 2;//两侧剩余宽度
    var heightList = [];
    for (var i = 0;i< num ;i++) {
        heightList[i] = 0;
    }
    for (var j = 0;j < $('#wf .unit').length;j++) {
        var col_minHeight = getMin(heightList).min;
        var col_minIndex = getMin(heightList).index;//找出最小高度的格子行及其高度
        var new_top = col_minHeight;
        var new_left = col_minIndex * (unit_wid + unit_edge) + wf_edge ;//计算左边距
        var unit = $('#wf .unit');
        unit.eq(j).stop().animate({'top': new_top + 'px','left': new_left + 'px'},1000);
        heightList[col_minIndex] = col_minHeight + unit.eq(j).height() + unit_edge;
    }
    set_wfHeight(getMax(heightList));
}

$(window).resize(function(){
    initial_position();
});

function set_wfHeight (max) {
    var wf_height = max + 50;
    $('#wf').css('height',wf_height + 'px');
}

function getMax (arr) {
    var max = arr[0];
    for (var i=1;i<arr.length;i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function getMin(arr){
    var min = arr[0];
    var index = 0;
    for(var i=1;i<arr.length;i++){
        if (arr[i] < min) {
            min = arr[i];
            index = i;
        }
    }
    return {min:min,index:index};
}


