<svelte:window
	on:mousemove={mousemove}
	on:mouseup={mouseup}
/>

<figure
	class="root sm:absolute sm:w-[300px] bg-white/80 backdrop-blur-sm"
	style:left="{left}%"
	style:top="{top}%"
	on:mousedown={() => moving = true}
	bind:this={root}
>
	<form method="POST" action="?/move" bind:this={form} use:enhance hidden>
		<input name="url" value={url} type="url" readonly>
		<input name="left" value={left} type="number" readonly>
		<input name="top" value={top} type="number" readonly>
	</form>

	<img class="w-full" src={image || ''} alt={title || ''} draggable={false}>

	{#if title}
		<blockquote>
			<p>{title}</p>
		</blockquote>
	{/if}

	<figcaption class="absolute top-0 right-0 flex bg-white/20 backdrop-blur-sm">
		<a href={url} target="_blank" rel="noopener noreferrer" title={new URL(url).hostname}>
			🔗
		</a>

		{#if showDelete}
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
		showDelete = false

	$: ({ url, image, title, position: [x,y] } = media)

	// TODO: need to disabled moving event on mobile

	let moving = false

	$: left = x
	$: top = y

	function mousemove(e: MouseEvent) {
		if (!moving) return

		left += (e.movementX / window.innerWidth * 100)
		top += (e.movementY / window.innerHeight * 100)
	}

	let root: HTMLElement

	let form: HTMLFormElement
	$: form

	async function mouseup(e: MouseEvent) {
		moving = false

		if ((e.target as HTMLElement).closest('figure.root') !== root) return

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
