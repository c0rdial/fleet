<template>
  <div class="flex flex-col rounded-xl md:px-4 shadow-soft-xl">
    <div class="flex justify-between items-start flex-col sm:flex-row">
      <div class="">
        <h2 class="text-xl leading-6 font-medium text-slate-700">
          {{ title }}
        </h2>
        <p class="text-base mt-1 text-slate-500">
          {{ subTitle }}
        </p>
      </div>
      <div
        class="flex lg:items-center justify-between mb-8 flex-col lg:flex-row"
        v-if="hasCreateButton"
      >
        <a
          type="button"
          class="items-center inline-flex justify-center w-auto px-10 py-3 mb-0 font-medium text-white uppercase align-middle transition-all duration-400 border-0 rounded-lg shadow-md tracking-wide text-sm ease-in-out cursor-pointer bg-gradient-to-r from-blue-secondary to-blue-500 hover:from-blue-500 hover:to-blue-500 hover:shadow-lg focus:outline-none focus:ring focus:ring-slate-300 mt-3 lg:mt-0"
          @click="create"
        >
          <PlusCircleIcon class="h-6 w-6 mr-2" />
          create
        </a>
      </div>
    </div>

    <div class="mb-4 flex justify-between items-end">
      <div v-if="hasPagination" class="flex justify-center">
        <label for="item-per-page" class="sr-only">10</label>
        <select
          class="form-control block w-full py-2 text-sm font-normal text-slate-500 bg-white bg-clip-padding border-none ring-2 ring-gray-300 rounded transition ease-in-out m-0 shadow focus:text-slate-700 focus:bg-slate-200 focus:ring-blue-secondary focus:ring-2 focus:outline-none"
          aria-label="item-per-page"
          v-model="params.limit"
          @change="handleLimit"
        >
          <option v-for="option in itemPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <slot />
    </div>
    <div class="align-middle min-w-full overflow-x-auto rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 border border-collapse" :style="tableStyle">
        <thead class="bg-slate-200 rounded-lg">
          <tr>
            <th
              v-for="field in fields"
              :key="field"
              :title="field.key"
              :width="field.width"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap"
            >
              <div class="flex cursor-pointer">
                <span class="mr-1">{{ field.label }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal divide-y divide-slate-300">
          <template v-if="hasItems">
            <slot :items="items" name="items" />
          </template>
          <template v-else>
            <tr>
              <td :colspan="fields.length">
                <div class="text-center p-12">
                  <template v-if="loading">
                    <h3 class="mb-3 mt-1 text-sm font-semibold text-gray-500">No item</h3>
                  </template>
                  <template v-else>
                    <CloudIcon class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mb-3 mt-1 text-sm font-semibold text-gray-500">No item</h3>
                  </template>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="text-center">
      <Pagination
        v-if="hasPagination"
        :current="params.page"
        :current-total="items.length"
        :per-page="params.limit"
        :total="total"
        @page-changed="handlePageChanged"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  SwitchVerticalIcon,
  ChevronDownIcon
} from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { CloudIcon, PlusCircleIcon, SearchIcon } from '@heroicons/vue/outline'
import Pagination from '@/components/Pagination.vue'
import components from '@/partials'

export default defineComponent({
  components: {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    CloudIcon,
    SwitchVerticalIcon,
    PlusCircleIcon,
    Pagination,
    SearchIcon,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
    Loading: components.Loading
    // CustomSearch: components.CustomSearch,
  },
  props: {
    name: {
      type: String,
      default: 'Data'
    },
    fields: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    paging: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Number,
      default: 1
    },
    hasCreateButton: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    subTitle: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props, { emit }) {
    const route = useRoute()
    const params = reactive({})

    const itemPerPageOptions = ref([10, 20, 50, 100])

    const total = computed(() => props.total || 0)
    const tableStyle = computed(() => ({ minHeight: `${props.height}px` }))
    const hasItems = computed(() => props.items.length > 0)

    const handlePageChanged = (page) => {
      params.page = page
      emit('on-page-change', page)
    }

    const handleLimit = (limit) => {
      const target = parseInt(limit.target.value)
      params.limit = target
      emit('set-limit', target)
    }

    const create = () => {
      emit('create')
    }

    onMounted(() => {})
    return {
      itemPerPageOptions,
      params,
      tableStyle,
      create,
      total,
      handlePageChanged,
      hasItems,
      handleLimit
    }
  }
})
</script>
