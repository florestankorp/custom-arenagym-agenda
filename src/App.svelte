<script lang="ts">
	import { getWeek, getYear } from 'date-fns';
	import { onMount } from 'svelte';
	import { Weekday, type Training } from './models';
	import { mapHTMLToData } from './utils';

	let year = getYear(new Date());
	let weekNumber = getWeek(new Date());

	let transformedData = new Map<Weekday, Training[]>();

	async function loadData(year: number, weekNumber: number): Promise<void> {
		const response = await fetch(
			`https://arenagym.sportbitapp.nl/cbm/embed/rooster/web/2/?jaar=${year}&weeknr=${weekNumber}`
		);
		const html = await response.text();
		transformedData = mapHTMLToData(html);
	}

	onMount(() => {
		loadData(year, weekNumber);
	});
</script>

<div class="header">
	<button on:click={() => loadData(year, (weekNumber -= 1))}>Previous</button>
	<h1>Week {weekNumber}</h1>
	<button on:click={() => loadData(year, (weekNumber += 1))}>Next</button>
</div>
<div class="output">
	{#each [...transformedData] as [key, values]}
		{#if values.length}
			<div class="card-container">
				<h2>
					{Weekday[key]}
				</h2>

				{#each values as training}
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
