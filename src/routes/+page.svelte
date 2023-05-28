<section class="relative">
	{#each json || media as m (m.url)}
		<Media media={m} showDelete={!json} />
	{/each}
</section>

{#if !json}
	<aside class="fixed bottom-0 left-0 m-4">
		<Uploader/>
		<Share/>
	</aside>
{/if}

<script lang="ts">
	import Media from '$lib/Media.svelte'
	import Uploader from '$lib/Uploader.svelte'
	import Share from '$lib/Share.svelte'
	import { page } from '$app/stores'

	$: media = ($page.form?.media || $page.data?.media || []) as App.Media[]
	$: json = ($page.data.json) as App.Media[] | undefined
</script>
