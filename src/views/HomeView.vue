<script lang="ts" setup>
import { Game } from '@/app/Game';
import { onMounted, ref, watch } from 'vue';

const canvas = ref()
const game = ref<Game>()

onMounted(() => {
  game.value = new Game(canvas.value)
})


</script>
<template>
  <main class="container-sm mx-auto">
    <div class="game-area relative">
      <canvas id="canvas" ref="canvas" width="640" height="640"></canvas>
      
      <div class="game-home absolute inset-0 text-center flex justify-center flex-col w-[400px] mx-auto">
        <div class="logo mb-5">
            <h1 class="text-5xl uppercase text-cursive">Ngetik Lari</h1>
        </div>
        <div class="menu">
            <button class="btn w-full mb-3">Play</button>
            <router-link class="btn" to="/leaderboard" role="button">Leaderboard</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.game-home .logo {
    background: linear-gradient(to bottom, orange, red);
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.game-area {
  background-color: rgba(243, 178, 93, 0.37);
}
</style>