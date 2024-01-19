import { useCallback, useEffect, useState } from "react";
import { addEvent, buildGet, useFetch } from "@utils";

const baseUrl = "/api/private/good";

const useGet = (limit, eventName) => {
  const [rows, setRows] = useState(null);
  const [reload, setReload] = useState(null);
  const { loading, response, get, abort } = useFetch(baseUrl);

  useEffect(() => {
    if (eventName) {
      return addEvent("reload", (detail) => {
        if (detail?.name === eventName) {
          setReload((prev) => !prev);
        }
      });
    }
  }, [eventName]);

  return [
    useCallback(
      (data) => {
        const { page } = data ?? {};

        if (reload === 20) console.log(reload);

        get(buildGet({ limit, skip: page * limit })).then((res) => {
          if (response.ok) {
            if (res) {
              res.totalPage = Math.ceil(res.count / limit);
            }
            setRows(res?.rows);
          }
        });
      },
      [get, limit, response, reload]
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

const useUpdate = () => {
  const { response, put, loading, abort } = useFetch(baseUrl, undefined, {});

  return [
    useCallback(
      (data, setData) => {
        put(data).then((data) => {
          if (typeof setData === "function" && response.ok) {
            setData(data);
          }
        });
      },
      [put, response]
    ),
    loading,
    abort,
  ];
};

const usePost = () => {
  const { response, post, loading, abort } = useFetch(baseUrl, undefined, {});

  return [
    useCallback(
      (data, setData) => {
        post(data).then((data) => {
          if (typeof setData === "function" && response.ok) {
            setData(data);
          }
        });
      },
      [post, response]
    ),
    loading,
    abort,
  ];
};

const useDel = () => {
  const { response, del, loading, abort } = useFetch(baseUrl);

  return [
    useCallback(
      (data, setData) => {
        del(data).then((data) => {
          if (typeof setData === "function" && response.ok) {
            setData(data);
          }
        });
      },
      [del, response]
    ),
    loading,
    abort,
  ];
};

export {
  useGet as useGoodGet,
  useGetById as useGoodGetById,
  useGetAll as useGoodGetAll,
  useUpdate as useGoodUpdate,
  usePost as useGoodPost,
  useDel as useGoodDelete,
};
