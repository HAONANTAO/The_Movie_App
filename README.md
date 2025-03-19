# The Movie App

## 项目简介

这是一个使用现代技术栈开发的电影应用程序，集成了以下主要技术：

- **React Native** - 跨平台移动应用开发框架
- **Expo** - React Native 开发工具和服务平台
- **NativeWind** - 类似 Tailwind CSS 的移动端样式解决方案
- **Appwrite** - 后端即服务 (BaaS) 解决方案
- **TMDB API** - 电影数据服务
- **自定义 Hooks** - 优化的状态管理和业务逻辑复用

## 功能特点

- 电影搜索和浏览
- 个性化推荐
- 收藏功能
- 用户资料管理
- 响应式设计

## 开发环境配置

### 前置要求

- Node.js (LTS 版本)
- npm 或 yarn
- Expo CLI

### 安装步骤

1. 克隆项目并安装依赖：

```bash
git clone [项目地址]
cd The_Movie_App
npm install
```

2. 配置环境变量：

创建 `.env` 文件并配置必要的环境变量：

```env
TMDB_API_KEY=your_api_key
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
```

3. 启动开发服务器：

```bash
npm start
```

## 移动端测试

### 使用 Expo Go

1. 在移动设备上安装 Expo Go 应用：

   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

2. 确保手机和电脑在同一网络下

3. 使用 Expo Go 扫描终端中显示的二维码

## 项目结构

```
├── app/                  # 应用主要路由和页面
│   ├── (tabs)/          # 底部标签页面
│   ├── movies/          # 电影相关页面
│   └── _layout.tsx      # 根布局组件
├── assets/              # 静态资源
│   ├── fonts/           # 字体文件
│   ├── icons/           # 图标资源
│   └── images/          # 图片资源
├── components/          # 可复用组件
│   ├── MovieCard.tsx    # 电影卡片组件
│   ├── SearchBar.tsx    # 搜索栏组件
│   └── TrendingCard.tsx # 热门电影卡片
├── constants/           # 常量配置
├── interfaces/          # TypeScript 接口定义
├── services/            # API 服务
│   ├── api.ts           # API 调用
│   ├── appwrite.ts      # Appwrite 配置
│   └── useFetch.ts      # 数据获取 Hook
└── types/               # 类型定义
```

## 主要依赖

- expo: ~52.0.38
- react-native: 0.76.7
- nativewind: ^4.1.23
- react-native-appwrite: ^0.7.2
- 其他依赖详见 package.json

## 设计资源

- Figma UI 设计: [查看设计稿](https://www.figma.com/design/c6NHYQem8G59odVSijIjl2/Movie-App-w%2F-React-Native?node-id=2-2&p=f&t=SXO5s1fyoOvB6g4S-0)
- 项目演示视频: [观看视频](https://www.youtube.com/watch?v=f8Z9JyB2EIE&t=44s)

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
