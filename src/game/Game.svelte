<script>
  import preload from "../lib/preloadImage";

  import Controls from "./Controls.svelte";
  import Egg from "./Egg.svelte";
  import Basket from "./Basket.svelte";
  import Wolf from "./Wolf.svelte";
  import Score from "./Score.svelte";
  import Fail from "./Fail.svelte";
  import Chicken from "./Chicken.svelte";

  import { eggs, chickens, started } from "./store";
  import { start } from "./loop";

  const background = "/nintenday/game.jpg";

  start();

  preload(background);
</script>

<div class="game" class:started={$started}>
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
</div>

<style>
  .game {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: center / 100% url("/nintenday/game.jpg") no-repeat;
  }

  .game:not(.started) {
    display: none;
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
