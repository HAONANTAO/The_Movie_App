/*
 * @Date: 2025-03-20 18:36:03
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-20 18:38:46
 * @FilePath: /The_Movie_App/services/users.ts
 */
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

// 连接数据库
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID!);

// 初始化数据库
const database = new Databases(client);

// 创建新用户
export const createUser = async (username: string, email: string) => {
  try {
    const user = await database.createDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      ID.unique(),
      {
        username,
        email,
        created_at: new Date().toISOString(),
      },
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 根据邮箱获取用户信息
export const getUserByEmail = async (email: string) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal("email", email)],
    );
    return result.documents[0] || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 更新用户信息
export const updateUser = async (userId: string, data: Partial<User>) => {
  try {
    const user = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      userId,
      data,
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
