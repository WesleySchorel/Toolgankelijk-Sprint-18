<script>
	import Heading from '$lib/components/heading.svelte';
	import Partner from '$lib/components/partner.svelte';
	import Search from '$lib/components/search.svelte';
	export let data;

	let heading = { titel: 'Partners overzicht' };
	
</script>

<Heading {heading} />

<Search />

<ul>
	{#each data.websites as website}
		<Partner {website} />
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
		gap: 1em;

		list-style-type: none;
		margin: 0 1em;
		margin-bottom: 1em;
	}
</style>
