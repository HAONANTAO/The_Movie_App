/*
 * @Date: 2025-03-16 15:59:56
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-16 16:42:15
 * @FilePath: /The_Movie_App/app/index.tsx
 */
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-primary font-bold">
        Welcome To My Mobile Movie App!
      </Text>
      <Link href="/onboarding">onboarding</Link>
      <Link href="/movie/avangers">avangers movie</Link>
    </View>
  );
}
