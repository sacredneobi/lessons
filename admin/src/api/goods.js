import { useCallback, useState } from "react";
import { useFetch } from "./useFetch";

const useGet = (perPage) => {
  const [rows, setRows] = useState(null);
  const { loading, method } = useFetch(
    `https://dummyjson.com/products?limit=${perPage}`
  );

  return [
    useCallback(
      (data) => {
        const { page, ...other } = data ?? {};
        method(`&skip=${page * perPage}`, other, (newData) => {
          if (newData) {
            newData.totalPage = Math.ceil(newData.total / perPage);
          }
          setRows(newData);
        });
      },
      [method, perPage]
    ),
    loading,
    rows,
  ];
};

const useGetById = () => {
  return [
    useCallback((data, setData) => {
      fetch(`https://dummyjson.com/products/${data?.id}`)
        .then(async (response) => {
          if (response?.ok) {
            setData(await response.json());
          } else {
            console.log(await response.json());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []),
  ];
};

const useGetAll = () => {};

const useUpdate = () => {};

const usePost = () => {};

const useDel = () => {};

export {
  useGet as useGoodsGet,
  useGetById as useGoodsGetById,
  useGetAll as useGoodsGetAll,
  useUpdate as useGoodsUpdate,
  usePost as useGoodsPost,
  useDel as useGoodsDelete,
};
