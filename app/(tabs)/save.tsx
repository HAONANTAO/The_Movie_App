/*
 * @Date: 2025-03-16 16:47:16
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 23:05:50
 * @FilePath: /The_Movie_App/app/(tabs)/save.tsx
 */
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const save = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10 " tintColor="#fff" />
        <Text className="text-gray-500 text-base">Save</Text>
      </View>
    </View>
  );
};

export default save;

const styles = StyleSheet.create({});
