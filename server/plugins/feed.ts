import type { NitroCtx } from "nuxt-module-feed";
import type { Feed } from "feed";

// @ts-expect-error: Feed plugin hook does not show up in type.
export default defineNitroPlugin(nitro => nitro.hooks.hook("feed:generate", ({ feed }: NitroCtx) => {
    createFeed(feed);
}));

function createFeed(feed: Feed) {
    feed.options = {
        id: "https://bd103.github.io",
        title: "BD103's Blog",
        updated: undefined,
        // generator: undefined,
        language: "en-US",
        // ttl: undefined,

        // feed: undefined,
        feedLinks: {
            rss2: "https://bd103.github.io/feed.xml",
            atom: "https://bd103.github.io/atom.xml",
        },
        // hub: undefined,
        // docs: undefined,

        author: {
            name: "BD103",
            link: "https://bd103.github.io",
        },
        link: "https://bd103.github.io",
        description: "BD103's technical blog about programming!",
        // image: undefined,
        // favicon: undefined,
        copyright: "2023 BD103",
    };

    // TODO: Automate this!
    feed.addItem({
        title: "Intercepting Allocations with the Global Allocator",
        id: "2023-06-27-global-allocators",
        link: "https://bd103.github.io/blog/2023-06-27-global-allocators",
        date: new Date("2023-06-27"),
    });

    feed.addItem({
        title: "Rust Pointer Metadata",
        id: "2023-08-06-ptr-metadata",
        link: "https://bd103.github.io/blog/2023-08-06-ptr-metadata",
        date: new Date("2023-08-06"),
    });

    feed.addItem({
        title: "A note on probability",
        id: "2023-10-23-probability",
        link: "https://bd103.github.io/blog/2023-10-23-probability",
        date: new Date("2023-10-23"),
    });

    feed.addItem({
        title: "Announcing TickLowerPerm",
        id: "2023-11-03-announcing-ticklowerperm",
        link: "https://bd103.github.io/blog/2023-11-03-announcing-ticklowerperm",
        date: new Date("2023-11-03"),
    });

    feed.addItem({
        title: "4 Years of Bevy",
        id: "2024-08-18-4-years-of-bevy",
        link: "https://bd103.github.io/blog/2024-08-18-4-years-of-bevy",
        date: new Date("2024-08-18"),
    });
}
