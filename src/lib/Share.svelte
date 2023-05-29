{#if hasData}
	{#if copied}
		<span>✅ Copied</span>
	{:else}
		<button on:click={onclick}>
			📲 Share
		</button>
	{/if}
{/if}

<script>
	import { page } from '$app/stores'

	let copied = false

	$: json = $page.url.searchParams.has('json')
		? $page.url.searchParams.get('json')
		: JSON.stringify($page.form?.media || $page.data?.media || [])

	$: hasData = !json || json !== '[]'

	function onclick() {
		const url = `${ location.origin }?json=${ encodeURIComponent(json || '[]') }`
		navigator.clipboard.writeText(url)
		copied = true

		const timeout = setTimeout(() => {
			copied = false
			clearTimeout(timeout)
		}, 1000)
	}
</script>
