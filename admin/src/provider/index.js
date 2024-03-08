import { useRootSetting } from "@context";
import { Provider } from "use-http";

const Default = (props) => {
  const { ...other } = props;

  const context = useRootSetting();

  return (
    <Provider
      options={{
        cachePolicy: "no-cache",
        interceptors: {
          request: ({ options }) => {
            options.headers["x-server-sacredApp"] = "0.0.1";
            options.headers["authorization"] =
              localStorage.getItem("token") ?? "";

            return options;
          },
          response: ({ response }) => {
            if (response.status === 401) {
              localStorage.removeItem("token");
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

export * from "./theme";

export { Default as FetchProvider };
