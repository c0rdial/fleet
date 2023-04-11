<template>
  <div class="w-full mx-auto mb-12">
    <!-- row 1 -->
    <div class="flex flex-wrap -mx-3">
      <!-- card1 -->
      <div
        v-for="(item, index) in data"
        :key="index"
        class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4"
      >
        <div
          class="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border"
        >
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3 py-4 items-center">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div class="">
                  <h5 class="mb-0 text-4xl text-black-primary font-bold">
                    {{ item.value }}
                    <!-- <span
                      class="leading-normal text-size-sm font-weight-bolder text-lime-500"
                      >+55%</span
                    > -->
                  </h5>
                  <p class="mb-0 font-sans font-semibold leading-normal text-size-sm">
                    {{ item.label }}
                  </p>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div
                  class="w-12 h-12 text-center rounded-lg bg-gradient-fuchsia flex items-center justify-center"
                >
                  <component
                    :is="item.icon"
                    class="flex-shrink-0 h-10 w-10 text-gray-100"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    dashboardData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const data = computed(() => {
      return props.dashboardData
    })
    return { data }
  }
})
</script>
<style lang=""></style>
