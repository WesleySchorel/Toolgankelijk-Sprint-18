<script>
	// form submit
	let input;
	import { onMount } from 'svelte';

	export let placeholderProp;

	onMount(() => {
		// Your client-side code to run after the component is mounted
		document.querySelector('form').classList.remove('form-off');
	});
	
	function submitPartner() {
		let websites = document.querySelectorAll('.website');

		// check condition
		websites.forEach((website) => {
			if (!website.innerText.toUpperCase().includes(input.toUpperCase())) {
				website.classList.add('container-off');
			} else {
				website.classList.remove('container-off');
			}
		});
	}
</script>

<form class="form-off" on:input={submitPartner}>
	<label for="partner-search">Zoeken</label>
	<input type="search" id="partner-search" placeholder={placeholderProp} bind:value={input} />
</form>

<style>
	/* form */
	form {
		margin: 0 1em;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1em;
		font-weight: 600;
	}

	.form-off {
		display: none;
	}

	input {
		padding: 0.5em;
		border: 1px solid var(--c-modal-button);
		background-color: var(--c-container);
		border-radius: 0.25em;
		color: var(--c-white);
		width: 8.5em;
		font-size: 1em;
		font-weight: 600;
		padding-left: 0.75em;
	}
	/* form end */
</style>
