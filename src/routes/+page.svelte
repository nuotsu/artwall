<section class="sm:relative grow grid gap-4">
	{#each json || media as m (m.url)}
		<Media media={m} editable={!json} />
	{/each}
</section>

<style>
	section:global(:has(figure:active)) :global(figure:not(:active)) {
		pointer-events: none;
	}
</style>

<script lang="ts">
	import Media from '$lib/Media.svelte'
	import { page } from '$app/stores'

	$: media = ($page.form?.media || $page.data?.media || []) as App.Media[]
	$: json = ($page.data.json) as App.Media[] | undefined
</script>
