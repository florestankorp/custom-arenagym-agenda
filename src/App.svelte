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
  import { ShowRangeEnum, TrainingType, type Training, type Weekday } from './models';
  import { initializeMap, mapHTMLToData } from './utils';

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let transformedDataImmutable: Map<Weekday, Training[]>;
  let transformedData = new Map<Weekday, Training[]>();
  let showOptions = false;
  let showRange = ShowRangeEnum.Today;

  const currentWeekNumber = getWeek(new Date());
  const currentYear = getYear(new Date());
  const trainingFilter: Record<TrainingType, boolean> = {
    [TrainingType.SELECT_ALL]: false,
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

  function updateTrainings(filterParam?: TrainingType): void {
    const updatedData = initializeMap();

    // Toggle select all
    if (filterParam === TrainingType.SELECT_ALL) {
      for (const filter in trainingFilter) {
        if (Object.hasOwn(trainingFilter, filter)) {
          trainingFilter[filter as TrainingType] = trainingFilter[TrainingType.SELECT_ALL];
        }
      }
    }

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

    transformedData = mapHTMLToData(html, showRange);
    transformedDataImmutable = transformedData;
    updateTrainings();
  }

  async function toggleRangeVisibility(): Promise<void> {
    // side effect: reset week to current week
    showRange = showRange === ShowRangeEnum.All ? ShowRangeEnum.Today : ShowRangeEnum.All;
    await loadData(currentYear, currentWeekNumber);
  }

  onMount(async () => loadData(currentYear, currentWeekNumber));
</script>

<header>
  <nav>
    <Hamburger bind:open={showOptions} />
  </nav>
</header>

<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<!-- eslint-disable @typescript-eslint/no-unsafe-argument -->

<Options
  {trainingFilter}
  bind:sidebar={showOptions}
  on:changeTrainingsFilter={({ detail: { filterParam } }) => {
    updateTrainings(filterParam);
  }}
/>

<div class="app-container">
  {#if showRange === ShowRangeEnum.All}
    <WeekSelect
      weekNumber={currentWeekNumber}
      year={currentYear}
      on:data={async ({ detail: { weekNumber, year } }) => loadData(year, weekNumber)}
    />
  {/if}

  <button
    class="toggle-button"
    type="button"
    on:click={toggleRangeVisibility}
  >Show {showRange === ShowRangeEnum.Today ? 'weekly view' : 'today'}</button
  >

  <Overview {transformedData} />
</div>

<style>
	header {
		width: 100vw;
		background-color: brown;
		position: sticky;
		top: 0;
	}

	.app-container {
		padding: 2rem;
		margin: 0 auto;
	}

	.toggle-button {
		width: 100%;
		margin-top: 20px;
		border: 1px solid brown;
	}
</style>
