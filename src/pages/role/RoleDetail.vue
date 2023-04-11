<template>
  <DefaultPage>
    <template #cards>
      <div class="form-group flex items-center mb-6">
        <label for="fullname" class="form-label inline-block mr-4 text-gray-900">Name : </label>
        <p class="text-gray-700 font-semibold capitalize">{{ role.name }}</p>
      </div>
    </template>
  </DefaultPage>
</template>
<script>
import components from '@/partials'
import { defineComponent, reactive, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { app, pages } from "@/config";

export default defineComponent({
  components: {
    DefaultPage: components.DefaultPage,
    Loading: components.Loading
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const role = computed(() => store.getters['role/role'])
    const idRole = computed(() => route.params.id)

    const back = () => {
      router.back()
    }

    onMounted(() => {
      store.dispatch('role/getRole', idRole.value)
    })
    return {
      role,
      back
    }
  }
})
</script>
<style lang=""></style>
