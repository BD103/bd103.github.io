import { getFeed } from "$lib/server/feed";
import type { RequestHandler } from "@sveltejs/kit";

// Force this route to be prerendered, since it just generates a static file.
export const prerender = true;

export const GET: RequestHandler = () => {
  const feed = getFeed();

  return new Response(feed.atom1(), {
    headers: new Headers({ "Content-Type": "application/atom+xml" }),
  });
};
