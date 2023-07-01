<template>
    <DefaultPage>
      <div class="mt-2 pb-8">
        <div>
          <h1 class="text-xl leading-6 font-medium text-slate-700">Edit Vehicle</h1>
          <p class="text-base mt-1 text-slate-500">Please kindly follow the intruction below!</p>
        </div>
        <form @submit.prevent="submit" class="md:max-w-5xl">
          <div class="py-5">
            <div class="md:grid md:grid-cols-2 gap-10">
              <CustomInput
                inputType="default"
                v-model="params.costCenter"
                id="costCenter"
                name="costCenter"
                placeholder="Input cost center"
                aria-describedby="costCenter"
                label="Cost Center"
                :is-required="true"
              />
  
              <CustomInput
                inputType="default"
                v-model="params.reqNo"
                id="reqNo"
                name="reqNo"
                placeholder="Input req no"
                aria-describedby="reqNo"
                label="Req No"
                :is-required="true"
              />
            </div>
            <div class="md:grid md:grid-cols-2 gap-10">
              <CustomInput
                inputType="default"
                v-model="params.class"
                id="class"
                name="class"
                placeholder="Input class"
                aria-describedby="class"
                label="Class"
                :is-required="true"
              />
  
              <CustomInput
                inputType="default"
                v-model="params.model"
                id="model"
                name="model"
                placeholder="Input model"
                aria-describedby="model"
                label="Model"
                :is-required="true"
              />
            </div>
  
            <div class="md:grid md:grid-cols-2 gap-10">
              <CustomInput
                inputType="default"
                v-model="params.make"
                id="make"
                name="make"
                placeholder="Input make"
                aria-describedby="make"
                label="Make"
                :is-required="true"
              />
  
              <CustomInput
                inputType="default"
                v-model="params.color"
                id="color"
                name="color"
                placeholder="Input color"
                aria-describedby="color"
                label="Color"
                :is-required="true"
              />
            </div>
  
            <div class="md:grid md:grid-cols-2 gap-10">
              <CustomInput
                inputType="default"
                v-model="params.fuelType"
                id="fuelType"
                name="fuelType"
                placeholder="Input fuelType"
                aria-describedby="fuelType"
                label="Fuel Type"
                :is-required="true"
              />
  
              <CustomInput
                inputType="default"
                v-model="params.engineNo"
                id="engineNo"
                name="engineNo"
                placeholder="Input engineNo"
                aria-describedby="engineNo"
                label="Engine No"
                :is-required="true"
              />
            </div>
  
            <div class="md:grid md:grid-cols-2 gap-10">
              <CustomInput
                inputType="default"
                v-model="params.manuYear"
                id="manuYear"
                name="manuYear"
                placeholder="Input manuYear"
                aria-describedby="manuYear"
                label="Manu Year"
                :is-required="true"
              />
  
              <div class="flex flex-col mb-4">
                <label class="form-label inline-block mb-2 text-slate-700 font-medium"> Role </label>
                <VueDatePicker
                  v-model="date"
                  :close-on-auto-apply="true"
                  :enable-time-picker="false"
                  :close-on-select="true"
                />
              </div>
            </div>
  
            <div class="md:grid md:grid-cols-2 gap-10">
              <div class="flex flex-col mb-4">
                <label class="form-label inline-block mb-2 text-slate-700 font-medium"> Role </label>
                <select
                  v-model="params.status"
                  class="form-control block w-full px-3 py-2 text-slate-500 bg-white bg-clip-padding border-none ring-2 ring-gray-300 rounded transition ease-in-out m-0 shadow focus:text-slate-700 focus:bg-slate-200 focus:ring-blue-secondary focus:ring-2 focus:outline-none"
                  id="status"
                  name="status"
                  placeholder="Choose status"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
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
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  
  export default defineComponent({
    components: {
      Loading: components.Loading,
      CustomInput: components.CustomInput,
      DefaultPage: components.DefaultPage,
      CustomButton: components.CustomButton,
      Loading: components.Loading,
      VueDatePicker
    },
    setup(props, { emit }) {
      const route = useRoute()
      const router = useRouter()
      const store = useStore()
  
      const initialState = {
        costCenter: '',
        reqNo: '',
        class: '',
        make: '',
        model: '',
        color: '',
        fuelType: '',
        engineNo: '',
        manuYear: '',
        reqDate: '',
        status: ''
      }
  
      const params = reactive({ ...initialState })
      const saveLoading = ref(false)
      const date = ref()
      const routeParams = computed(() => route.params || {})
      const hasId = computed(() => !!routeParams.value.id)
  
      const initPage = () => {
        if (!hasId.value) return
        store.dispatch('vehicle/getVehicle', routeParams.value.id).then(() => {
          const res = store.getters['vehicle/vehicle']
          Object.assign(params, res)
          date.value = res.reqDate
          console.log(date.value)
        })
      }
  
      const submit = () => {
        saveLoading.value = true
        store.dispatch('vehicle/updateVehicle', {
          id: routeParams.value.id,
          data: {
            ...params,
            reqDate: date.value
          }
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
        params,
        saveLoading,
        submit,
        back,
        date
      }
    }
  })
  </script>
  