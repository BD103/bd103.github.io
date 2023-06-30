export const useBlog = () => ({
    // Returns a list of all blogs posts (title and _path)
    nav: async () => (await fetchContentNavigation(queryContent("blog")))[0].children,
});
