<script lang="ts">
  import { resolve } from "$app/paths";
  import HistoryEntry from "$lib/HistoryEntry.svelte";
</script>

<h1>History</h1>

<p>A list of notable changes made to this website.</p>

<HistoryEntry date="2025-03-13">
  {#snippet body()}
    I changed the primary color palette to be peach orange and dark turquoise, which looks really
    nice and is quite unique compared to the original green and gray! I also switched the font to be
    serif instead of sans-serif, since I think it looks nicer. The website should also be <i
      >slightly</i
    > better on mobile, but I'm still learning!
  {/snippet}
</HistoryEntry>

<HistoryEntry date="2025-03-11">
  {#snippet body()}
    I rewrote the website from the ground up using <a href="https://svelte.dev/">Svelte</a>. This
    was after I ran into some issues building the website earlier in the week due to outdated and
    broken dependencies. Overall, things should still appear the same, even if the framework beneath
    it is different. :)
  {/snippet}
</HistoryEntry>

<HistoryEntry date="2024-08-18">
  {#snippet body()}
    I switched the website to have a dark gray background and white text instead of white background
    and black text. My eyes were tired of being blinded, and dark mode looks a lot better in my
    opinion! This was done after working on my blog post on <a
      href={resolve("/blog/2024-08-18-4-years-of-bevy")}>Bevy's 4th birthday</a
    >.
  {/snippet}
</HistoryEntry>

<HistoryEntry date="2024-06-30">
  {#snippet body()}
    After a full year, I get an idea for writing a blog post on <a
      href={resolve("/blog/2023-06-27-global-allocators")}>custom global allocators in Rust</a
    >. In that time, I gained a lot of experience in writing websites with
    <a href="https://nuxt.com">Nuxt</a>. I take this opportunity to completely rewrite the website
    using it and the <a href="https://content.nuxtjs.org">Content module</a>.
  {/snippet}
</HistoryEntry>

<HistoryEntry date="2022-05-10">
  {#snippet body()}
    I publish my final blog post using Jekyll about <i>Shared-State Functions in Python</i>. It was
    a fun post about using Python function arguments incorrectly. What follows this is a 1 year
    silence where I do not post anything.
  {/snippet}
</HistoryEntry>

<HistoryEntry date="2021-09-23">
  {#snippet body()}
    Rewrote the website using Jekyll, Github Page's preferred website generator. I used a custom
    theme named <a href="https://github.com/abhinavs/moonwalk">Moonwalk</a>. I really liked how it
    looked! My first blog post stated that this was the 4th version of my blog to be published.
  {/snippet}
</HistoryEntry>

<HistoryEntry date="2021-08-19">
  {#snippet body()}
    Rewrote the website using <a href="https://gohugo.io">Hugo CMS</a>, under the domain
    <i>bd103.thedev.id</i>. This domain was shortly changed to <i>bd103.github.io</i> due to issues
    using the <code>CNAME</code> file. All code for my previous website was moved to
    <a href="https://github.com/BD103/Old-Website">BD103/Old-Website</a>
    and <a href="https://github.com/BD103/Old-Website-2">BD103/Old-Website-2</a>.
  {/snippet}
</HistoryEntry>
