<form method="POST" action="?/upload" use:enhance {disabled}>
	<label class="flex gap-[.5ch]">
		🔗
		<input
			class="w-full bg-transparent"
			name="url"
			type="url"
			placeholder="https://example.com/"
			required
			{disabled}
		/>
	</label>

	{#if disabled}
		<span>🤷‍♂️ Limit reached <small>(Max: {MAX})</small></span>
	{:else}
		<button>📮 Upload</button>
	{/if}
</form>

<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'

	const MAX = 10

	$: disabled = $page.data?.media?.length >= MAX
</script>
