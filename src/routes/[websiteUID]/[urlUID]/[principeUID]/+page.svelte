<script>
	import Heading from '$lib/components/heading.svelte';
	import Checklist from '$lib/components/checklist.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';

	export let data;

	export let form;

	$: heading = {
		titel: data.websitesData.website.titel,
		homepage: data.urlData.url.url,
		url: data.urlData.url.slug
	};
	const toolboardData = data.toolboardData;
	const urlData = data.urlData;
	const richtlijnen = toolboardData.principe.richtlijnen;
	const principes = data.toolboardData.principes;
</script>

<Heading {heading} />
<section>
	{#if form?.success}
		<div class="toast"><p>Checklist is opgeslagen!</p></div>
	{/if}
	<Checklist {richtlijnen} {toolboardData} />
	<Sidebar {principes} {urlData} />
</section>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		margin: 1em;
		gap: 1em;
	}
	.toast {
		position: fixed;
		bottom: 5rem;
		right: 1rem;
		height: 4rem;
		width: 10rem;
		background-color: #22ff0025;
		backdrop-filter: blur(3px);
		border: 1px solid #22ff00;
		border-radius: 4px;
		padding: 0.5rem;
		text-shadow: 0px 0px 5px black;
		animation: fade-out 4s forwards;
		z-index: 2;
	}

	@keyframes fade-out {
		from {
			transform: translateX(30vh);
			display: block;
		}
		10% {
			transform: translateX(0);
			display: block;
		}
		80% {
			transform: translateX(0);
			display: block;
		}
		to {
			transform: translateX(30vh);
			display: none;
		}
	}
</style>
