import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { icons } from "@/constants/icons";
import { createUser, getUserByEmail, verifyPassword } from "@/services/users";

const Profile = () => {
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("@user_info");
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          const user = await getUserByEmail(parsedUserInfo.email);
          if (user) {
            //免登录
            setCurrentUser({
              email: user.email,
              userId: user.$id,
              username: user.username,
            });
            setSuccess(true);
          }
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }
    };
    checkUserSession();
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    email: string;
    userId: string;
    username: string;
  } | null>(null);

  // type StoredUserInfo = {
  //   email: string;
  //   userId: string;
  //   username: string;
  // };

  const handleLogin = async () => {
    try {
      await AsyncStorage.removeItem("@user_info");
      if (!email || !password) {
        setError("请填写邮箱和密码");
        return;
      }
      if (!email.includes("@")) {
        setError("请输入有效的邮箱地址");
        return;
      }

      const user = await getUserByEmail(email);
      if (!user) {
        setError("用户不存在");
        return;
      }
      const isValidPassword = verifyPassword(password, user.password);
      if (!isValidPassword) {
        setError("密码错误");
        return;
      }
      setSuccess(true);
      setError("");
      const userInfo = {
        email: user.email,
        userId: user.$id,
        username: user.username,
      };
      setCurrentUser(userInfo);
      await AsyncStorage.setItem(
        "@user_info",
        JSON.stringify({
          email: user.email,
          userId: user.$id,
          username: user.username,
        }),
      );
    } catch (err) {
      setError("登录失败，请重试");
      console.error(err);
    }
  };

  const handleRegister = async () => {
    try {
      if (!username || !email || !password) {
        setError("请填写所有字段");
        return;
      }
      if (!email.includes("@")) {
        setError("请输入有效的邮箱地址");
        return;
      }

      const user = await createUser(username, email, password);
      setSuccess(true);
      setError("");
      const userInfo = {
        email: (user as { email: string }).email,
        userId: (user as any).$id,
        username: (user as any).username,
      };
      setCurrentUser(userInfo);
      await AsyncStorage.setItem(
        "@user_info",
        JSON.stringify({
          email: (user as any).email,
          userId: (user as any).$id,
          username: (user as any).username,
        }),
      );
    } catch (err) {
      setError("注册失败，请重试");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    setSuccess(false);
    setEmail("");
    setPassword("");
    setUsername("");
    await AsyncStorage.removeItem("@user_info");
  };

  if (currentUser) {
    return (
      <View className="flex-1 px-10 bg-primary">
        <View className="flex flex-col flex-1 gap-5 justify-center items-center">
          <Image source={icons.person} className="size-10" tintColor="#fff" />
          <Text className="text-2xl font-bold text-white">个人信息</Text>
          <View className="p-6 w-full rounded-lg bg-white/10">
            <Text className="mb-2 text-lg text-white">
              用户名: {currentUser.username}
            </Text>
            <Text className="text-lg text-white">
              邮箱: {currentUser.email}
            </Text>
          </View>
          <TouchableOpacity
            className="items-center p-4 mt-4 w-full bg-red-500 rounded-lg"
            onPress={handleLogout}>
            <Text className="text-lg font-bold text-white">登出</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 px-10 bg-primary">
      <View className="flex flex-col flex-1 gap-5 justify-center items-center">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="mb-8 text-2xl font-bold text-white">
          {isLogin ? "登录" : "注册"}
        </Text>

        {!isLogin && (
          <TextInput
            className="p-4 mb-4 w-full text-white rounded-lg bg-white/10"
            placeholder="用户名"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />
        )}

        <TextInput
          className="p-4 mb-4 w-full text-white rounded-lg bg-white/10"
          placeholder="邮箱"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="p-4 mb-4 w-full text-white rounded-lg bg-white/10"
          placeholder="密码"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text className="mb-4 text-red-500">{error}</Text> : null}

        {success ? (
          <Text className="mb-4 text-green-500">
            {isLogin ? "登录成功！" : "注册成功！"}
          </Text>
        ) : null}

        <TouchableOpacity
          className="items-center p-4 w-full bg-blue-500 rounded-lg"
          onPress={isLogin ? handleLogin : handleRegister}>
          <Text className="text-lg font-bold text-white">
            {isLogin ? "登录" : "注册"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4" onPress={() => setIsLogin(!isLogin)}>
          <Text className="text-white">
            {isLogin ? "没有账号？点击注册" : "已有账号？点击登录"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
