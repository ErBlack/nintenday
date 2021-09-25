<script>
  import Button from "./Button.svelte";
  import { basketH, basketV, H, V } from "./store";

  let blt = false;
  let brt = false;
  let brb = false;
  let blb = false;

  const onkeydown = ({ key, code }) => {
    switch (key) {
      case "ArrowUp":
      case "w":
      case "ц":
        $basketV = V.top;

        if ($basketH === H.left) blt = true;
        if ($basketH === H.right) brt = true;
        break;
      case "ArrowRight":
      case "d":
      case "в":
        $basketH = H.right;

        if ($basketV === V.top) brt = true;
        if ($basketV === V.bottom) brb = true;
        break;
      case "ArrowDown":
      case "s":
      case "ы":
        $basketV = V.bottom;

        if ($basketH === H.left) blb = true;
        if ($basketH === H.right) brb = true;
        break;
      case "ArrowLeft":
      case "a":
      case "ф":
        $basketH = H.left;

        if ($basketV === V.top) blt = true;
        if ($basketV === V.bottom) blb = true;
        break;
      case "Control":
      case "Shift":
        switch (code) {
          case "ShiftLeft":
            $basketV = V.top;
            $basketH = H.left;
            blt = true;
            break;
          case "ShiftRight":
            $basketV = V.top;
            $basketH = H.right;
            brt = true;
            break;
          case "ControlRight":
            $basketV = V.bottom;
            $basketH = H.right;
            brb = true;
            break;
          case "ControlLeft":
            $basketV = V.bottom;
            $basketH = H.left;
            blb = true;
            break;
        }
        break;
    }
  };

  const onkeyup = () => {
    blt = false;
    brt = false;
    brb = false;
    blb = false;
  };
</script>

<svelte:body on:keydown={onkeydown} on:keydown={onkeyup}/>
<!-- ↖ -->
<Button
  left="7.67%"
  top="61.98%"
  active={blt}
  hit
  on:activate={() => {
    $basketH = H.left;
    $basketV = V.top;
  }}
/>
<!-- ↗ -->
<Button
  left="84.65%"
  top="61.59%"
  active={brt}
  hit
  on:activate={() => {
    $basketH = H.right;
    $basketV = V.top;
  }}
/>
<!-- ↘ -->
<Button
  left="84.51%"
  top="78.95%"
  active={brb}
  hit
  on:activate={() => {
    $basketH = H.right;
    $basketV = V.bottom;
  }}
/>
<!-- ↙ -->
<Button
  left="7.68%"
  top="79.65%"
  active={blb}
  hit
  on:activate={() => {
    $basketH = H.left;
    $basketV = V.bottom;
  }}
/>
