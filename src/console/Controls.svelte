<script>
  import Button from "../game/Button.svelte";
  import { assetsReady } from "../game/preload";
  import { open } from "../game/store";
  import { expand } from '../expand';

  let stage = 0;
</script>

<Button
  width="31px"
  top="29px"
  left="-178px"
  on:click={() => (stage = stage === 0 ? 1 : 0)}
  active={stage > 0}
/>
<Button
  width="31px"
  top="28px"
  left="146px"
  on:click={() => {
    stage = stage === 3 ? 4 : 0;

    if (stage === 4) {
      assetsReady
      .then(() => expand())
      .then(() => {
        $open = true;
      })
    }

    setTimeout(() => (stage = 0), 500);
  }}
  active={stage > 3}
/>
<Button
  width="31px"
  top="71px"
  left="146px"
  on:click={() => (stage = stage === 1 ? 2 : 0)}
  active={stage > 1}
/>
<Button
  width="31px"
  top="73px"
  left="-178px"
  on:click={() => (stage = stage === 2 ? 3 : 0)}
  active={stage > 2}
/>
