<template>
  <DefaultPage>
    <template #cards>
      <div class="bg-gradient-to-r h-36 relative rounded-2xl from-sky-500 to-indigo-500">
        <div
          class="min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border absolute -bottom-10 w-full sm:w-auto mx-auto sm:right-10 sm:left-10"
        >
          <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-auto max-w-full sm:px-3">
              <div
                class="text-base relative inline-flex items-center justify-center rounded-xl text-white p-4 transition-all duration-200"
              >
                <img class="h-28 w-28 rounded-full" src="~/assets/unnamed.png"  alt="avatar" />
              </div>
            </div>
            <div class="flex-none w-auto max-w-full px-3 my-auto">
              <div class="h-full">
                <h5 class="mb-1 text-2xl text-black-primary font-semibold">
                  {{ user.name }}
                </h5>
                <p class="mb-0 font-medium leading-normal text-sm">
                  {{ user.role }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-start justify-between flex-col lg:flex-row">
        <div class="w-full col-span-2 max-w-full mt-10 lg:mt-24 p-2 sm:p-4">
          <div
            class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border"
          >
            <div class="flex-auto">
              <div class="pb-8 sm:p-8">
                <div class="">
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Full Name :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ user.name }}</p>
                  </div>

                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Email :
                    </label>
                    <p class="text-gray-700 font-semibold ">{{ user.email }}</p>
                  </div>

                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Role :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ user.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    const router = useRouter()
    const store = useStore()

    const saveLoading = ref(false)

    const user = computed(() => store.getters['auth/getAuth'])
    const idUser = computed(() => user.value.id)

    const back = () => {
      router.back()
    }

    onMounted(() => {
      store.dispatch('user/getUser', idUser.value)
    })
    return {
      user,
      back,
      saveLoading: false,
      saveLoading
    }
  }
})
</script>
<style lang=""></style>
