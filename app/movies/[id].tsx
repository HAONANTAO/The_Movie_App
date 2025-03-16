/*
 * @Date: 2025-03-16 16:50:14
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-16 16:50:28
 * @FilePath: /The_Movie_App/app/movies/[id].tsx
 */
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>MovieDetails of : {id}</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
