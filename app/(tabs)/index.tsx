/*
 * @Date: 2025-03-16 15:59:56
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 14:24:45
 * @FilePath: /The_Movie_App/app/(tabs)/index.tsx
 */

// The Main Home Page
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      {/* 最低等级z */}
      <Image source={images.bg} className="w-full absolute z-0" />

      {/* scrollable content container */}
      <ScrollView
        className="flex-1 px-5"
        // 表示隐藏垂直滚动条
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        {/* top icon */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {/* search bar */}
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for movies"
          />
        </View>
      </ScrollView>
    </View>
  );
}
