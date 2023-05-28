<svelte:window
	on:mousemove={mousemove}
	on:mouseup={mouseup}
/>

<figure
	class="relative sm:absolute sm:w-[300px] bg-white/80 backdrop-blur-sm"
	style:left="{left}px"
	style:top="{top}px"
	on:mousedown={() => moving = true}
>
	<form method="POST" action="?/move">
		<input value={url} type="url">
		<input name="left" value={left} type="text">
		<input name="top" value={top} type="text">
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

	let moving = false

	$: left = x
	$: top = y

	function mousemove(e: MouseEvent) {
		if (!moving) return

		left += e.movementX
		top += e.movementY
	}

	function mouseup() {
		moving = false
	}
</script>
