<script lang="ts" setup>
import { Game } from '@/app/Game';
import GameLogo from '@/components/GameLogo.vue'
import  ModalDialog from '@/components/ModalDialog.vue';
import { onMounted, ref, watch } from 'vue';

const canvas = ref()
const game = ref<Game>()

const showHomeScreen = ref(true)
const finishTime = ref("00:00")
const finishModalOpen = ref(false)

onMounted(() => {
  game.value = new Game(canvas.value)

  game.value.onFinish(() => {
    game.value?.timer.stop()
    finishTime.value = game.value?.timer.getTimeString()!
    finishModalOpen.value = true
  })

  // if(!withHomeScreen) game.value.start()
})

const restart = () => {
  game.value?.restart()
  finishModalOpen.value = false 
}

const startGame = () => {
  game.value?.start()
  showHomeScreen.value = false
}

</script>
<template>
  <main class="container-sm mx-auto">
    <div class="game-area relative">
      <canvas id="canvas" ref="canvas" width="640" height="640"></canvas>
      
      <div v-if="showHomeScreen" class="game-home absolute inset-0 text-center flex items-center w-full">
        <div class="game-home__content w-[400px] mx-auto flex flex-col">
          <GameLogo/>
          <div class="menu">
              <button class="btn w-full mb-3" @click="startGame">Play</button>
              <router-link class="btn" to="/leaderboard" role="button">Leaderboard</router-link>
          </div>
          <p class="self-end mt-5">Created by <a href="https://saugi.me" target="_blank" class="text-link">Saugi</a></p>
        </div>
      </div>
    </div>
    <ModalDialog v-model:open="finishModalOpen">
      <h1 class="text-orange-500 text-center text-cursive">You Finished!</h1>
      <p v-if="game" class="text-center">Time: {{ game?.timer.getTimeString() }}</p>

      <div class="buttons flex gap-3 mt-5">
        <button class="btn text-white flex-1">Save Score</button>
        <button class="btn btn-blue text-white flex-1" @click="restart">Restart</button>
      </div>
    </ModalDialog>
  </main>
</template>

<style>
.logo {
    background: linear-gradient(to bottom, orange, red);
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.game-home {
  background-color: #faca96;
}
</style>