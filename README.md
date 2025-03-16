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

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
