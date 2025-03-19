/*
 * @Date: 2025-03-16 16:50:14
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 23:01:29
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
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}
// reuseable
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-100 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);
const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string),
  );
  return (
    <View className="bg-primary flex-1">
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
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-100 text-sm ">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-light-100 text-sm">
                {movie?.runtime}mins
              </Text>
            </View>

            {/* 星级 */}
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white text-sm font-bold">
                {(movie?.vote_average! / 2).toFixed(1) || 0}/5
              </Text>
              <Text className="text-light-100 text-sm">
                [{movie?.vote_count} votes]
              </Text>
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
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
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
          className="size-5 mr-1 mt-1 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-sm text-base">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
