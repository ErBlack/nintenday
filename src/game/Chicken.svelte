<script>
  import Sprite from "./Sprite.svelte";
  export let d;
  export let s;
</script>

{#if d === 0}
  {#if s === 0}<Sprite
      name="ebl"
      width="7.4%"
      left="34.6%"
      top="68.9%"
      active
    />{/if}
  {#if s === 1}<Sprite
      name="cl1"
      width="3.4%"
      left="33.4%"
      top="62.0%"
      active
    />{/if}
  {#if s === 2}<Sprite
      name="cl2"
      width="2.4%"
      left="31.6%"
      top="65.8%"
      active
    />{/if}
  {#if s === 3}<Sprite
      name="cl3"
      width="2.6%"
      left="29.0%"
      top="66.1%"
      active
    />{/if}
  {#if s === 4}<Sprite
      name="cl4"
      width="2.9%"
      left="26.2%"
      top="66.4%"
      active
    />{/if}
{:else}
  {#if s === 0}<Sprite
      name="ebr"
      width="7.7%"
      left="57.3%"
      top="69.2%"
      active
    />{/if}
  {#if s === 1}<Sprite
      name="cr1"
      width="3.7%"
      left="63.2%"
      top="62.3%"
      active
    />{/if}
  {#if s === 2}<Sprite
      name="cr2"
      width="2.3%"
      left="66.3%"
      top="66.0%"
      active
    />{/if}
  {#if s === 3}<Sprite
      name="cr3"
      width="2.4%"
      left="68.7%"
      top="66.3%"
      active
    />{/if}
  {#if s === 4}<Sprite
      name="cr4"
      width="2.4%"
      left="71.5%"
      top="66.2%"
      active
    />{/if}
{/if}
<Sprite name="cr1" width="3.7%" left="63.2%" top="62.3%" />
