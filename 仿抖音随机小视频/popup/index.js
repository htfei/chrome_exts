var srclist = [
      
  //0.spurl 就是视频源，可直接访问播放，无302跳转
  //format_url 是随机访问的，可能资源不存在，也可能随着网址更新，有新的id没收录
  //todo h5 video标签无法播放m3u8
  { 
    "name": "ASMR", 
    "host": "https://www.866gw.com/fuliziyuan/",//狗窝福利 //"https://www.66hdw.com/", 好蛋网 盗版前者的资源
    "logo": "./imgs/asmr.svg",
    "desc": "ASMR 狗窝福利 好蛋网",
    "format_url": "https://88888888.sydwzpks.com:4433/88/{id}/index.m3u8",
    "id_range": [1100, 4253],//685
    "video_type": "m3u8"
  },
  { 
    "name": "BT8", 
    "host": "fb.qu8.top",
    "logo": "",
    "desc": "极品 擦边 韩国",
    "format_url": "https://xztw.711888.xyz/mp4xjj1/20231017/{id}.gif",
    "id_range": [1, 236],//最新视频地址格式已修改，只有这么多了
    "video_type": "mp4"
  },

  //1.spurl 就是视频源，可直接访问播放，访问后302跳转到随机地址（目前通过xhr获取重定向后的真实地址，便于收藏）
  //{ name: "你好污啊", spurl: "https://www.nihaowua.com/v/video.php?_t=" },  //mp4 质量高，速度快 //2024.01.15gg
  { name: "男人之家", spurl: "http://v.nrzj.vip/video.php?_t=" },           //质量高,更新少
  //{ name: "完美视频", spurl: "http://wmsp.cc/video.php?_t=" }, gg
  { name: "xyz", spurl: "https://xjj.349457.xyz/video.php?_t=" },
  //{ name: "快抖社", spurl: "http://www.kuaidoushe.com/zb_users/theme/lanyexvideo/include/video.php?t=" }, //2024.01.15 接口返回值更改为json todo
  //{ name: "有福利", spurl: "https://xjj.pw/zb_users/theme/lanyexvideo/include/video.php?t=" }, //2024.01.15 接口地址更改 todo
  //{ name: "yhqtv", spurl: "http://yhqtv.com/girl/get.php?_t=" }, gg
  //{ name: "dnwz99", spurl: "https://dnwz99.wang/cute-girl/video.php?_t=" },//2024.01.15 404
  { name: "快手xjj", spurl: "http://ksxjj.txqq.pro/video.php?_t=" },   //2次302 //2024.01.15 部分视频地址失效
  { name: "qinggongju", spurl: "https://v.api.aa1.cn/api/api-girl-11-02/index.php?type=video&t=" }, //302
  { name: "api-girl", spurl: "https://tucdn.wpon.cn/api-girl/index.php?wpon=url&t=" }, //302
  { name: "兔儿集", spurl: "http://v.tuerji.net/video.php?_t=", logo: "https://tuerji.net/wp-content/uploads/2020/10/favicon-tuerji.ico" },
  //{ name:"韩国福利", spurl:"https://jiejie.uk/xjj/fuli/video.php?_t="},  //质量高,目前无法播放, 302url => https://player.tvv.tw/player/?url=//pic.xiazai.de/fuli/GirlsRepublic/xxx.mp4
  { name: "tiktok", spurl: "https://jiejie.uk/xjj/tiktok/video.php?_t=" },//2024.01.15 不稳定
  { name: "xiaoac", spurl: "https://www.xiaoac.com/ac/xiaojiejie/video.php?_t=" },//2024.01.15 可用率50%
  // { name: "baozi66", spurl: "http://hc.baozi66.top:99/xjj1.php&t=" }, //2024.01.15 404 
  { name: "99sgou", spurl: "https://www.99sgou.com/xjj/video.php?_t=" },
  { name: "小男人", spurl: "https://xiao.nanna.ren/video.php?_t=" },

  
  { name: "188导航", spurl: "https://188sp.711888.xyz/188/video.php?_t=" },
  //以下均是bt8内容，地址发布页：https://fb.qu8.top/mnfb.php
  { name: "DJ姐姐", spurl: "http://xjj1.716888.xyz/fenlei/djxjj/dj1.php?random="},
  { name: "极品钰足", spurl: "http://xjj1.716888.xyz/fenlei/zj/jipinyz/jipinyz.php?random="},
  { name: "学姐系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/xuejie/xuejie.php?random="}, //不稳定
  { name: "卡哇伊", spurl: "http://xjj1.716888.xyz/fenlei/zj/kawayi/kawayi.php?random="},
  { name: "嫩嫩系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/nennen/nennen.php?random="},
  { name: "丝滑舞蹈", spurl: "http://xjj1.716888.xyz/fenlei/zj/sihuawd/sihuawd.php?random="},
  { name: "完美身材", spurl: "http://xjj1.716888.xyz/fenlei/zj/wanmeisc/wanmeisc.php?random="},
  { name: "慢摇系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/manyao/manyao.php?random="},
  { name: "丝滑吊带", spurl: "http://xjj1.716888.xyz/fenlei/zj/sihuadd/sihuadd.php?random="},
  { name: "清纯系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/qingchun/qingchun.php?random="},
  { name: "COS系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/cos/cos.php?random="},
  { name: "街拍系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/jiepai/jiepai.php?random="},
  { name: "精品变装", spurl: "http://xjj1.716888.xyz/fenlei/zj/jingpinbz/jingpinbz.php?random="},
  { name: "极品萝莉", spurl: "http://xjj1.716888.xyz/fenlei/zj/jipinll/jipinll.php?random="},
  { name: "你的裕梦", spurl: "http://xjj1.716888.xyz/fenlei/zj/nideym/nideym.php?random="},
  { name: "甜妹系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/tianmei/tianmei.php?random="},
  { name: "御丝系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/yusi/yusi.php?random="},
  { name: "帅哥哥", spurl: "http://xjj1.716888.xyz/fenlei/zj/shuaige/shuaige.php?random="},
  { name: "热舞系列", spurl: "http://xjj1.716888.xyz/fenlei/zj/rewu/rewu.php?random="},
  { name: "精品收藏", spurl: "http://xjj1.716888.xyz/fenlei/zj/jingpinsc/jingpinsc.php?random="},
  { name: "精挑靓丽", spurl: "http://xjj1.716888.xyz/fenlei/api/api1.php?random="}, //两次302重定向，首次重定向到下面这3个网站
  { name: "夕染", spurl: "https://xiranimg.com/api.php?type=dyxjj&t="},
  { name: "小姐姐视频", spurl: "https://hefollo.cn/apis.php?type=小姐姐视频&t="}, //todo:该站类似网盘，图片、视频资源众多
  { name: "村少", spurl: "https://www.cunshao.com/666666/api/web.php?_t="},
  { name: "合集1号", spurl: "http://xjj1.716888.xyz/fenlei/zj/heji1/heji1.php?random="},
  { name: "高清横屏", spurl: "http://xjj1.716888.xyz/fenlei/api/apiheng1.php?random="},//村少
  { name: "唯美背景", spurl: "http://api.favnow.com/background.php"},
  { name: "老外抖音", spurl: "http://xjj1.716888.xyz/fenlei/tkxjj/tk.php?random="},
  //{ name: "泰勒·斯", spurl: "https://cdn4.hdzyk-cdn.com/20220609/17855_dcac2ad2/1000k/hls/index.m3u8?t="},
  //{ name: "阿黛尔", spurl: "https://cdn7.hdzyk-cdn.com/20220916/18358_c178444b/1000k/hls/index.m3u8?t="},
  { name: "MTV万首", spurl: "http://xjj1.716888.xyz/mtv/mtv.php?random="},
  { name: "4K风景", spurl: "http://xjj1.716888.xyz/fenlei/4k/4k.php?random="},
  
  

  //2.requrl 是需要请求之后得到视频源的src  (存在CROS跨域问题，可安装插件解决)
  { name: "抖一抖", requrl: "http://dou.plus/get/get1.php?_t=", logo: "http://dou.plus/logo.png" },
  
  //{ name: "diskgirl(用户1)", requrl: "https://mm.diskgirl.com/get/get.php?user=1&_t=" },
  { name: "diskgirl(国内)", requrl: "https://mm.diskgirl.com/get/get1.php?_t=" },
  { name: "diskgirl(国外)", requrl: "https://mm.diskgirl.com/get/get2.php?_t=" },

  //{ name: "小姐姐(用户x)", requrl: "https://jiejie.uk/xjj/get/get.php?user=x&_t=" },
  { name: "小姐姐0(精品)", requrl: "https://jiejie.uk/xjj/get/get0.php?_t=" },
  { name: "小姐姐1(tiktok)", requrl: "https://jiejie.uk/xjj/get/get1.php?_t=" },
  { name: "小姐姐2", requrl: "https://jiejie.uk/xjj/get/get2.php?_t=" },
  { name: "小姐姐3", requrl: "https://jiejie.uk/xjj/get/get3.php?_t=" },
  { name: "小姐姐4", requrl: "https://jiejie.uk/xjj/get/get4.php?_t=" },
  { name: "小姐姐5", requrl: "https://jiejie.uk/xjj/get/get5.php?_t=" },
  { name: "小姐姐6", requrl: "https://jiejie.uk/xjj/get/get6.php?_t=" },
  { name: "小姐姐7", requrl: "https://jiejie.uk/xjj/get/get7.php?_t=" },
  { name: "小姐姐8", requrl: "https://jiejie.uk/xjj/get/get8.php?_t=" },
  { name: "小姐姐9", requrl: "https://jiejie.uk/xjj/get/get9.php?_t=" },
  { name: "小姐姐10", requrl: "https://jiejie.uk/xjj/get/get10.php?_t=" },
  { name: "小姐姐11", requrl: "https://jiejie.uk/xjj/get/get11.php?_t=" },
  { name: "小姐姐12", requrl: "https://jiejie.uk/xjj/get/get12.php?_t=" },

  //{ name: "平凡1(你懂的)", requrl: "https://pf129.com/xjj/get/get1.php?_t=" },//2024.01.15 gg 1~9

];

function GetRandomNum(a, b) {
  return a + Math.round(Math.random() * (b - a))
}

$(document).ready(function () {

    mui.init();

    let like_list = JSON.parse(localStorage.getItem("douyin_like_item")) || [];
    let locked = false; //【只看当前作者】默认关闭
    let lock_node = null;//【只看当前作者】开启时，锁定的作者
    let autonext = false;//【连播】默认关闭
    let follow_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" preserveAspectRatio="xMidYMid meet" ><defs><clipPath id="__lottie_element_2"><rect width="90" height="90" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_2)"><g transform="matrix(1,0,0,1,45,45)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(254,44,85)" fill-opacity="1" d=" M0,-36 C19.881999969482422,-36 36,-19.881999969482422 36,0 C36,19.881999969482422 19.881999969482422,36 0,36 C-19.881999969482422,36 -36,19.881999969482422 -36,0 C-36,-19.881999969482422 -19.881999969482422,-36 0,-36z"></path></g></g><g transform="matrix(1,0,0,1,45,45)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="6" d=" M-13.5,0 C-13.5,0 13.562000274658203,0 13.562000274658203,0 C13.562000274658203,0 -13.5,0 -13.5,0z"></path></g><g opacity="1" transform="matrix(0,1,-1,0,0,0)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="6" d=" M-13.5,0 C-13.5,0 13.562000274658203,0 13.562000274658203,0 C13.562000274658203,0 -13.5,0 -13.5,0z"></path></g></g></g></svg>`
    let more_svg  = `<svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 36 36"><path d="M13.556 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM19.778 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM24.222 19.556a1.778 1.778 0 100-3.556 1.778 1.778 0 000 3.556z" fill="#fff"></path></svg>`
                
    var swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      keyboard: true,     //键盘控制
      mousewheel: true,   //鼠标控制
      grabCursor: true,  //抓手指针
      virtual: {
        slides: srclist.slice(0, 2),
        renderSlide: function (slide, index) {
          console.log(`触发 renderSlide 渲染 ${index} 事件`);

          return `<div class="swiper-slide">
              <video class="video" id="video${index}" src="" data_src="" preload controls webkit-playsinline playsinline poster=""></video>
              <div class="desc">
                <div class="desc_name">@${slide.name}</div>
						    <div class="desc_title">${slide.desc || "暂无描述"}</div>
				      </div>
              <div class="ops">

                <div class="avatar">
                  <img id="homepage${index}" src="${slide.logo || './imgs/bigplayBtn.png'}" >
                  <div id="follow${index}" >${follow_svg}</div>
                </div>

                <div class="like" id="like${index}">
                  <svg class="icon" style="width: 2.5em;height: 2.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12457"><path d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z" fill="#FFFFFF" p-id="12458"></path></svg>
                  <div class="number">${(Math.random() * 100).toFixed(1)}w</div>
                </div>

                <div class="comment" id="comment${index}">
                  <svg class="icon" style="width: 2em;height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6191"><path d="M523.636364 954.181818c-79.476364 0-158.114909-18.269091-228.305455-52.852363l-136.866909 28.811636a34.885818 34.885818 0 0 1-41.355636-41.332364l23.016727-109.358545C78.824727 704.907636 46.545455 616.843636 46.545455 523.636364 46.545455 286.208 260.561455 93.090909 523.636364 93.090909 786.688 93.090909 1000.727273 286.208 1000.727273 523.636364 1000.727273 761.041455 786.688 954.181818 523.636364 954.181818z m232.727272-384a46.545455 46.545455 0 1 0-0.046545-93.137454A46.545455 46.545455 0 0 0 756.363636 570.181818z m-232.727272 0a46.545455 46.545455 0 1 0-0.046546-93.137454A46.545455 46.545455 0 0 0 523.636364 570.181818z m-232.727273 0a46.545455 46.545455 0 1 0-0.046546-93.137454A46.545455 46.545455 0 0 0 290.909091 570.181818z" fill="#FFFFFF" p-id="6192"></path></svg>
                  <div class="number">${parseInt(Math.random() * 9999)}</div>
                </div>

                <div class="share" id="share${index}">
                  <svg class="icon" style="width: 2em;height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4171"><path d="M565.934 817.574a34.816 34.816 0 0 0 9.818 29.394l0.302 0.241a35.539 35.539 0 0 0 25.6 10.963c11.143 0 20.66-5.42 27.226-13.312l354.545-387.072a35.117 35.117 0 0 0 10.24-27.106 35.057 35.057 0 0 0-10.24-27.106L626.892 14.336a36.503 36.503 0 0 0-51.2 0 34.936 34.936 0 0 0-9.758 29.395V253.35c-295.996 0-535.974 238.893-535.974 533.684a529.468 529.468 0 0 0 44.454 212.51C116.7 777.276 329.812 608.437 565.332 608.437l0.602 209.137z" fill="#FFFFFF" p-id="4172"></path></svg>
                </div>

                <div class="more" id="more${index}">
                  ${more_svg}
                </div>

              </div>
          </div>`;
        },
      },
      on: {
        init: function(){
          console.log(`触发 on init ${this.activeIndex} 事件`);
          bind_evt(this.activeIndex,srclist[0]);
          bind_evt(this.activeIndex+1,srclist[1]);
        },
        slideChangeTransitionEnd: function () { //滑块滑动之后触发该函数执行

          //更新连播图标//todo：更好的做法是renderSlide渲染时就直接修改
          document.querySelector(`#share${this.activeIndex} svg path`).setAttribute("fill", autonext ? "red": "#FFFFFF");

          now_node = this.virtual.slides[this.activeIndex];
          console.log(`当前节点video${this.activeIndex}, 视频源:${now_node.name}, 节点总数${this.virtual.slides.length}`);
          
          //取消播放上一个视频
          var video = document.getElementById("video" + this.previousIndex);
          video?.pause();

          //播放
          video_check(this.activeIndex);

          //自动追加一个新视频
          if (this.isEnd) {
            var i = parseInt(Math.random() * srclist.length);
            var node = locked ? lock_node : srclist[i];//锁定的node or 随机选择一个
            console.log(`当前是最后一个节点了，新追加节点video${this.activeIndex+1}, 视频源:${node.name}`);
            this.virtual.appendSlide(node);
            this.virtual.update();
            bind_evt(this.activeIndex+1,node);
          }

        },
      },
    });

    //绑定操作
    function bind_evt(idx, node){
      //用于模仿在底部显示视频文案
      //一言：https://tenapi.cn/yiyan/?format=text
      //随机情话：https://api.uomg.com/api/rand.qinghua?format=text
      httpRequest("https://api.uomg.com/api/rand.qinghua?format=text", idx, testcallback3);
      
      //用于设置当前slide的视频src地址，之所以不在return <div>中直接填充，是因为这个webreq比较慢。直接填是空的，需要回调填充。//todo:可优化改成then链式调用
      set_node_url(node,idx);

      var error_cnt = 0;
      var video = document.getElementById(`video${idx}`);
      
      video.onended = function video_onended() {
        //var idx = swiper && swiper.activeIndex;
        if (autonext) {
          console.log(`video${idx} 播放完毕，即将自动切换下一个...`);
          swiper && swiper.slideNext();
        } else {
          console.log(`video${idx} 播放完毕，即将重新播放...`);
          var video = document.getElementById(`video${idx}`);
          video && video.play();
        }
      };
      video.oncanplay = function(){
        
        if(idx == swiper.activeIndex){
          console.log(`video${idx} 已就绪！是当前节点，自动播放！`);
          var video = document.getElementById(`video${idx}`);
          video && video.play();
        }else{console.log(`video${idx} 已就绪！非当前节点，不自动播放`);}
      };

      /* 一上来就会触发一次，实测第二次触发时才是真的error */
      video.onerror = function change_videosrc(){
        error_cnt++;
        if(error_cnt >= 2){
          var i = parseInt(Math.random() * srclist.length);
          var slide = locked ? lock_node : srclist[i];//锁定的node or 随机选择一个
          console.log(`video${idx} 出错 ${error_cnt} 次，重新设置地址... 新视频源：${slide.name}`);
          set_node_url(slide,idx);
        }
      };

      document.getElementById(`homepage${idx}`).onclick = function homepage() {
        locked = !locked;
        if (locked) {
          //console.log("lock_node    = ", swiper.virtual.slides[swiper.activeIndex])
          lock_node = swiper.virtual.slides[swiper.activeIndex];
          //changeslide(swiper.activeIndex+1);
        }
        else {
          lock_node = null;
        }
        mui.alert(locked ? "只看该作者功能开启!" : "只看该作者功能关闭!")
      };
      document.getElementById(`follow${idx}`).onclick = function follow() {
        mui.alert("[关注功能] 敬请期待!")
      };
      document.getElementById(`like${idx}`).onclick = function like() {
        var idx = swiper && swiper.activeIndex;
        var i = (idx == 0) ? 0 : 1;
        var src = $(".video")[i].getAttribute("data_src");
        var like_flag = like_list.includes(src);
        //修改图标颜色
        this.querySelector("svg path").setAttribute("fill", like_flag ? "#FFFFFF":"red");
        //保存到localstorage
        like_flag ? like_list = like_list.filter(x => x && x != src) :like_list.push(src);
        var val = JSON.stringify(like_list);
        localStorage.setItem("douyin_like_item", val);
        mui.toast(like_flag ? "已取消收藏!" : "已收藏!")
        console.log(like_flag ? `video${idx} 已取消收藏 src=${src}`:`video${idx} 已收藏 src=${src}`);
      };

      document.getElementById(`comment${idx}`).onclick = function comment() {
        mui.toast("[评论功能] 敬请期待!")
      };
      document.getElementById(`share${idx}`).onclick = function share() {
        autonext = !autonext;
        //修改图标颜色
        this.querySelector("svg path").setAttribute("fill", autonext ? "red": "#FFFFFF");
        mui.toast(autonext ? "连播功能开启!" : "连播功能关闭!")
      };
      document.getElementById(`more${idx}`).onclick = function more() {
        mui.alert("[更多功能] 敬请期待!")
      };
    }
    
    function changeslide(idx) {
      var i = parseInt(Math.random() * srclist.length);
      var node = locked ? lock_node : srclist[i];//锁定的node or 随机选择一个
      swiper.virtual.removeSlide(idx);
      swiper.virtual.appendSlide(node);
      swiper.virtual.update();
    }
    
    function video_check(idx, cnt = 0) {
      if (swiper && swiper.activeIndex != idx) return; //等待期间主动划走了，不再执行定时器，避免播放
      var video = document.getElementById(`video${idx}`);
      if (video && video.src && video.readyState >= 1) {
        console.log(`视频${idx}可以播放了(networkState=${video.networkState},readyState=${video.readyState})`)
        video.play();
      }
      /*else if (cnt < 10) {
        console.log(`视频${idx}无法播放(networkState=${video.networkState},readyState=${video.readyState}),等待${10 - cnt}s`)
        cnt += 1;
        //setTimeout(video_check(idx,cnt), 1000);
        //setTimeout(`"video_check(${idx},${cnt})"`, 1000);//todo:setTimeout不生效
      }
      else {
        console.log(`视频${idx}无法播放(networkState=${video.networkState},readyState=${video.readyState})，切换下一个`)
        autonext && swiper.slideNext();
        //changeslide(idx);//移除这个不可用的slide[idx]
      }*/
    }

    //设置某个node的视频源，获取真实地址并更新dom//入口函数，以下函数均被他调用
    function set_node_url(slide, index) {
      //console.log(slide,index);
      if(slide.format_url){
        spurl_id = GetRandomNum(slide.id_range[0], slide.id_range[1]);
        spurl = slide.format_url.replace("{id}", spurl_id);
        console.log(`video${index} 视频源：${slide.name}, 随机视频地址: ${spurl}`);
        add_video(slide, index, spurl);
        //判断是否已收藏
        var like_flag = like_list.includes(spurl);
        if(like_flag){this.querySelector(`#like${index} svg path`).setAttribute("fill", "red");}
      }
      else if (slide.spurl) {
        httpRequest(slide.spurl + Math.random(), index, testcallback2);
      }
      else if (slide.requrl) {
        httpRequest(slide.requrl + Math.random(), index, testcallback);
      }
    }
    //无需请求，直接就是视频地址，用hls.js播放m3u8视频
    function add_video(slide, idx, m3u8url) {
      //console.log('add_video 当前活动的Slide：', i);
      var video = document.getElementById(`video${idx}`);
      video.setAttribute("data_src", m3u8url);

      if(slide.video_type == "mp4" || video.canPlayType('application/vnd.apple.mpegurl') != ''){
        video.src = m3u8url;
        video.addEventListener('canplay', function () {
          video.play();
        });
      }
      else if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(m3u8url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          video.muted = true;
          video.play();
        });
      }
    }
    //发送请求，获取真实视频地址
    function httpRequest(requrl, index, callback) {
      //console.log("requrl=",requrl,"index=", index);
      var xhr = new XMLHttpRequest();
      xhr.open("GET", requrl, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          callback(xhr, requrl, index); //此处返回Text对象
        }
      }
      xhr.send();
    }
    //请求后响应为一段文字的api回调
    function testcallback(xhr, requrl, index) {
      var rsptext = xhr.responseText;
      fixurl = rsptext.startsWith("//") ? ("http:" + rsptext) :      // "https://jiejie.uk/xjj/get/get0.php" 存在"//"开头的url
        rsptext.startsWith("https:http") ? rsptext.slice(6) :          // "https://jiejie.uk/xjj/get/get4.php" 存在这种错误的url
          rsptext.startsWith("http:http") ? rsptext.slice(5) :
            rsptext.startsWith("https://") ? rsptext :
              rsptext.startsWith("http://") ? rsptext :
                "http://" + rsptext;
      console.log(`video${index} 请求地址: ${requrl} , rsp视频地址(fix): ${fixurl}`);
      var video = document.getElementById(`video${index}`);
      if(video && fixurl){
        video.src = fixurl;
        video.setAttribute("data_src", fixurl);
        //判断是否已收藏
        var like_flag = like_list.includes(fixurl);
        if(like_flag){this.querySelector(`#like${index} svg path`)?.setAttribute("fill", "red");}
      }
    }
    //请求后发生302重定向的api回调
    function testcallback2(xhr, requrl, index) {
      video_url = xhr.responseURL
      var video = document.getElementById(`video${index}`);
      if(video && video_url){
        video.src = video_url;
        video.setAttribute("data_src", video_url);
        //判断是否已收藏
        var like_flag = like_list.includes(video_url);
        if(like_flag){this.querySelector(`#like${index} svg path`)?.setAttribute("fill", "red");}
      }
      console.log(`video${index} 请求地址: ${requrl} , 302视频地址: ${video_url}`);
    }

    //随机文字api的回调
    function testcallback3(xhr, requrl, index) {
      var idx = index < 2 ? index : 2;
      var desc = $(".desc_title")[idx];
      desc && (desc.innerText = xhr.responseText);
    }
    
})