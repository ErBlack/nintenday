<script>
    import preload from '../lib/preloadImage';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    const width = '7.52%';
    export let left;
    export let top;
    export let id;
    export let active = false;

    const src = `/nintenday/bp.png`;

    const activate = () => dispatch('activate');
    const deactivate = () => dispatch('deactivate');

    preload(src);
</script>

<style>
    .button {
        position: absolute;
        user-select: none;
    }

    .button:not(.active) {
        opacity: 0;
    }
</style>

<img
    on:mousedown={activate}
    on:mouseup={deactivate}
    on:mouseout={deactivate}
    on:blur={deactivate}
    on:touchstart={activate}
    on:touchend={deactivate}
    on:dragstart={e => e.preventDefault()}
    role="button"
    data-id={id}
    class="button"
    class:active={active}
    src={src}
    width={width}
    style={`left: ${left}; top: ${top}`}
    alt
/>