<script
  lang="ts"
  strictEvents>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ data: { year: number; weekNumber: number } }>();
  export let weekNumber: number | null = null;
  export let year: number | null = null;

  function loadData(year: number, weekNumber: number): void {
    dispatch('data', { weekNumber, year });
  }
</script>

<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<!-- eslint-disable @typescript-eslint/require-await -->
<!-- eslint-disable @typescript-eslint/no-magic-numbers -->

<div class="header">
  <button
    type="button"
    on:click={async () => {
      if (weekNumber !== null && year !== null) {
        loadData(year, (weekNumber -= 1));
      }
    }}>Previous</button
  >
  <h1>Week {weekNumber}</h1>
  <button
    type="button"
    on:click={async () => {
      if (weekNumber !== null && year !== null) {
        loadData(year, (weekNumber += 1));
      }
    }}>Next</button
  >
</div>

<style>
	h1 {
		font-size: 0.8rem;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
