/*
 * @Date: 2025-03-16 16:47:16
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-21 15:43:02
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "@/constants/icons";
import { getFavoriteMovies } from "@/services/favorites";
import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { useFocusEffect } from "expo-router";

const save = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 解决了useEffect只会执行一次和
  // UseFocusEffect每次都一直执行（焦点获取）
  // 用React.useCallback优化性能，避免不必要的渲染，
  // ，表示这个回调函数只在组件挂载或页面聚焦时运行一次，之后会保持缓存的函数引用。
  // 如果你不使用 useCallback，React 每次渲染时都会重新创建一个新的函数引用，而 useFocusEffect 会检测到这是一个新的函数，从而导致重复执行。
  useFocusEffect(
    React.useCallback(() => {
      checkLoginStatus();
    }, []),
  );

  const checkLoginStatus = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("@user_info");

      if (userInfo) {
        const user = JSON.parse(userInfo);
        console.log(user);
        setUserId(user.userId);
        setIsLoggedIn(true);
        loadFavorites(user.userId);
      } else {
        setLoading(false);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setLoading(false);
      setIsLoggedIn(false);
    }
  };

  const loadFavorites = async (currentUserId: string) => {
    try {
      const favoriteMovies = await getFavoriteMovies(currentUserId);
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

  if (!isLoggedIn) {
    return (
      <View className="flex-1 px-10 bg-primary">
        <View className="flex flex-col flex-1 gap-5 justify-center items-center">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-base text-gray-500">请先登录后查看收藏</Text>
        </View>
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
