<template>
  <div class="menu-wrapper">
    <button @click="$emit('navigate', 'record')">登錄紀錄</button>
    <button @click="$emit('navigate', 'history')">查看紀錄</button>
    <button v-if="canAccess('goalManage')" @click="$emit('navigate', 'goalManage')">目標管理</button>
    <button v-if="canAccess('user')" @click="$emit('navigate', 'user')">使用者管理</button>
    <button class="logout-button" @click="logout">登出</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import '@/assets/css/MenuView.css'

const router = useRouter()
const props = defineProps<{
  roles: string[]
}>()

function logout() {
  localStorage.removeItem('token') 
  router.push('/login')              
}

function canAccess(page: string): boolean {
  const rolePermissionMap: Record<string, string[]> = {
    goalManage : ['healthcheckAdmin','serverAdmin'],
    user: ['serverAdmin']
  }

  const allowedRoles = rolePermissionMap[page] || []
  return props.roles.some(role => allowedRoles.includes(role))
}
</script>