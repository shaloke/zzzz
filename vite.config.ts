import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Icons from "unplugin-icons/vite";
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from "unplugin-icons/resolver";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Components from "unplugin-vue-components/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: "vue3",
      // autoInstall: true,
      customCollections: {
        app: FileSystemIconLoader(
          path.resolve(__dirname, "./src/assets/svg")
        ),
      },
    }),
    AutoImport({
      resolvers:[ElementPlusResolver()]
    }),
    Components({
      resolvers: [IconsResolver(),ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "./src")}/`,
    },
  },
  server: {
    port: 1022,
    host: true,
  },
});
