/*
 * @Date: 2025-03-20 18:36:03
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-20 20:58:12
 * @FilePath: /The_Movie_App/services/users.ts
 */

import { Client, Databases, ID, Query } from "react-native-appwrite";
import bcrypt from "react-native-bcrypt";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const SALT_ROUNDS = 10;

// 连接数据库
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID!);

// 初始化数据库
const database = new Databases(client);

// 创建新用户
export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) {
          console.log("Error hashing password:", err);
          reject(err);
        } else {
          database
            .createDocument(DATABASE_ID!, USERS_COLLECTION_ID!, ID.unique(), {
              username,
              email,
              password: hashedPassword,
              created_at: new Date().toISOString(),
            })
            .then(resolve)
            .catch(reject);
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 验证用户密码
export const verifyPassword = (password: string, hashedPassword: string) => {
  try {
    // 修改: 使用 compareSync 代替 await bcrypt.compare
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    console.log(error);
    return false;
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
