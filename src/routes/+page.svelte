<script>
	import Heading from '$lib/components/heading.svelte';
	import Partner from '$lib/components/partner.svelte';
	import Search from '$lib/components/search.svelte';
	import PartnerForm from '../lib/components/partnerForm.svelte';
	export let data;

	let heading = { titel: 'Partners overzicht' };

	export let form

	function openDialog(el) {
		let dialog = document.querySelector('dialog');

		dialog.showModal()
		el.preventDefault();
	}
</script>

<Heading {heading} />

<section>
	<a href="/addPartner" on:click={openDialog}>Partner toevoegen</a>
	<Search />
</section>

<dialog><PartnerForm {form}/></dialog>

<ul>
	{#each data.websites as website}
		<Partner {website} />
	{/each}
</ul>

<style>
	section {
		display: flex;
		justify-content: space-between;
		margin: 0 0 1em 1em;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.25em;
		padding: 0.5em 1em;
		color: var(--c-white);
		background-color: var(--c-modal-button);
		border: none;
		font-weight: 600;
		font-size: 1em;
		transition: 0.3s;
		cursor: pointer;
		text-decoration: none;
	}

	a:hover {
		opacity: 0.75;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
		gap: 1em;

		list-style-type: none;
		margin: 0 1em;
		margin-bottom: 1em;
	}
</style>
