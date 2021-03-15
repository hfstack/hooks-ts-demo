import { useState, useEffect } from 'react'
interface Resp {
  data: RespBody
  success: boolean
  message: string
}
interface RespBody {
  list: ListItem[]
  total: number
}
interface ListItem {
  name: string
  id: string
}
interface PageInfo {
  page?: number
  pageSize?: number,
  fetch: (page: number, pageSize: number) => Promise<Resp>
}
export const useFetchData = (para: PageInfo ) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [page, setPage] = useState<number>(para.page || 1);
  // eslint-disable-next-line 
  const [pageSize, setPageSize] = useState<number>(para.pageSize || 20);

  const [finish, setFinish] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(1);
  const [error, setError] = useState<string>('');
  
  const request = () => {
    setLoading(true);
    if (finish) {
      return 
    }
    para.fetch(page, pageSize)
      .then((resp: Resp) => {
        console.log('fetch', page)
        setTotal(resp.data.total)
        if (data.length < total) {
          const list = resp.data.list
          if (list.length) {
            setData(list)
          }
        } else {
          setFinish(true)
        }
      })
      .catch((error: any) => {
        error.message && setError(error.message)
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // 根据传入的依赖项来执行请求
  useEffect(() => {
    request()
    // eslint-disable-next-line 
  }, [page, pageSize]);
  
  const pageChange = (page: number) => {
    setPage(page)
  }
  
  return {
    data,
    error,
    page,
    pageSize,
    finish,
    loading,
    pageChange,
  };
};