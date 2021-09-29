<script>
import { open } from '../game/store';
</script>
{#if !$open}
<button class="gamepad" on:click|preventDefault={() => $open = true}/>
{/if}
<style>
    @keyframes appear {
        0% {
            transform: rotate(-57deg);
        }
        80% {
            transform: rotate(-7deg);
        }
        100% {
            transform: rotate(-6deg);
        }
    }

    .gamepad {
        position: absolute;
        border: none;
        background-color: transparent;
        background-image: url('/nintenday/gamepad.webp');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100%;
        width: 125px;
        height: 99px;
        right: 5vw;
        top: 0;
        z-index: 3;
        transform-origin: 0 -100px;
        animation: appear .5s 1s ease-out both;
    }
</style>