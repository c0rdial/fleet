<template>
  <footer>
    <div
      class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl absolute inset-x-0 mt-20"
    >
      <div
        class="flex justify-between border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-right"
      >
        
        <div>
          <span class="block sm:inline"
            >Copyright &copy; {{ new Date().getFullYear() }} Fleet Management System |
          </span>
          <span class="block sm:inline">
            Crafted with 💖 by
            <a
              href="https://wanadam-portfolio.vercel.app"
              target="_blank"
              class="text-blue-secondary hover:text-sky-700"
              >Wan Adam</a
            >.</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default defineComponent({
  components: {
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  setup() {
    

    return {
    };
  },
});
</script>
