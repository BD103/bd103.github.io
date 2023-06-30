<template>
    <main>
        <h1>Hello!</h1>

        <p>Welcome to my website / blog! I make fun programming projects and write about them.</p>

        <h2>Topics</h2>

        <p>Some of the topics I use and talk about the most include:</p>

        <ul>
            <li><NuxtLink to="https://rust-lang.org" target="_blank">Rust</NuxtLink></li>
            <li><NuxtLink to="https://nuxt.com" target="_blank">Nuxt</NuxtLink></li>
            <li><NuxtLink to="https://kotlinlang.org" target="_blank">Kotlin</NuxtLink></li>
            <li>And more! :)</li>
        </ul>

        <h2>Recent Posts</h2>

        <ul>
            <li v-for="post of recentPosts" :key="post._path">
                <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
            </li>
        </ul>

        <p><NuxtLink to="/blog">All posts...</NuxtLink></p>

        <h2>Dear Mobile Users</h2>

        <p>
            Hello! Thanks for stopping by :). I apologize for the poor user experience, I'm still learning CSS.
            I promise that you'll get better reactivity soon!
        </p>
    </main>
</template>

<script setup lang="ts">
const { data: recentPosts } = await useAsyncData(
    "recentPosts",
    // Query the nav and get the 5 most recent posts
    async () => (await useBlog().nav())?.reverse().slice(0, 5)
);
</script>
