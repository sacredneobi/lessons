import { useCallback, useState } from "react";
import { buildGet, useFetch } from "@utils";

const baseUrl = "api/private/auth";

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

const useAuth = () => {
  const { response, get, loading, abort } = useFetch("/api/auth");

  return [
    useCallback(
      (data, setData) => {
        get(buildGet(data)).then((data) => {
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
  useAuth,
  useGet as useUserGet,
  useGetById as useUserGetById,
  useGetAll as useUserGetAll,
  useUpdate as useUserUpdate,
  usePost as useUserPost,
  useDel as useUserDelete,
};
