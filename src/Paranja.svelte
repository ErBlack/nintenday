<script>
    import {open} from './game/store';
</script>

<style>
    .paranja {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        box-shadow: inset 25vh 25vh;
        opacity: 0;
        z-index: -1;
        transition: opacity 300ms ease-out;
    }

    @media (orientation: portrait) {
        .paranja {
            box-shadow: inset 0 0 25vw rgba(0, 0, 0, 0.7);
        }
    }

    @media (orientation: landscape) {
        .paranja {
            box-shadow: inset 0 0 25vh rgba(0, 0, 0, 0.7);
        }
    }

    .open {
        z-index: 1;
        opacity: 1;
    }
</style>

<div class="paranja" class:open={$open}/>