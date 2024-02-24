# RssPlus 万物皆可订阅！

![image](http://ww1.sinaimg.cn/large/0071ouepgy1fucs4f190sj30820enq34.jpg)
![image](http://ww1.sinaimg.cn/large/0071ouepgy1fucs5lqyb7j30820hbq3a.jpg)
![image](http://oyozv8xwp.bkt.clouddn.com/18-9-5/68508489.jpg)
![image](http://oyozv8xwp.bkt.clouddn.com/18-9-5/39593228.jpg)
![image](http://oyozv8xwp.bkt.clouddn.com/18-9-5/67230309.jpg)

## 基本功能

- [x] 增删查改rss源
- [x] 导入导出opml文件
- [x] 自动识别当前页面的rss源(支持rss,atom)
- [x] 为rss源进行目录分类
- [x] 标记已读功能
- [ ] 收藏功能
- [x] 自动/手动刷新rss源功能

### 个性化功能

- [x] 自定义rss源的标题,图标
- [ ] 优化特殊分组页面(追剧组,直播组,股票组,政策组等)
- [ ] 通知提醒功能（主播上线了,番剧更新了等:支持分组提醒，单个源设置提醒，支持某个时间段内提醒or不提醒）
- [ ] 在单独的网页中浏览功能（类似目前的关于页面）
- [ ] 为rsshub支持的网站设置提醒（类似：本网站支持通过rsshub生成rss源,后期可考虑直接显示rsshub生成的rss源）

### 优化体验（无关痛痒）的自定义设置及待完成任务

- [x] 设置后台rss源检查时间间隔（默认60分钟）
- [x] 设置一次加载的items数量（默认10条）
- [x] 设置加载未读 or 加载全部（默认只加载未读）
- [x] 设置是否加载详情（默认开启,关闭则只显示标题）
- [x] 设置popup页面大小
- [x] 目录重命名功能
- [ ] 标题栏顶层浮动
- [ ] 将本页上面的两个丑图换成动态图
- [ ] 图标优先采用自定义,若无则采用rss源自带,若无则采用hostname图标,若无则采取默认插件图标

## 关于rss源的获取

本插件支持自动检测当前页面的rss源,识别成功则图标上有个加号,点击[添加]按钮即可进入添加页面，选择自己需要的进行添加即可。

关于更多的订阅源,推荐使用 [RssHub](https://docs.rsshub.app/#%E9%B8%A3%E8%B0%A2) or Feed43

>RssHub目前已经很强大，支持微信公众号，知乎等众多网站转rss，当然也可以继续使用feed43转rss,本插件针对2者均做了特殊处理(feed43自动去除小尾巴,rsshub非标准的rss兼容处理)

天气预报，比特币，股票黄金等第三方API接口目前不打算做，因为每家api的都不同,有定制化需求再考虑。

## 使用方法

1. 点击图标，弹出各个RSS源的列表，并显示各个源的更新数量
2. 点击某一个RSS源项，加载rss条目
3. 点击条目，新标签页中打开内容

## 其他问题

### 如何删除RSS源？修改websql中的一些数据？

数据均保存在websql中，可在C:\Users\Administrator\AppData\Local\Google\Chrome\User Data\Default\databases目录下找到扩展对应的websql文件，使用Navicat等数据库软件以sqlite打开即可增删查改。

### 滚动条太丑怎么办？

打开chrome://flags/#overlay-scrollbars ，启用它。

### 跟换图标时提示无效，报Icon invalid.错误？

图片过大可能会导致报Icon invalid.错误。换成小图标解决。
