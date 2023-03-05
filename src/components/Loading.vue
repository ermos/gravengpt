<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "little"
  }
})
</script>

<template>
  <svg class="loading" :class="size" width="700" height="200" viewBox="0 0 700 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g class="dots">
      <circle class="dot" cx="100" cy="100" r="100"></circle>
      <circle class="dot dot2" cx="350" cy="100" r="100"></circle>
      <circle class="dot dot3" cx="600" cy="100" r="100"></circle>
    </g>
  </svg>
</template>

<style lang="scss">
.loading {
  width: 100%;

  &.small {
    height: var(--spacing-small);
  }
  &.little {
    height: var(--spacing-little);
  }
  &.medium {
    height: var(--spacing-medium);
  }
}

.dots {
  fill: rgba(255, 255, 255, 0.5);

  .dot2{
    animation-delay: 0.2s;
  }

  .dot3{
    animation-delay: 0.4s;
  }
}

.dot {
  animation: load 1s infinite;
  stroke:none;
  fill-rule:nonzero;
}


@keyframes load{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>