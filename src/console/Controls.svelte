<script>
  import Button from "../game/Button.svelte";
  import { open } from "../game/store";

  let stage = 0;
</script>

<Button
  width="31px"
  top="29px"
  left="-178px"
  on:activate={() => (stage = stage === 0 ? 1 : 0)}
  active={stage > 0}
/>
<Button
  width="31px"
  top="28px"
  left="146px"
  on:activate={() => {
    stage = stage === 3 ? 4 : 0;

    if (stage === 4) $open = true;

    setTimeout(() => (stage = 0), 500);
  }}
  active={stage > 3}
/>
<Button
  width="31px"
  top="71px"
  left="146px"
  on:activate={() => (stage = stage === 1 ? 2 : 0)}
  active={stage > 1}
/>
<Button
  width="31px"
  top="73px"
  left="-178px"
  on:activate={() => (stage = stage === 2 ? 3 : 0)}
  active={stage > 2}
/>
