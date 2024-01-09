<script>
	import Heading from '$lib/components/heading.svelte';
	import Checklist from '$lib/components/checklist.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';

	export let data;

	$: heading = {
		titel: data.websitesData.website.titel,
		homepage: data.urlData.url.url,
		url: data.urlData.url.slug
	};
	const toolboardData = data.toolboardData;
	const richtlijnen = toolboardData.principe.richtlijnen;
	const principes = data.toolboardData.principes;
	console.log(principes);
</script>

<Heading {heading} />
<section>
	<Checklist {richtlijnen} {toolboardData} />
	<Sidebar {principes} />
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		margin: 1em;
		gap: 1em;
	}
</style>
