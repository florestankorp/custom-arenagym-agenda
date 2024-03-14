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
<!-- eslint-disable svelte/no-unused-class-name -->

<div class="week-select">
  <button
    data-testid="button-previous"
    type="button"
    on:click={async () => {
      if (weekNumber !== null && year !== null) {
        loadData(year, (weekNumber -= 1));
      }
    }}
  >
    <i class="fa fa-solid fa-arrow-left" />
  </button>
  <h1>Week {weekNumber}</h1>
  <button
    data-testid="button-next"
    type="button"
    on:click={async () => {
      if (weekNumber !== null && year !== null) {
        loadData(year, (weekNumber += 1));
      }
    }}
  >
    <i class="fa fa-solid fa-arrow-right" />
  </button>
</div>

<style>
	h1 {
		font-size: 0.8rem;
	}
	.week-select {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
