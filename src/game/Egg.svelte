<script>
  import Sprite from "./Sprite.svelte";

  export let d;
  export let stage;

  const props = {
    lt: [
      { width: "1.7%", left: "29.7%", top: "40.0%", rotate: "33" },
      { width: "1.7%", left: "31.3%", top: "41.6%", rotate: "95" },
      { width: "1.5%", left: "33.0%", top: "43.8%" },
      { width: "1.6%", left: "34.5%", top: "44.8%", rotate: "-124" },
      { width: "1.7%", left: "35.9%", top: "47.2%", rotate: "-53" },
    ],
    rt: [
      { width: "1.6%", left: "69.5%", top: "39.6%", rotate: "21" },
      { width: "1.6%", left: "67.8%", top: "41.0%", rotate: "5" },
      { width: "1.5%", left: "66.0%", top: "43.1%", rotate: "-40" },
      { width: "1.8%", left: "64.1%", top: "44.5%", rotate: "-105" },
      { width: "1.6%", left: "62.7%", top: "47.3%", rotate: "-169" },
    ],
    rb: [
      { width: "1.7%", left: "69.2%", top: "51.4%", rotate: "-144" },
      { width: "1.5%", left: "67.6%", top: "53.7%", rotate: "-185" },
      { width: "1.7%", left: "65.9%", top: "54.9%", rotate: "110" },
      { width: "1.6%", left: "64.1%", top: "56.7%", rotate: "48" },
      { width: "1.6%", left: "62.5%", top: "59.2%", rotate: "-32" },
    ],
    lb: [
      { width: "1.7%", left: "29.3%", top: "51.6%", rotate: "-15" },
      { width: "1.6%", left: "31.0%", top: "53.3%", rotate: "36" },
      { width: "1.7%", left: "32.8%", top: "54.8%", rotate: "66" },
      { width: "1.6%", left: "34.5%", top: "56.6%", rotate: "171" },
      { width: "1.7%", left: "35.9%", top: "58.6%", rotate: "-123" },
    ],
  };
</script>

<Sprite name="e" {...props[d][stage]} active />
