<script setup lang="ts">
import { ref } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
const emit = defineEmits(['stepChange'])
const prop = defineProps<{
  step: number
}>()

const stepBack = ref(1)
const handleBack = () => {
  if (prop.step > 1) {
    stepBack.value = prop.step - 1
    emit('stepChange', stepBack.value)
  }
}
</script>
<template>
  <div class="h-[65px] rounded-t-xl" :class="prop.step == 3 && 'bg-[var(--color-primary)]/60'">
    <div class="relative flex h-full w-full items-center px-4">
      <div class="flex w-full items-center !justify-between">
        <div @click="handleBack()" class="absolute ml-1 cursor-pointer hover:scale-110">
          <LeftOutlined v-if="prop.step > 1" />
        </div>
        <div class="flex w-full justify-center text-2xl">
          <span v-if="prop.step == 2">Rooms List</span>
          <span v-if="prop.step == 3">AI Messenger </span>
        </div>
        <p
          v-if="prop.step == 1"
          @click="emit('stepChange', 0)"
          class="cursor-pointer text-end underline"
        >
          register
        </p>
        <p
          v-if="prop.step == 0"
          @click="emit('stepChange', 1)"
          class="cursor-pointer text-end underline"
        >
          Login
        </p>
      </div>
    </div>
  </div>
</template>
