/*
 * @Date: 2025-03-16 16:50:14
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-20 21:20:48
 * @FilePath: /The_Movie_App/app/movies/[id].tsx
 */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import {
  addToFavorites,
  removeFromFavorites,
  isMovieFavorited,
} from "@/services/favorites";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}
// reuseable
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col justify-center items-start mt-5">
    <Text className="text-sm font-normal text-light-100">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">
      {value || "N/A"}
    </Text>
  </View>
);
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string),
  );

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("@user_info");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          setUserId(user.userId);
        }
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    if (movie?.id && userId) {
      checkFavoriteStatus();
    }
  }, [movie?.id, userId]);

  const checkFavoriteStatus = async () => {
    try {
      const status = await isMovieFavorited(
        Number(movie?.id),
        userId as string,
      );
      setIsFavorite(status);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(Number(movie?.id), userId as string);
      } else {
        const movieData: Movie = {
          movie_id: movie!.id,
          id: movie!.id,
          title: movie!.title,
          poster_url: movie!.poster_path,
          overview: movie!.overview || "",

          poster_path: movie!.poster_path || "",
          release_date: movie!.release_date,

          vote_average: movie!.vote_average,
          vote_count: movie!.vote_count,
        };
        await addToFavorites(movieData, userId as string);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1 bg-primary">
      {/* 提供更好的视觉体验，不会让内容紧贴底部 */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            className="w-full h-[550px]"
            // 拉伸或压缩图片以完全填充指定的尺寸
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
          <View className="flex-col justify-center items-start px-5 mt-5">
            <Text className="text-xl font-bold text-white">{movie?.title}</Text>
            <View className="flex-row gap-x-1 items-center mt-2">
              <Text className="text-sm text-light-100">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-sm text-light-100">
                {movie?.runtime}mins
              </Text>
            </View>

            {/* 星级 */}
            <View className="flex-row gap-x-1 items-center px-2 py-1 mt-2 rounded-md bg-dark-100">
              <Image source={icons.star} className="size-4" />
              <Text className="text-sm font-bold text-white">
                {(movie?.vote_average! / 2).toFixed(1) || 0}/5
              </Text>
              <Text className="text-sm text-light-100">
                [{movie?.vote_count} votes]
              </Text>
              <TouchableOpacity onPress={toggleFavorite} className="ml-2">
                <Text className="text-2xl">{isFavorite ? "❤️" : "🤍"}</Text>
              </TouchableOpacity>
            </View>
            {/* overview description */}
            <MovieInfo label="Overview" value={movie?.overview} />
            {/* genre categories */}
            <MovieInfo
              label="Genres"
              value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
            />
            {/* 花费和赚多少钱*/}
            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo label="Cost" value={`$${movie?.budget! / 1000000}M`} />
              <MovieInfo
                label="Revenue"
                value={`$${Math.round(movie?.revenue! / 1000000)}M`}
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies.map((c) => c.name).join(" - ") ||
                "N/A"
              }
            />
          </View>
        </View>
      </ScrollView>
      {/* exit */}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5
      bg-purple-300 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        // 返回上一级
        onPress={router.back}>
        <Image
          source={icons.arrow}
          className="mt-1 mr-1 rotate-180 size-5"
          tintColor="#fff"
        />
        <Text className="text-base text-white font-sm">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
