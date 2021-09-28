<script>
  import preload from "../lib/preloadImage";

  import Controls from "./Controls.svelte";
  import Egg from "./Egg.svelte";
  import Basket from "./Basket.svelte";
  import Wolf from "./Wolf.svelte";
  import Score from "./Score.svelte";
  import Fail from "./Fail.svelte";
  import Chicken from "./Chicken.svelte";
  import Start from "./Start.svelte";
  import { initSound } from "./ost";

  import { eggs, chickens, open, playing } from "./store";
  import { start, stop } from "./loop";
  import Exit from "./Exit.svelte";
import Auth from './Auth.svelte';
import { player } from '../stores/player';

  open.subscribe((value) => {
    if (!value) {
      stop();
    } else {
      initSound();
    }
  });

  const background = "/nintenday/game.webp";

  preload(background);
</script>

<div class="game" class:open={$open}>
  {#if !$player}
    <Auth/>
  {:else}
    <Start on:click={start} />
  {/if}
  <Exit on:click={() => ($open = false)} />
  {#if $playing}
    <Score />
    <Controls />
    <Fail />
    <Basket />
    <Wolf />
    {#each $eggs as egg}
      <Egg d={egg.d} s={egg.s} />
    {/each}
    {#each $chickens as chicken}
      <Chicken d={chicken.d} s={chicken.s} />
    {/each}
  {/if}
</div>

<style>
  .game {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: center / 100% url("/nintenday/game.webp") no-repeat;
    z-index: 2;
    box-shadow: inset 0 0 20px rgb(0 0 0 / 70%);
  }

  .game:not(.open) {
    z-index: -1;
    visibility: hidden;
  }

  @media (min-aspect-ratio: 2388/1422) {
    .game {
      height: 95vh;
      width: calc(95vh / 1422 * 2388);
    }
  }

  @media (max-aspect-ratio: 2388/1422) {
    .game {
      width: 95vw;
      height: calc(95vw / 2388 * 1422);
    }
  }
</style>
