<script>
    import random from '../lib/random';
    import {positions} from '../stores/positions';
    import {getTouchHandles} from './touchHandles'
    import {getMouseHandles} from './mouseHandles';

    export let filename;

    const image = `/nintenday/${filename}`;
    const rotate = random(0, 60) - 30;

    const savePosition = (x, y) => {
        const {clientWidth, clientHeight} = document.body;

        $positions = {
            ...$positions,
            [filename]: {
                ...Object($positions[filename]),
                left: x / clientWidth * 100,
                top: y / clientHeight * 100
            }
        }
    }

    const {onTouchStart, onTouchEnd, onTouchMove} = getTouchHandles(savePosition);
    const {onMouseDown, onMouseMove, onMouseUp} = getMouseHandles(savePosition);
</script>

<style>
    .console {
        position: absolute;
        width: 0;
        height: 0;
    }

    img {
        transform: translate(-50%, -50%);
        user-select: none;
        box-shadow: 5px 5px 5px rgba(0,0,0,.5);
    }
</style>

<div
    class="console"
    style="left: {$positions[filename]?.left}%; top: {$positions[filename]?.top}%; transform: rotate({rotate}deg); z-index: {$positions[filename]?.z || 0}"
    on:mousedown|preventDefault={onMouseDown}
    on:mousemove={onMouseMove}
    on:mouseup={onMouseUp}
    on:mouseout={onMouseUp}
    on:blur={onMouseUp}
    on:touchstart={onTouchStart}
    on:touchmove|preventDefault={onTouchMove}
    on:touchend={onTouchEnd}
    >
    <img src="{image}" alt>
</div>