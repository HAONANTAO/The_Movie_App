/*
 * @Date: 2025-03-19 18:59:37
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-20 22:48:52
 * @FilePath: /The_Movie_App/components/MovieCard.tsx
 */
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    // asChild=可点击属性传递给子组件
    <Link href={`/movies/${id}`} asChild>
      {/* 触碰透明度变化反馈 */}
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/FFFFFF.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="mt-2 text-sm font-bold text-white" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row gap-x-1 justify-start items-center">
          <Image source={icons.star} className="size-4" />
          {/* 评分/5 */}
          <Text className="text-sm font-bold text-white">
            {/* 总分5 */}
            {(vote_average / 2).toFixed(1)}
          </Text>
        </View>
        {/* 发布时间 */}
        <View className="flex-row justify-between items-center">
          <Text className="mt-1 text-sm font-medium text-light-300">
            {/* 只有年份 */}
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
