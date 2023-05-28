{#if hasData}
	<button on:click={onclick}>
		Share
	</button>
{/if}

<script>
	import { page } from '$app/stores'

	$: json = $page.url.searchParams.has('json')
		? $page.url.searchParams.get('json')
		: JSON.stringify($page.form?.media || $page.data?.media || [])

	$: hasData = !json || json !== '[]'

	function onclick() {
		const url = `${ location.origin }?json=${ encodeURIComponent(json || '[]') }`
		navigator.clipboard.writeText(url)
	}
</script>
