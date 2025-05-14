<template>
  <div class="layout">
    <aside class="menu">
      <AppMenu :roles="roles" @navigate="handleNavigate" />
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppMenu from '@/views/MenuView.vue'
import { getRoleFromToken } from '@/utils/token'
import { useRouter } from 'vue-router'

const roles = getRoleFromToken(localStorage.getItem('token') || '')
const router = useRouter()

function handleNavigate(page: string) {
  router.push('/' + page)
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.menu {
  width: 220px;
  background: #fff;
  border-right: 1px solid #000;
  padding: 1rem;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .layout {
    flex-direction: column; /* 垂直排版 */
  }

  .menu {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #000;
  }

  .main-content {
    flex: 1;
    padding: 1rem;
  }
}
</style>
