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
  import { TrainingType, Weekday, type Training } from './models';
  import { initializeMap, mapHTMLToData } from './utils';

  let transformedData = new Map<Weekday, Training[]>();

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let transformedDataImmutable: Map<Weekday, Training[]>;

  let weekNumber = getWeek(new Date());
  const year = getYear(new Date());
  const trainingFilter: Record<TrainingType, boolean> = {
    [TrainingType.FITNESS]: false,
    [TrainingType.INSTRUCTIE_OPEN_GYM]: false,
    [TrainingType.CF_OPEN_BOX]: false,
    [TrainingType.CF_GYMNASTICS]: true,
    [TrainingType.CF_WEIGHTLIFTING]: true,
    [TrainingType.CROSSFIT_WOD]: true,
    [TrainingType.CROSSFIT_ADVANCED]: true,
    [TrainingType.CROSSFIT_FUNDAMENTALS]: true,
    [TrainingType.HYROX]: true,
    [TrainingType.KICKBOKSEN]: true,
    [TrainingType.KICKBOKSEN_RECREANTEN]: true,
    [TrainingType.KICKBOKSEN_ADVANCED]: true,
    [TrainingType.KIDS_KICKBOKSEN]: false,
    [TrainingType.BOKSEN]: true,
    [TrainingType.ZAKTRAINING]: true,
    [TrainingType.KIDS_PERFORMANCE]: false,
    [TrainingType.LADIES_ONLY_FIT_TALITY]: false,
    [TrainingType.LADIES_ONLY_HIIT]: false,
    [TrainingType.CIRCUIT_TRAINING]: true
  };

  function updateTrainings(): void {
    const updatedData = initializeMap();
    const selectedTitles = Object.keys(trainingFilter).filter(
      (trainingType) => trainingFilter[trainingType as TrainingType]
    );

    for (const [key, weekday] of transformedDataImmutable) {
      updatedData.set(
        key,
        weekday.filter(({ title }) => (title === null ? false : selectedTitles.includes(title)))
      );
    }

    transformedData = updatedData;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function loadData(year: number, weekNumber: number): Promise<void> {
    const response = await fetch(
      `https://arenagym.sportbitapp.nl/cbm/embed/rooster/web/2/?jaar=${year}&weeknr=${weekNumber}`
    );
    const html = await response.text();

    transformedData = mapHTMLToData(html);
    transformedDataImmutable = transformedData;
    updateTrainings();
  }

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
<div class="options">
  {#each Object.keys(trainingFilter) as key, transformedDataIndex (transformedDataIndex)}
    <label>
      <input
        type="checkbox"
        bind:checked={trainingFilter[key]}
        on:change={() => {
          updateTrainings(key);
        }}
      />
      {key}
    </label>
  {/each}
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
	h1 {
		font-size: 0.8rem;
	}
	h2 {
		text-align: center;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

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
