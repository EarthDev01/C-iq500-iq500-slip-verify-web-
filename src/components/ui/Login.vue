<script setup lang="ts">
import { login } from '@/service/authService'

import { ref, reactive } from 'vue'
interface FormState {
  email: string
  password: string
}

const emit = defineEmits(['stepChange'])
const form = reactive<FormState>({
  email: '',
  password: '',
})

const handleLogin = async () => {
  const res = await login(form)
  if (res && res.code == 0) {
    localStorage.setItem('token', res.payload)
    emit('stepChange', 2)
  } else {
    form.email = ''
    form.password = ''
  }
}

const onFinish = (values: any) => {
  handleLogin()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <div class="h-full w-full px-4">
    <div class="label-white mt-[-40px] flex h-full flex-col items-center justify-center">
      <img class="mx-auto mb-[40px] h-[50px]" src="/icon/aim.png" />
      <a-form
        :model="form"
        name="login "
        class="w-[75%]"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="email"
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-input v-model:value="form.email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="form.password" />
        </a-form-item>
        <a-form-item class="!pt-5" :wrapper-col="{ offset: 6 }">
          <a-button
            class="!h-[35px] !w-[150px] !rounded-full !border-0 !bg-[var(--color-accent-dark)] !text-white"
            html-type="submit"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
