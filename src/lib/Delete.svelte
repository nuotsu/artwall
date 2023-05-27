<form method="POST" action="?/delete" use:enhance>
	<input name="url" type="hidden" value={url}>

	<button on:click={onclick}>
		🗑️
	</button>
</form>

<script lang="ts">
	import { enhance } from '$app/forms'

	export let url: App.Media['url']

	function onclick(e: MouseEvent) {
		if (!confirm('Are you sure you want to delete this?')) {
			e.preventDefault()
		}
	}
</script>
