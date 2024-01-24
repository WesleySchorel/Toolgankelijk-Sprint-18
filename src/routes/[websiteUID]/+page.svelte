<script>
	import Heading from '$lib/components/heading.svelte';
	import Websites from '$lib/components/websites.svelte';
	import { page } from '$app/stores';
	import Search from '$lib/components/search.svelte';

	export let data;

	$: heading = {
		titel: data.websitesData.website.titel,
		homepage: data.websitesData.website.homepage
	};

	// data voor websites component
	$: websites = data.websitesData.website.urls;
	$: overzicht = data.websitesData.website;
	$: params = $page.params.websiteUID;
</script>

<Heading {heading} />

<section>
	<a href="/addUrl">Project Toevoegen</a>
	<Search />
</section>

<ul>
	{#each websites as website}
		<Websites {website} {overzicht} {params} />
	{/each}
</ul>

<style>
	section{
		display: flex;
		justify-content: space-between;
		margin: 0 0 1em 1em;
	}

	a{
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
	}
</style>
