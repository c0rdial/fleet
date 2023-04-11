<template>
  <div class="bg-white pt-6 flex items-center justify-between">
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasPrev"
        @click.prevent="changePage(prevPage)"
      >
        prev
      </button>
      <button
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasNext"
        @click.prevent="changePage(nextPage)"
      >
        next
      </button>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="my-3 flex justify-between items-end">
          <p class="text-sm text-slate-500">
            Showing
            <span class="font-medium">{{ currentTotal }}</span>
            of
            <span class="font-medium">{{ total }}</span>
            results
          </p>
        </div>
      </div>
      <div>
        <nav
          aria-label="Pagination"
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        >
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-gray-200 text-sm font-medium text-slate-600 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!hasPrev"
            @click.prevent="changePage(prevPage)"
          >
            <span class="sr-only"> prev </span>
            <ChevronLeftIcon aria-hidden="true" class="h-5 w-5" />
          </button>
          <a
            v-if="hasFirst"
            class="bg-slate-300 border-gray-300 text-slate-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            href="#"
            @click.prevent="changePage(1)"
          >
            1
          </a>
          <span
            v-if="hasFirst"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900"
          >
            ...
          </span>
          <a
            v-for="page in pages"
            :key="page"
            :class="[
              {
                'z-10 bg-sky-500 text-sky-500 border-blue-secondary ': current == page
              },
              'bg-white hover:text-white transition-all duration-300 ease-in-out border-gray-300 text-slate-500 hover:bg-sky-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            ]"
            href="#"
            @click.prevent="changePage(page)"
          >
            {{ page }}
          </a>
          <span
            v-if="hasLast"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900"
          >
            ...
          </span>
          <a
            v-if="hasLast"
            class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            href="#"
            @click.prevent="changePage(totalPages)"
          >
            {{ totalPages }}
          </a>
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!hasNext"
            @click.prevent="changePage(nextPage)"
          >
            <span class="sr-only"> next </span>
            <ChevronRightIcon aria-hidden="true" class="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    currentTotal: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    pageRange: {
      type: Number,
      default: 2
    },
    textBeforeInput: {
      type: String,
      default: 'Go to page'
    },
    textAfterInput: {
      type: String,
      default: 'Go'
    }
  },
  emits: ['page-changed'],
  data() {
    return {
      input: ''
    }
  },
  computed: {
    pages() {
      const pages = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangeStart() {
      const start = this.current - this.pageRange
      return start > 0 ? start : 1
    },
    rangeEnd() {
      const end = this.current + this.pageRange
      return end < this.totalPages ? end : this.totalPages
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage() {
      return this.current + 1
    },
    prevPage() {
      return this.current - 1
    },
    hasFirst() {
      return this.rangeStart !== 1
    },
    hasLast() {
      return this.rangeEnd < this.totalPages
    },
    hasPrev() {
      return this.current > 1
    },
    hasNext() {
      return this.current < this.totalPages
    }
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  }
})
</script>
