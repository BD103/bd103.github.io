// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        // Make styling portable across browsers
        "normalize.css/normalize.css",
        // Syntax highlighting
        "assets/syntax.scss",
    ],
    content: {
        // Use custom syntax theme defined in assets/syntax.scss
        highlight: {
            theme: "css-variables",
            preload: ["rust"],
        },
    },
    devtools: { enabled: true },
    eslint: {
        lintOnStart: false,
    },
    feed: {
        sources: [
            {
                path: "/feed.xml",
                type: "rss2",
                cacheTime: 60 * 60, // TODO: 1 hour
            },
            {
                path: "/atom.xml",
                type: "atom1",
                cacheTime: 60 * 60, // TODO: 1 hour
            },
        ],
    },
    modules: [
        "@nuxt/content",
        "nuxt-module-feed",
        "@nuxtjs/eslint-module",
    ],
    typescript: {
        // Take Over Mode is enabled
        shim: false,
        strict: true,
    },
    vite: {
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    // Automatically import the global variables from _g.scss
                    additionalData: "@use \"~/assets/g\";",
                },
            },
        },
    },
});
