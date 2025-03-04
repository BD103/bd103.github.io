<script lang="ts">
  let { children } = $props();
</script>

<div class="grid">
  <nav>
    <h1>BD103</h1>

    <ul>
      <li><a href="/">Home</a></li>
      <li>Blog</li>
      <li>History</li>
      <li>Github</li>
      <li>Source Code</li>
      <li>RSS, Atom</li>
    </ul>
  </nav>
  <main>{@render children()}</main>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  /* When on mobile, switch to a single-column grid. */
  @media (width <= 500px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
