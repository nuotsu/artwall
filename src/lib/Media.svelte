<svelte:window
	on:mousemove={mousemove}
	on:mouseup={mouseup}
/>

<figure
	class="sm:absolute sm:w-[300px] bg-white/80 backdrop-blur-sm"
	style:left="{left}%"
	style:top="{top}%"
	on:mousedown={() => moving = true}
>
	<form method="POST" action="?/move">
		<input value={url} type="url" readonly>
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

	function mouseup() {
		moving = false
	}
</script>
