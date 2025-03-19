/*
 * @Date: 2025-03-19 18:59:37
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 19:58:02
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
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          {/* 评分/5 */}
          <Text className="text-sm text-white font-bold">
            {/* 总分5 */}
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        {/* 发布时间 */}
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-light-300 font-medium mt-1">
            {/* 只有年份 */}
            {release_date?.split("-")[0]}
          </Text>
          {/* 分类 */}
          {/* <Text className="text-xs font-medium text-light-300 uppercase">
            category
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
