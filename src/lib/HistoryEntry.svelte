<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    date: string;
    body: Snippet;
  }

  const { date, body }: Props = $props();
</script>

<div>
  <h2>{date}</h2>
  <p>{@render body()}</p>
</div>
