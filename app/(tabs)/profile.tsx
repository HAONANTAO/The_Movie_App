import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";
import { createUser } from "@/services/users";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCreateUser = async () => {
    try {
      if (!username || !email) {
        setError("请填写用户名和邮箱");
        return;
      }
      if (!email.includes("@")) {
        setError("请输入有效的邮箱地址");
        return;
      }

      await createUser(username, email);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("创建用户失败，请重试");
      console.error(err);
    }
  };

  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex flex-col flex-1 gap-5 justify-center items-center">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="mb-8 text-2xl font-bold text-white">创建用户</Text>

        <TextInput
          className="p-4 mb-4 w-full text-white rounded-lg bg-white/10"
          placeholder="用户名"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          className="p-4 mb-4 w-full text-white rounded-lg bg-white/10"
          placeholder="邮箱"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {error ? <Text className="mb-4 text-red-500">{error}</Text> : null}

        {success ? (
          <Text className="mb-4 text-green-500">用户创建成功！</Text>
        ) : null}

        <TouchableOpacity
          className="items-center p-4 w-full bg-blue-500 rounded-lg"
          onPress={handleCreateUser}>
          <Text className="text-lg font-bold text-white">创建用户</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
