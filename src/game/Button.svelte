<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let left;
  export let top;
  export let width = "7.52%";
  export let active = false;
  export let hit = false;
  export let small = false;

  let localActive = false;

  const src = "/nintenday/bp.png";

  const activate = () => {
    localActive = true;
    dispatch("activate");
  };
  const deactivate = () => {
    localActive = false;
    dispatch("deactivate");
  };
</script>

<img
  on:click
  on:touchstart
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
  class:hit
  class:small
  {src}
  {width}
  style={`left: ${left}; top: ${top}`}
  alt
/>

<style>
  .button {
    position: absolute;
    user-select: none;
    cursor: pointer;
  }

  .hit {
    padding: 20px;
    margin: -20px;
  }

  .small {
    padding: 7px;
    margin: -7px;
  }

  .button:not(.pressed) {
    opacity: 0;
  }
</style>
