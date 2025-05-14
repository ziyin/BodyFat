<script setup>
import { ref } from 'vue'
import axios from 'axios'
import '@/assets/css/RecordView.css'
const baseURL = import.meta.env.VITE_HEALTHMANAGE_API
const weight = ref(null)
const bodyFat = ref(null)

const stage = ''
const remainingFat = ''
const reward = ''

const submitRecord = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.post(
      `${baseURL}/api/record`,
      {
        weight: weight.value,
        bodyFat: bodyFat.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = response.data
    stage.value = data.stage
    remainingFat.value = data.remainingFat
    reward.value = data.reward
    alert('提交成功！')
  } catch (error) {
    console.error('提交失敗：', error)
    alert('提交失敗，請稍後再試')
  }
}
</script>
<template>
  <div class="main-content">
    <div class="record-section">
      <h2>登錄紀錄</h2>
      <br>
      <div class="form-group">
        <label for="weight">體重：</label>
        <input type="number" id="weight" v-model="weight" />
      </div>
      <div class="form-group">
        <label for="bodyFat">體脂肪：</label>
        <input type="number" id="bodyFat" v-model="bodyFat" />
      </div>
      <button class="submit-btn" @click="submitRecord">Enter</button>
    </div>

    <hr class="divider" />

    <!-- 進度與獎勵 -->
    <div class="progress-section">
      <p>距離第 {{ stage }} 階段目標：還差 {{ remainingFat }}% 體脂</p>
      <p>獎勵：{{ reward }}</p>
    </div>
  </div>
</template>