<script>
import preload from '../lib/preloadImage';
import Sprite from './Sprite.svelte';

const background = '/nintenday/game.jpg';

preload(background);

const wbl = false;
const wbr = true;

</script>
<style>
.game {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: center / 100% url('/nintenday/game.jpg') no-repeat;
}

@media (min-aspect-ratio: 2388/1422) {
    .game {
        height: 95vh;
        width: calc(95vh / 1422 * 2388);
}
}

@media (max-aspect-ratio: 2388/1422) {
    .game {
        width: 95vw;
        height: calc(95vw / 2388 * 1422);
    }
}
</style>
<div class="game">
    <Sprite name="wbl" width="9.3%" left="41.8%" top="45.2%" active/>
    <Sprite name="wbr" width="8.5%" left="49.8%" top="45.5%" active/>
    <Sprite name="whrt" width="6.7%" left="57.0%" top="46.8%" active/>
    <Sprite name="whrb" width="7.4%" left="56.1%" top="58.1%" active/>
    <Sprite name="whlt" width="7.7%" left="36.8%" top="44.9%" active/>
    <Sprite name="whlb" width="8.6%" left="36.1%" top="57%" active/>
    <Sprite name="cl1" width="3.4%" left="33.4%" top="62.0%" active/>
    <Sprite name="cl2" width="2.4%" left="31.6%" top="65.8%" active/>
    <Sprite name="cl3" width="2.6%" left="29.0%" top="66.1%" active/>
    <Sprite name="cl4" width="2.9%" left="25.8%" top="66.4%" active/>
    <Sprite name="cr1" width="3.7%" left="63.2%" top="62.3%" active/>
    <Sprite name="cr2" width="2.3%" left="66.3%" top="66.0%" active/>
    <Sprite name="cr3" width="2.4%" left="68.7%" top="66.3%" active/>
    <Sprite name="cr4" width="2.4%" left="71.5%" top="66.2%" active/>
    <Sprite name="ebl" width="7.4%" left="34.6%" top="68.9%" active/>
    <Sprite name="ebr" width="7.7%" left="57.3%" top="69.2%" active/>
</div>