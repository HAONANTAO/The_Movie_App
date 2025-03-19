/*
 * @Date: 2025-03-19 18:59:37
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 19:14:32
 * @FilePath: /The_Movie_App/components/MovieCard.tsx
 */
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const MovieCard = ({ id, poster_path, title, vote_average, release_date }) => {
  console.log(poster_path);
  return (
    // asChild=可点击属性传递给子组件
    <Link href={`/movie/${id}`} asChild>
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
        <Text className="text-white text-sm font-bold mt-2">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
