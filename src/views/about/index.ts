export const AboutMD = `
<h1 id="文首">文首</h1>
<p>关键字：[ 2022 / 10 / 白噪音 / 自己的项目 / 重构 ]</p>
<p>为什么：以前的项目比较乱、自己有了新的想法</p>
<p>如何做：设计稿、需求分析、框架选择、编码</p>
<p>相关内容：暂无</p>
<h1 id="文干">文干</h1>
<h2 id="为什么做">为什么做</h2>
<p>手机端有很多白噪音的软件，如 小米白噪音、潮汐，但是他们只能在手机端用，并且音源是固定的，而且不支持多轨。</p>
<p>PC 网页端也有不少白噪音工具，但是很多不支持自定义音源，也没有提供多轨。</p>
<p>想了想需求之后，自己打算做一个网页版的白噪音工具。</p>
<p>2020 年底自己就和朋友一起做了一版，而且断断续续迭代过几次，但是那一版有很多问题，比较粗糙：</p>
<ol>
<li>很多东西都是写定的，如音源是内置的，想换就只能重新构建代码，比较麻烦</li>
<li>界面设计也比较一般，没有设计稿，直接用的 vuetify 作为 ui 库</li>
<li>项目代码也比较零散，当时是为了是为了熟悉框架和技术</li>
</ol>
<p>所以新的白噪音工具，基本上是围绕上面的问题进行了一系列重构：</p>
<ol>
<li>提供自定义音源，并且将添加的音源保存到本地</li>
<li>重新设计了界面和交互</li>
</ol>
<h2 id="有什么用">有什么用</h2>
<h3 id="现在">现在</h3>
<ol>
<li>支持多轨播放</li>
<li>支持自定义导入音源，目前只支持通过链接的方式导入</li>
<li>支持音源本地持久化</li>
<li>内置按照季节、时段切换的背景图</li>
</ol>
<h3 id="未来">未来</h3>
<ul>
<li><input disabled="" type="checkbox"> 支持定时，类似于番茄时间</li>
<li><input disabled="" type="checkbox"> 支持简单的数据分析</li>
<li><input disabled="" type="checkbox"> 支持自定义背景图</li>
</ul>
<h2 id="如何用">如何用</h2>
<h3 id="自定义音源">自定义音源</h3>
<p>因为是本地存储，所以目前仅支持通过链接的形式新增音源；</p>
<p>如何获得链接：</p>
<ol>
<li>打开 <a href="https://freesound.org/">freesound</a> 网页</li>
<li>打开 web 开发者工具</li>
<li>找到 网络监视器</li>
<li>将显示项选择为 媒体</li>
</ol>
<p>同理也可以拿到 QQ 音乐、网易云等音乐播放器的歌曲链接进行添加</p>
<h2 id="相关工具和网站">相关工具和网站</h2>
<ul>
<li>代码托管在 <a href="https://github.com/catx1726/White-Noise-Code">GitHub </a></li>
<li>内置音源来自 <a href="https://freesound.org/">freesound</a></li>
<li>内置图片素材来自 <a href="https://www.dpm.org.cn/lights/royal.html">故宫博物馆</a></li>
<li>古诗推荐来自 <a href="https://www.jinrishici.com/doc/">今日诗词</a></li>
</ul>
<h2 id="相关说明">相关说明</h2>
<p>网站用于学习、交流，无商用、无盈利，如有侵权劳烦<a href="https://github.com/catx1726/White-Noise-Code">联系作者</a>删除</p>
<p>你也可以通过 微信: MengSheng317 联系我</p>
<h1 id="文末">文末</h1>
<p>初完于 2022-10-05 19:09</p>
<p>二改于 2022-10-07 13:30</p>

`
