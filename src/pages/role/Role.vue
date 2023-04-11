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
          <TableRowRole
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
    TableRowUser: components.TableRowUser,
    Pagination: components.Pagination,
    TableRowRole: components.TableRowRole
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
        key: 'name',
        label: 'name'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
    ]

    const title = 'Role'
    const subTitle = 'List of all roles'

    const items = computed(() => store.getters['role/roles'])
    const totalData = computed(() => store.getters['role/pagination']?.total_items || 0)
    const hasItems = computed(() => items.value.length > 0)
    const paging = computed(() => store.getters['role/pagination'])

    const handlePagination = (page) => {
      updateQuery(router, { ...route.query, page })
      store.dispatch('role/getAllRoles', {
        ...params,
        page: page
      })
    }

    const handleLimit = (limit) => {
      updateQuery(router, { ...route.query, limit })
      store.dispatch('role/getAllRoles', {
        ...params,
        limit: limit
      })
    }

    const handleCreate = () => {
      router.push({ path: `roles/create` })
    }

    const handleView = ({ _id }) => {
      router.push({ path: `roles/${_id}/detail` })
    }

    const handleEdit = ({ _id }) => {
      router.push({ path: `roles/${_id}/edit` })
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
          store.dispatch('role/deleteRole', data._id)
          store.dispatch('role/getAllRoles', {
            page: params.page,
            limit: params.limit
          })
        }
      })
    }

    onMounted(() => {
      store.dispatch('role/getAllRoles', {
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
