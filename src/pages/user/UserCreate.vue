<template>
  <DefaultPage>
    <div class="mt-2 pb-8">
      <div>
        <h1 class="text-xl leading-6 font-medium text-slate-700">Create New User</h1>
        <p class="text-base mt-1 text-slate-500">Please kindly follow the intruction below!</p>
      </div>
      <form @submit.prevent="submit" enctype="multipart/form-data" class="md:max-w-2xl">
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
            <CustomInput
              inputType="default"
              v-model="params.email"
              id="email"
              name="email"
              placeholder="Input email"
              aria-describedby="email"
              label="Email"
              :is-required="true"
            />

            <CustomInput
              inputType="default"
              v-model="params.password"
              id="password"
              name="password"
              placeholder="Input password"
              aria-describedby="password"
              label="Password"
              :is-required="true"
            />

            <CustomInput
              inputType="default"
              v-model="params.password2"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Input password confirmation"
              aria-describedby="password_confirmation"
              label="Password Confirmation"
              :is-required="true"
            />

            <div class="flex flex-col mb-4">
              <label class="form-label inline-block mb-2 text-slate-700 font-medium"> Role </label>
              <select
                v-model="params.role"
                class="form-control block w-full px-3 py-2 text-slate-500 bg-white bg-clip-padding border-none ring-2 ring-gray-300 rounded transition ease-in-out m-0 shadow focus:text-slate-700 focus:bg-slate-200 focus:ring-blue-secondary focus:ring-2 focus:outline-none"
                id="role"
                name="role"
                placeholder="Choose role"
                required
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <!-- <div class="flex flex-col mb-4">
              <label class="form-label inline-block mb-2 text-slate-700 font-medium">
                Avatar
              </label>
              <input
                type="file"
                class="form-control block w-full px-3 py-2 text-slate-500 bg-white bg-clip-padding border-none ring-2 ring-gray-300 rounded transition ease-in-out m-0 shadow focus:text-slate-700 focus:bg-slate-200 focus:ring-blue-secondary focus:ring-2 focus:outline-none"
                id="avatar"
                name="avatar"
                placeholder="Choose avatar"
                @change="onFileChange"
              />
              <img :src="avatar" class="max-w-[200px] mt-4 rounded-xl" />
            </div> -->
          </div>

          <div class="flex justify-between items-center mt-10 flex-col w-full sm:flex-row">
            <CustomButton
              button-type="button"
              :classes="'items-center flex mb-4 sm:mb-0 justify-center sm:w-auto w-full px-14 py-3 mb-0 font-medium text-white uppercase align-middle transition-all duration-500 border-0 rounded-lg shadow-md tracking-wide text-sm ease-in-out cursor-pointer bg-slate-400 hover:bg-slate-500 hover:shadow-lg focus:outline-none focus:ring focus:ring-slate-300'"
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
      name: '',
      email: '',
      role: '',
      password: '',
      password2: ''
    }
    const params = reactive({ ...initialState })
    const saveLoading = ref(false)
    const avatar = ref('')

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const onFileChange = (e) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      params.file = file
      reader.onload = (e) => {
        avatar.value = e.target.result
      }
      reader.readAsDataURL(file)
    }

    const initPage = () => {
      if (!hasId.value) return
      store.dispatch('user/getUser', routeParams.value.id).then(() => {
        const res = store.getters['user/user']
        Object.assign(params, res)
        avatar.value = res.avatar
      })
    }

    const submit = () => {
      saveLoading.value = true
      const formData = new FormData()

      for (const key in params) {
        if (key === 'file') {
          if (params[key] instanceof File) {
            formData.append(key, params[key])
          }
          continue
        }
        if (params[key]) {
          formData.append(key, params[key])
        }
      }
      store.dispatch('user/createUser', params)
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
      back,
      onFileChange,
      avatar
    }
  }
})
</script>
