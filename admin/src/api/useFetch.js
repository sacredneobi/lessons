import { useCallback, useState } from "react";

const useFetch = (url) => {
  const [controller] = useState(() => new AbortController());
  const [loading, setLoading] = useState(true);

  const method = useCallback(
    (urlAddons, data, setData) => {
      const signal = controller.signal;
      setLoading(true);
      fetch(url + urlAddons, { ...data, signal })
        .then(async (response) => {
          if (response?.ok) {
            setData(await response.json());
          } else {
            console.log(await response.json());
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
    [url, controller]
  );

  return {
    loading,
    method,
    abort: () => {
      controller.abort();
    },
  };
};

// const useGet = (url) => {
//   return (data) => {
//     return useFetch(url, data);
//   };
// };

export { useFetch };
