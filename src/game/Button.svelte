<script>
  import preload from "../lib/preloadImage";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let left;
  export let top;
  export let active = false;

  let localActive = false;

  const src = `/nintenday/bp.png`;

  const activate = () => {
    localActive = true;
    dispatch("activate");
  };
  const deactivate = () => {
    localActive = false;
    dispatch("deactivate");
  };

  preload(src);
</script>

<img
  on:mousedown={activate}
  on:mouseup={deactivate}
  on:mouseout={deactivate}
  on:blur={deactivate}
  on:touchstart={activate}
  on:touchend={deactivate}
  on:dragstart={(e) => e.preventDefault()}
  role="button"
  class="button"
  class:pressed={localActive || active}
  {src}
  width="7.52%"
  style={`left: ${left}; top: ${top}`}
  alt
/>

<style>
  .button {
    position: absolute;
    user-select: none;
  }

  .button:not(.pressed) {
    opacity: 0;
  }
</style>
