/*
 * @Date: 2025-03-16 16:47:16
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-20 23:11:40
 * @FilePath: /The_Movie_App/app/(tabs)/save.tsx
 */
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "@/constants/icons";
import { getFavoriteMovies } from "@/services/favorites";
import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";

const save = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = "user123";

  useEffect(() => {
    loadFavorites();
    // 添加收藏状态变化的监听
    const interval = setInterval(loadFavorites, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteMovies = await getFavoriteMovies(userId);
      console.log("获取到的收藏数据:", favoriteMovies);
      setFavorites(favoriteMovies);
    } catch (error) {
      console.error("加载收藏失败:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View className="flex-1 px-10 bg-primary">
        <View className="flex flex-col flex-1 gap-5 justify-center items-center">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-base text-gray-500">暂无收藏电影</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute z-0 flex-1 w-full"
        resizeMode="cover"
      />
      <View className="flex-row justify-center items-center mt-20 w-full">
        <Image source={icons.save} className="w-12 h-10" tintColor="#fff" />
      </View>
      <Text className="px-4 mt-4 mb-6 text-2xl font-bold text-white">
        我的收藏
      </Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <MovieCard
            id={item.movie_id}
            poster_path={item.poster_path}
            title={item.title}
            vote_average={item.vote_average}
            release_date={item.release_date}
            poster_url={item.poster_url}
            movie_id={item.movie_id}
            overview={item.overview}
            vote_count={item.vote_count}
          />
        )}
        keyExtractor={(item) => item.movie_id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default save;

const styles = StyleSheet.create({});
