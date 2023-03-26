<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
import FormSelect from '@/components/forms/FormSelect.vue';
import { onMounted, ref } from 'vue';

const mode = ref('kejar')
const map = ref('all')

const leaderboards = ref([])

onMounted(() => {
  
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
            {text: 'Cepet-cepetan', value: 'cepet'},
          ]" name="mode" v-model="mode" label="">
          </FormSelect>
        </div>
        <div class="form-group flex items-center">
          <label for="map" class="mr-2">Map:</label>
          <FormSelect :options="[
            {text: 'All', value: 'all'},
            {text: 'Dust', value: 'dust'},
          ]" name="map" v-model="map" label="">
          </FormSelect>
        </div>
      </div>
      <div class="border-b border-solid border-black-100"></div>
      <table class="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Username</td>
            <td>Score</td>
          </tr>
          <tbody>
            <tr v-for="(leaderboard, i) in leaderboards" :key="i">
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </thead>
        
      </table>
    </div>
  </div>
</template>

