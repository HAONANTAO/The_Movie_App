/*
 * @Date: 2025-03-16 16:40:55
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-16 16:41:00
 * @FilePath: /The_Movie_App/app/movie/[id].tsx
 */
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  //specific id
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Movie Details: {id} </Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
