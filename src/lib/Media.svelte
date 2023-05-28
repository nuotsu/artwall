<svelte:window
	on:mousemove={mousemove}
	on:mouseup={mouseup}
	on:keyup={keyup}
/>

<figure
	class="sm:absolute sm:w-[300px] bg-white/80 backdrop-blur-sm"
	style:left="{left}%"
	style:top="{top}%"
>
	<form method="POST" action="?/move" bind:this={form} use:enhance hidden>
		<input name="url" value={url} type="url" readonly>
		<input name="left" value={left} type="number" readonly>
		<input name="top" value={top} type="number" readonly>
	</form>

	<img
		class="grabber w-full cursor-grab active:cursor-grabbing"
		src={image || ''}
		alt={title || ''}
		draggable={false}
		bind:this={grabber}
		on:mousedown={mousedown}
	/>

	{#if title}
		<blockquote>
			<p>{title}</p>
		</blockquote>
	{/if}

	<figcaption class="cursor-default absolute top-0 right-0 px-2 py-1 flex gap-2 bg-white/20 backdrop-blur-sm">
		<a href={url} target="_blank" rel="noopener noreferrer" title={new URL(url).hostname}>
			🔗
		</a>

		{#if editable}
			<Delete {url} />
		{/if}
	</figcaption>
</figure>

<style>
	figure:not(:hover) figcaption {
		display: none;
	}
</style>

<script lang="ts">
	import Delete from '$lib/Delete.svelte'
	import { applyAction, deserialize, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import type { ActionResult } from '@sveltejs/kit'

	export let
		media: App.Media,
		editable = false

	$: ({ url, image, title, position: [x,y] } = media)

	// TODO: need to disabled moving event on mobile

	let moving = false

	$: left = x
	$: top = y

	function mousemove(e: MouseEvent) {
		if (!editable || !moving) return

		left += (e.movementX / window.innerWidth * 100)
		top += (e.movementY / window.innerHeight * 100)
	}

	let grabber: HTMLElement

	let form: HTMLFormElement
	$: form

	async function mouseup(e: MouseEvent) {
		if (!editable || (e.target as HTMLElement).closest('.grabber') !== grabber) return

		moving = false


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

	function mousedown() {
		if (!editable) return
		moving = true
	}

	function keyup(e: KeyboardEvent) {
		if (!editable || e.key !== 'Escape') return
		moving = false
	}
</script>
