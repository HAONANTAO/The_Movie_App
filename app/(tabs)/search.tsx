/*
 * @Date: 2025-03-16 16:47:23
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 20:19:49
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
import React from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  // fetch the movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

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
              <SearchBar placeholder="Search movies..." />
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
              "Search Term".trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Result for {""}
                  <Text className="text-accent">Search Term</Text>
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
