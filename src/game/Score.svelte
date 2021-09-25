<script>
  import { score } from "./store";
</script>

<div class="score">{$score}</div>

<style>
  .score {
    position: absolute;
    right: 34%;
    top: 25%;
    line-height: 1;
    font-family: digits, monospace;
    color: #010101;
  }

  @media (min-aspect-ratio: 2388/1422) {
    .score {
      font-size: calc((95vh / 1422 * 2388) / 18);
    }
  }

  @media (max-aspect-ratio: 2388/1422) {
    .score {
      font-size: calc(95vw / 18);
    }
  }

</style>
