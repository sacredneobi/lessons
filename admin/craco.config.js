const path = require("path");
const fs = require("fs");
const evalSourceMap = require("react-dev-utils/evalSourceMapMiddleware");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const noopServiceWorker = require("react-dev-utils/noopServiceWorkerMiddleware");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      "@components": resolvePath("./src/components"),
      "@api": resolvePath("./src/api"),
      "@context": resolvePath("./src/context"),
      "@data": resolvePath("./src/data"),
      "@hooks": resolvePath("./src/hooks"),
      "@utils": resolvePath("./src/utils"),
    },
  },
  eslint: false,
  devServer: (devServerConfig, { env, paths }) => {
    devServerConfig = {
      ...devServerConfig,
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      setupMiddlewares: (middleware, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }

        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app);
        }

        middleware.push(
          evalSourceMap(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorker(paths.publicUrlOrPath)
        );

        return middleware;
      },
    };
    devServerConfig.client.overlay.warnings = true;
    return devServerConfig;
  },
};
