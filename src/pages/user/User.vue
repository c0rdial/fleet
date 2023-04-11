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
          <TableRowUser
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
        key: 'name',
        label: 'name'
      },
      {
        key: 'email',
        label: 'email'
      },
      {
        key: 'role',
        label: 'role'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
    ]

    const title = 'Users'
    const subTitle = 'List of users'

    const items = computed(() => store.getters['user/users'])
    const totalData = computed(() => store.getters['user/pagination'].total_items)
    const hasItems = computed(() => items.value.length > 0)
    const paging = computed(() => store.getters['user/pagination'])
    console.log(page.value)

    const handlePagination = (page) => {
      updateQuery(router, { ...route.query, page })
      store.dispatch('user/getAllUsers', {
        ...params,
        page: page
      })
    }

    const handleLimit = (limit) => {
      updateQuery(router, { ...route.query, limit })
      store.dispatch('user/getAllUsers', {
        ...params,
        limit: limit
      })
    }

    const handleCreate = () => {
      console.log('create')
      router.push({ path: `users/create` })
    }

    const handleView = ({ id }) => {
      router.push({ path: `users/${id}/detail` })
    }

    const handleEdit = ({ id }) => {
      router.push({ path: `users/${id}/edit` })
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
          store.dispatch('user/deleteUser', data.id)
          store.dispatch('user/getAllUsers', {
            page: params.page,
            limit: params.limit
          })
        }
      })
    }

    onMounted(() => {
      store.dispatch('user/getAllUsers', {
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
