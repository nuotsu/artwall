<form method="POST" action="?/delete" use:enhance>
	<input name="url" value={url} type="hidden">

	<button on:click={onclick} title="Delete">
		🗑️
	</button>
</form>

<script lang="ts">
	import { enhance } from '$app/forms'

	export let url: App.Media['url']

	function onclick(e: MouseEvent) {
		if (!confirm(`Are you sure you want to delete:\n\n${ url }?`)) {
			e.preventDefault()
		}
	}
</script>
