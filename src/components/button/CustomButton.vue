<template>
  <div class="w-full sm:w-auto">
    <button v-if="buttonType === 'submit'" :class="classes" type="submit" :disabled="isDisabled">
      <slot />
    </button>
    <router-link
      v-else-if="buttonType === 'link'"
      :class="classes"
      :disabled="isDisabled"
      :to="href"
    >
      <slot />
    </router-link>
    <button v-else type="button" :class="classes" :disabled="isDisabled" @click="onClickButton">
      <slot />
    </button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'button'
    },
    classes: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    ariaDescribedby: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    saveLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const route = useRoute()

    const onClickButton = () => {
      emit('on-click-button')
    }

    return {
      route,
      onClickButton
    }
  }
})
</script>
<style lang=""></style>
