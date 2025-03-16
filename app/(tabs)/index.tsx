/*
 * @Date: 2025-03-16 15:59:56
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-16 21:33:25
 * @FilePath: /The_Movie_App/app/(tabs)/index.tsx
 */

// The Main Home Page
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { icons } from "@/constants/icons";
export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      {/* 最低等级z */}
      <Image source={images.bg} className="w-full absolute z-0" />

      {/* scrollable content container */}
      <ScrollView className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      </ScrollView>
    </View>
  );
}
