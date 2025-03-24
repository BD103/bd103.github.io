<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>BD103's Blog</title>
</svelte:head>

<div class="container">
  <nav>
    <h1>BD103</h1>

    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/history">History</a></li>
      <li><a href="https://github.com/BD103">Github</a></li>
      <li><a href="https://github.com/BD103/bd103.github.io">Source Code</a></li>
      <li><a href="/feed.xml">RSS</a>, <a href="/atom.xml">Atom</a></li>
    </ul>
  </nav>

  <main>{@render children()}</main>
</div>

<style>
  @import "../styles/vars.css";
  @import "../styles/main.css";
  @import "../styles/syntax.css";

  .container {
    max-width: 60em;
    margin: 0 auto;
    padding: 4rem 1rem;

    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  /* Prevent elements that cannot wrap from stealing screen space from the nav bar. */
  .container main {
    max-width: 40em;
  }

  /* When on mobile, switch to a single-column grid. */
  @media (width <= 820px) {
    .container {
      grid-template-columns: 1fr !important;
    }

    .container main {
      /* 90% of the viewport width */
      max-width: 90vw;
    }
  }

</style>
