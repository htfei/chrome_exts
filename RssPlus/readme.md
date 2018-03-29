# 万物皆可订阅！

## 功能

订阅rss源，指定页面区域，微信公众号，天气预报，比特币，股票黄金等第三方API接口

- [x] 订阅rss-feed,订阅指定页面区域 (ps:通过 feed43.com 转化为rss)
- [ ] 订阅atom-feed
- [ ] 微信公众号
- [ ] 知乎

## 使其更好用的需求

- [ ] 导入导出opml文件
- [ ] 增删改feed功能
- [ ] 自动识别页面feed功能
- [x] 目录分类
- [ ] 收藏功能
- [x] 标记已读
- [ ] 自定义配置功能（众多设置项）
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