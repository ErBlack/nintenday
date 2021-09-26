<style>
.desk {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
}
</style>

<section class="desk"  on:touchmove|preventDefault>
    <slot></slot>
</section>