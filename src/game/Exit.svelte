<button on:click class="exit" />

<style>
  .exit {
    right: 10.7%;
    height: 4.1%;
    width: 4.3%;
    top: 35.55%;
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    cursor: pointer;
    opacity: 0.5;
    padding: 0;
    border-radius: 32%;
    transform: rotate(-1.5deg);
    transition: box-shadow linear 0.1s, background-color linear 0.1s;
  }

  .exit:active {
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: inset -4px -4px 4px rgb(0 0 0 / 0.4),
      inset 1px 1px 2px rgb(0 0 0 / 0.15);
  }

  .exit::before {
    content: "";
    position: absolute;
    left: -90%;
    top: -150%;
    bottom: -150%;
    right: -90%;
  }
</style>
