<script>
  export let name;
  export let width;
  export let left;
  export let top;
  export let active = false;
  export let id = undefined;
  export let rotate = 0;

  const src = `/nintenday/${name}.png`;
</script>

<img
  data-id={id}
  class="sprite"
  class:active
  {src}
  {width}
  style={`left: ${left}; top: ${top}${
    rotate ? `; transform: rotate(${rotate}deg)` : ""
  }`}
  alt
/>

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
