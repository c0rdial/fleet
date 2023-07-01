<template>
  <div class="mt-3">
    <template v-for="(item, index) in navigations">
      <router-link
        v-if="!item.children"
        :key="item.name"
        :to="item.href || ''"
        active-class="bg-blue-secondary text-white"
        :class="[
          'text-white hover:bg-blue-secondary',
          'group flex items-center px-3 py-2 rounded-sm mb-0.5 last:mb-0 text-base font-medium  text-gray-200  truncate transition duration-150'
        ]"
      >
        <component
          :is="item.icon"
          class="mr-4 flex-shrink-0 h-6 w-6 text-gray-100"
          aria-hidden="true"
        />
        {{ item.name }}
      </router-link>
    </template>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { HomeIcon, UserCircleIcon, CogIcon, ShieldExclamationIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const navigations = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon
      },
      {
        name: 'Users',
        href: '/users',
        icon: UserCircleIcon
      },
      {
        name: 'Role',
        href: '/roles',
        icon: ShieldExclamationIcon
      },
      {
        name: 'Vehicle',
        href: '/vehicles',
        icon: CogIcon
      }
    ]

    onMounted(() => {
      if (route.path === '/' || route.path === '') {
        router.push('/dashboard')
      }
    })

    return {
      navigations
    }
  }
})
</script>
