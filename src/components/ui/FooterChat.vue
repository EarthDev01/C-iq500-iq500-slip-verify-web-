<script setup lang="ts">
import BaseInput from '../common/BaseInputMessage.vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const emit = defineEmits(['update:modelValue'])

const message = ref<string>('')
const imagesPreview = ref<string[]>([])
const filesImg = ref<File[]>([])
const previewVisible = ref(false)
const previewTitle = ref('รูปภาพที่แนบมา')
const imagePreview = ref<string>('')

const handleCancel = () => {
  previewVisible.value = false
}
const updateFiles = (files: File[]) => {
  filesImg.value = files
  imagesPreview.value = files.map((file) => URL.createObjectURL(file))
}

const openPreview = (url: string) => {
  previewVisible.value = true
  previewTitle.value = 'รูปภาพที่แนบมา'
  imagePreview.value = url
}

const handleDeleteImage = (index: number) => {
  imagesPreview.value.splice(index, 1)
  filesImg.value.splice(index, 1)
}
</script>
<template>
  <div
    v-if="imagesPreview.length"
    class="mt-2 flex max-h-[80px] w-full flex-wrap gap-4 overflow-y-auto p-2"
  >
    <div
      v-for="(url, index) in imagesPreview"
      @click="openPreview(url)"
      :key="index"
      class="relative"
    >
      <img
        :src="url"
        alt="Preview"
        class="size-[60px] cursor-pointer rounded border object-cover"
      />
      <CloseOutlined
        @click.stop="handleDeleteImage(index)"
        class="absolute top-0 right-0 rounded p-1 text-sm !font-semibold hover:bg-[var(--color-primary)]"
      />
    </div>

    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img :src="imagePreview" alt="" />
    </a-modal>
  </div>
  <div class="z-999 flex h-[65px] items-center border-t-2 border-[var(--Gray-Border)]">
    <BaseInput
      v-model="message"
      @update:files="updateFiles"
      placeholder="Message..."
      class="m-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-text)]"
    />
  </div>
</template>
