<script
  lang="ts"
  strictEvents>
  import { createEventDispatcher } from 'svelte';
  import type { TrainingType } from '../models';
  export let trainingFilter: Record<TrainingType, boolean> | null = null;
  const dispatch = createEventDispatcher<{ change: unknown }>();

  function getKey(key: string): TrainingType {
    return key as TrainingType
  }
</script>

<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<!-- eslint-disable svelte/require-each-key -->
<div class="options">
  {#if trainingFilter}
    {#each Object.keys(trainingFilter) as key}
      <label>
        <input
          type="checkbox"
          bind:checked={trainingFilter[getKey(key)]}
          on:change={() => dispatch('change')}
        />
        {key}
      </label>
    {/each}
  {/if}
</div>

<style>
	.options {
		margin-top: 20px;
		display: grid;
		grid-auto-flow: column;
		grid-template: repeat(5, 1fr) / repeat(3, 1fr);

		/* Everything smaller than desktop */
		@media only screen and (max-width: 768px) {
			width: 100%;
			grid-auto-flow: unset;
			grid-template: unset;
		}
	}
</style>
