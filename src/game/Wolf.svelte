<script>
  import Sprite from "./Sprite.svelte";
  import { basketH, H } from "./store";
</script>

<!-- ← -->
<Sprite
  name="wbl"
  width="9.3%"
  left="41.8%"
  top="45.2%"
  active={$basketH === H.left}
/>
<!-- → -->
<Sprite
  name="wbr"
  width="8.5%"
  left="49.8%"
  top="45.5%"
  active={$basketH === H.right}
/>
