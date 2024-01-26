<script>
	export let principes;
	export let urlData;
	import { onMount } from 'svelte';
	let successCriteriaMap = {};
	let criteriaPerPrincipe = {};

	onMount(() => {
		const criteriaSlice = urlData.url.checks.flatMap((check) =>
			check.succescriteria.map((criteria) => criteria.index)
		);

		criteriaSlice.forEach((index) => {
			const principleIndex = index.split('.')[0];
			if (!successCriteriaMap[principleIndex]) {
				successCriteriaMap[principleIndex] = [];
			}
			successCriteriaMap[principleIndex].push(index);
		});

		principes.forEach((principe) => {
			criteriaPerPrincipe[principe.index] = principe.richtlijnen.reduce(
				(total, richtlijn) => total + richtlijn.succescriteria.length,
				0
			);
		});
	});
</script>

<aside>
	<ul>
		{#each principes as principe}
			<li>
				<a href="/">
					<h5>{principe.titel}</h5>
					<span>Principe {principe.index}</span>
					<div class="progress-container">
						<progress
							id="progress-partner"
							max={criteriaPerPrincipe[principe.index] || 100}
							value={successCriteriaMap[principe.index]?.length || 0}
						/>
						<label class="progress-percentage" for="progress-partner">
							{(
								((successCriteriaMap[principe.index]?.length || 0) /
									(criteriaPerPrincipe[principe.index] || 100)) *
								100
							).toFixed(0)}%
						</label>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</aside>

<style>
	h5 {
		font-size: 1.5rem;
		font-weight: 500;
		font-family: 'Inter', sans-serif;
	}

	span {
		font-weight: 100;
	}

	aside {
		display: block;
		position: -webkit-sticky;
		position: sticky;
		top: calc(90px + 1em);
		height: 100%;
		background-color: var(--c-container);
		border-radius: 0.5em;
		border: solid 1px var(--c-container-stroke);
		flex-grow: 400;
		flex-basis: 0;
		align-self: start;
		z-index: -1;
	}

	li {
		display: flex;
	}

	a {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid var(--c-container-stroke);
		padding: 1em;
		color: white;
		text-decoration: none;
	}

	span {
		font-weight: 100;
	}

	div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1em;
		margin-top: 0.25em;
	}

	progress {
		width: 100%;
	}

	progress[value] {
		/* Reset the default appearance */
		-webkit-appearance: none;
		appearance: none;
		height: 10px;
	}

	/* chrome/safari */
	progress[value]::-webkit-progress-bar {
		background-color: var(--c-container-stroke);
		border-radius: 0.5em;
	}

	progress[value]::-webkit-progress-value {
		background-color: var(--c-pink);
		border-radius: 0.5em;
	}

	label {
		height: 85%;
	}
</style>
