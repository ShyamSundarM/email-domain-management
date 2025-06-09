import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
  entry: {
    main: "./src/main.tsx",
  },
  output: {
    filename: "my-web-component.js",
    path: path.resolve(new URL(".", import.meta.url).pathname, "dist"),
    library: {
      type: "iife", // immediately invoked for browsers
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
    css: false, // Disable built-in CSS extraction
  },
  mode: "development", // or "production" based on your needs,
});
