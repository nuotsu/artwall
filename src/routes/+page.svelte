<h1>🤳 art.wall 🖼️</h1>

{#if media}
	<img src={media.image} alt={media.title || ''}>
{/if}

<aside class="fixed bottom-0 left-0 p-4">
	<Uploader/>
</aside>

<script lang="ts">
	import Uploader from '$lib/Uploader.svelte'
	import { page } from '$app/stores'

	$: media = $page.form?.media as App.Media || null
</script>
