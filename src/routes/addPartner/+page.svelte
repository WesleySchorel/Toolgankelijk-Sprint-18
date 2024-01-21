<script>
	import PartnerForm from '../../lib/components/partnerForm.svelte';

	export let form;
</script>

<section class="content-container">
	<article class="tip-container">
		<p class="tip">Tip</p>
		<p>Probeer een partner toe te voegen die nog niet in de lijst bestaat!</p>
	</article>

	<PartnerForm />
</section>

{#if form?.success}
	<div class="toast"><p>{form?.message}</p></div>
{:else if form?.success == false}
	<div class="toast"><p>{form?.message}</p></div>
{/if}

<style>
	.content-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 0.5em;
	}

	article {
		background-color: var(--c-container);
		border-radius: 4px;
		margin-right: 0.5em;
		margin-bottom: 0.5em;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 1.2em;
	}

	.tip {
		color: var(--c-orange);
		line-height: 1.5em;
	}

	.toast {
		position: fixed;
		bottom: 5rem;
		right: 1rem;
		height: 4rem;
		width: 10rem;
		background-color: #a0004025;
		backdrop-filter: blur(3px);
		border: 1px solid var(--c-pink);
		border-radius: 4px;
		padding: 0.5rem;
		text-shadow: 0px 0px 10px black;
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

	@media (max-width: 850px) {
		.content-container {
			flex-wrap: wrap;
		}
	}
</style>
