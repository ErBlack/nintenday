<script>
  import Sprite from "./Sprite.svelte";
  import { basketH, basketV, H, V } from "./store";
</script>

<!-- ↖ -->
<Sprite
  name="whlt"
  width="7.7%"
  left="36.8%"
  top="44.9%"
  active={$basketH === H.left && $basketV === V.top}
/>
<!-- ↗ -->
<Sprite
  name="whrt"
  width="6.7%"
  left="57.0%"
  top="46.8%"
  active={$basketH === H.right && $basketV === V.top}
/>
<!-- ↘ -->
<Sprite
  name="whrb"
  width="7.4%"
  left="56.1%"
  top="58.1%"
  active={$basketH === H.right && $basketV === V.bottom}
/>
<!-- ↙ -->
<Sprite
  name="whlb"
  width="8.6%"
  left="36.1%"
  top="57%"
  active={$basketH === H.left && $basketV === V.bottom}
/>
