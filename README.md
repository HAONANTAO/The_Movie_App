<!--
 * @Date: 1985-10-26 18:15:00
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 20:46:08
 * @FilePath: /The_Movie_App/README.md
-->

React Native
Expo 框架
NativeWind(like tailwindcss)
appwrite 后端
TMDB movies api
self customize hooks
Backend as service (BaaS)
figma UI:https://www.figma.com/design/c6NHYQem8G59odVSijIjl2/Movie-App-w%2F-React-Native?node-id=2-2&p=f&t=SXO5s1fyoOvB6g4S-0
Youtube:https://www.youtube.com/watch?v=f8Z9JyB2EIE&t=44s

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 初始化 Expo 项目

1. 确保你的开发环境已经安装了以下工具：

   - [Node.js](https://nodejs.org/) (推荐使用 LTS 版本)
   - npm (Node.js 安装时会自动安装)

2. 全局安装 Expo CLI：

   ```bash
   npm install -g expo-cli
   ```

3. 创建新的 Expo 项目：

   ```bash
   npx create-expo-app your-app-name
   cd your-app-name
   ```

4. 选择项目模板：
   - 在创建过程中，你可以选择不同的项目模板
   - 推荐新手选择 blank (TypeScript)模板，它提供了一个干净的 TypeScript 启动环境

## 在手机上使用 Expo Go

1. 在你的手机上安装 Expo Go 应用：

   - [Android 版本](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS 版本](https://apps.apple.com/app/expo-go/id982107779)

2. 确保你的手机和电脑在同一个 WiFi 网络下

3. 在项目目录下启动开发服务器：

   ```bash
   npx expo start
   ```

4. 使用 Expo Go 扫描二维码：

   - Android：直接在 Expo Go 应用中扫描终端显示的二维码
   - iOS：使用相机应用扫描二维码，然后点击弹出的通知

5. 开发提示：
   - 保存代码变更后，应用会自动重新加载
   - 在设备上摇晃可以打开开发者菜单
   - 如果连接出现问题，可以尝试使用 tunnel 连接方式：`npx expo start --tunnel`

## 项目结构说明

项目采用了 Expo 的标准目录结构，主要包含以下目录：

### app 目录

- 应用的主要路由和页面文件
- `_layout.tsx`：应用的根布局组件
- `(tabs)`：包含底部标签栏相关的页面
  - `_layout.tsx`：标签栏的布局配置
  - `index.tsx`：首页内容
  - `explore.tsx`：探索页面

### assets 目录

- 存放应用的静态资源文件
- `fonts`：自定义字体文件
- `images`：应用图标、启动图和其他图片资源

### components 目录

- 可复用的 React 组件
- `Collapsible.tsx`：可折叠内容组件
- `ExternalLink.tsx`：外部链接组件
- `HapticTab.tsx`：带触感反馈的标签组件
- `HelloWave.tsx`：波浪动画组件
- `ParallaxScrollView.tsx`：视差滚动组件
- `ThemedText.tsx`：主题文本组件
- `ThemedView.tsx`：主题视图组件
- `ui`：UI 相关组件，包含平台特定实现

### constants 目录

- 应用的常量配置
- `Colors.ts`：颜色主题配置

### hooks 目录

- 自定义 React Hooks
- `useColorScheme.ts`：颜色主题 Hook
- `useThemeColor.ts`：主题颜色 Hook

### 配置文件

- `package.json`：项目依赖和脚本配置
- `tsconfig.json`：TypeScript 配置
- `app.json`：Expo 应用配置
