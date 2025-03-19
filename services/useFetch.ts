/*
 * @Date: 2025-03-19 15:28:41
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-03-19 16:08:49
 * @FilePath: /The_Movie_App/services/useFetch.ts
 */

import { useEffect, useState } from "react";

interface Props<T> {
  fetchFunction: () => Promise<T>;
  autoFetch?: boolean;
}
// <T> Generic Type
const useFetch = <T>({ fetchFunction, autoFetch }: Props<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // autoFetch
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // fetch run
      const result = await fetchFunction();
      setData(result);
    } catch (error: any) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      // 总会执行
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  // 将 fetchData 函数以 refetch 这个名字导出
  return { data, loading, error, refetch: fetchData, reset };
};
export default useFetch;
