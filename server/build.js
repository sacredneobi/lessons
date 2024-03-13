require("esbuild").build({
  minify: true,
  sourcemap: true,

  logLevel: "info",
  entryPoints: ["index.js"],
  bundle: true,
  platform: "node",
  outfile: "../build/server/index.js",
});
