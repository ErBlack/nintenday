<script>
  import Desk from "./Desk.svelte";
  import Console from "./console/Console.svelte";
  import Game from "./game/Game.svelte";
  import { open } from "./game/store";
  import { assetsReady } from "./game/preload";

  const gw = new Array(10).fill({}).map((props, i) => ({
    ...props,
    filename: `g${`0${i + 1}`.slice(-2)}.jpg`,
  }));

  const setOpen = () => assetsReady.then(() => ($open = true));
</script>

<svelte:body />
<main>
  <Desk>
    {#each gw as console}
      <Console {...console} />
    {/each}
  </Desk>
  <Game />
</main>
<div id="ghost" />

<style>
  #ghost {
    visibility: hidden;
    width: 1px;
    height: 1px;
  }
</style>
