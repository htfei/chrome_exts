var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);
var index = 0 ;
var nums = 20 ;

var itemsval = [];
var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!',
      items: itemsval
    },
    computed: {
        site: {
          // getter
          get: function () {
            return this.message + ' ' + this.items
          },
          // setter
          set: function (newValue) {
              this.message = 'Hello Vue.js!';
              this.items = newValue
          }
        }
    }
});

function getIMGfromString(string){
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = string.match(imgReg);  // arr 为包含所有img标签的数组
    if(!arr){
        return null
    }
    var list =[]
    for (var i = 0; i < arr.length; i++){
        var src = arr[i].match(srcReg);
        //获取图片地址
        console.log('图片地址'+(i+1)+'：'+src[1]);
        list.push(src[1]);
    }
    return list
}
function loadItemsfromWebsqlforhome(index, nums) {
    var sqlstr = `SELECT 
                    Rss.ico,
                    Rss.title as rsstitle,
                    Feeds.title,
                    Feeds.description,
                    Feeds.url,
                    Feeds.pubtimestamp
                FROM Feeds 
                LEFT JOIN Rss ON Feeds.rssUrl = Rss.rss
                where isread ISNULL
                ORDER BY Feeds.pubtimestamp DESC 
                LIMIT ?,? `;
    db.transaction(function (tx) {
        tx.executeSql(sqlstr, [index, nums], function (tx, results) {
                var len = results.rows.length;
                //console.log(len); 

                if (len) {
                    for (i = 0; i < len; i++) {
                        var itemval = {};
                        itemval.rssico = results.rows.item(i).ico;
                        itemval.rsstitle = results.rows.item(i).rsstitle;
                        itemval.itemurl = results.rows.item(i).url;
                        itemval.title = results.rows.item(i).title;
                        desc = results.rows.item(i).description;
                        imglist=getIMGfromString(desc);
                        itemval.descimg = imglist?imglist[0]:"";//若存在则提取第一张jpg
                        itemval.desc = desc.replace(/<.*?>/g, "");//删除所有标签
                        ptmstamp = results.rows.item(i).pubtimestamp;
                        itemval.pubtime = new Date(ptmstamp*1000).toLocaleString();
                        itemsval.push(itemval);
                    }              
                    //console.log(itemsval);
                    vm.site = itemsval;
                }
            },
            function (tx, error) {
                console.log('失败!', error.message)
            });
    });
}

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight == scrollHeight) {
        //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
        index += nums;
        console.log(index,nums);
        loadItemsfromWebsqlforhome(index,nums);
        setTimeout("initial_position()",100);
    }
});

//----------------
var unit_wid = 400;
var unit_edge = 30;
var unit_rate = 0.9;
// var unit_num = 10;


$(document).ready(function(){
    loadItemsfromWebsqlforhome(index,nums);
    setTimeout("initial_position()",100);
});

function initial_position(){
    var wf_wid = $(window).width()*unit_rate;
    var num = Math.floor(wf_wid / unit_wid);
    var wf_edge = ($(window).width() - (unit_wid * num + unit_edge * (num - 1))) / 2;
    var heightList = [];
    for (var i = 0;i< num ;i++) {
        heightList[i] = 0;
    }
    for (var j = 0;j < $('#wf .unit').length;j++) {
        var col_minHeight = getMin(heightList).min;
        var col_minIndex = getMin(heightList).index;
        var initial_top = col_minHeight;
        var initial_left = col_minIndex * (unit_wid + unit_edge) + wf_edge;
        var unit = $('#wf .unit');
        unit.eq(j).css({'top': initial_top + 'px','left': initial_left + 'px'});
        heightList[col_minIndex] = col_minHeight + unit.eq(j).height() + unit_edge;
    }
    set_wfHeight(getMax(heightList));
}

$(window).resize(function(){
    var wf_wid = $(window).width()*unit_rate;
    var num = Math.floor(wf_wid / unit_wid);
    var wf_edge = ($(window).width() - (unit_wid * num + unit_edge * (num - 1))) / 2;
    var heightList = [];
    for (var i = 0;i< num ;i++) {
        heightList[i] = 0;
    }
    for (var j = 0;j < $('#wf .unit').length;j++) {
        var col_minHeight = getMin(heightList).min;
        var col_minIndex = getMin(heightList).index;
        var new_top = col_minHeight;
        var new_left = col_minIndex * (unit_wid + unit_edge) + wf_edge;
        var unit = $('#wf .unit');
        unit.eq(j).stop().animate({'top': new_top + 'px','left': new_left + 'px'},300);
        heightList[col_minIndex] = col_minHeight + unit.eq(j).height() + unit_edge;
    }
    set_wfHeight(getMax(heightList));
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


