# 万物皆可订阅！

## 功能

订阅rss源，指定页面区域，微信公众号，天气预报，比特币，股票黄金等第三方API接口

- [x] 订阅rss-feed
- [x] 订阅指定页面区域 (ps:通过 feed43.com 转化为rss)
- [x] 订阅atom-feed
- [ ] 微信公众号
- [ ] 知乎

## 使其更好用的需求

- [ ] 导入导出opml文件
- [x] 增删改feed功能
- [x] 自动识别页面feed功能
- [x] 目录分类
- [ ] 收藏功能
- [x] 标记已读
- [x] 自定义配置功能（众多设置项）
- [x] 后台自动刷新，手动刷新feed功能

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

## 日志

### 2018.05.01 新增当前页面的rss源检测功能

1. content.js检测到后通知background.js，由后者存入localstorage;
2. 待用户加载popup页面后点击添加，新标签打开添加页面，
3. 添加页面读取localstorage中新的rss列表，显示在页面上，提供给用户添加。
4. 点击“添加”按钮，则将对应rss存入websql。
5. 刷新popup页面即可看到新增的rss，可通过设置页面对其进一步修改配置。

### 2018.08.09

1. 新增rss源图标显示
2. 界面优化调整

### 2018.08.11

>>TODO:

    feed43生成的rss，帖子类型的一个帖子会生成多条item,应该改为1个item;(问题发现于：光谷社区，地铁族 的rss消息众多有重复)(尝试使用item.guid解决)
        将url中#后面的内容去掉即可，已改动完毕。
    直接在chrome中调试xml;
    rss标准解析库的发现与使用;
