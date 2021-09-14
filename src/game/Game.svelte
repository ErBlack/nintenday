<script>
import preload from '../lib/preloadImage';
import Sprite from './Sprite.svelte';
import Button from './Button.svelte';

const background = '/nintenday/game.jpg';

preload(background);

let brt = false;
let brb = false;
let blt = false;
let blb = false;

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
    <Button left="84.65%" top="61.59%" on:deactivate={() => brt = false} on:activate={() => brt = true} active={brt} id="brt"/>
    <Button left="84.51%" top="78.95%" on:deactivate={() => brb = false} on:activate={() => brb = true} active={brb} id="brb"/>
    <Button left="7.67%" top="61.98%" on:deactivate={() => blt = false} on:activate={() => blt = true} active={blt} id="blt"/>
    <Button left="7.68%" top="79.65%" on:deactivate={() => blb = false} on:activate={() => blb = true} active={blb} id="blb"/>
    <Sprite name="c1" width="3.6%" left="51.5%" top="38.2%" />
    <Sprite name="c2" width="3.5%" left="55.4%" top="38.1%" />
    <Sprite name="c3" width="3.3%" left="59.1%" top="38.0%" />
    <Sprite name="wbl" width="9.3%" left="41.8%" top="45.2%" />
    <Sprite name="wbr" width="8.5%" left="49.8%" top="45.5%" />
    <Sprite name="whrt" width="6.7%" left="57.0%" top="46.8%" />
    <Sprite name="whrb" width="7.4%" left="56.1%" top="58.1%" />
    <Sprite name="whlt" width="7.7%" left="36.8%" top="44.9%" />
    <Sprite name="whlb" width="8.6%" left="36.1%" top="57%" />
    <Sprite name="cl1" width="3.4%" left="33.4%" top="62.0%" />
    <Sprite name="cl2" width="2.4%" left="31.6%" top="65.8%" />
    <Sprite name="cl3" width="2.6%" left="29.0%" top="66.1%" />
    <Sprite name="cl4" width="2.9%" left="25.8%" top="66.4%" />
    <Sprite name="cr1" width="3.7%" left="63.2%" top="62.3%" />
    <Sprite name="cr2" width="2.3%" left="66.3%" top="66.0%" />
    <Sprite name="cr3" width="2.4%" left="68.7%" top="66.3%" />
    <Sprite name="cr4" width="2.4%" left="71.5%" top="66.2%" />
    <Sprite name="ebl" width="7.4%" left="34.6%" top="68.9%" />
    <Sprite name="ebr" width="7.7%" left="57.3%" top="69.2%" />
    <Sprite name="e" width="1.7%" left="29.7%" top="40.0%" rotate="33" id="lt1"/>
    <Sprite name="e"  width="1.7%" left="31.3%" top="41.6%" rotate="95" id="lt2"/>
    <Sprite name="e" width="1.5%" left="33.0%" top="43.8%" id="lt3"/>
    <Sprite name="e" width="1.6%" left="34.5%" top="44.8%" rotate="-124"/>
    <Sprite name="e" width="1.7%" left="35.9%" top="47.2%" rotate="-53"/>
    <Sprite name="e" width="1.7%" left="29.3%" top="51.6%" rotate="-15" id="lb1"/>
    <Sprite name="e" width="1.6%" left="31.0%" top="53.3%" rotate="36" id="lb2"/>
    <Sprite name="e" width="1.7%" left="32.8%" top="54.8%" rotate="66" id="lb3"/>
    <Sprite name="e" width="1.6%" left="34.5%" top="56.6%" rotate="171" id="lb4"/>
    <Sprite name="e" width="1.7%" left="35.9%" top="58.6%" rotate="-123" id="lb5"/>
    <Sprite name="e" width="1.6%" left="69.5%" top="39.6%" rotate="21" id="rt1"/>
    <Sprite name="e" width="1.6%" left="67.8%" top="41.0%" rotate="5" id="rt2"/>
    <Sprite name="e" width="1.5%" left="66.0%" top="43.1%" rotate="-40" id="rt3"/>
    <Sprite name="e" width="1.8%" left="64.1%" top="44.5%" rotate="-105" id="rt4"/>
    <Sprite name="e" width="1.6%" left="62.7%" top="47.3%" rotate="-169" id="rt5"/>
    <Sprite name="e" width="1.7%" left="69.2%" top="51.4%" rotate="-144" id="rb1"/>
    <Sprite name="e" width="1.5%" left="67.6%" top="53.7%" rotate="-185" id="rb2"/>
    <Sprite name="e" width="1.7%" left="65.9%" top="54.9%" rotate="110" id="rb3"/>
    <Sprite name="e" width="1.6%" left="64.1%" top="56.7%" rotate="48" id="rb4"/>
    <Sprite name="e" width="1.6%" left="62.5%" top="59.2%" rotate="-32" id="rb5"/>
</div>