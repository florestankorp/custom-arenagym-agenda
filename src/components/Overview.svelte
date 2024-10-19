<script lang="ts" strictEvents>
	import { trainingsData$ } from '../data/store';
	import { Weekday, type Training } from '../models';
	let trainingsData: Map<Weekday, Training[]> | null = null;

	trainingsData$.subscribe((trainingsData$) => {
		trainingsData = trainingsData$;
	});
</script>

<div class="output">
	{#if trainingsData?.entries()}
		{#each trainingsData as [key, values]}
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
		color-scheme: light dark;
		border: 1px solid white;
	}

	p {
		margin: 0;
	}

	@media (prefers-color-scheme: light) {
		.card {
			color: #213547;
			border: 1px solid black;
		}
	}
</style>
