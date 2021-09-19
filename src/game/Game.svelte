<script>
  import preload from "../lib/preloadImage";
  import Sprite from "./Sprite.svelte";
  import Controls from "./Controls.svelte";
  import Egg from "./Egg.svelte";

  import Basket from "./Basket.svelte";
  import Wolf from "./Wolf.svelte";
  import { started } from "./store";

  const background = "/nintenday/game.jpg";

  preload(background);
</script>

<div class="game" class:started={$started}>
  <Controls />
  <Basket />
  <Wolf />
  <Egg d="lb" stage="0" />
  <Sprite name="c1" width="3.6%" left="51.5%" top="38.2%" />
  <Sprite name="c2" width="3.5%" left="55.4%" top="38.1%" />
  <Sprite name="c3" width="3.3%" left="59.1%" top="38.0%" />
  <Sprite name="cl1" width="3.4%" left="33.4%" top="62.0%" />
  <Sprite name="cl2" width="2.4%" left="31.6%" top="65.8%" />
  <Sprite name="cl3" width="2.6%" left="29.0%" top="66.1%" />
  <Sprite name="cl4" width="2.9%" left="25.8%" top="66.4%" />
  <Sprite name="cr1" width="3.7%" left="63.2%" top="62.3%" />
  <Sprite name="cr2" width="2.3%" left="66.3%" top="66.0%" />
  <Sprite name="cr3" width="2.4%" left="68.7%" top="66.3%" />
  <Sprite name="cr4" width="2.4%" left="71.5%" top="66.2%" />
  <Sprite name="ebl" width="7.4%" left="34.6%" top="68.9%" />
  <Sprite name="ebr" width="7.7%" left="57.3%" top="69.2%" />
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
