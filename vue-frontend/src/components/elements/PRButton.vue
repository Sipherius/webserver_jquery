<script setup lang="ts">
import { computed, type ComputedRef, ref } from 'vue';

const props = withDefaults(defineProps<{
  tag: string,
  disabled: boolean,
  variant: string,
  variantType: string,
  size: string,
  rounded: string,
  type: string,
  to?: string,
}>(), {
  tag: 'button',
  disabled: false,
  variant: 'primary',
  variantType: 'normal',
  size: 'normal',
  rounded: 'medium',
  type: 'button',
})

let loading = ref(false);
let disableButton = ref(props.disabled);

const startLoading = () => {
  loading.value = true;
  disableButton.value = true;
}

const stopLoading = () => {
    loading.value = false;
    disableButton.value = false;
}

defineExpose({
  startLoading,
  stopLoading,
});


const btnClass: ComputedRef<object> = computed(() => {
  return {
    "base-spinner": loading.value === true,
    "cursor-not-allowed": disableButton.value === true,
    "base-button inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2": true,

    "rounded-lg": props.rounded === "medium",
    "rounded-full": props.rounded === "large",

    "px-6 py-3": props.size == "xlarge",
    "px-4 py-2": props.size == "large",
    "px-3 py-1": props.size == "normal",
    "px-2 py-0": props.size == "small"
  };
});

const colorVariants: ComputedRef<string> = computed(() => {
  switch (props.variant) {
    case "primary":
      switch (props.variantType) {
        case "normal":
          switch (disableButton.value) {
            case true:
              return "border-blue-300 bg-blue-300 text-white";
            default:
              break;
          }
          return "border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white";
        case "outline":
          return "border-gray-200 text-blue-500 hover:text-blue-700";
        default:
          break;
      }
      break;
    
    case "danger":
      switch (props.variantType) {
        case "normal":
          switch (disableButton.value) {
            case true:
              return "border-red-300 bg-red-300 text-white";
            default:
              break;
          }
          return "border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white";
        case "outline":
          return "border-gray-200 text-red-500 hover:text-red-600";
        default:
          break;
      }
      break;

    case "warning":
      switch (props.variantType) {
        case "normal":
          return "border-orange-600 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white";
        default:
          break;
      }
      break;

    case "success":
      switch (props.variantType) {
        case "normal":
          switch (disableButton.value) {
            case true:
              return "border-green-300 bg-green-300 text-white";
            default:
              break;
          }
          return "border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white";
        case "outline":
          return "border-2 border-gray-200 text-green-500 hover:text-green-700";
        default:
          break;
      }
      break;

    case "white":
      switch (props.variantType) {
        case "normal":
          return "border-white bg-white text-blue-600 hover:text-blue-800";
        default:
          break;
      }
      break;

    case "secondary":
      switch (props.variantType) {
        case "outline":
          return "border-gray-300 text-gray-500 hover:text-blue-500";
        default:
          break;
      }
      break;

    default:
      break;
  }
  return '';
});
</script>

<template>
  <component
        :is="tag"
        :type="type"
        :disabled="disableButton"
        :class="[btnClass, colorVariants]"
        :variant="variant"
        :variant-type="variantType"
        :size="size"
        :href="to"
    >
        <slot></slot>
    </component>
</template>

<style scoped>
</style>
