import useFetch from "use-http";

const useDefault = (url, cachePolicy, headersProps, dependency, persist) => {
  const headers = headersProps ?? { "Content-Type": "application/json" };

  const { response, ...other } = useFetch(
    url,
    {
      cachePolicy,
      cacheLife: 1000 * 60 * 60,
      persist,
      onAbort: () => {
        console.log("abort", url);
      },
      onError: (err) => {
        console.log("fetch error", err);
      },
      headers,
    },
    dependency
  );

  return { response, ok: response.ok, ...other };
};

export { useDefault as useFetch };
