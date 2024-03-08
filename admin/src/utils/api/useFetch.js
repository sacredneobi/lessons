import useFetch from "use-http";
import { dispatchAlert } from "../event";
import { Box } from "@components";

const useDefault = (url, cachePolicy, headersProps, dependency, persist) => {
  const headers = headersProps ?? { "Content-Type": "application/json" };

  const { response, ...other } = useFetch(
    url,
    {
      cachePolicy,
      cacheLife: 1000 * 60 * 60,
      persist,
      onError: (err) => {
        dispatchAlert({
          caption: (
            <Box
              sx={{
                "& strong": {
                  p: 0.5,
                  backgroundColor: "action.disabled",
                  borderRadius: 1,
                },
              }}
            >
              <strong>{err.error.name}</strong>
              {`\n`}
              <Box sx={{ pt: 1 }}>{err.error.message}</Box>
            </Box>
          ),
          variant: "error",
        });
      },
      headers,
    },
    dependency
  );

  return { response, ok: response.ok, ...other };
};

export { useDefault as useFetch };
