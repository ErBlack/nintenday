<script>
  import Sprite from "./Sprite.svelte";
  import { fails } from "./store";
</script>

<Sprite name="c1" width="3.6%" left="51.5%" top="38.2%" active={$fails > 0} />
<Sprite name="c2" width="3.5%" left="55.4%" top="38.1%" active={$fails > 1} />
<Sprite name="c3" width="3.3%" left="59.1%" top="38.0%" active={$fails > 2} />
