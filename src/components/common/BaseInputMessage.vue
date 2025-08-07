<script setup lang="ts">
import { ref, watch } from 'vue'
import { PaperClipOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue/es/upload'

const emit = defineEmits(['update:modelValue', 'update:imageUpload', 'update:files'])
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
})

const inputValue = ref(props.modelValue)
const uploadedFiles = ref<File[]>([])

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  },
)

watch(inputValue, (val) => {
  emit('update:modelValue', val)
})

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  uploadedFiles.value.push(file)
  emit('update:files', uploadedFiles.value)

  return false
}

const handleFileChange = () => {}
</script>

<template>
  <div class="w-full">
    <form class="w-full max-w-sm">
      <div class="flex items-center gap-4 px-2 py-1">
        <input
          v-model="inputValue"
          class="mr-3 w-full appearance-none border-none bg-transparent leading-tight focus:outline-none"
          :type="type"
          :placeholder="placeholder"
        />
        <a-upload
          :show-upload-list="false"
          :multiple="true"
          :before-upload="beforeUpload"
          @change="handleFileChange"
        >
          <PaperClipOutlined
            class="cursor-pointer rounded p-2 !text-white hover:bg-[var(--color-primary)]/50"
          />
        </a-upload>
      </div>
    </form>
  </div>
</template>
