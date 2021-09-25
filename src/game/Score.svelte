<script>
  import { score } from "./store";
</script>

<div class="score">{$score}</div>

<style>
  .score {
    position: absolute;
    right: 33.77%;
    top: 25.5%;
    transform: scale(0.86, 1);
    line-height: 1;
    font-family: digits, monospace;
    color: #171717;
  }

  @media (min-aspect-ratio: 2388/1422) {
    .score {
      font-size: calc((95vh / 1422 * 2388) / 13);
    }
  }

  @media (max-aspect-ratio: 2388/1422) {
    .score {
      font-size: calc(95vw / 13);
    }
  }
</style>
