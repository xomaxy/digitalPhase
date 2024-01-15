import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";


console.log("process.env.BASE_PATH", process.env.BASE_PATH);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
    paths: {
      base: !process.argv.includes("dev") ? "" : process.env.BASE_PATH,
    },
    alias: {
      $D3: "src/lib/d3",
      $data: "src/data",
    },
  },
  preprocess: [vitePreprocess({})],
};

export default config;
