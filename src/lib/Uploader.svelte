<form method="POST" action="?/upload" use:enhance>
	<label>
		<input
			class="w-full"
			name="url"
			type="url"
			placeholder="https://example.com/"
			required
		/>
	</label>

	<button>Upload</button>
</form>

<script>
	import { enhance } from '$app/forms'
</script>
