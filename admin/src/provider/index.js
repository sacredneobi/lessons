import { useRootSetting } from "@context";
import { Provider } from "use-http";

const Default = (props) => {
  const { ...other } = props;

  const context = useRootSetting();

  return (
    <Provider
      options={{
        cachePolicy: "no-cache",
        onAbort: (e) => {
          console.log("abort", e);
        },
        interceptors: {
          request: ({ options }) => {
            options.headers["x-server-sacredApp"] = "0.0.1";
            options.headers["authorization"] = context.userAuth;

            return options;
          },
          response: ({ response }) => {
            if (response.status === 401) {
              context.userAuth = false;
            }
            return response;
          },
        },
      }}
      {...other}
    />
  );
};

export { Default as FetchProvider };
