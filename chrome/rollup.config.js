// rollup.config.js

import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // always put chromeExtension() before other plugins
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
    chromeExtension(),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    simpleReloader(),
    // the plugins below are optional
    resolve(),
    commonjs(),
  ],
};
