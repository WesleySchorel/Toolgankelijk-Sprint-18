<script>
	export let richtlijnen;
	export let toolboardData;
	export let selectedNiveau = 'A';

	import { onMount } from 'svelte';

	const getSuccescriteriaByNiveau = (niveau) =>
		toolboardData.url.checks[0]
			? toolboardData.url.checks[0].succescriteria.filter((item) => item.niveau === niveau)
			: [];

	let filteredSuccescriteria = getSuccescriteriaByNiveau(selectedNiveau);

	const handleNiveauChange = (event) => {
		selectedNiveau = event.target.value;
		filteredSuccescriteria = getSuccescriteriaByNiveau(selectedNiveau);
	};

	const checkedSuccescriteria = toolboardData.url.checks[0]
		? toolboardData.url.checks[0].succescriteria
		: [];
	onMount(() => {
		const niveauToggle = document.querySelector('#niveau-toggle');
		console.log(niveauToggle);
		niveauToggle.classList.toggle('disabled');
	});
</script>

<section>
	<div id="niveau-toggle" class="disabled">
		<label>
			Selecteer niveau:
			<select bind:value={selectedNiveau} on:change={handleNiveauChange}>
				<option value="A">Niveau A</option>
				<option value="AA">Niveau AA</option>
				<option value="AAA">Niveau AAA</option>
			</select>
		</label>
	</div>

	<form action="">
		{#each richtlijnen as richtlijn}
			<article>
				<div>
					<span>Richtlijn {richtlijn.index}</span>
					<h3>{richtlijn.titel}</h3>
				</div>
				{#each richtlijn.succescriteria as succescriterium}
					{#if succescriterium.niveau === selectedNiveau}
						<details>
							<summary>
								<label>
									<div>
										<span>Criteria {succescriterium.index} ({succescriterium.niveau})</span>
										<h4>{succescriterium.titel}</h4>
									</div>
									<input
										type="checkbox"
										checked={checkedSuccescriteria.find((e) => e.id === succescriterium.id)}
									/>
								</label>
							</summary>
							<div class="richtlijn-uitleg">{@html richtlijn.uitleg.html}</div>
						</details>
					{/if}
				{/each}
			</article>
		{/each}
	</form>
</section>

<style>
	select {
		border-radius: 0.25em;
		padding: 0.5em 1em;
		color: var(--c-white);
		background-color: var(--c-modal-button);
		border: none;
		font-weight: 600;
		font-size: 1em;
		cursor: pointer;
	}

	.richtlijn-uitleg {
		padding-left: 3rem;
	}

	section {
		flex-basis: 0;
		flex-grow: 999;
	}

	form article:not(:first-child) {
		margin-top: 1em;
	}

	form article {
		background-color: var(--c-container);
		border-radius: 0.5em;
		border: solid 1px var(--c-container-stroke);
	}

	article > div {
		padding: 1em 1em 0 1em;
	}

	h3,
	h4 {
		font-size: 1.2rem;
		font-weight: 600;
	}

	span {
		font-weight: 100;
		font-family: 1em;
	}

	label {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	label div {
		margin-left: 1em;
	}

	details {
		padding: 1em;
	}

	section details:not(:nth-child(2)) {
		border-top: 1px solid var(--c-container-stroke);
	}

	summary {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:before {
		content: '🡒';
		font-size: 1.5em;
		color: #fff;
		width: 30px;
	}

	details[open] summary:before {
		content: '🡓';
		color: var(--c-pink);
	}

	details > div {
		font-size: 0.9em !important;
		padding-top: 1em;
	}

	/* Custom checkbox styling */
	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
		color: var(--c-pink);
		min-width: 2em;
		width: 2em;
		height: 2em;
		border: 0.15em solid currentColor;
		border-radius: 0.3em;
		transform: translateY(-0.075em);
		display: grid;
		place-content: center;
	}

	input[type='checkbox']::before {
		content: '';
		width: 1em;
		height: 1em;
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
		transform: scale(0);
		background-color: white;
	}

	input[type='checkbox']:checked::before {
		transform: scale(1);
	}

	input[type='checkbox']:checked {
		background-color: var(--c-pink);
	}

	#niveau-toggle {
		margin-bottom: 1em;
	}
</style>
