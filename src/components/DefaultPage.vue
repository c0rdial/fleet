<template>
  <div class="px-4 py-6 md:px-8 md:py-10">
    <slot name="cards" />
    <slot name="search" />
    <slot name="table" />
    <slot name="dialog" />
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
