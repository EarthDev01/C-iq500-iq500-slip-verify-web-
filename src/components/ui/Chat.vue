<script setup lang="ts">
import { type ChatMessage } from '@/types/chat'
import { ref, onMounted } from 'vue'
import { mockMessage } from '@/mock'

const message = ref<ChatMessage[]>([])

const fetchMessages = async (roomID: string) => {
  message.value = mockMessage.payload
}

onMounted(() => {
  const roomID = localStorage.getItem('roomChatID')
  if (roomID) {
    fetchMessages(roomID)
  }
})
</script>

<template>
  <div class="chat-container bg-[var(--color-secondary)]/50 px-4 py-2">
    <div
      v-for="msg in message"
      :key="msg.message"
      :class="['my-2 mt-2 flex', msg.type === 'reply' ? 'justify-end' : 'justify-start']"
    >
      <div
        :class="[
          msg.type === 'reply'
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-accent-dark)] text-white',
          'max-w-[80%] rounded-2xl px-4 py-2 break-all text-black',
        ]"
      >
        <p>{{ msg.message }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.chat-container {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* ซ่อน scrollbar ทุกเบราว์เซอร์ */
  /* Firefox */ /* IE 10+ */

  /* scrollbar-width: none; */
  /* -ms-overflow-style: none; */
}
/* Chrome, Safari, Edge */
.chat-container::-webkit-scrollbar {
  display: none;
}
</style>
