<template>
  <div class="form-group mb-6 text-sm">
    <label
      for="account_name"
      class="form-label inline-block mb-2 text-slate-700 font-medium"
      >{{ label }}</label
    >
    <input
      v-if="inputType === 'default'"
      @input="updateValue"
      :value="modelValue"
      :type="type"
      :required="isRequired"
      :id="id"
      :name="name"
      :aria-describedby="ariaDescribedby"
      :placeholder="placeholder"
      class="form-control block w-full px-3 py-2 text-slate-500 bg-white bg-clip-padding border-none ring-2 ring-gray-300 rounded transition ease-in-out m-0 shadow focus:text-slate-700 focus:bg-slate-200 focus:ring-blue-secondary focus:ring-2 focus:outline-none"
    />
    <textarea
      v-else
      @input="updateValue"
      :value="modelValue"
      :type="type"
      :required="isRequired"
      :id="id"
      :name="name"
      :aria-describedby="ariaDescribedby"
      :placeholder="placeholder"
      class="form-control block w-full px-3 py-2 text-slate-500 bg-white bg-clip-padding border-none ring-2 ring-gray-300 rounded-lg transition ease-in-out m-0 shadow focus:text-slate-700 focus:bg-slate-200 focus:ring-blue-secondary focus:ring-2 focus:outline-none"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    ariaDescribedby: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    inputType: {
      type: String,
      default: "input",
    },
  },
  setup(props, { emit }) {
    const route = useRoute();

    const updateValue = (event) => {
      emit("update:modelValue", event.target.value);
    };

    return {
      route,
      updateValue,
    };
  },
});
</script>
