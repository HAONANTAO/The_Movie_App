/*
import { TMDB_CONFIG } from './api';
 * @Date: 2025-03-19 14:53:42
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 22:34:37
 * @FilePath: /The_Movie_App/services/api.ts
 */

export const TMDB_CONFIG = {
  // BASIC prefix
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
// /discover/movie
// movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

// 根据欢迎程度获取电影(和search query搜索一起用)
export const fetchMovies = async ({ query }: { query: string }) => {
  // URL to fetch
  // encode for some weird query display
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // 获取失败
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }
  // 获取成功
  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string,
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
      method:"GET",
      headers:TMDB_CONFIG.headers
    });

    if(!response.ok){throw new Error("Failed to fetch movie details")}

    // ok
    const data = await response.json()

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
