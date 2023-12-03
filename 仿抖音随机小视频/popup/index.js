$(document).ready(function () {

    mui.init();

    let like_list = JSON.parse(localStorage.getItem("douyin_like_item")) || [];
    let autonext = false;
    let locked = false; let lock_node = null;
    var srclist = [
      //1.spurl 就是视频源，可直接访问，自动跳转到视频链接并播放 （目前通过xhr获取重定向后的真实地址）
      { name: "你好污啊", spurl: "https://www.nihaowua.com/v/video.php?_t=" },  //mp4 质量高，速度快
      { name: "男人之家", spurl: "http://v.nrzj.vip/video.php?_t=" },           //质量高,更新少
      //{ name: "完美视频", spurl: "http://wmsp.cc/video.php?_t=" }, gg
      { name: "xyz", spurl: "https://xjj.349457.xyz/video.php?_t=" },
      { name: "快抖社", spurl: "http://www.kuaidoushe.com/zb_users/theme/lanyexvideo/include/video.php?t=" },
      { name: "有福利", spurl: "https://xjj.pw/zb_users/theme/lanyexvideo/include/video.php?t=" },
      //{ name: "yhqtv", spurl: "http://yhqtv.com/girl/get.php?_t=" }, gg
      { name: "dnwz99", spurl: "https://dnwz99.wang/cute-girl/video.php?_t=" },
      { name: "快手xjj", spurl: "http://ksxjj.txqq.pro/video.php?_t=" },   //2次302
      { name: "qinggongju", spurl: "https://v.api.aa1.cn/api/api-girl-11-02/index.php?type=video" }, //302
      { name: "兔儿集", spurl: "http://v.tuerji.net/video.php?_t=", logo: "https://tuerji.net/wp-content/uploads/2020/10/favicon-tuerji.ico" },
      //{ name:"韩国福利", spurl:"https://jiejie.uk/xjj/fuli/video.php?_t="},  //质量高,目前无法播放, 302url => https://player.tvv.tw/player/?url=//pic.xiazai.de/fuli/GirlsRepublic/xxx.mp4
      { name: "tiktok", spurl: "https://jiejie.uk/xjj/tiktok/video.php?_t=" },
      { name: "xiaoac", spurl: "https://www.xiaoac.com/ac/xiaojiejie/video.php?_t=" },
      { name: "baozi66", spurl: "http://hc.baozi66.top:99/xjj1.php" },
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
      { name: "精挑靓丽", spurl: "http://xjj1.716888.xyz/fenlei/api/api1.php?random="}, //两次302重定向，首次重定向到下面这些网站
      //{ name: "精挑靓丽1", spurl: "https://xiranimg.com/api.php?type=dyxjj"},
      //{ name: "精挑靓丽2", spurl: "https://hefollo.cn/apis.php?type=小姐姐视频/5分区"}, //todo:该站类似网盘，图片、视频资源众多
      //{ name: "精挑靓丽3", spurl: "https://www.cunshao.com/666666/api/web.php"},
      { name: "合集1号", spurl: "http://xjj1.716888.xyz/fenlei/zj/heji1/heji1.php?random="},
      { name: "高清横屏", spurl: "http://xjj1.716888.xyz/fenlei/api/apiheng1.php?random="},
      { name: "老外抖音", spurl: "http://xjj1.716888.xyz/fenlei/tkxjj/tk.php?random="},
      { name: "泰勒·斯", spurl: "https://cdn4.hdzyk-cdn.com/20220609/17855_dcac2ad2/1000k/hls/index.m3u8?t="},
      { name: "阿黛尔", spurl: "https://cdn7.hdzyk-cdn.com/20220916/18358_c178444b/1000k/hls/index.m3u8?t="},
      { name: "MTV万首", spurl: "http://xjj1.716888.xyz/mtv/mtv.php?random="},
      { name: "MTV万首", spurl: "http://xjj1.716888.xyz/fenlei/4k/4k.php?random="},
      
      { name: "村少", spurl: "https://www.cunshao.com/666666/api/web.php?_t="},


      //2.requrl 是需要请求之后得到视频源的src  (存在CROS跨域问题，可安装插件解决)
      { name: "抖一抖", requrl: "http://dou.plus/get/get1.php?_t=", logo: "http://dou.plus/logo.png" },
      
      //{ name: "diskgirl(用户1)", requrl: "https://mm.diskgirl.com/get/get.php?user=1&_t=" },
      { name: "diskgirl(国内)", requrl: "https://mm.diskgirl.com/get/get1.php?_t=" },
      { name: "diskgirl(国外)", requrl: "https://mm.diskgirl.com/get/get2.php?_t=" },

      //{ name: "小姐姐(用户x)", requrl: "https://jiejie.uk/xjj/get/get.php?user=x&_t=" },
      { name: "小姐姐0(精品)", requrl: "https://jiejie.uk/xjj/get/get0.php?_t=" },
      { name: "小姐姐1(tiktok)", requrl: "https://jiejie.uk/xjj/get/get1.php?_t=" },
      /*{ name: "小姐姐2", requrl: "https://jiejie.uk/xjj/get/get2.php?_t=" },
      { name: "小姐姐3", requrl: "https://jiejie.uk/xjj/get/get3.php?_t=" },
      { name: "小姐姐4", requrl: "https://jiejie.uk/xjj/get/get4.php?_t=" },
      { name: "小姐姐5", requrl: "https://jiejie.uk/xjj/get/get5.php?_t=" },
      { name: "小姐姐6", requrl: "https://jiejie.uk/xjj/get/get6.php?_t=" },
      { name: "小姐姐7", requrl: "https://jiejie.uk/xjj/get/get7.php?_t=" },
      { name: "小姐姐8", requrl: "https://jiejie.uk/xjj/get/get8.php?_t=" },
      { name: "小姐姐9", requrl: "https://jiejie.uk/xjj/get/get9.php?_t=" },
      { name: "小姐姐10", requrl: "https://jiejie.uk/xjj/get/get10.php?_t=" },
      { name: "小姐姐11", requrl: "https://jiejie.uk/xjj/get/get11.php?_t=" },
      { name: "小姐姐12", requrl: "https://jiejie.uk/xjj/get/get12.php?_t=" }, 都可用，暂时屏蔽不想看 */

      { name: "平凡1(你懂的)", requrl: "https://pf129.com/xjj/get/get1.php?_t=" },
      { name: "平凡2", requrl: "https://pf129.com/xjj/get/get2.php?_t=" },
      { name: "平凡3", requrl: "https://pf129.com/xjj/get/get3.php?_t=" },
      { name: "平凡4", requrl: "https://pf129.com/xjj/get/get4.php?_t=" },
      { name: "平凡5", requrl: "https://pf129.com/xjj/get/get5.php?_t=" },
      { name: "平凡6", requrl: "https://pf129.com/xjj/get/get6.php?_t=" },
      { name: "平凡7", requrl: "https://pf129.com/xjj/get/get7.php?_t=" },
      { name: "平凡8", requrl: "https://pf129.com/xjj/get/get8.php?_t=" },
      { name: "平凡9", requrl: "https://pf129.com/xjj/get/get9.php?_t=" },
    ];
    var swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      keyboard: true,     //键盘控制
      mousewheel: true,   //鼠标控制
      grabCursor: true,  //抓手指针
      virtual: {
        slides: srclist.splice(0, 2),
        renderSlide: function (slide, index) {
          if (slide.spurl) {
            //删掉后也能播放,但无法获取真实地址
            httpRequest(slide.spurl + Math.random(), index, testcallback2);
          }
          else if (slide.requrl) {
            httpRequest(slide.requrl + Math.random(), index, testcallback);
          }

          //用于模仿在底部显示视频文案
          //一言：https://tenapi.cn/yiyan/?format=text
          //随机情话：https://api.uomg.com/api/rand.qinghua?format=text
          httpRequest("https://api.uomg.com/api/rand.qinghua?format=text", index, testcallback3);

          /*src = ${slide.spurl}${Math.random()} autoplay poster="./imgs/pg.jpg"*/
          return `<div class="swiper-slide">
              <video class="video" id="video${index}" src="" data-src="${slide.spurl || slide.requrl}"
               preload controls webkit-playsinline playsinline poster=""></video>
              <div class="desc">
                <div class="desc_name">@${slide.name}</div>
						    <div class="desc_title">${slide.desc || "暂无描述"}</div>
				      </div>
              <div class="ops">
                <div class="avatar">
                  <img id="homepage${index}" src="${slide.logo || './imgs/bigplayBtn.png'}" >
                  <svg id="follow${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" preserveAspectRatio="xMidYMid meet" ><defs><clipPath id="__lottie_element_2"><rect width="90" height="90" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_2)"><g transform="matrix(1,0,0,1,45,45)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(254,44,85)" fill-opacity="1" d=" M0,-36 C19.881999969482422,-36 36,-19.881999969482422 36,0 C36,19.881999969482422 19.881999969482422,36 0,36 C-19.881999969482422,36 -36,19.881999969482422 -36,0 C-36,-19.881999969482422 -19.881999969482422,-36 0,-36z"></path></g></g><g transform="matrix(1,0,0,1,45,45)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="6" d=" M-13.5,0 C-13.5,0 13.562000274658203,0 13.562000274658203,0 C13.562000274658203,0 -13.5,0 -13.5,0z"></path></g><g opacity="1" transform="matrix(0,1,-1,0,0,0)"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="6" d=" M-13.5,0 C-13.5,0 13.562000274658203,0 13.562000274658203,0 C13.562000274658203,0 -13.5,0 -13.5,0z"></path></g></g></g></svg>
                </div>
                <div class="like">
                  <svg id="like${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 94" width="90" height="94" preserveAspectRatio="xMidYMid meet" style="display:block; width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_18"><rect width="90" height="94" x="0" y="0"></rect></clipPath><clipPath id="__lottie_element_20"><path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path></clipPath><clipPath id="__lottie_element_24"><path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path></clipPath><clipPath id="__lottie_element_28"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_35"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_42"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_52"><path d="M0,0 L168,0 L168,168 L0,168z"></path></clipPath><clipPath id="__lottie_element_56"><path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path></clipPath><clipPath id="__lottie_element_60"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_67"><path d="M0,0 L1200,0 L1200,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_74"><path d="M0,0 L1200,0 L1200,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_84"><path d="M0,0 L120,0 L120,120 L0,120z"></path></clipPath></defs><g clip-path="url(#__lottie_element_18)"><g clip-path="url(#__lottie_element_52)" transform="matrix(0.5250066518783569,0,0,0.5250066518783569,1.0244407653808594,8.821273803710938)" opacity="1" style="display: block;"><g clip-path="url(#__lottie_element_56)" transform="matrix(0.10000000149011612,0,0,0.10000000149011612,0,0)" opacity="1" style="display: block;"><g style="display: none;"><g><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g clip-path="url(#__lottie_element_84)" style="display: none;"><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g></g><g class="png" clip-path="url(#__lottie_element_74)" transform="matrix(1,0,0,1,240,340)" opacity="1" style="display: block;"><g transform="matrix(1,0,0,1,154.5,92)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M453.0360107421875,88.71199798583984 C493.77398681640625,30.663999557495117 560.6599731445312,0 634.2509765625,0 C774.4030151367188,0 890.9719848632812,121.58999633789062 890.9719848632812,266.1369934082031 C890.9719848632812,266.1549987792969 890.9719848632812,266.1730041503906 890.9719848632812,266.1910095214844 C890.9810180664062,266.1709899902344 890.9910278320312,266.1510009765625 891,266.1310119628906 C891,270.25201416015625 890.9299926757812,273.37200927734375 890.8779907226562,275.6679992675781 C890.8060302734375,278.8190002441406 890.77001953125,280.4159851074219 891,280.9159851074219 C890.468994140625,311.3190002441406 885.2219848632812,336.43798828125 875.8989868164062,369.62799072265625 C870.6090087890625,375.5880126953125 865.6939697265625,386.81201171875 860.7979736328125,399.1990051269531 C853.073974609375,411.1969909667969 850.1510009765625,417.0090026855469 845.697021484375,428.7699890136719 C841.1519775390625,436.39898681640625 836.323974609375,444.06298828125 831.2449951171875,451.7439880371094 C793.7960205078125,508.54400634765625 743.7080078125,565.073974609375 693.6669921875,615.2520141601562 C615.3359985351562,694.2769775390625 535.5440063476562,760.0579833984375 500.8320007324219,788.6749877929688 C491.24700927734375,796.5759887695312 485.1000061035156,801.6439819335938 483.3680114746094,803.375 C471.0669860839844,815.677978515625 458.7650146484375,815.9860229492188 446.4630126953125,815.9940185546875 C446.1390075683594,815.9979858398438 445.8139953613281,816 445.4859924316406,816 C420.25,816 407.6319885253906,803.3809814453125 395.0140075683594,790.7630004882812 C394.0509948730469,789.7999877929688 391.60101318359375,787.7789916992188 387.8580017089844,784.7830200195312 C349.625,756.5999755859375 263.58599853515625,687.7860107421875 182.74200439453125,604.7830200195312 C121.06600189208984,542.02001953125 61.62200164794922,470.0069885253906 29.091999053955078,399.5880126953125 C16.474000930786133,374.35101318359375 0.7310000061988831,314.2640075683594 0,280.9219970703125 C0.26899999380111694,280.6549987792969 0.22699999809265137,279.04901123046875 0.14399999380111694,275.843994140625 C0.08299999684095383,273.49798583984375 0,270.2969970703125 0,266.1369934082031 C0,121.52400207519531 116.50199890136719,0 256.72100830078125,0 C330.1789855957031,0 397.1310119628906,30.663999557495117 453.0360107421875,88.71199798583984z"></path></g></g></g><g class="png" clip-path="url(#__lottie_element_67)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g><g class="png" clip-path="url(#__lottie_element_60)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g></g></g><g clip-path="url(#__lottie_element_20)" style="display: none;" transform="matrix(0.05356041342020035,0,0,0.05356041342020035,0.03553009033203125,8.32037353515625)" opacity="1"><g clip-path="url(#__lottie_element_24)" style="display: block;" transform="matrix(1,0,0,1,0,0)" opacity="1"><g style="display: none;"><g><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g class="png" clip-path="url(#__lottie_element_42)" style="display: block;" transform="matrix(1,0,0,1,340,340)" opacity="1"><g style="display: block;" transform="matrix(1,0,0,1,54.5,92)" opacity="0.9500000000000001"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M453.0360107421875,88.71199798583984 C493.77398681640625,30.663999557495117 560.6599731445312,0 634.2509765625,0 C774.4030151367188,0 890.9719848632812,121.58999633789062 890.9719848632812,266.1369934082031 C890.9719848632812,266.1549987792969 890.9719848632812,266.1730041503906 890.9719848632812,266.1910095214844 C890.9810180664062,266.1709899902344 890.9910278320312,266.1510009765625 891,266.1310119628906 C891,270.25201416015625 890.9299926757812,273.37200927734375 890.8779907226562,275.6679992675781 C890.8060302734375,278.8190002441406 890.77001953125,280.4159851074219 891,280.9159851074219 C890.468994140625,311.3190002441406 885.2219848632812,336.43798828125 875.8989868164062,369.62799072265625 C870.6090087890625,375.5880126953125 865.6939697265625,386.81201171875 860.7979736328125,399.1990051269531 C853.073974609375,411.1969909667969 850.1510009765625,417.0090026855469 845.697021484375,428.7699890136719 C841.1519775390625,436.39898681640625 836.323974609375,444.06298828125 831.2449951171875,451.7439880371094 C793.7960205078125,508.54400634765625 743.7080078125,565.073974609375 693.6669921875,615.2520141601562 C615.3359985351562,694.2769775390625 535.5440063476562,760.0579833984375 500.8320007324219,788.6749877929688 C491.24700927734375,796.5759887695312 485.1000061035156,801.6439819335938 483.3680114746094,803.375 C471.0669860839844,815.677978515625 458.7650146484375,815.9860229492188 446.4630126953125,815.9940185546875 C446.1390075683594,815.9979858398438 445.8139953613281,816 445.4859924316406,816 C420.25,816 407.6319885253906,803.3809814453125 395.0140075683594,790.7630004882812 C394.0509948730469,789.7999877929688 391.60101318359375,787.7789916992188 387.8580017089844,784.7830200195312 C349.625,756.5999755859375 263.58599853515625,687.7860107421875 182.74200439453125,604.7830200195312 C121.06600189208984,542.02001953125 61.62200164794922,470.0069885253906 29.091999053955078,399.5880126953125 C16.474000930786133,374.35101318359375 0.7310000061988831,314.2640075683594 0,280.9219970703125 C0.26899999380111694,280.6549987792969 0.22699999809265137,279.04901123046875 0.14399999380111694,275.843994140625 C0.08299999684095383,273.49798583984375 0,270.2969970703125 0,266.1369934082031 C0,121.52400207519531 116.50199890136719,0 256.72100830078125,0 C330.1789855957031,0 397.1310119628906,30.663999557495117 453.0360107421875,88.71199798583984z"></path></g></g></g><g class="png" clip-path="url(#__lottie_element_35)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g><g class="png" clip-path="url(#__lottie_element_28)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g></g></g></g></svg>
                  <svg id="notlike${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 94" width="90" height="94" preserveAspectRatio="xMidYMid meet" style="display:none; width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_18"><rect width="90" height="94" x="0" y="0"></rect></clipPath><clipPath id="__lottie_element_20"><path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path></clipPath><clipPath id="__lottie_element_24"><path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path></clipPath><clipPath id="__lottie_element_28"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_35"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_42"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_52"><path d="M0,0 L168,0 L168,168 L0,168z"></path></clipPath><clipPath id="__lottie_element_56"><path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path></clipPath><clipPath id="__lottie_element_60"><path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_67"><path d="M0,0 L1200,0 L1200,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_74"><path d="M0,0 L1200,0 L1200,1000 L0,1000z"></path></clipPath><clipPath id="__lottie_element_84"><path d="M0,0 L120,0 L120,120 L0,120z"></path></clipPath></defs><g clip-path="url(#__lottie_element_18)"><g clip-path="url(#__lottie_element_52)" transform="matrix(0.5250066518783569,0,0,0.5250066518783569,1.0244407653808594,8.821273803710938)" opacity="1" style="display: block;"><g clip-path="url(#__lottie_element_56)" transform="matrix(0.10000000149011612,0,0,0.10000000149011612,0,0)" opacity="1" style="display: block;"><g style="display: none;"><g><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g clip-path="url(#__lottie_element_84)" style="display: none;"><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g></g><g class="png" clip-path="url(#__lottie_element_74)" transform="matrix(1,0,0,1,240,340)" opacity="1" style="display: block;"><g transform="matrix(1,0,0,1,154.5,92)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,0,0)" fill-opacity="1" d=" M453.0360107421875,88.71199798583984 C493.77398681640625,30.663999557495117 560.6599731445312,0 634.2509765625,0 C774.4030151367188,0 890.9719848632812,121.58999633789062 890.9719848632812,266.1369934082031 C890.9719848632812,266.1549987792969 890.9719848632812,266.1730041503906 890.9719848632812,266.1910095214844 C890.9810180664062,266.1709899902344 890.9910278320312,266.1510009765625 891,266.1310119628906 C891,270.25201416015625 890.9299926757812,273.37200927734375 890.8779907226562,275.6679992675781 C890.8060302734375,278.8190002441406 890.77001953125,280.4159851074219 891,280.9159851074219 C890.468994140625,311.3190002441406 885.2219848632812,336.43798828125 875.8989868164062,369.62799072265625 C870.6090087890625,375.5880126953125 865.6939697265625,386.81201171875 860.7979736328125,399.1990051269531 C853.073974609375,411.1969909667969 850.1510009765625,417.0090026855469 845.697021484375,428.7699890136719 C841.1519775390625,436.39898681640625 836.323974609375,444.06298828125 831.2449951171875,451.7439880371094 C793.7960205078125,508.54400634765625 743.7080078125,565.073974609375 693.6669921875,615.2520141601562 C615.3359985351562,694.2769775390625 535.5440063476562,760.0579833984375 500.8320007324219,788.6749877929688 C491.24700927734375,796.5759887695312 485.1000061035156,801.6439819335938 483.3680114746094,803.375 C471.0669860839844,815.677978515625 458.7650146484375,815.9860229492188 446.4630126953125,815.9940185546875 C446.1390075683594,815.9979858398438 445.8139953613281,816 445.4859924316406,816 C420.25,816 407.6319885253906,803.3809814453125 395.0140075683594,790.7630004882812 C394.0509948730469,789.7999877929688 391.60101318359375,787.7789916992188 387.8580017089844,784.7830200195312 C349.625,756.5999755859375 263.58599853515625,687.7860107421875 182.74200439453125,604.7830200195312 C121.06600189208984,542.02001953125 61.62200164794922,470.0069885253906 29.091999053955078,399.5880126953125 C16.474000930786133,374.35101318359375 0.7310000061988831,314.2640075683594 0,280.9219970703125 C0.26899999380111694,280.6549987792969 0.22699999809265137,279.04901123046875 0.14399999380111694,275.843994140625 C0.08299999684095383,273.49798583984375 0,270.2969970703125 0,266.1369934082031 C0,121.52400207519531 116.50199890136719,0 256.72100830078125,0 C330.1789855957031,0 397.1310119628906,30.663999557495117 453.0360107421875,88.71199798583984z"></path></g></g></g><g class="png" clip-path="url(#__lottie_element_67)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g><g class="png" clip-path="url(#__lottie_element_60)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g></g></g><g clip-path="url(#__lottie_element_20)" style="display: none;" transform="matrix(0.05356041342020035,0,0,0.05356041342020035,0.03553009033203125,8.32037353515625)" opacity="1"><g clip-path="url(#__lottie_element_24)" style="display: block;" transform="matrix(1,0,0,1,0,0)" opacity="1"><g style="display: none;"><g><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g class="png" clip-path="url(#__lottie_element_42)" style="display: block;" transform="matrix(1,0,0,1,340,340)" opacity="1"><g style="display: block;" transform="matrix(1,0,0,1,54.5,92)" opacity="0.9500000000000001"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,0,0)" fill-opacity="1" d=" M453.0360107421875,88.71199798583984 C493.77398681640625,30.663999557495117 560.6599731445312,0 634.2509765625,0 C774.4030151367188,0 890.9719848632812,121.58999633789062 890.9719848632812,266.1369934082031 C890.9719848632812,266.1549987792969 890.9719848632812,266.1730041503906 890.9719848632812,266.1910095214844 C890.9810180664062,266.1709899902344 890.9910278320312,266.1510009765625 891,266.1310119628906 C891,270.25201416015625 890.9299926757812,273.37200927734375 890.8779907226562,275.6679992675781 C890.8060302734375,278.8190002441406 890.77001953125,280.4159851074219 891,280.9159851074219 C890.468994140625,311.3190002441406 885.2219848632812,336.43798828125 875.8989868164062,369.62799072265625 C870.6090087890625,375.5880126953125 865.6939697265625,386.81201171875 860.7979736328125,399.1990051269531 C853.073974609375,411.1969909667969 850.1510009765625,417.0090026855469 845.697021484375,428.7699890136719 C841.1519775390625,436.39898681640625 836.323974609375,444.06298828125 831.2449951171875,451.7439880371094 C793.7960205078125,508.54400634765625 743.7080078125,565.073974609375 693.6669921875,615.2520141601562 C615.3359985351562,694.2769775390625 535.5440063476562,760.0579833984375 500.8320007324219,788.6749877929688 C491.24700927734375,796.5759887695312 485.1000061035156,801.6439819335938 483.3680114746094,803.375 C471.0669860839844,815.677978515625 458.7650146484375,815.9860229492188 446.4630126953125,815.9940185546875 C446.1390075683594,815.9979858398438 445.8139953613281,816 445.4859924316406,816 C420.25,816 407.6319885253906,803.3809814453125 395.0140075683594,790.7630004882812 C394.0509948730469,789.7999877929688 391.60101318359375,787.7789916992188 387.8580017089844,784.7830200195312 C349.625,756.5999755859375 263.58599853515625,687.7860107421875 182.74200439453125,604.7830200195312 C121.06600189208984,542.02001953125 61.62200164794922,470.0069885253906 29.091999053955078,399.5880126953125 C16.474000930786133,374.35101318359375 0.7310000061988831,314.2640075683594 0,280.9219970703125 C0.26899999380111694,280.6549987792969 0.22699999809265137,279.04901123046875 0.14399999380111694,275.843994140625 C0.08299999684095383,273.49798583984375 0,270.2969970703125 0,266.1369934082031 C0,121.52400207519531 116.50199890136719,0 256.72100830078125,0 C330.1789855957031,0 397.1310119628906,30.663999557495117 453.0360107421875,88.71199798583984z"></path></g></g></g><g class="png" clip-path="url(#__lottie_element_35)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g><g class="png" clip-path="url(#__lottie_element_28)" style="display: none;"><g style="display: none;"><g><path></path></g></g></g></g></g></g></svg>
                  <div class="number">${(Math.random() * 100).toFixed(1)}w</div>
                </div>
                <div class="comment" id="comment${index}">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 99" width="99" height="99" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_106"><rect width="99" height="99" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_106)"><g transform="matrix(0.6616870760917664,0,0,0.6616870760917664,76.31503295898438,52.850440979003906)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(3,0,0,3,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M-4.644999980926514,4.482999801635742 C-7.25,7.818999767303467 -13.482000350952148,8.300000190734863 -13.482000350952148,8.300000190734863 C-13.482000350952148,8.300000190734863 -14.413999557495117,11.48799991607666 -12.135000228881836,10.821000099182129 C-9.855999946594238,10.154000282287598 -7.25,8.152000427246094 -4.644999980926514,4.482999801635742z M-17.36,-1.04 C-17.36,-0.16 -18.07,0.56 -18.96,0.56 C-18.96,0.56 -18.96,0.56 -18.96,0.56 C-19.85,0.56 -20.57,-0.16 -20.57,-1.04 C-20.57,-1.92 -19.85,-2.64 -18.96,-2.64 C-18.07,-2.64 -17.36,-1.92 -17.36,-1.04z M-11.89,-1.04 C-11.89,-0.16 -12.61,0.56 -13.5,0.56 C-13.5,0.56 -13.5,0.56 -13.5,0.56 C-14.39,0.56 -15.11,-0.16 -15.11,-1.04 C-15.11,-1.92 -14.39,-2.64 -13.5,-2.64 C-12.61,-2.64 -11.89,-1.92 -11.89,-1.04z M-6.43,-1.04 C-6.43,-0.16 -7.15,0.56 -8.04,0.56 C-8.04,0.56 -8.04,0.56 -8.04,0.56 C-8.92,0.56 -9.64,-0.16 -9.64,-1.04 C-9.64,-1.92 -8.92,-2.64 -8.04,-2.64 C-7.15,-2.64 -6.43,-1.92 -6.43,-1.04z M-5.79,5.98 C-3.56,3.75 -2.25,1.42 -2.25,-1.29 C-2.25,-6.79 -7.29,-11.25 -13.5,-11.25 C-19.71,-11.25 -24.75,-6.79 -24.75,-1.29 C-24.75,4.21 -19.55,7.99 -13.34,7.99 C-13.34,7.99 -13.34,11.06 -13.34,11.06 C-13.34,11.06 -8.51,8.72 -5.79,5.98z"></path><g opacity="1" transform="matrix(1,0,0,1,-6.75,-7.456999778747559)"><g opacity="1" transform="matrix(-1,0,0,1,0,0)"></g><g opacity="1" transform="matrix(-1,0,0,1,0,0)"></g><g opacity="1" transform="matrix(-1,0,0,1,0,0)"></g><g opacity="1" transform="matrix(-1,0,0,1,0,0)"></g></g></g></g></g></svg>
                  <div class="number">${parseInt(Math.random() * 9999)}</div>
                </div>
                <div class="share" id="share${index}">`
            +
            (autonext ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 99" width="99" height="99" preserveAspectRatio="xMidYMid meet" style="display:block; width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_198"><rect width="99" height="99" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_198)"><g transform="matrix(0.640035092830658,0,0,0.640035092830658,49.20100021362305,52.64933395385742)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(3,0,0,3,0,0)"><path fill="rgb(255,0,0)" fill-opacity="1" d=" M0.8149999976158142,4.76200008392334 C0.8149999976158142,4.76200008392334 0.8149999976158142,-4.929999828338623 0.8149999976158142,-4.929999828338623 C0.8149999976158142,-4.929999828338623 -5.2179999351501465,-5.49399995803833 -9.244999885559082,-1.1749999523162842 C-13.272000312805176,3.1440000534057617 -13.517000198364258,11.817000389099121 -10.842000007629395,7.74399995803833 C-8.062000274658203,3.510999917984009 0.8149999976158142,4.76200008392334 0.8149999976158142,4.76200008392334z M10.514378547668457,2.995445728302002 C12.168766021728516,1.5337685346603394 12.21668815612793,-0.8918964862823486 10.621323585510254,-2.4177768230438232 C10.621323585510254,-2.4177768230438232 3.705676317214966,-9.032222747802734 3.705676317214966,-9.032222747802734 C2.110311985015869,-10.558103561401367 0.8149999976158142,-10.263825416564941 0.8149999976158142,-8.375499725341797 C0.8149999976158142,-8.375499725341797 0.8149999976158142,-4.953999996185303 0.8149999976158142,-4.953999996185303 C0.8240000009536743,1.8849999904632568 0.8149999976158142,1.0850000381469727 0.8149999976158142,1.0850000381469727 C0.8149999976158142,3.292600154876709 0.8149999976158142,6.536843776702881 0.8149999976158142,8.324999809265137 C0.8149999976158142,8.324999809265137 0.8149999976158142,8.324999809265137 0.8149999976158142,8.324999809265137 C0.8149999976158142,10.113155364990234 2.158234119415283,10.378231048583984 3.812621593475342,8.916553497314453 C3.812621593475342,8.916553497314453 10.514378547668457,2.995445728302002 10.514378547668457,2.995445728302002z"></path></g></g></g></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 99" width="99" height="99" preserveAspectRatio="xMidYMid meet" style="display:block; width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_198"><rect width="99" height="99" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_198)"><g transform="matrix(0.640035092830658,0,0,0.640035092830658,49.20100021362305,52.64933395385742)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(3,0,0,3,0,0)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M0.8149999976158142,4.76200008392334 C0.8149999976158142,4.76200008392334 0.8149999976158142,-4.929999828338623 0.8149999976158142,-4.929999828338623 C0.8149999976158142,-4.929999828338623 -5.2179999351501465,-5.49399995803833 -9.244999885559082,-1.1749999523162842 C-13.272000312805176,3.1440000534057617 -13.517000198364258,11.817000389099121 -10.842000007629395,7.74399995803833 C-8.062000274658203,3.510999917984009 0.8149999976158142,4.76200008392334 0.8149999976158142,4.76200008392334z M10.514378547668457,2.995445728302002 C12.168766021728516,1.5337685346603394 12.21668815612793,-0.8918964862823486 10.621323585510254,-2.4177768230438232 C10.621323585510254,-2.4177768230438232 3.705676317214966,-9.032222747802734 3.705676317214966,-9.032222747802734 C2.110311985015869,-10.558103561401367 0.8149999976158142,-10.263825416564941 0.8149999976158142,-8.375499725341797 C0.8149999976158142,-8.375499725341797 0.8149999976158142,-4.953999996185303 0.8149999976158142,-4.953999996185303 C0.8240000009536743,1.8849999904632568 0.8149999976158142,1.0850000381469727 0.8149999976158142,1.0850000381469727 C0.8149999976158142,3.292600154876709 0.8149999976158142,6.536843776702881 0.8149999976158142,8.324999809265137 C0.8149999976158142,8.324999809265137 0.8149999976158142,8.324999809265137 0.8149999976158142,8.324999809265137 C0.8149999976158142,10.113155364990234 2.158234119415283,10.378231048583984 3.812621593475342,8.916553497314453 C3.812621593475342,8.916553497314453 10.514378547668457,2.995445728302002 10.514378547668457,2.995445728302002z"></path></g></g></g></svg>`
            ) +
            `</div>
                <div class="more" id="more${index}">
                  <svg width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 36 36"><path d="M13.556 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM19.778 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM24.222 19.556a1.778 1.778 0 100-3.556 1.778 1.778 0 000 3.556z" fill="#fff"></path></svg>
                </div>
              </div>
          </div>`;
        },
      },
      on: {
        init: function(){
          bind_evt(this.activeIndex);
          bind_evt(this.activeIndex+1);
          //video_check(this.activeIndex);
          video = document.getElementById("video" + this.activeIndex);
          video && video.src && video.readyState >= 1 && video.play();
        },
        slideChangeTransitionEnd: function () {
          console.log("now_index    = ", this.activeIndex)
          console.log("all_node_num = ", this.virtual.slides.length)
          console.log("now_node     = ", this.virtual.slides[this.activeIndex])
          
          //取消播放上一个视频
          var video = document.getElementById("video" + this.previousIndex);
          video && video.pause && video.pause();

          //播放
          //video_check(this.activeIndex);
          video = document.getElementById("video" + this.activeIndex);
          video && video.src && video.readyState >= 1 && video.play();

          //自动追加一个新视频
          if (this.isEnd) {
            var i = parseInt(Math.random() * srclist.length);
            var node = locked ? lock_node : srclist[i];//锁定的node or 随机选择一个
            console.log("next_node    = ",node);
            this.virtual.appendSlide(node);
            this.virtual.update();
            bind_evt(this.activeIndex+1);
          }

        },
      },
    });

    //绑定操作
    function bind_evt(idx){
      var error_cnt = 0;
      var video = document.getElementById("video" + idx);
      video.onended = function video_onended() {
        if (autonext) {
          swiper && swiper.slideNext();
        } else {
          var idx = swiper && swiper.activeIndex;
          var video = document.getElementById("video" + idx);
          video && video.play();
        }
      };
      video.oncanplay = function(){console.log("oncanplay",idx)};

      /* 一上来就会触发一次，实测第二次触发时才是真的error */
      video.onerror = function change_videosrc(){
        console.log("onerror",idx,error_cnt++);
        if(error_cnt >= 2){
          var i = parseInt(Math.random() * srclist.length);
          var slide = locked ? lock_node : srclist[i];//锁定的node or 随机选择一个
          console.log("change_videosrc",slide);
          if (slide.spurl) {
            httpRequest(slide.spurl + Math.random(), idx, testcallback2);
          }
          else if (slide.requrl) {
            httpRequest(slide.requrl + Math.random(), idx, testcallback);
          }
        }
      };

      document.getElementById("homepage" + idx).onclick = function homepage() {
        locked = !locked;
        if (locked) {
          console.log("lock_node    = ", swiper.virtual.slides[swiper.activeIndex])
          lock_node = swiper.virtual.slides[swiper.activeIndex];
          //changeslide(swiper.activeIndex+1);
        }
        else {
          lock_node = null;
        }
        mui.alert(locked ? "只看该作者功能开启" : "只看该作者功能关闭")
      };
      document.getElementById("follow" + idx).onclick = function follow() {
        mui.alert("[关注功能] 敬请期待")
      };
      document.getElementById("like" + idx).onclick = function like() {
        var idx = swiper && swiper.activeIndex;
        var i = (idx == 0) ? 0 : 1;
        var src = $(".video")[i].src;
        $(".like svg")[i * 2].style.display = "none";
        $(".like svg")[i * 2 + 1].style.display = "block";
        like_list.push(src);
        //保存到localstorage
        var val = JSON.stringify(like_list);
        localStorage.setItem("douyin_like_item", val);
      };
      document.getElementById("notlike" + idx).onclick = function notlike(){
        var idx = swiper && swiper.activeIndex;
        var i = (idx == 0) ? 0 : 1;
        var src = $(".video")[i].src;
        $(".like svg")[i * 2].style.display = "block";
        $(".like svg")[i * 2 + 1].style.display = "none";
        like_list = like_list.filter(x => x && x != src);
        //保存到localstorage
        var val = JSON.stringify(like_list);
        localStorage.setItem("douyin_like_item", val);
      };
      document.getElementById("comment" + idx).onclick = function comment() {
        mui.alert("[评论功能] 敬请期待")
      };
      document.getElementById("share" + idx).onclick = function share() {
        autonext = !autonext;
        mui.alert(autonext ? "连播功能开启" : "连播功能关闭")
      };
      document.getElementById("more" + idx).onclick = function more() {
        mui.alert("[更多功能] 敬请期待")
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
      var video = document.getElementById("video" + idx);
      if (video && video.src && video.readyState >= 1) {
        //cnt && 
        console.log(`视频${idx}可以播放了(networkState=${video.networkState},readyState=${video.readyState})`)
        video.play();
      }
      else if (cnt < 3) {
        console.log(`视频${idx}无法播放(networkState=${video.networkState},readyState=${video.readyState}),等待${3 - cnt}s`)
        cnt += 1;
        setTimeout(video_check(idx,cnt), 1000)
      }
      else {
        console.log(`视频${idx}无法播放(networkState=${video.networkState},readyState=${video.readyState})，切换下一个`)
        autonext && swiper.slideNext();
        //changeslide(idx);//移除这个不可用的slide[idx]
      }
    }
    //请求真实地址
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
    function testcallback(xhr, requrl, index) {
      var rsptext = xhr.responseText;
      fixurl = rsptext.startsWith("//") ? ("http:" + rsptext) :      // "https://jiejie.uk/xjj/get/get0.php" 存在"//"开头的url
        rsptext.startsWith("https:http") ? rsptext.slice(6) :          // "https://jiejie.uk/xjj/get/get4.php" 存在这种错误的url
          rsptext.startsWith("http:http") ? rsptext.slice(5) :
            rsptext.startsWith("https://") ? rsptext :
              rsptext.startsWith("http://") ? rsptext :
                "http://" + rsptext;
      console.log("requrl=",requrl,"\nrsptext=", fixurl);
      var video = document.getElementById("video" + index);
      video && (video.src = fixurl);
    }
    function testcallback2(xhr, requrl, index) {
      console.log("requrl=",requrl,"\n302url=", xhr.responseURL);
      var video = document.getElementById("video" + index);
      video && (video.src = xhr.responseURL);
    }
    function testcallback3(xhr, requrl, index) {
      var idx = index < 2 ? index : 2;
      var desc = $(".desc_title")[idx];
      desc && (desc.innerText = xhr.responseText);
    }
    
})