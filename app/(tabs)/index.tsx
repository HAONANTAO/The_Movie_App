/*
 * @Date: 2025-03-16 15:59:56
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 16:27:36
 * @FilePath: /The_Movie_App/app/(tabs)/index.tsx
 */

// The Main Home Page
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
export default function Index() {
  // 路由跳转
  const router = useRouter();

  // fetch the movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

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
        {/* movie loading */}

        {/* 先检查是不是加载，然后有没有错误再去显示 */}
        {moviesLoading ? (
          // 加载指示器组件
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error:{moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for movies"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
