/*
 * @Date: 2025-03-16 15:59:56
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 22:10:49
 * @FilePath: /The_Movie_App/app/(tabs)/index.tsx
 */

// The Main Home Page
import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
export default function Index() {
  // 路由跳转
  const router = useRouter();

  // top 5 trending movies

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());

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
      {/* <ScrollView
        className="flex-1 px-5"
        // 表示隐藏垂直滚动条
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}> */}
      {/* top icon */}
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      {/* search bar */}
      {/* movie loading */}

      {/* 先检查是不是加载，然后有没有错误再去显示 */}
      {moviesLoading || trendingLoading ? (
        // 加载指示器组件
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : moviesError || trendingError ? (
        <Text>Error:{moviesError?.message || trendingError?.message} </Text>
      ) : (
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for movies"
          />
          {/* top 5 */}
          {trendingMovies && (
            <View className="mt-10">
              <Text className="text-lg text-white mb-3 font-bold">
                TOP-5 Trending Movies
              </Text>
              {/* trending shows */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator
                // 分割组件
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
                data={trendingMovies}
                keyExtractor={(item) => item.movie_id.toString()}
                renderItem={({ item, index }) => <TrendingCard movie={item}
                index={index}/>}
              />
            </View>
          )}
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Latest Movies
          </Text>
          {/* 高性能列表组件，专门用于渲染长列表数据。
            它的主要优点是只渲染当前可见区域的内容，
            对于大量数据的展示非常高效。 */}
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            // 用于为列表中的每一项提供一个唯一的标识符（key）
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-2 pb-32"></FlatList>
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
}
