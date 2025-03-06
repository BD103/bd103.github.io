/**
 * A programmable-friendly version of `PostMetadata`.
 */
export interface Post extends PostMetadata {
  href: string;
}

/**
 * The front matter metadata defined in each SVX file.
 */
interface PostMetadata {
  title: string;
}

/**
 * Returns a list of all `Post`s.
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
    });
  }

  return posts;
}
