import * as esbuild from "esbuild";

let result = await esbuild.build({
  minify: true,
  // sourcemap: true,
  color: true,
  alias: {
    "@root": ".",
  },
  logLevel: "info",
  entryPoints: ["index.js"],
  bundle: true,
  platform: "node",
  metafile: true,
  inject: ["./loaderResolve.js"],
  outfile: "../build/server/index.js",
});

// console.log(
//   await esbuild.analyzeMetafile(result.metafile, {
//     verbose: false,
//   })
// );
