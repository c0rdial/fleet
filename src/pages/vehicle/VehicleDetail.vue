<template>
    <DefaultPage>
      <div class="flex items-start justify-between flex-col rounded-xl lg:flex-row border">
        <div class="w-full col-span-2 max-w-full p-2 sm:p-4">
          <div
            class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border"
          >
            <div class="flex-auto">
              <div class="">
                <div class="">
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Cost center :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.costCenter }}</p>
                  </div>
  
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Engine no :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.engineNo }}</p>
                  </div>
  
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Fuel type :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.fuelType }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Class :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.class }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Fuel type :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.fuelType }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Color :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.color }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Model :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.model }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Make :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.make }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Req date :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.reqDate }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Req no :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.reqNo }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Manu Year :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.manuYear }}</p>
                  </div>
                  <div class="form-group flex items-center mb-6">
                    <label for="fullname" class="form-label inline-block mr-4 text-gray-900"
                      >Status :
                    </label>
                    <p class="text-gray-700 font-semibold capitalize">{{ vehicle.status }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  
      const vehicle = computed(() => store.getters['vehicle/vehicle'])
      const idVehicle = computed(() => route.params.id)
  
      const back = () => {
        router.back()
      }
  
      onMounted(() => {
        store.dispatch('vehicle/getVehicle', idVehicle.value)
      })
      return {
        vehicle,
        back
      }
    }
  })
  </script>
  <style lang=""></style>
  