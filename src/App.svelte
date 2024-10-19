<script lang="ts" strictEvents>
	import { getWeek, getYear, setDefaultOptions } from 'date-fns';
	import { nl } from 'date-fns/locale';
	import { onMount } from 'svelte';
	import Hamburger from './components/Hamburger.svelte';
	import Options from './components/Options.svelte';
	import Overview from './components/Overview.svelte';
	import WeekSelect from './components/WeekSelect.svelte';
	import { trainingsData$, trainingsDataImmutable$ } from './data/store';
	import { ShowRangeEnum } from './models';
	import { mapHTMLToData } from './utils';

	setDefaultOptions({ locale: nl });

	let showOptions = false;
	let showRange = ShowRangeEnum.Today;

	const currentWeekNumber = getWeek(new Date());
	const currentYear = getYear(new Date());

	async function loadData(year: number, weekNumber: number): Promise<void> {
		const response = await fetch(
			`https://arenagym.sportbitapp.nl/cbm/embed/rooster/web/2/?jaar=${year}&weeknr=${weekNumber}`
		);

		const html = await response.text();
		const trainingsData = mapHTMLToData(html, showRange);

		// Initialize the store
		trainingsData$.set(trainingsData);
		trainingsDataImmutable$.set(trainingsData);
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

<Options bind:sidebar={showOptions} />

<div class="app-container">
	{#if showRange === ShowRangeEnum.All}
		<WeekSelect
			weekNumber={currentWeekNumber}
			year={currentYear}
			on:data={async ({ detail: { weekNumber, year } }) => loadData(year, weekNumber)}
		/>
	{/if}

	<button class="toggle-button" type="button" on:click={toggleRangeVisibility}
		>Show {showRange === ShowRangeEnum.Today ? 'weekly view' : 'today'}</button
	>

	<Overview />
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
