<form method="POST" action="?/share" use:enhance>
	<button>Share</button>
</form>

{#if json}
	<button on:click={onclick}>
		Copy URL
	</button>
{/if}

<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'

	$: json = $page.form?.json

	function onclick() {
		navigator.clipboard.writeText(`${ location.origin }?json=${ encodeURIComponent(json) }`)
	}
</script>
