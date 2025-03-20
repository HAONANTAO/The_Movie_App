import { Client, Databases, Query, ID } from "react-native-appwrite";
import { getUserByEmail } from "./users";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const FAVORITES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

// 连接数据库
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID!);

// 初始化数据库
const database = new Databases(client);

// 添加电影到收藏
export const addToFavorites = async (movie: Movie, userId: string) => {
  try {
    await database.createDocument(
      DATABASE_ID!,
      FAVORITES_COLLECTION_ID!,
      ID.unique(),
      {
        movie_id: movie.id,
        user_id: userId,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 从收藏中删除电影
export const removeFromFavorites = async (movie_id: number, userId: string) => {
  try {
    // 先查找对应的收藏记录
    const result = await database.listDocuments(
      DATABASE_ID!,
      FAVORITES_COLLECTION_ID!,
      [Query.equal("movie_id", movie_id), Query.equal("user_id", userId)],
    );

    if (result.documents.length > 0) {
      // 删除找到的第一个匹配记录
      await database.deleteDocument(
        DATABASE_ID!,
        FAVORITES_COLLECTION_ID!,
        result.documents[0].$id,
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 获取收藏列表
export const getFavoriteMovies = async (userId: string) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID!,
      FAVORITES_COLLECTION_ID!,
      [Query.equal("user_id", userId)],
    );
    return result.documents as unknown as Movie[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 检查电影是否已收藏
export const isMovieFavorited = async (movie_id: number, userId: string) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID!,
      FAVORITES_COLLECTION_ID!,
      [Query.equal("movie_id", movie_id), Query.equal("user_id", userId)],
    );
    return result.documents.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};
