<script>
  import { positions } from "../stores/positions";
  import { getTouchHandles } from "./touchHandles";
  import { getMouseHandles } from "./mouseHandles";
  import Controls from "./Controls.svelte";
  import { open } from "../game/store";
  import { touch } from '../invitation/autohide';

  export let filename;

  const FULL_WIDTH = 768;

  let scale;

  const updateScale = () => {
    if (window.innerWidth >= FULL_WIDTH) {
      scale = 1;
    } else {
      scale = (window.innerWidth / FULL_WIDTH);
    }
  }

  updateScale();

  const thatOne = filename === "g03.jpg";
  const image = `/nintenday/${filename}`;

  const bound = (v) => Math.max(0, Math.min(100, v));

  const savePosition = (x, y, r) => {
    if ($open) return;

    touch();

    const change = {};

    if (x !== undefined && y !== undefined) {
      const { clientWidth, clientHeight } = document.body;

      Object.assign(change, {
        left: bound((x / clientWidth) * 100),
        top: bound((y / clientHeight) * 100),
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

<svelte:window on:resize={updateScale}/>
<div
  class="console"
  class:hidden={$open && thatOne}
  data-type={filename}
  style="left: {$positions[filename]?.left || 0}%; top: {$positions[filename]
    ?.top || 0}%; transform: rotate({$positions[filename]?.r || 0}deg) scale({scale});"
  on:mousewheel={onMouseWheel}
  on:mousedown|preventDefault={onMouseDown}
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
  on:blur={onMouseUp}
  on:mouseleave={onMouseUp}
  on:touchstart|preventDefault={onTouchStart}
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
    user-select: none;
  }

  img {
    transform: translate(-50%, -50%);
    user-select: none;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.7), inset 0 0 3px #000;
  }

  .hidden {
    display: none;
  }
</style>
