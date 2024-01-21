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

<section class="form-container">
    <form on:submit={submitted()} method="POST">
        <label for="name">Voeg een partner titel toe</label>
        <input id="name" name="name" required type="text" />

        <label for="url" class="url-label">Voeg een Partner homepagina URL toe</label>
        <input id="url" name="url" required type="url" />
        <button class="add-button">Partner toevoegen</button>
    </form>
</section>

<style>
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

	label{
		color: var(--c-white);
	}
</style>