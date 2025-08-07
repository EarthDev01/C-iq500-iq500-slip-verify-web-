<script setup lang="ts">
import { type AllRoomPayload } from '@/types/room'
import useStoreApp from '@/stores/userStore'
import { ref, onMounted, computed } from 'vue'
import BaseInputSearch from '../common/BaseInputSearch.vue'
import { mockRooms } from '@/mock'

const emit = defineEmits(['stepChange'])
const roomChats = ref<AllRoomPayload[]>([])
const storeApp = useStoreApp()
const search = ref('')
const getAllBusiness = async () => {
  roomChats.value = mockRooms.payload
}

const selectBusiness = (code: string) => {
  emit('stepChange', 3)
}

const filteredRooms = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return roomChats.value
  return roomChats.value.filter((room) => room.last_message?.toLowerCase().includes(keyword))
})

onMounted(async () => {
  getAllBusiness()
})
</script>
<template>
  <div class="px-6 py-2">
    <div class="grid grid-cols-1 gap-2">
      <div class="relative">
        <BaseInputSearch v-model="search" placeholder="ค้นหาห้องแชท" />
      </div>

      <p class="!mt-4 text-lg">Rooms</p>
      <div
        v-for="data in filteredRooms"
        @click="selectBusiness(data.id)"
        :key="data.id"
        class="flex cursor-pointer items-center rounded-lg bg-[var(--color-accent)]/15 py-2 pl-6 hover:bg-[var(--color-accent)]/40"
      >
        <p class="text-white">{{ data.last_message }}</p>
      </div>
    </div>
  </div>
</template>
