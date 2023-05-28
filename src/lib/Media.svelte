<svelte:window
	on:mousemove={mousemove}
	on:mouseup={mouseup}
	on:keyup={keyup}
/>

<figure
	class="sm:absolute sm:w-[300px] bg-white/80 backdrop-blur-sm transition-transform duration-100"
	style:left="{left}%"
	style:top="{top}%"
>
	<img
		class="w-full"
		class:grabber={editable}
		src={image || ''}
		alt={title || ''}
		draggable={false}
		bind:this={grabber}
		on:mousedown={mousedown}
	/>

	{#if title}
		<blockquote class="p-2">
			<p>{title}</p>
		</blockquote>
	{/if}

	<figcaption class="cursor-default absolute top-0 right-0 px-2 py-1 flex gap-2 bg-white/20 backdrop-blur-sm">
		<a href={url} target="_blank" rel="noopener noreferrer" title={new URL(url).hostname}>
			🔗
		</a>

		{#if editable}
			<Delete {url} />

			<form method="POST" action="?/move" bind:this={form} use:enhance hidden>
				<Move {url} {left} {top} />
			</form>
		{/if}
	</figcaption>
</figure>

<style lang="postcss">
	figure:not(:hover) figcaption {
		display: none;
	}

	.grabber {
		user-select: none;
		cursor: grab;
	}
	.grabber:active {
		cursor: grabbing;
	}

	figure:has(.grabber:active) {
		@apply rotate-2;
	}
</style>

<script lang="ts">
	import Move, { move } from './Move.svelte'
	import Delete from '$lib/Delete.svelte'
	import { enhance } from '$app/forms'

	export let
		media: App.Media,
		editable = false

	$: ({ url, image, title, position: [x,y] } = media)
	$: left = x
	$: top = y

	let form: HTMLFormElement
	$: form

	// TODO: need to disabled moving event on mobile

	let grabber: HTMLElement
	let moving = false

	function mousemove(e: MouseEvent) {
		if (!editable || !moving) return

		left += (e.movementX / window.innerWidth * 100)
		top += (e.movementY / window.innerHeight * 100)
	}

	async function mouseup(e: MouseEvent) {
		if (!editable || (e.target as HTMLElement).closest('.grabber') !== grabber) return
		moving = false

		await move(form)
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
