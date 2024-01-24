<script>
</script>

<section class="form-container">
	<h2>Partner toevoegen</h2>
	<form method="POST" action="?/addPartner">
		<label for="name">Partner titel</label>
		<input id="name" name="name" required type="text" />

		<label for="url" class="url-label">Partner homepagina URL</label>
		<input id="url" name="url" required type="url" />
		<button class="add-button">Toevoegen</button>
	</form>
</section>

<style>
	.form-container {
		background-color: var(--c-container);
		border: solid 1px var(--c-container-stroke);
		border-radius: 0.5em;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 1.2em;
	}

	.form-container {
		line-height: 2em;
		width: 100%;
	}

	h2 {
		border-bottom: 1px solid var(--c-container-stroke);
		width: 100%;
		padding-bottom: 0.25em;
		color: var(--c-white);
	}

	form {
		margin-top: 1em;
	}

	.add-button {
		border: none;
		background-color: var(--c-pink);
		color: white;
		padding: 0.5em 1em;
		cursor: pointer;
		text-decoration: none;
		transition: 0.3s;
		border-radius: 0.25em;
		margin-top: 1em;
		font-size: 1em;
	}

	input[type='text'],
	input[type='url'] {
		width: 100%;
		padding: 12px 20px;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
		max-width: 700px;
	}

	.add-button:hover {
		opacity: 0.75;
	}

	.url-label {
		margin-top: 1em;
	}

	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	label {
		color: var(--c-white);
	}
</style>
