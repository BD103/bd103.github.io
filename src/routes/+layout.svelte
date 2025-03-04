<script lang="ts">
  let { children } = $props();
</script>

<div class="grid">
  <nav>
    <h1>BD103</h1>

    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/history">History</a></li>
      <li><a href="https://github.com/BD103">Github</a></li>
      <li><a href="https://github.com/BD103/bd103.github.io">Source Code</a></li>
      <li>RSS, Atom</li>
    </ul>
  </nav>

  <main>{@render children()}</main>
</div>

<style>
  :global {
    /* Global site variables. */
    :root {
      --primary: #0c5;
      --primary-hover: #00a344;

      --background-color: #383a39;

      --text-color: #e7e7e7;
      --text-color-strong: #fff;
      --text-color-weak: #b1b1b1;

      --font-family: "DM Serif Display", Georgia, serif;

      --line-height: 1.5;

      --border-radius: 30px;
      --border-color: black;

      --transition-delay: 200ms;
    }

    body {
      background-color: var(--background-color);
      color: var(--text-color);
      font-family: var(--font-family);
      line-height: var(--line-height);
    }

    h1,
    h2,
    strong {
      color: var(--text-color-strong);
    }

    a {
      color: var(--primary);
      transition: color var(--transition-delay);
    }

    a:hover {
      color: var(--primary-hover);
    }
  }

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
