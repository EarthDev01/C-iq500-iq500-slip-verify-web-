<script setup lang="ts">
import HeaderChat from '@/components/ui/HeaderChat.vue'
import Chat from '@/components/ui/Chat.vue'
import FooterChat from '@/components/ui/FooterChat.vue'

import Loading from '../components/ui/Loading.vue'
import Login from '@/components/ui/Login.vue'
import Register from '@/components/ui/Register.vue'
import RoomChats from '../components/ui/RoomChats.vue'

import { ref } from 'vue'
const showChat = ref(false)
const step = ref<number>(1)
const toggleChat = () => {
  step.value = -1
  showChat.value = !showChat.value
  setTimeout(() => {
    const token = localStorage.getItem('token')
    if (token) {
      step.value = 2
    } else {
      step.value = 1
    }
  }, 1000)
}

const stepChange = (newStep: number) => {
  console.log('Step changed to:', newStep)
  step.value = newStep
}
</script>
<template>
  <div class="absolute right-0 bottom-0 p-4">
    <div
      class="flex size-[60px] cursor-pointer items-center justify-center rounded-full hover:shadow-2xl"
      @click="toggleChat"
    >
      <a-avatar class="!size-full" src="/icon/logo_bubble.png" />
    </div>
  </div>
  <Transition name="chat-fade" appear>
    <div v-if="showChat" class="absolute right-0 bottom-14 m-4">
      <div
        class="relative mb-4 flex h-[650px] w-[400px] flex-col overflow-hidden rounded-xl border border-[var(--Gray-Border)] shadow-2xl"
        style="
          background-image: linear-gradient(
            to left bottom,
            #688399,
            #566c82,
            #44576b,
            #334255,
            #222e40,
            #1a2535,
            #131c2b,
            #0b1321,
            #09111e,
            #070e1b,
            #040b18,
            #010715
          );
        "
      >
        <header-chat :step="step" @step-change="stepChange" />
        <div class="scroll-hide z-99 flex-1 overflow-y-auto">
          <Transition name="chat-fade" mode="out-in">
            <component
              :is="
                step === -1
                  ? Loading
                  : step === 0
                    ? Register
                    : step === 1
                      ? Login
                      : step === 2
                        ? RoomChats
                        : Chat
              "
              @step-change="stepChange"
              key="step"
            />
          </Transition>
        </div>
        <footer-chat v-if="step > 2" />
      </div>
    </div>
  </Transition>
</template>
<style scoped>
/* Animation */
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
