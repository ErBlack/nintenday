<script>
  import Desk from "./Desk.svelte";
  import Console from "./console/Console.svelte";
  import Game from "./game/Game.svelte";

  const gw = new Array(10).fill({}).map((props, i) => ({
    ...props,
    filename: `g${`0${i + 1}`.slice(-2)}.jpg`,
  }));
</script>

<main>
  <Desk>
    {#each gw as console}
      <Console {...console} />
    {/each}
  </Desk>
  <Game />
</main>

