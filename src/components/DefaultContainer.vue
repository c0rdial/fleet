<template>
  <div class="flex h-screen overflow-hidden">
    <DefaultSidebar
      :sidebar-open="sidebarOpen"
      @close-sidebar="sidebarOpen = false"
      @open-sidebar="handleOpenSidebar"
    />
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <DefaultHeader
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @open-sidebar="handleOpenSidebar"
        @logout="handleLogout"
      />
      <main class="flex-1 pb-8">
        <div class="p-0 w-full mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
      <DefaultFooter id="footer" />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import components from '@/partials'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    DefaultFooter: components.DefaultFooter,
    DefaultHeader: components.DefaultHeader,
    DefaultNavigation: components.DefaultNavigation,
    DefaultSidebar: components.DefaultSidebar
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const sidebarOpen = ref(false)

    const handleOpenSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    const handleLogout = () => {
      store.dispatch('auth/logout')
      router.replace('auth/login')
    }

    return {
      sidebarOpen,
      handleOpenSidebar,
      handleLogout
    }
  }
})
</script>
