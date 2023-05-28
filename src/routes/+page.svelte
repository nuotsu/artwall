<section class="grid">
	{#each json || media as { url, image, title }}
		<figure class="relative">
			<img class="w-full" src={image || ''} alt={title || ''}>

			{#if title}
				<blockquote>
					<p>{title}</p>
				</blockquote>
			{/if}

			<figcaption class="absolute top-0 right-0 flex bg-white/20 backdrop-blur-sm">
				<a href={url} target="_blank" rel="noopener noreferrer" title={new URL(url).hostname}>
					🔗
				</a>

				{#if !json}
					<Delete {url} />
				{/if}
			</figcaption>
		</figure>
	{/each}
</section>

{#if !json}
	<aside class="fixed bottom-0 left-0 m-4">
		<Uploader/>
		<Share/>
	</aside>
{/if}

<style>
	section {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}

	figure:not(:hover) figcaption {
		display: none;
	}
</style>

<script lang="ts">
	import Delete from '$lib/Delete.svelte'
	import Uploader from '$lib/Uploader.svelte'
	import Share from '$lib/Share.svelte'
	import { page } from '$app/stores'

	$: media = ($page.form?.media || $page.data?.media || []) as App.Media[]
	$: json = ($page.data.json) as App.Media[] | undefined
</script>
