<script>
import Content from './Content.svelte';
import preload from '../lib/preloadImage';
import { hidden } from './store';
import { open } from '../game/store';

let ready = false;

preload('/nintenday/nesc.webp').then(() => {
    ready = true;
});

</script>
{#if  ready}
<main class="invitation" class:inbound={ready} class:hidden={$hidden || $open} on:touchmove|preventDefault>
    <Content/>
</main>
{/if}
<style>
    .invitation {
        position: absolute;
        color: #fabc5d;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        box-sizing: border-box;
        z-index: 1;
        text-shadow: 0 0 1em rgba(0,0,0,.4);
        overflow: auto;
        background: url('/nintenday/nesc.webp') no-repeat center center;
        background-size: 100% 100%;
        animation-fill-mode: both;
        animation-duration: .5s;
        animation-timing-function: ease-out;
    }

    .inbound {
        animation-name: inbound;
        animation-delay: .5s;
    }

    .hidden {
        animation-name: outbound;
        animation-delay: 0s;
    }

    @keyframes inbound {
        0% {
            transform: translateY(-100vh);
        }
        100% {
            transform: translateY(0);
        }
    }
    @keyframes outbound {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-100vh);
        }
    }

    @media (min-aspect-ratio: 1181/1236) and (min-width: 1024px) {
        .invitation {
            height: 65vh;
            width: calc(65vh / 1181 * 1236);
        }
    }

    @media (max-aspect-ratio: 1236/1181) and (min-width: 1024px) {
        .invitation {
            width: 65vw;
            height: calc(65vw / 1236 * 1181);
        }
    }

    @media (min-aspect-ratio: 1181/1236) and (max-width: 1023px) and (min-width: 800px) {
        .invitation {
            height: 85vh;
            width: calc(85vh / 1181 * 1236);
        }
    }

    @media (max-aspect-ratio: 1236/1181) and (max-width: 1023px)  and (min-width: 800px) {
        .invitation {
            width: 85vw;
            height: calc(85vw / 1236 * 1181);
        }
    }

    @media (min-aspect-ratio: 1181/1236) and (max-width: 799px) {
        .invitation {
            height: 95vh;
            width: calc(95vh / 1181 * 1236);
        }
    }

    @media (max-aspect-ratio: 1236/1181) and (max-width: 799px)  {
        .invitation {
            width: 95vw;
            height: calc(95vw / 1236 * 1181);
        }
    }
</style>