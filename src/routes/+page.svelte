<section class="grid gap-4">
	{#each json || media as { image, title }}
		<img src={image} alt={title || ''}>
	{/each}
</section>

{#if !json}
	<aside class="fixed bottom-0 left-0 p-4">
		<Uploader/>
		<Share/>
	</aside>
{/if}

<style>
	section {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>

<script lang="ts">
	import Uploader from '$lib/Uploader.svelte'
	import Share from '$lib/Share.svelte'
	import { page } from '$app/stores'

	$: media = ($page.form?.media || $page.data?.media || []) as App.Media[]
	$: json = ($page.data.json) as App.Media[] | undefined

	$: console.log(json)
</script>
