<script>
  import Desk from "./Desk.svelte";
  import Console from "./console/Console.svelte";
  import Game from "./game/Game.svelte";
  import Paranja from './Paranja.svelte';
import Invitation from './invitation/invitation.svelte';
  import { player } from './stores/player';
import Gamepad from './gamepad/gamepad.svelte';

  const gw = new Array(10).fill({}).map((props, i) => ({
    ...props,
    filename: `g${`0${i + 1}`.slice(-2)}.jpg`,
  }));
</script>

<main>
  <Invitation/>
  <Desk>
    {#if $player}
    <Gamepad/>
    {/if}
    {#each gw as console}
      <Console {...console} />
    {/each}
  </Desk>
  <Paranja/>
  <Game />
</main>