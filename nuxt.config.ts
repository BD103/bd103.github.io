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
        }
    },
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
    ],
    typescript: {
        // Take Over Mode is enabled
        shim: false,
    },
    vite: {
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                scss: {
                    // Automatically import the global variables from _g.scss
                    additionalData: `@use "~/assets/g";`,
                },
            },
        },
    },
});
