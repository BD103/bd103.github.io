import adapter from "@sveltejs/adapter-static";
import footnotes from "remark-footnotes";
import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      // We use `remark-footnotes` v2.0.0, since `remark-gfm` and later versions of
      // `remark-footnotes` don't work with `mdsvex`.
      remarkPlugins: [footnotes],
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
