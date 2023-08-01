<template>
    <tr class="">
      <td class="px-6 py-4">{{ index + 1 }}</td>
      <!-- <td class="px-6 py-4">{{ item.costCenter }}</td>
      <td class="px-6 py-4">{{ item.reqNo }}</td>
      <td class="px-6 py-4">{{ item.class }}</td> -->
      <td class="px-6 py-4">{{ item.make }}</td>
      <td class="px-6 py-4">{{ item.model }}</td>
      <td class="px-6 py-4">{{ item.color }}</td>
      <!-- <td class="px-6 py-4">{{ item.fuelType }}</td> -->
      <td class="px-6 py-4">{{ item.engineNo }}</td>
      <td class="px-6 py-4">{{ item.manuYear }}</td>
      <td class="px-6 py-4">{{ formatDate(item.reqDate) }}</td>
      <td class="px-6 py-4">{{ item.status }}</td>
  
      <td class="flex justify-around px-6 py-4">
        <a
          class="inline-flex items-center text-sky-700 hover:text-sky-900 cursor-pointer mr-5"
          @click="view"
        >
          <EyeIcon class="h-5 w-5" />
        </a>
        <a
          class="inline-flex items-center text-sky-700 hover:text-sky-900 cursor-pointer mr-5"
          @click="edit"
        >
          <PencilIcon class="h-5 w-5" />
        </a>
        <a
          class="inline-flex items-center text-sky-700 hover:text-sky-900 cursor-pointer mr-5"
          @click="remove"
        >
          <TrashIcon class="h-5 w-5" />
        </a>
      </td>
    </tr>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/solid'
  
  export default defineComponent({
    components: {
      EyeIcon,
      PencilIcon,
      TrashIcon
    },
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      index: {
        type: Number,
        default: 0
      }
    },
    setup(props, context) {
      const view = () => {
        context.emit('view', props.item)
      }
  
      const edit = () => {
        context.emit('edit', props.item)
      }
  
      const remove = () => {
        context.emit('remove', props.item)
      }
  
      const formatDate = (date) => {
        if (!date) return ''
  
        const dateArr = date.split('T')
        return dateArr[0]
      }
  
      return {
        view,
        edit,
        remove,
        formatDate
      }
    }
  })
  </script>
  