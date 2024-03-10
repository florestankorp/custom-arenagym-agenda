<!-- eslint-disable sort-imports -->
<!-- eslint-disable @typescript-eslint/no-magic-numbers -->
<!-- eslint-disable sort-imports -->
<!-- eslint-disable svelte/block-lang -->
<!-- eslint-disable sort-imports -->
<script
  lang="ts"
  strictEvents>
  import { getWeek, getYear } from 'date-fns';
  import { onMount } from 'svelte';
// eslint-disable-next-line sort-imports
  import { Weekday, type Training } from './models';
  import { mapHTMLToData } from './utils';

  let transformedData = new Map<Weekday, Training[]>(),
    weekNumber = getWeek(new Date());
  const year = getYear(new Date());

  // eslint-disable-next-line one-var, no-shadow, @typescript-eslint/no-shadow
  const loadData = async (year: number, weekNumber: number): Promise<void> => {
    const response = await fetch(
      `https://arenagym.sportbitapp.nl/cbm/embed/rooster/web/2/?jaar=${year}&weeknr=${weekNumber}`
    ),
      // eslint-disable-next-line sort-vars
      html = await response.text();

    transformedData = mapHTMLToData(html);
  };

  onMount(async () => loadData(year, weekNumber));
</script>

<div class="header">
  <button
    type="button"
    on:click={async () => loadData(year, (weekNumber -= 1))}>Previous</button>
  <h1>Week {weekNumber}</h1>
  <button
    type="button"
    on:click={async () => loadData(year, (weekNumber += 1))}>Next</button>
</div>
<div class="output">
  {#each transformedData as [key, values], transformedDataIndex (transformedDataIndex)}
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
</div>

<style>
  h1{
    font-size: 0.8rem;
  }
  h2{
    text-align: center;

  }
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

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
