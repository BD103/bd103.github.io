/**
 * A programmable-friendly version of `PostMetadata`.
 */
export interface Post extends PostMetadata {
  href: string;
  date: Date;
}

/**
 * The front matter metadata defined in each SVX file.
 */
interface PostMetadata {
  title: string;
}

/**
 * Returns a list of all `Post`s, sorted by date (newest first).
 */
export function loadPosts(): Post[] {
  // Import the front matter (metadata) of every single blog post, returning a map where the key is
  // the path to the `+page.svx` file and the value is the front matter.
  const pageMetadata: Record<string, PostMetadata> = import.meta.glob(
    "../routes/blog/*/+page.svx",
    {
      // Specifically import the `metadata` constant. See
      // <https://vite.dev/guide/features.html#named-imports> for more information.
      import: "metadata",
      // Statically import `metadata`, instead of asynchronously.
      eager: true,
    },
  );

  const posts: Post[] = [];

  for (const path in pageMetadata) {
    posts.push({
      title: pageMetadata[path].title,
      href: path.substring("../routes".length, path.length - "/+page.svx".length),
      date: new Date(path.substring("../routes/blog/".length, "../routes/blog/YYYY-MM-DD".length)),
    });
  }

  // Sort `posts` in-place based on their date. We first convert each date to a number, in
  // milliseconds since the Unix epoch, then subtract them to return either a positive or negative
  // number representing if `b` is less than or greater than `a`.
  posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return posts;
}
