<h1>🤳 art.wall 🖼️</h1>

<div class="grid grid-cols-3 gap-4">
	{#each media as { image, title }}
		<img src={image} alt={title || ''}>
	{/each}
</div>

<aside class="fixed bottom-0 left-0 p-4">
	<Uploader/>
</aside>

<script lang="ts">
	import Uploader from '$lib/Uploader.svelte'
	import { page } from '$app/stores'

	$: media = ($page.form?.media || $page.data?.media || []) as App.Media[]
</script>
