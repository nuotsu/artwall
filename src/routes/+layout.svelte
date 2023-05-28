<div class="flex flex-col min-h-screen">
	<h1 class="m-4 text-center">
		<a href="/">
			🤳 Art Wall 🖼️
		</a>
	</h1>

	<slot></slot>
</div>

{#if !json}
	<aside class="fixed bottom-0 left-0 m-4">
		<Uploader/>
		<Share/>
	</aside>
{/if}

<script lang="ts">
	import Uploader from '$lib/Uploader.svelte'
	import Share from '$lib/Share.svelte'
	import { page } from '$app/stores'
	import '../styles/app.css'

	let json = $page.data.json
</script>
