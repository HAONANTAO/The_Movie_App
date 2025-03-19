/*
 * @Date: 2025-03-19 22:08:46
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 22:16:47
 * @FilePath: /The_Movie_App/components/TrendingCard.tsx
 */
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";

const TrendingCard = ({
  index,
  movie: { movie_id, title, poster_url },
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 ppy-1 rounded-full">
          
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
