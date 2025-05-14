<template>
  <div class="menu-wrapper">
    <button @click="$emit('navigate', 'record')">登錄紀錄</button>
    <button @click="$emit('navigate', 'history')">查看紀錄</button>
    <button v-if="canAccess('goalManage')" @click="$emit('navigate', 'goal-manage')">目標管理</button>
    <button v-if="canAccess('user')" @click="$emit('navigate', 'user')">使用者管理</button>
    <button class="logout-button" @click="logout">登出</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

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

<style scoped>
.menu-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
}

button {
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
}

.logout-button {
  margin-top: auto;
  background-color: #f44336;
  color: white;
  font-weight: bold;
  border: none;
}

@media (max-width: 768px) {
  .menu-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  button {
    width: auto; /* ✅ 不要 100%，讓它自然大小 */
    flex-shrink: 0;
  }
}
</style>
