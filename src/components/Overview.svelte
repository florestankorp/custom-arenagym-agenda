<script
  lang="ts"
  strictEvents>
  import { Weekday, type Training } from "../models";
  export let transformedData: Map<Weekday, Training[]> | null = null;
</script>

<!-- eslint-disable svelte/require-each-key -->
<div class="output">
  {#if transformedData}
    {#each transformedData as [key, values]}
      {#if values.length}
        <div>
          <h2>
            {Weekday[key]}
          </h2>

          {#each values as training, trainingIndex (trainingIndex)}
            <div class="card">
              <p>{training.title}</p>
              <p>{training.time}</p>
              <p>{training.trainer}</p>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  {/if}
</div>

<style>
	h2 {
		text-align: center;
	}

	.output {
		display: flex;
		flex-direction: row;
		gap: 24px;

		/* Everything smaller than desktop */
		@media only screen and (max-width: 768px) {
			flex-direction: column;
		}
	}

	.card {
		margin-bottom: 16px;
		padding: 16px;
		border: 1px solid black;
	}

	p {
		margin: 0;
	}
</style>
