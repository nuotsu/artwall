<form method="POST" use:enhance>
	<label>
		<input
			class="w-full"
			name="url"
			type="url"
			pattern="https://.+"
			placeholder="https://example.com/"
			value="https://twitter.com/frantzfries/status/1659402597109841921?s=20"
		/>
	</label>

	<button>Upload</button>
</form>

<script>
	import { enhance } from '$app/forms'
</script>
