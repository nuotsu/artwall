<section class="grid gap-4">
	{#each json || media as { url, image, title }}
		<figure>
			<img src={image} alt={title || ''}>
			<Delete {url} />
		</figure>
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
	import Delete from '$lib/Delete.svelte'
	import Uploader from '$lib/Uploader.svelte'
	import Share from '$lib/Share.svelte'
	import { page } from '$app/stores'

	$: media = ($page.form?.media || $page.data?.media || []) as App.Media[]
	$: json = ($page.data.json) as App.Media[] | undefined

	$: console.log(json)
</script>
