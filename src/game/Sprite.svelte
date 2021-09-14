<script>
    import preload from '../lib/preloadImage';

    export let name;
    export let width;
    export let left;
    export let top;
    export let active = false;
    export let id = undefined;
    export let rotate = 0;

    const src = `/nintenday/${name}.png`;

    preload(src);
</script>

<style>
    .sprite {
        position: absolute;
        user-select: none;
        pointer-events: none;
    }

    .sprite:not(.active) {
        display: none;
    }
</style>

<img
    data-id={id}
    class="sprite"
    class:active={active}
    src={src}
    width={width}
    style={`left: ${left}; top: ${top}${rotate ? `; transform: rotate(${rotate}deg)` : ''}`}
    alt
/>