<div class="flex flex-col min-h-screen">
	<h1 class="m-4 text-center">
		<a href="/">
			🤳 Art Wall 🖼️
		</a>
	</h1>

	<slot></slot>
</div>

{#if !json}
	<aside class="sticky bottom-0">
		<div class="sm:fixed bottom-0 left-0 sm:m-2 p-2 bg-white/80 backdrop-blur-sm">
			<Upload/>
			<Share/>
		</div>
	</aside>
{/if}

<script lang="ts">
	import Upload from '$lib/Upload.svelte'
	import Share from '$lib/Share.svelte'
	import { page } from '$app/stores'
	import '../styles/app.css'

	let json = $page.data.json
</script>
