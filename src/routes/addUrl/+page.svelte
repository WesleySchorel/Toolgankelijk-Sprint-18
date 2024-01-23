<script>
	export let form;
	
	function submitted() {
		if (form?.success) {
            alert(form?.message);
            setTimeout( () => {
                window.location.href = '/'
            }, 1000)
			
		}else if(form?.success == false){
            alert(form?.message);
        }
	}
</script>

<section class="content-container">
	<article class="tip-container">
		<p class="tip">Tip</p>
		<p>Voeg een bestaande url toe van de website van een partner!</p>
	</article>

	<section class="form-container">
		<form on:submit={submitted()} method="POST">
			<label for="name">Voeg een pagina titel toe</label>
			<input id="name" name="name" required type="text" />

			<label for="url" class="url-label">Voeg een URL van de partner toe</label>
			<input id="url" name="url" required type="url" />
			<button class="add-button">URL toevoegen</button>
		</form>
	</section>
</section>

<style>
	.content-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}

	article,
	.form-container {
		background-color: var(--c-container);
		margin: 0.5em;
		border-radius: 4px;
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

	.tip {
		color: var(--c-orange);
		line-height: 1.5em;
	}

	.add-button {
		border: none;
		background-color: var(--c-modal-button);
		color: white;
		padding: 0.7em;
		cursor: pointer;
		text-decoration: none;
		transition: 0.3s;
		border-radius: 4px;
		margin-top: 2em;
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

	@media (max-width: 850px) {
		.content-container {
			flex-wrap: wrap;
		}
	}
</style>
