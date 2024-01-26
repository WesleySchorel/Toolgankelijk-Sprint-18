<script>
	import Heading from '$lib/components/heading.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data;

	const principes = data.principesData.principes;

	$: heading = {
		titel: data.websitesData.website.titel,
		homepage: data.urlData.url.url,
		url: data.urlData.url.slug
	};

	let successCriteriaMap = {};
	let criteriaPerPrincipe = {};

	onMount(() => {
		const criteriaSlice = data.urlData.url.checks.flatMap((check) =>
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

<Heading {heading} />

<section class="container-principes">
	<ul>
		{#each principes as principe (principe.index)}
			<li>
				<a href="{$page.url.pathname}/{principe.slug}">
					<div class="principe">
						<h3><span>{principe.titel}. </span> Principe {principe.index}</h3>
						<p>{principe.beschrijving.text}</p>
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
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	/* VOORTGANG
	.container-voortgang-1 {
		background-color: var(--c-container);
		padding: 1em 1em;
		margin: 1em;
		border-radius: 0.5em;
	}

	.container-voortgang-2 {
		display: flex;
		flex-wrap: wrap;
		border-radius: 0.5em;
	}

    .container-voortgang-2 p {
		font-size: 1em;
		max-width: 16rem;
		margin-top: .25em;
	}

	.container-voortgang-2 ul {
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		margin: 1em;
	}

	.container-voortgang-2 li {
		background-color: var(--c-container-stroke);
		padding: 1em;
		border-radius: 0.5em;
		min-width: 16em;
	} */

	li a {
		text-decoration: none;
		color: inherit;
	}

	/* VOORTGANG PRESTATIES */
	/* .goed-bezig {
		color: var(--c-green);
		font-size: 1.25em;
	}

	.tip {
		color: var(--c-orange);
		font-size: 1.25em;
	} */

	/* PRINCIPES */

	h3 {
		font-size: 1.5em;
		margin-bottom: 0.25em;
	}

	.container-principes ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(clamp(17rem, 40vw, 40rem), 1fr));
		gap: 1em;

		list-style-type: none;
		margin: 0 1em;
		margin-bottom: 1em;
	}

	.container-principes li {
		border-radius: 0.5em;
		border: solid 1px transparent;
	}

	.container-principes li:hover {
		border: solid 1px var(--c-pink);
	}

	span {
		color: var(--c-pink);
	}

	.principe p {
		font-size: 1em;
		margin-bottom: 3rem;
		width: 80%;
	}

	.principe {
		padding: 2em;
		background-color: var(--c-container);

		border-radius: 0.5em;
		height: 100%;
		border: solid 1px var(--c-container-stroke);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.progress-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1em;
		margin-top: 0.25em;
	}

	/* progress */
	progress {
		width: 100%;
	}

	progress[value] {
		/* Reset the default appearance */
		-webkit-appearance: none;
		appearance: none;
		height: 60%;
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

	.progress-percentage {
		height: 85%;
	}
</style>
