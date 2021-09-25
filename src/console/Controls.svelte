<script>
  import Button from "../game/Button.svelte";
  import { assetsReady } from "../game/preload";
  import { open } from "../game/store";
  import { expand } from '../expand';

  let stage = 0;

  const s1 = () => stage = stage === 0 || stage === 1 ? 1 : 0;
  const s2 = () => stage = stage === 1 || stage === 2 ? 2 : 0;
  const s3 = () => stage = stage === 2 || stage === 3 ? 3 : 0;
  const s4 = () => {
    const temp = stage;
    stage = stage === 3 || stage === 4 ? 4 : 0

    if (stage === 4 && stage !== temp) {
      assetsReady
      .then(() => {
        expand();
        $open = true;
      })

      setTimeout(() => (stage = 0), 500);
    }
  };
</script>

<svelte:body on:keydown={({key}) => {
  if (key === 'Escape') {
     $open = false
  }
}}/>

<Button
  width="31px"
  top="29px"
  left="-178px"
  on:touchstart={s1}
  on:click={s1}
  active={stage > 0}
/>
<Button
  width="31px"
  top="28px"
  left="146px"
  on:touchstart={s4}
  on:click={s4}
  active={stage > 3}
/>
<Button
  width="31px"
  top="71px"
  left="146px"
  on:touchstart={s2}
  on:click={s2}
  active={stage > 1}
/>
<Button
  width="31px"
  top="73px"
  left="-178px"
  on:touchstart={s3}
  on:click={s3}
  active={stage > 2}
/>
