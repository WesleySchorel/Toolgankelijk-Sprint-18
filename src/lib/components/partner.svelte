<script>
	export let website;
	export let form;
	export let principes;
	import { onMount } from 'svelte';

	import trash from '$lib/assets/trash.svg';
	import pencil from '$lib/assets/pencil.svg';

	let labelValue;
	let progressbar;

	let openedDelete = null;
	let openedEdit = null;
	let totalSuccessCriteria = 0;

	const updatedTime = new Date(website.updatedAt);
	const currentTime = new Date();
	const timeDifference = Math.floor((currentTime - updatedTime) / (60 * 1000)); // Verschil in minuten
	const lastTime = timeDifference > 0 ? `${timeDifference} min geleden` : 'Zojuist';

	onMount(() => {
		let random = Math.floor(Math.random() * 100);
		progressbar.value = random; // Set initial value

		const websiteCriteria = website.urls.reduce((total, url) => {
			url.checks.forEach((check) => {
				total += check.succescriteria.length;
			});
			return total;
		}, 0);

		const totaalCriteria =
			principes.reduce((total, principe) => {
				principe.richtlijnen.forEach((richtlijn) => {
					total += richtlijn.succescriteria.length;
				});
				return total;
			}, 0) * website.urls.length; // Multiply totaalcriteria by the number of URLs

		const percentage = Math.round((websiteCriteria / totaalCriteria) * 100);

		progressbar.value = websiteCriteria;
		progressbar.max = totaalCriteria;

		labelValue.innerHTML = `${percentage}%`;

		$: document.querySelector(`#icons-${website.id}`).style.display = 'flex';
	});

	const faviconAPI =
		'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=';

	// search, zo maakt sveltekit gebruik van de class
	let containerOff = false;

	function openDelete(event) {
		event.preventDefault();
		openedDelete = openedDelete === website.id ? null : website.id;
		document.body.style.overflowY = 'hidden';
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function closeDelete(event) {
		event.preventDefault();
		openedDelete = null;
		document.body.style.overflowY = 'scroll';
	}

	function openEdit(event) {
		event.preventDefault();
		openedEdit = openedEdit === website.id ? null : website.id;
		document.body.style.overflowY = 'hidden';
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function closeEdit(event) {
		event.preventDefault();
		openedEdit = null;
		document.body.style.overflowY = 'scroll';
	}

	function submitted() {
		if (form?.success) {
			alert(form?.message);
			setTimeout(() => {
				window.location.href = '/';
			}, 1000);
		} else if (form?.success == false) {
			alert(form?.message);
		}
	}
</script>

<li class="website" class:container-off={containerOff}>
	<a href="{website.slug}?partner={website.slug}">
		<section class="logo-partner-section">
			<div>
				<img height="60" src="{faviconAPI}{website.homepage}/&size=128" alt="" />
				<h2 class="name">{website.titel}</h2>
			</div>
			<div class="icons" id={`icons-${website.id}`}>
				<button on:click={openEdit}><img src={pencil} alt="Verwijder icon" /></button>
				<button on:click={openDelete}><img src={trash} alt="Verwijder icon" /></button>
			</div>
		</section>

		<section class="more-info-section">
			<span>Laatst bewerkt: {lastTime}</span>

			<div class="progress-container">
				<progress id="progress-partner" max="100" value="0" bind:this={progressbar} />
				<label class="progress-percentage" for="progress-partner" bind:this={labelValue}>0%</label>
			</div>
		</section>
	</a>
</li>

<!-- Popup voor het bewerken van de partner -->
<div class="popup-edit" style="display: {openedEdit === website.id ? 'flex' : 'none'};">
	<form on:submit={submitted()} action="?/editPartner" method="POST">
		<h3>Pas partner aan</h3>
		<div class="fields-container">
			<label for="slug">Naam</label>
			<input type="text" name="name" id="slug" value={website.titel} />
			<label for="slug">Slug</label>
			<input type="text" name="slug" id="slug" value={website.slug} />
			<label for="slug">URL</label>
			<input type="url" name="url" id="slug" value={website.homepage} />
			<input class="id-field" type="text" name="id" value={website.id} id={website.id} />
		</div>
		<div>
			<input type="submit" value="Ja" />
			<button on:click={closeEdit}>Nee</button>
		</div>
	</form>
</div>

<!-- Popup voor het verwijderen van de partner -->
<div class="popup-verwijder" style="display: {openedDelete === website.id ? 'flex' : 'none'};">
	<form on:submit={submitted()} action="?/deletePartner" method="POST">
		<h3>Verwijder partner</h3>
		<p>
			Weet je zeker dat je <span>{website.slug}</span> wilt verwijderen? Deze actie kan niet ongedaan
			worden gemaakt.
		</p>
		<input class="id-field" type="text" name="id" value={website.id} id={website.id} />
		<div>
			<input type="submit" value="Ja" />
			<button on:click={closeDelete}>Nee</button>
		</div>
	</form>
</div>

<style>
	li {
		display: flex;
	}

	li a {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.25em;
		color: var(--c-text);
		text-decoration: none;
		background-color: var(--c-container);
		padding: 1em;
		border-radius: 0.5em;
		border: solid 1px var(--c-container-stroke);
		width: 100%;
		transition: 0.25s ease;
	}

	li a:hover {
		border: solid 1px var(--c-pink);
	}

	h2 {
		font-size: 1.5em;
		margin-top: 0.05em;
	}

	.logo-partner-section {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.icons {
		display: none;
		justify-content: space-between;
		position: absolute;
		right: 0;
		top: 0;
	}

	a section button {
		background: none;
		cursor: pointer;
		border: none;
	}

	a section button:first-child {
		margin-right: 0.6em;
	}

	.more-info-section {
		display: flex;
		flex-direction: column;
		font-size: 0.9em;
	}

	/* progress bar */
	.progress-container {
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
		transition: 1s ease-out;
	}

	.progress-percentage {
		height: 85%;
	}

	/* search css */
	.container-off {
		display: none;
	}

	/* Popover formulieren */
	.popup-verwijder,
	.popup-edit {
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: 0;
		left: 0;
		display: none;
		background-color: #2c2c2ce8;
		z-index: 10;
		justify-content: center;
		align-items: center;
	}
	form {
		width: 500px;
		aspect-ratio: 2/1;
		background-color: var(--c-container);
		border-radius: 0.5em;
		border: solid 1px var(--c-container-stroke);
		padding: 1em;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
	}

	form h3 {
		border-bottom: 1px solid var(--c-container-stroke);
		width: 100%;
		padding-bottom: 5px;
	}

	form p {
		/* font-size: 0.9em; */
		margin: 1.5em 0;
		font-weight: 100;
	}

	form p span {
		display: contents;
		color: var(--c-pink);
		font-weight: 900;
		text-transform: uppercase;
	}

	.fields-container {
		margin: 1.5em 0;
	}

	input[type='text'],
	input[type='url'] {
		width: 100%;
		padding: 12px 10px;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		max-width: 700px;
		margin-top: 5px;
	}

	form input[type='text'] {
		margin-bottom: 1em;
	}

	form .id-field {
		visibility: hidden;
		display: none;
	}

	form button,
	input[type='submit'] {
		border-radius: 0.25em;
		padding: 0.5em 1em;
		color: var(--c-white);
		background-color: var(--c-pink);
		border: none;
		font-weight: 600;
		font-size: 1em;
		transition: 0.3s;
		cursor: pointer;
		width: 7.5em;
	}

	form button {
		background-color: var(--c-modal-button);
		margin-left: 0.5em;
	}

	form button:hover,
	input[type='submit']:hover {
		opacity: 0.75;
	}
</style>
