<script>
	import Desk from './Desk.svelte';
	import Console from './console/Console.svelte';

	const gw = new Array(10).fill({}).map((props, i) => ({
		...props,
		filename: `g${`0${i+1}`.slice(-2)}.jpg`
	}));
</script>

<style>
#ghost {
	visibility: hidden;
	width: 1px;
	height: 1px;
}
</style>

<main>
	<Desk>
		{#each gw as console}
			<Console {...console}/>
		{/each}
	</Desk>
</main>
<div id="ghost"/>
