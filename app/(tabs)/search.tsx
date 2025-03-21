/*
 * @Date: 2025-03-16 16:47:23
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 21:34:52
 * @FilePath: /The_Movie_App/app/(tabs)/search.tsx
 */
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
  // search term save
  const [searchQuery, setSearchQuery] = useState("");
  // fetch the movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  // 搜索词条
  // 为了减少http请求，使用防抖debounce，只执行最后一次
  useEffect(() => {
    // 只看第一个 for trending

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        // 为了trending movies
        if (movies?.length > 0 && movies[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      {/* 背景色 */}
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        // { item }解构赋值只拿到item
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <Text className="text-center text-gray-500">
              {searchQuery.trim() ? "No movies found" : "Search for movies"}
            </Text>
          ) : null
        }
        // 每一列
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        // 整体
        contentContainerStyle={{ paddingBottom: 100 }}
        // 在列表的顶部添加一个固定的头部组件。
        ListHeaderComponent={
          <>
            {/* top logo 小猫 */}
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10 " />
            </View>

            {/* 顶端searchbar */}
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {/* 加载条 */}
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#000fff"
                className="my-3"
              />
            )}
            {/* 错误 */}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error:{moviesError.message}
              </Text>
            )}

            {/* 搜索什么出来的结果 */}
            {!moviesLoading &&
              !moviesError &&
              // 于去除字符串两端的空白字符（包括空格、制表符、换行符等）
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Result for {""}
                  <Text className="text-purple-400">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />
      <Text>search</Text>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
