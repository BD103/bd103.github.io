<script lang="ts">
  import { resolve } from "$app/paths";

  let { data } = $props();
</script>

<h1>Hello!</h1>

<p>
  Welcome to my website and blog! I'm BD103, and I'm an open-sourced contributor with a strong
  interest in game development, tooling, and infrastructure.
</p>

<p>
  I've been an active contributor and community member of <a href="https://bevyengine.org">Bevy</a>,
  a game engine written in <a href="https://www.rust-lang.org">Rust</a>, since November 2023. You'll
  find many of my projects and blog posts are related to Bevy and Rust in general!
</p>

<h2>Posts</h2>

<ul>
  {#each data.posts as post (post.href)}
    <li>
      <a
        href={resolve(
          /* @ts-expect-error: string is guaranteed to match expected paths */
          post.href,
        )}>{post.title}</a
      >
    </li>
  {/each}
</ul>
