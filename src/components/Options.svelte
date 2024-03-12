<script
  lang="ts"
  strictEvents>
  import { createEventDispatcher } from 'svelte';
  import type { TrainingType } from '../models';
  export let trainingFilter: Record<TrainingType, boolean> | null = null;
  export let sidebar = false;
  const dispatch = createEventDispatcher<{ change: unknown }>();

  function getKey(key: string): TrainingType {
    return key as TrainingType;
  }
</script>

<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<!-- eslint-disable svelte/require-each-key -->

<aside
  class="options"
  class:sidebar>
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
</aside>

<style>
	.options {
		display: flex;
		flex-direction: column;
		color-scheme: light dark;
		color: rgba(255, 255, 255, 0.87);
		background-color: #333333;
		padding: 20px;
		height: 100vh;
		position: fixed;
		/* Everything smaller than desktop */
		@media only screen and (max-width: 768px) {
		}
	}

	aside {
		/* offscreen by default */
		left: -100%;
		top: 0;
		transition: left 0.3s ease-in-out;
		position: absolute;
	}

	.sidebar {
		/* slide on screen */
		left: 0;
	}

	@media (prefers-color-scheme: light) {
		.options {
			color: #213547;
			background-color: #ffffff;
		}
	}
</style>
