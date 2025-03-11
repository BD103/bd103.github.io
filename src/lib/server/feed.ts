import { loadPosts } from "$lib/blog";
import { Feed } from "feed";

const URL = "https://bd103.github.io";

function createFeed(): Feed {
  return new Feed({
    id: URL,
    title: "BD103's Blog",
    language: "en-US",
    feedLinks: {
      rss2: `${URL}/feed.xml`,
      atom: `${URL}/atom.xml`,
    },
    author: {
      name: "BD103",
      link: URL,
    },
    link: URL,
    description: "BD103's technical blog on programming!",
    copyright: "Copyright 2023, BD103",
  });
}

export function getFeed(): Feed {
  const feed = createFeed();
  const posts = loadPosts();

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      link: URL + post.href,
      date: post.date,
    });
  }

  return feed;
}
