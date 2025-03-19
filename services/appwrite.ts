// track the searches made by user
import { Client, Databases, Query, ID } from "react-native-appwrite";
// expo特性 简化配置dotenv.config()
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

// 连接数据库
const client = new Client()
  // 这是 Appwrite 的云服务版本的默认端点。
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID!);

// 初始化数据库
const database = new Databases(client);

// 看看搜索频率记录做trending测试
export const updateSearchCount = async (query: string, movie: Movie) => {
  // 查询条件下的所有内容
  try {
    const result = await database.listDocuments(DATABASE_ID!, COLLECTION_ID!, [
      Query.equal("searchterm", query),
    ]);

    // 先查找有没有这个词条，有就增加count;

    if (result.documents.length > 0) {
      // 第一个trending movie
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID!,
        COLLECTION_ID!,
        existingMovie.$id,
        { count: existingMovie.count + 1 },
      );
    } else {
      // 没有就新建
      await database.createDocument(
        DATABASE_ID!,
        COLLECTION_ID!,
        // ID.unique() 用于生成唯一的文档 ID
        ID.unique(),
        {
          searchterm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  // check if a record of that search has already been store
  // if a document is found increment the searchCount field
  // if no document is found
  // then create new document in database
};

// : Promise<
//   TrendingMovie[] | undefined
// >
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID!, COLLECTION_ID!, [
      // top 5
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    // 确保返回的数据符合 TrendingMovie 的类型定义
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    throw undefined;
  }
};
