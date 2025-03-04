import type { PageLoad } from "./$types";

type PostMetadata = { title: string };

type Post = {
  title: string;
  href: string;
};

export const load: PageLoad = () => {
  // Import the front matter (metadata) of every single blog post, returning a map where the key is
  // the path to the `+page.svx` file and the value is the front matter.
  const pageMetadata: Record<string, PostMetadata> = import.meta.glob("./blog/*/+page.svx", {
    // Specifically import the `metadata` constant. See <https://vite.dev/guide/features.html#named-imports>
    // for more information.
    import: "metadata",
    // Statically import the `metadata`, as its required in order to render the page. (And we have
    // to import them all anyway.)
    eager: true,
  });

  const posts: Post[] = [];

  // Transform `pageMetadata` from a dictionary to an array of `Post`s.
  for (const path in pageMetadata) {
    posts.push({
      title: pageMetadata[path].title,
      href: path.substring(0, path.length - "/+page.svx".length),
    });
  }

  return { posts };
};
