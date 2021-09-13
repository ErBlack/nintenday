<script>
    import preload from '../lib/preloadImage';
    export let name;
    export let width;
    export let left;
    export let top;
    export let active;

    const src = `/nintenday/${name}.png`;

    const up = (value, sign) => {
        return (parseFloat(value.slice(0, -1)) + (0.1 * sign)).toFixed(1) + '%';
    }

    preload(src);
</script>

<style>
    .sprite {
        position: absolute;
    }

    .sprite:not(.active) {
        display: none;
    }
</style>

<img
    on:mousewheel={({deltaY, ctrlKey, altKey}) => {
        if (ctrlKey) {
            left = up(left, deltaY > 0 ? 1 : -1)
        } else if (altKey) {
            width = up(width, deltaY > 0 ? 1 : -1)
        } else {
            top = up(top, deltaY > 0 ? 1 : -1)
        }

        console.log(`${name} width="${width}" left="${left}" top="${top}"`);
    }}
    class="sprite"
    class:active={active}
    src={src}
    width={width}
    style={`left: ${left}; top: ${top}`}
    alt
/>