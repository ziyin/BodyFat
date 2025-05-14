<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import '@/assets/css/LoginView.css'
const baseURL = import.meta.env.VITE_AUTHORIZATION_URL

const account = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()
const handleLogin = async () => {
  try {
    const response = await axios.post(`${baseURL}/api/authorization/login`, {
      account : account.value,
      password: password.value
    })

    const result = response.data
    
    if (result.Success) {
      const token = result.Message
      localStorage.setItem('token', token)
      errorMsg.value=''
      router.push('/')
    }
    else {
      errorMsg.value = result.Message || '登入失敗'
    }
  } catch (error) {
    errorMsg.value = error?.response?.data?.Message || '登入時發生錯誤'
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="login-container">
      <div class="image-box"></div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>帳號:</label>
          <input type="text" v-model="account" />
        </div>
        <div class="form-group">
          <label>密碼:</label>
          <input type="password" v-model="password" />
        </div>
        <button type="submit" class="login-btn">登入</button>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

