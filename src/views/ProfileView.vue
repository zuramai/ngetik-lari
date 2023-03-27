<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import { onMounted, ref } from 'vue';
import * as scoreApi from '@/api/score'
import IconLoader from '@/components/icons/IconLoader.vue';
import type { Score } from '@/types/Score' 
import { useAuth } from '@/composables/useAuth';
import {formatDate,formatDateWithTime} from '@/utils/date'
import { watch } from 'vue';

const mode = ref('lari')
const map = ref('all')
const auth = useAuth()
const scores = ref<Omit<Score, 'username'>[]>([])
const loading = ref(false)

const getScores = () => {
  loading.value = true
  scoreApi.getScoresFromUser(auth.currentUser.value?.id!)
    .then(data => {
      // Parse data
      
      scores.value = data.data?.map(key => {
        return {
          map: key.map,
          mode: key.mode,
          score: key.score,
          created_at: key.created_at,
        }
      }) || []
      loading.value = false
    }).catch(err => {
      loading.value = false
      alert("Error: "+err)
    })
}

onMounted(() => {
  watch(() => auth.currentUser.value, () => {
    getScores()
  })
})

</script>
<template>
  <div class="profile | w-full">
    <AppHeader></AppHeader>
    <section class="mt-3 min-h-[500px] max-w-[450px] mx-auto">
      <div class="profile-data text-center mb-3" v-if="auth.currentUser.value">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <h1>{{ auth.currentUser.value?.user_metadata?.username }}</h1>
        <p class="text-sm text-gray-700">Joined {{ formatDate(auth.currentUser.value.created_at) }}</p>
      </div>
      <h3 class="mb-3">Latest Scores</h3>
        <table class="table table-border">
            <tr>
              <th>Date</th>
                <th>Mode</th>
                <th>Map</th>
                <th>Score</th>
            </tr>
            <tr v-for="score in scores" :key='score.created_at' class='text-center'>
              <td>{{ formatDateWithTime(score.created_at) }}</td>
              <td>{{ score.mode }}</td>
              <td>{{ score.map }}</td>
              <td>{{ score.score }}</td>
            </tr>
        </table>
    </section>
  </div>
</template>
<style>
.table {
  border-collapse: collapse;
}
.table-border tr td, .table-border tr th {
  border-bottom: 1px solid black;
  
}
</style>

