import { loadPosts } from "$lib/blog";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return { posts: loadPosts() };
};
