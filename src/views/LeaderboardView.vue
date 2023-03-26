<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import { onMounted, ref } from 'vue';
import * as scoreApi from '@/api/score'
import IconLoader from '@/components/icons/IconLoader.vue';
import type { Score } from '@/types/Score' 

const mode = ref('lari')
const map = ref('all')

const leaderboards = ref<Score[]>([])
const loading = ref(false)

const getScores = () => {
  loading.value = true
  scoreApi.getScores(map.value, mode.value)
    .then(data => {
      // Parse data
      
      leaderboards.value = data.data?.map(key => {
        return {
          map: key.map,
          mode: key.mode,
          score: key.score,
          username: key.metadata.username,
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
  getScores()
})

</script>
<template>
  <div class="about | w-full">
    <AppHeader></AppHeader>
    <div class="leaderboard-area | min-h-[500px] max-w-[350px] mx-auto border-2 border-dark-500 border-solid">
      <div class="leaderboard-options p-2 grid grid-cols-2 gap-3">
        <div class="form-group flex items-center">
          <label for="mode" class="mr-2">Mode:</label>
          <FormSelect :options="[
            {text: 'Kejar-kejaran', value: 'kejar'},
            {text: 'Lari', value: 'lari'},
          ]" name="mode" v-model="mode" label="" @update:model-value="getScores">
          </FormSelect>
        </div>
        <div class="form-group flex items-center">
          <label for="map" class="mr-2">Map:</label>
          <FormSelect :options="[
            {text: 'All', value: 'all'},
            {text: 'Dust', value: 'dust'},
          ]" name="map" v-model="map" label="" @update:model-value="getScores">
          </FormSelect>
        </div>
      </div>
      <div class="border-b border-solid border-black-100"></div>
      <table class="table" v-if="!loading">
        <thead>
          <tr>
            <th>#</th>
            <th class="text-left px-3">Username</th>
            <th class='text-left'>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(leaderboard, i) in leaderboards" :key="i">
            <td class="text-center">{{ i+1 }}</td>
            <td class="px-3">{{ leaderboard.username }}</td>
            <td>{{ leaderboard.score }}</td>
          </tr>
        </tbody>
        
      </table>
      <div class="flex justify-center mt-3" v-if="loading">
        <IconLoader></IconLoader>
      </div>
    </div>
  </div>
</template>

