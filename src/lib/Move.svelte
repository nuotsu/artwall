<input name="url" value={url} type="url" readonly>
<input name="left" value={left} type="number" readonly>
<input name="top" value={top} type="number" readonly>

<script lang="ts">
	export let
		url: string,
		left: number,
		top: number

</script>

<script context="module" lang="ts">
	import { applyAction, deserialize } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import type { ActionResult } from '@sveltejs/kit'

	export async function move(form: HTMLFormElement) {
		const response = await fetch(`?/move`, {
			method: 'POST',
			body: new FormData(form),
		})

		const result: ActionResult = deserialize(await response.text())

		if (result.type === 'success') {
			await invalidateAll()
		}

		applyAction(result)
	}
</script>
