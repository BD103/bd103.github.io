<template>
    <main>
        <h1>Blog</h1>

        <ul>
            <li v-for="post of allPosts" :key="post._path">
                <NuxtLink :to="post._path">
                    {{ post.title }}
                </NuxtLink>
            </li>
        </ul>

        <p>This page is a work in progress! Check back later for more improvements.</p>
    </main>
</template>

<script setup lang="ts">
const { data: allPosts } = await useAsyncData("allPosts", async () => (await useBlog().nav())?.reverse());
</script>
