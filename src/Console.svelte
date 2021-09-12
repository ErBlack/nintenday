<script>
    import random from './lib/random';
    import {positions} from './stores/positions';
    export let filename;

    const image = `/nintenday/${filename}`;
    const rotate = random(0, 60) - 30;

    let offsetX;
    let offsetY;

    const onStart = ({clientX, clientY, currentTarget, dataTransfer}) => {
        const {x, y} = currentTarget.getBoundingClientRect();

        offsetX = clientX - x;
        offsetY = clientY - y;

        dataTransfer.setDragImage(document.getElementById('ghost'), 0, 0);
    };

    const onDrag = ({clientX, clientY}) => {
        if (clientX === 0 && clientY === 0) return;

        savePosition(clientX, clientY);
    }

    const onEnd = ({clientX, clientY}) => {
        savePosition(clientX, clientY);

        return false;
    }

    const savePosition = (clientX, clientY) => {
        const {clientWidth, clientHeight} = document.body;

        $positions = {
            ...$positions,
            [filename]: {
                left: (clientX - offsetX) / clientWidth * 100,
                top: (clientY - offsetY) / clientHeight * 100
            }
        }
    }
</script>

<style>
    .console {
        position: absolute;
        width: 0;
        height: 0;
        user-select: none;
    }

    img {
        transform: translate(-50%, -50%)
    }
</style>

<div class="console" style="left: {$positions[filename]?.left}%; top: {$positions[filename]?.top}%; transform: rotate({rotate}deg);" draggable on:dragstart={onStart} on:drag={onDrag} on:dragend={onEnd}>
    <img src="{image}" alt>
</div>