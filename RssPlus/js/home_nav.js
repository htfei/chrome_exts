var db = openDatabase('myrssdb', '1.0', 'I can rss everthing !', 2 * 1024 * 1024);

var dir_l = []; 
var rss_l = []; 
var vm_nav = new Vue({
    el: '#app_nav',
    data: {
      message: 'Hello Vue.js!',
      dirlists: dir_l,
      rsslists: rss_l
    },
    computed: {
        site: {
          // getter
          get: function () {
            return this.message + ' ' + this.rsslists
          },
          // setter
          set: function (newValue) {
              this.message = 'Hello Vue.js!';
              this.rsslists = newValue
          }
        }
    }
});

//页面加载时读取rss源列表
function loadRssfromWebsqlforhomenav() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Rss', [],
            function (tx, results) {
                var len = results.rows.length;
                var dirstr ="";

                for (i = 0; i < len; i++) {   
                    var rss_i = {};
                    
                    rss_i.dir = (tmp = results.rows.item(i).dir)?tmp:"其他";
                    rss_i.rss = results.rows.item(i).rss;
                    rss_i.title = results.rows.item(i).title;
                    rss_i.unreadNums = results.rows.item(i).unreadNums;
                    rss_i.ico = (tmp = results.rows.item(i).ico) ? tmp : "./../images/icon.png";
                    
                    if (dirstr.indexOf(rss_i.dir) < 0) {
                        dirstr += rss_i.dir;
                        dir_l.push(rss_i.dir);
                    }
                    rss_l.push(rss_i);
                }
                
                console.log(dir_l,rss_l);
                vm_nav.dirlists = dir_l;
                vm_nav.rsslists = rss_l;

            }, null);

    });
}


$(document).ready(function(){
    loadRssfromWebsqlforhomenav();
});
