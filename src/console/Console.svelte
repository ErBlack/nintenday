<script>
  import random from "../lib/random";
  import { positions } from "../stores/positions";
  import { getTouchHandles } from "./touchHandles";
  import { getMouseHandles } from "./mouseHandles";
  import Controls from "./Controls.svelte";

  export let filename;

  const thatOne = filename === "g03.jpg";
  const image = `/nintenday/${filename}`;

  const savePosition = (x, y, r) => {
    const change = {};

    if (x !== undefined && y !== undefined) {
      const { clientWidth, clientHeight } = document.body;

      Object.assign(change, {
        left: (x / clientWidth) * 100,
        top: (y / clientHeight) * 100,
      });
    }

    if (r !== undefined) {
      change.r = ((Object($positions[filename]).r || 0) + r) % 360;
    }

    $positions = {
      ...$positions,
      [filename]: {
        ...Object($positions[filename]),
        ...change
      },
    };
  };

  const { onTouchStart, onTouchEnd, onTouchMove } =
    getTouchHandles(savePosition);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseWheel } = getMouseHandles(savePosition);
</script>

<div
  class="console"
  data-type={filename}
  style="left: {$positions[filename]?.left || 0}%; top: {$positions[filename]
    ?.top || 0}%; transform: rotate({$positions[filename]?.r || 0}deg);"
  on:mousewheel={onMouseWheel}
  on:mousedown|preventDefault={onMouseDown}
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
  on:mouseout={onMouseUp}
  on:blur={onMouseUp}
  on:touchstart={onTouchStart}
  on:touchmove|preventDefault={onTouchMove}
  on:touchend={onTouchEnd}
>
  <img src={image} alt />
  {#if thatOne}
    <Controls />
  {/if}
</div>

<style>
  .console {
    position: absolute;
    width: 0;
    height: 0;
  }

  img {
    transform: translate(-50%, -50%);
    user-select: none;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }
</style>
