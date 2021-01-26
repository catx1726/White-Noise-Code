# White-Noise-Site - DOC

> [toc]

# Readme

## 创建 Readme 的初心

本来打算就简单的当作一个 CHANGELOG 来使用，但是考虑再三不想多一个或者几个文件，就把 Readme 也集中到这里。

## 创建 White-Noise-Site 的初心

-   使用工具
-   创造产品
-   产生价值
-   自找有趣

## 如何写 CHANGELOG

> "如何写 CHANGE-LOG"

# Unreleased

## FEAT - 新功能

-   增加 重置 按钮
-   将 播放 界面提升至全局

## PERF - 优化

### 交互优化

-   音源选取页面调整
-   背景图没加载完的时候，用一张图片替代
-   将现在的切换图片的变成 Slide 模式，或者将其背景变成视频

### 加载速度优化

-   使用 cloundflare 加速
-   ~~使用 coding + GitHub 模式~~

# Release

## V0.000009 - 2021-1-25_26

### PERF

-   优化，滚动条尽量"隐藏"
-   优化，代码结构，在 asstes 文件中，按照规范，增加了 components / utils / normalize
-   优化，图片全部传到图床上，因为 GitHub 加载实在太慢
-   优化，使用 cloudflare 代理，阿里云域名设置了两个 DNS 解析，阿里负责国内，cloundflare 负责国外，不过感觉没多大用..可能是方式不对，没有使用 coding pages + github pages ，因为 coding 和腾讯合作之后开始收费了(SSL)
