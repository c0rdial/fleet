<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-blue-primary bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
      @click="clickHandler"
    ></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 2xl:!w-72 shrink-0 bg-[#00005C] p-4 transition-all duration-300 ease-in-out overflow-x-hidden"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-72 lg:w-20'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-gray-500 hover:text-gray-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/dashboard">
          <span class="text-white">
            <svg
              class="w-10 h-10 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </span>
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <DefaultNavigation />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'
import components from '@/partials'

import { CogIcon, QuestionMarkCircleIcon, ShieldCheckIcon, XIcon } from '@heroicons/vue/outline'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default defineComponent({
  components: {
    DefaultNavigation: components.DefaultNavigation,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon
  },
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const trigger = ref(null)
    const sidebar = ref(null)

    const openSidebar = () => {
      emit('open-sidebar')
    }

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return
      if (!props.sidebarOpen || sidebar.value.contains(target) || trigger.value.contains(target))
        return
      emit('close-sidebar')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return
      emit('close-sidebar')
    }

    return {
      trigger,
      sidebar,
      openSidebar,
      clickHandler,
      navigation
    }
  }
})
</script>

<style scoped>
#sidebar:hover {
  width: 18rem;
}
</style>
