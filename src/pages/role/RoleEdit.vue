<template>
  <DefaultPage>
    <div class="mt-2 pb-8">
      <div>
        <h1 class="text-xl leading-6 font-medium text-slate-700">Edit Role</h1>
        <p class="text-base mt-1 text-slate-500">Please kindly follow the intruction below!</p>
      </div>
      <form @submit.prevent="submit" class="md:max-w-2xl">
        <div class="py-5">
          <div>
            <CustomInput
              inputType="default"
              v-model="params.name"
              id="name"
              name="name"
              placeholder="Input full name"
              aria-describedby="name"
              label="Full Name"
              :is-required="true"
            />
          </div>

          <div class="flex justify-between items-center mt-10 flex-col w-full sm:flex-row">
            <CustomButton
              button-type="button"
              :classes="'items-center inline-flex mb-4 sm:mb-0 justify-center sm:w-auto w-full px-14 py-3 mb-0 font-medium text-white uppercase align-middle transition-all duration-500 border-0 rounded-lg shadow-md tracking-wide text-sm ease-in-out cursor-pointer bg-slate-400 hover:bg-slate-500 hover:shadow-lg focus:outline-none focus:ring focus:ring-slate-300'"
              @click="back"
            >
              <Loading v-if="saveLoading" />
              Cancel
            </CustomButton>

            <CustomButton
              button-type="submit"
              :is-disabled="false"
              :classes="'items-center inline-flex justify-center sm:w-auto w-full px-14 py-3 mb-0 font-medium text-white uppercase align-middle transition-all duration-500 border-0 rounded-lg shadow-md tracking-wide text-sm ease-in-out cursor-pointer bg-gradient-to-r from-blue-secondary to-blue-500 hover:from-blue-500 hover:to-blue-500 hover:shadow-lg focus:outline-none focus:ring focus:ring-slate-300'"
            >
              <Loading v-if="saveLoading" />
              Save
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  </DefaultPage>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import components from '@/partials'

export default defineComponent({
  components: {
    Loading: components.Loading,
    CustomInput: components.CustomInput,
    DefaultPage: components.DefaultPage,
    CustomButton: components.CustomButton,
    Loading: components.Loading
  },
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const initialState = {
      name: ''
    }
    const params = reactive({ ...initialState })
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!hasId.value) return
      store.dispatch('role/getRole', routeParams.value.id).then(() => {
        const res = store.getters['role/role']
        Object.assign(params, res)
      })
    }

    const submit = () => {
      saveLoading.value = true

      store.dispatch('role/updateRole', {
        id: routeParams.value.id,
        data: params
      })
      saveLoading.value = false
    }

    const back = () => {
      router.back()
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      hasId,
      params,
      saveLoading,
      submit,
      back
    }
  }
})
</script>
