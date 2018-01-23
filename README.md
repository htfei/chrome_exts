# chrome浏览器插件开发demo合集

## 可食用插件
项目名|简介|使用的技术
-|-|-
my_rightkey_plus | 可以自定义的右键搜索 |localStorage,contextMenus,扩展通信
WebPage_Marker|对网页进行拉黑、收藏、打标签|localStorage,contextMenus

## 油猴脚本

项目名|简介|使用的技术
-|-|-
光谷社区优化 | 回复列表改为盖楼形式 |无
绝对领域图片提取| 点击下载主内容区图片，避免下载其他区域杂图|无
下载选中区图片| 对上个脚本的改进版，可自定义区域，适配任何网站| localStorage


## 学习demo

以下示例来自于[《Chrome扩展及应用开发（首发版）》](http://www.ituring.com.cn/book/1421)的[附带源码](https://github.com/Sneezry/chrome_extensions_and_apps_programming)，有部分修改及新增项目

项目名|简介|使用的技术
-|-|-
my_clock|用popup页面动态显示当前时间|无(最基础的demo)
cannot_touch|永远点不到的按钮|content_scripts直接操作用户DOM
what_is_my_ip|查看我的IP|permissions声明跨域请求
website_status|显示当前能否访问google|background后台自动执行
weather|天气预报|options_page,"localStorage",permissions
扩展通信*3`(add)`|popup/background与content互相通信的demo|`注意chrome_ext页面发消息到content页面需要指定tabid`
google_translate|选中单词后右键使用google翻译|background,content_scripts
notifications`(add)`|windows桌面弹窗消息| "notifications"
usd_price|地址栏（默认建议）| "omnibox"
标签`(add)`|列出常用的标签操作demo| "tabs","activeTab"
save_all_images|点击右键选项下载当前页面所有图片| "downloads","contextMenus",`activeTab(注意其用法)`
