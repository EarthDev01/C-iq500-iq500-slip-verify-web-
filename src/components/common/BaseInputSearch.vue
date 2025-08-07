<script setup lang="ts">
import { ref, watch } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  size: {
    type: String,
    default: 'large',
  },
})
const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  },
)
watch(inputValue, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div class="w-full">
    <form class="w-full max-w-sm">
      <div class="flex items-center py-2 text-black">
        <a-input
          v-model:value="inputValue"
          :placeholder="placeholder"
          :type="type"
          :size="size"
          class="w-full"
        >
          <template #suffix><SearchOutlined /></template>
        </a-input>
      </div>
    </form>
  </div>
</template>
