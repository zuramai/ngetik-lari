<script lang="ts" setup>
import { Game } from '@/app/Game';
import GameLogo from '@/components/GameLogo.vue'
import { onMounted, ref, watch } from 'vue';

const canvas = ref()
const game = ref<Game>()

const withHomeScreen = false

onMounted(() => {
  game.value = new Game(canvas.value)
  if(!withHomeScreen) game.value.start()
})


</script>
<template>
  <main class="container-sm mx-auto">
    <div class="game-area relative">
      <canvas id="canvas" ref="canvas" width="640" height="640"></canvas>
      
      <div v-if="withHomeScreen" class="game-home absolute inset-0 text-center flex justify-center flex-col w-[400px] mx-auto">
        <GameLogo/>
        <div class="menu">
            <button class="btn w-full mb-3">Play</button>
            <router-link class="btn" to="/leaderboard" role="button">Leaderboard</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.logo {
    background: linear-gradient(to bottom, orange, red);
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>