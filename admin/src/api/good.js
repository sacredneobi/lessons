import { useCallback, useState } from "react";
import { buildGet, useFetch } from "@utils";

const baseUrl = "https://dummyjson.com/products";

const useGet = (limit) => {
  const [rows, setRows] = useState(null);
  const { loading, response, get, abort } = useFetch(baseUrl);

  return [
    useCallback(
      (data) => {
        const { page } = data ?? {};
        get(buildGet({ limit, skip: page * limit })).then((res) => {
          if (response.ok) {
            if (res) {
              res.totalPage = Math.ceil(res.total / limit);
            }
            setRows(res);
          }
        });
      },
      [get, limit, response]
    ),
    loading,
    rows,
    abort,
  ];
};

const useGetById = () => {
  const { response, get, loading, abort } = useFetch(baseUrl);

  return [
    useCallback(
      (data, setData) => {
        get("/" + data?.id).then((data) => {
          setData(response.ok ? data : null);
        });
      },
      [get, response]
    ),
    loading,
    abort,
  ];
};

const useGetAll = () => {};

const useUpdate = () => {};

const usePost = () => {};

const useDel = () => {};

export {
  useGet as useGoodGet,
  useGetById as useGoodGetById,
  useGetAll as useGoodGetAll,
  useUpdate as useGoodUpdate,
  usePost as useGoodPost,
  useDel as useGoodDelete,
};
