import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { join } from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let viteEvn = loadEnv(mode, process.cwd());
  return {
    optimizeDeps: {
      include: ["axios"],
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"],

      alias: {
        "@": join(__dirname, "src"),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
      preprocessorOptions: {
        scss: {
          // 一些配置项
        },
        less: {
          // 一些配置项
          math: "always",
        },
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    server: {
      // host: '192.168.0.45',
      port: 8080,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:7001", //后端的地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
