<!-- eslint-disable @typescript-eslint/no-magic-numbers -->
<!-- eslint-disable svelte/block-lang -->
<!-- eslint-disable sort-imports -->
<script
  lang="ts"
  strictEvents>
  import { getWeek, getYear } from 'date-fns';
  import { onMount } from 'svelte';
  import Hamburger from './components/Hamburger.svelte';
  import Options from './components/Options.svelte';
  import Overview from './components/Overview.svelte';
  import WeekSelect from './components/WeekSelect.svelte';
  import { TrainingType, type Training, type Weekday } from './models';
  import { initializeMap, mapHTMLToData } from './utils';

  let transformedData = new Map<Weekday, Training[]>();

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let transformedDataImmutable: Map<Weekday, Training[]>;

  let open = false;

  const weekNumber = getWeek(new Date());
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
    [TrainingType.CIRCUIT_TRAINING]: true,
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

<header>
  <nav>
    <Hamburger bind:open />
  </nav>
</header>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->
<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<div
  class="app-container"
  on:click|stopPropagation={() => {
    open = false;
  }}
>
  <Options
    {trainingFilter}
    bind:sidebar={open}
    on:change={updateTrainings} />

  <WeekSelect
    {weekNumber}
    {year}
    on:data={async ({ detail: { weekNumber, year } }) => loadData(year, weekNumber)}
  />

  <Overview {transformedData} />
</div>

<style>
	header {
		z-index: 1;
		width: 100vw;
		background-color: brown;
		margin-bottom: 20px;
	}

	.app-container {
		padding: 2rem;
		margin: 0 auto;
	}
</style>
