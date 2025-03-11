import adapter from "@sveltejs/adapter-static";
import gfm from "remark-gfm";
import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      remarkPlugins: [gfm],
      smartypants: {
        quotes: true,
        ellipses: true,
        backticks: false,
        dashes: true,
      },
    }),
  ],

  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
  },

  extensions: [".svelte", ".svx"],
};

export default config;
