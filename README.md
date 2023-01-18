# 文首

关键字：[ 2022 / 10 / 白噪音 / 自己的项目 / 重构 ]

为什么：以前的项目比较乱、自己有了新的想法

如何做：设计稿、需求分析、框架选择、编码

相关内容：暂无

# 文干

## 为什么做

手机端有很多白噪音的软件，如 小米白噪音、潮汐，但是他们只能在手机端用，并且音源是固定的，而且不支持多轨。

PC 网页端也有不少白噪音工具，但是很多不支持自定义音源，也没有提供多轨。

想了想需求之后，自己打算做一个网页版的白噪音工具。

2020 年底自己就和朋友一起做了一版，而且断断续续迭代过几次，但是那一版有很多问题，比较粗糙：

1. 很多东西都是写定的，如音源是内置的，想换就只能重新构建代码，比较麻烦
2. 界面设计也比较一般，没有设计稿，直接用的 vuetify 作为 ui 库
3. 项目代码也比较零散，当时是为了是为了熟悉框架和技术

所以新的白噪音工具，基本上是围绕上面的问题进行了一系列重构：

1. 提供自定义音源，并且将添加的音源保存到本地
2. 重新设计了界面和交互

## 有什么用

### 现在

1. 支持多轨播放
2. 支持自定义导入音源，目前只支持通过链接的方式导入
3. 支持音源本地持久化
4. 内置按照季节、时段切换的背景图

### 未来

- [ ] 支持定时，类似于番茄时间
- [ ] 支持简单的数据分析
- [ ] 支持自定义背景图

[详见 CHANGELOG](https://github.com/catx1726/White-Noise-Code/blob/refactor/CHANGELOG.md)

## 如何用

### 自定义音源

因为是本地存储，所以目前仅支持通过链接的形式新增音源；

如何获得链接：

1. 打开 [freesound](https://freesound.org/) 网页
2. 打开 web 开发者工具
3. 找到 网络监视器
4. 将显示项选择为 媒体

同理也可以拿到 QQ 音乐、网易云等音乐播放器的歌曲链接进行添加

## 相关工具和网站

- 代码托管在 [GitHub ](https://github.com/catx1726/White-Noise-Code)
- 内置音源来自 [freesound](https://freesound.org/)
- 内置图片素材来自 [故宫博物馆](https://www.dpm.org.cn/lights/royal.html)
- 古诗推荐来自 [今日诗词](https://www.jinrishici.com/doc/)

## 相关说明

网站用于学习、交流，无商用、无盈利，如有侵权劳烦[联系作者](https://github.com/catx1726/White-Noise-Code)删除

你也可以通过 微信: MengSheng317 联系我

# 文末

初完于 2022-10-05 19:09

二改于 2022-10-07 13:23

三改于 2023-01-18 22:16
