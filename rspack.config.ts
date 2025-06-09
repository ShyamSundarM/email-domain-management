import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
const path = require("path");

//NODE V24 changes
//import path from "path";
//import { fileURLToPath } from "url";
//import { dirname, resolve } from "path";

const isDev = process.env.NODE_ENV === "development";

// Target browsers
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export default defineConfig({
  entry: {
    main: "./src/main.tsx",
  },
  output: {
    filename: "my-web-component.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "iife",
    },
    clean: true,
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    isDev ? new ReactRefreshRspackPlugin() : null,
    new rspack.container.ModuleFederationPlugin({
      name: "remoteDesignSystem",
      remotes: {
        remoteDesignSystem:
          "remoteDesignSystem@https://starling-ui-design-system.netlify.app/static/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^18.0.0" },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.0.0",
        },
      },
    }),
  ].filter(Boolean),
  optimization: {
    minimizer: [new rspack.SwcJsMinimizerRspackPlugin()],
  },
  experiments: {
    css: false,
  },
  mode: isDev ? "development" : "production",
});
