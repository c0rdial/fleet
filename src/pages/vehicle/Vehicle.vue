<template>
    <DefaultPage>
      <template #table>
        <CustomTable
          :fields="fields"
          :items="items"
          :loading="loading"
          :total="totalData"
          :title="title"
          :hasItems="hasItems"
          :sub-title="subTitle"
          :page="page"
          @set-limit="handleLimit"
          @on-page-change="handlePagination"
          @create="handleCreate"
        >
          <template #items>
            <TableRowVehicle
              v-for="(item, index) in items"
              :key="index"
              :item="item"
              :index="index"
              class="bg-white"
              @view="handleView"
              @edit="handleEdit"
              @remove="handleRemove"
            />
          </template>
        </CustomTable>
      </template>
    </DefaultPage>
  </template>
  <script>
  import { computed, reactive, defineComponent, ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import Swal from 'sweetalert2'
  import { updateQuery } from '@/composables/update-query'
  
  import components from '@/partials'
  
  export default defineComponent({
    components: {
      DefaultPage: components.DefaultPage,
      CustomTable: components.CustomTable,
      TableRowVehicle: components.TableRowVehicle,
      Pagination: components.Pagination
    },
    setup(props) {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const page = computed(() => parseInt(route.query.page) || 1)
      const limit = computed(() => route.query.limit || 10)
  
      const params = reactive({
        page: page.value,
        limit: limit.value
      })
  
      const loading = ref(false)
      const loadingRemove = ref(false)
      const fields = [
        {
          key: 'no',
          label: 'no'
        },
        {
          key: 'costCenter',
          label: 'Cost Center'
        },
        {
          key: 'reqNo',
          label: 'Req No'
        },
        {
          key: 'class',
          label: 'Class'
        },
        {
          key: 'make',
          label: 'make'
        },
        {
          key: 'model',
          label: 'model'
        },
        {
          key: 'color',
          label: 'color'
        },
        {
          key: 'fuelType',
          label: 'fuel Type'
        },
        {
          key: 'engineNo',
          label: 'engine No'
        },
        {
          key: 'manuYear',
          label: 'manu Year'
        },
        {
          key: 'reqDate',
          label: 'req Date'
        },
        {
          key: 'status',
          label: 'status'
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]
  
      const title = 'Vehicles'
      const subTitle = 'List of all vehicles'
  
      const items = computed(() => store.getters['vehicle/vehicles'])
      const totalData = computed(() => store.getters['vehicle/pagination'].total_items)
      const hasItems = computed(() => items.value.length > 0)
      const paging = computed(() => store.getters['vehicle/pagination'])
  
      const handlePagination = (page) => {
        updateQuery(router, { ...route.query, page })
        store.dispatch('vehicle/getAllVehicles', {
          ...params,
          page: page
        })
      }
  
      const handleLimit = (limit) => {
        updateQuery(router, { ...route.query, limit })
        store.dispatch('vehicle/getAllVehicles', {
          ...params,
          limit: limit
        })
      }
  
      const handleCreate = () => {
        console.log('create')
        router.push({ path: `vehicles/create` })
      }
  
      const handleView = ({ id }) => {
        router.push({ path: `vehicles/${id}/detail` })
      }
  
      const handleEdit = ({ id }) => {
        router.push({ path: `vehicles/${id}/edit` })
      }
  
      const handleRemove = (data) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            store.dispatch('vehicle/deleteVehicle', data.id)
            store.dispatch('vehicle/getAllVehicles', {
              page: params.page,
              limit: params.limit
            })
          }
        })
      }
  
      onMounted(() => {
        store.dispatch('vehicle/getAllVehicles', {
          page: params.page,
          limit: params.limit
        })
      })
  
      return {
        fields,
        items,
        handleCreate,
        handleView,
        handleEdit,
        handleRemove,
        loadingRemove,
        loading,
        totalData,
        hasItems,
        title,
        subTitle,
        paging,
        handlePagination,
        page,
        handleLimit
      }
    }
  })
  </script>
  