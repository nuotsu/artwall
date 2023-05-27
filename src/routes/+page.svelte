<h1>🤳 art.wall 🖼️</h1>

<aside class="fixed bottom-0 left-0 p-4">
	<Uploader/>
</aside>

<script lang="ts">
	import Uploader from '$lib/Uploader.svelte'

	export let form

	console.log(form?.media)
</script>
