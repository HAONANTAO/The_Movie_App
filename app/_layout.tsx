/*
 * @Date: 2025-03-16 15:59:56
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-16 16:51:32
 * @FilePath: /The_Movie_App/app/_layout.tsx
 */
import { Stack } from "expo-router";
import "./globals.css";

/**
 * 根布局组件，定义应用的主要导航结构
 * 使用Stack组件创建堆栈式导航，包含以下路由:
 * - (tabs): 底部标签导航，用于主要功能页面切换
 * - movies/[id]: 电影详情页面的动态路由
 * 两个路由都设置headerShown: false以隐藏默认的导航头部
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
