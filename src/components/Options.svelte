<script lang="ts" strictEvents>
	import { titles$, trainingsData$, trainingsDataImmutable$ } from '../data/store';
	import { SELECT_ALL, Weekday, type Training } from '../models';
	import { clickOutside, initializeMap } from '../utils';

	export let sidebar = false;

	let titles: Map<string, boolean>;
	let trainingsData: Map<Weekday, Training[]> | null = null;
	let trainingsDataImmutable: Map<Weekday, Training[]> | null = null;

	titles$.subscribe((titles$) => {
		titles = titles$;
	});

	trainingsDataImmutable$.subscribe((trainingsDataImmutable$) => {
		trainingsDataImmutable = trainingsDataImmutable$;
	});

	trainingsData$.subscribe((trainingsData$) => {
		trainingsData = trainingsData$;
	});

	function isTitleChecked(title: string): boolean {
		return Boolean(titles.get(title));
	}

	function updateTrainingsData(title: string): void {
		const updatedData = initializeMap();

		// Toggle select
		titles$.update(() => {
			titles.set(title, !titles.get(title));

			if (title === SELECT_ALL) {
				for (const [key] of titles) {
					titles.set(key, Boolean(titles.get(SELECT_ALL)));
				}
			}

			return titles;
		});

		const selectedTitles = Array.from(titles.entries())
			.filter(([, selected]) => selected)
			.map(([title]) => title);

		for (const [weekday, training] of trainingsDataImmutable!) {
			const filteredTraining = training.filter(({ title }) => {
				return title && selectedTitles.includes(title);
			});

			updatedData?.set(weekday, filteredTraining);
		}

		trainingsData$.update(() => {
			return updatedData;
		});
	}
</script>

<aside class="options" class:sidebar on:click_outside={() => (sidebar = false)} use:clickOutside>
	{#if titles}
		{#each titles.keys() as title}
			<label>
				<input
					type="checkbox"
					checked={isTitleChecked(title)}
					on:change={() => updateTrainingsData(title)}
				/>
				{title}
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
