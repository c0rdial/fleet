<template>
  <header class="sticky top-0 bg-white border-b shadow-lg py-2 border-gray-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <!-- Header: Left side -->
        <div class="flex">
          <!-- Hamburger button -->
          <button
            class="text-gray-500 hover:text-gray-600"
            @click.stop="$emit('toggle-sidebar')"
            aria-controls="sidebar"
            :aria-expanded="sidebarOpen"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>

        <!-- Header: Right side -->
        <div class="flex items-center justify-between space-x-3">
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-secondary lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src="@/assets/unnamed.png"
                  alt=""
                />
                <span class="hidden ml-3 text-slate-700 text-sm font-medium lg:block"
                  ><span class="sr-only">Open user menu for </span>Wan Adam</span
                >
                <ChevronDownIcon
                  class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <router-link
                    to="profile"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >Your Profile</router-link
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                    ]"
                    @click="handleLogout"
                    >Logout</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { computed, defineComponent } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, SearchIcon } from '@heroicons/vue/solid'
import { BellIcon, MenuAlt1Icon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  props: ['sidebarOpen'],
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    ChevronDownIcon,
    MenuAlt1Icon,
    SearchIcon
    // UserMenu,
  },
  setup(props, context) {
    const store = useStore()
    const auth = JSON.parse(localStorage.getItem('vuex'))
    console.log(auth)
    // const auth = computed(() => store.getters["auth/user"]);
    // const currentUSer = computed(() => auth.value.username);

    const handleLogout = () => {
      context.emit('logout')
    }

    const searchModalOpen = ref(false)
    return { searchModalOpen, handleLogout }
  }
}
</script>
