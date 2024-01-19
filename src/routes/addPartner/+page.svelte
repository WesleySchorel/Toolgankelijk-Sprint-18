<script>
	import PartnerForm from "../../lib/components/partnerForm.svelte";

	export let form;
</script>

<section class="content-container">
	<article class="tip-container">
		<p class="tip">Tip</p>
		<p>Probeer een partner toe te voegen die nog niet in de lijst bestaat!</p>
	</article>

	<PartnerForm {form}/>
</section>

<style>
	.content-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}

	article {
		background-color: var(--c-container);
		margin: 0.5em;
		border-radius: 4px;
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

	@media (max-width: 850px) {
		.content-container {
			flex-wrap: wrap;
		}
	}
</style>
