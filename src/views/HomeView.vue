<script lang="ts" setup>
import { Game } from '@/app/Game';
import LoginModal from '@/components/auth/LoginModal.vue';
import GameLogo from '@/components/GameLogo.vue'
import  ModalDialog from '@/components/ModalDialog.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useAuth } from '@/composables/useAuth'
import RegisterModal from '@/components/auth/RegisterModal.vue';
import * as scoreApi from '@/api/score'
import IconLoader from '@/components/icons/IconLoader.vue';
import {useWords} from '@/composables/useWords'


const auth = useAuth()
const canvas = ref()
const game = ref<Game>()
const words = useWords()

const showHomeScreen = ref(true)
const finishTime = ref("00:00")
const finishModalOpen = ref(false)
const loginModalOpen = ref(false)
const registerModalOpen = ref(false)

onMounted(() => {
  game.value = new Game(canvas.value)

  game.value.onFinish(() => {
    game.value?.timer.stop()
    finishTime.value = game.value?.timer.getTimeString()!
    finishModalOpen.value = true


  })

  // if(!withHomeScreen) game.value.start()
})

const isScoreSaved = ref(false)
const restart = () => {
  game.value?.restart()
  isScoreSaved.value = false
  finishModalOpen.value = false 
}

const startGame = async () => {
  await words.fetchWords()
  game.value?.start()
  showHomeScreen.value = false
}

const saveScoreLoading = ref(false)
const saveScore = async () => {
  const userId = auth.currentUser.value?.id
  const seconds = game.value?.timer.time

  const error = await scoreApi.saveScore(userId!, game.value?.mode!, game.value?.map?.name!, seconds!)
  if(!error) {
    isScoreSaved.value = true
    alert('Score saved')
  } 
}

const user = computed(() => auth.currentUser)
auth.getUser()
const onAuthSuccess = () => {
  auth.getUser()
  console.log(user.value)
}

onUnmounted(() => {
  game.value?.stop()
})
</script>
<template>
  <main class="container-sm mx-auto">
    <div class="game-area relative">
      
      <div class="game-area__header absolute top-3 z-2  w-full pr-4 flex justify-end">
        <router-link v-if="!user.value"  to="#" @click.prevent="loginModalOpen = true" class="flex items-center gap-1">
          <div class="i-mdi-user"></div>
          <span>Login</span>
        </router-link>
        <router-link v-else to="/profile" class="flex items-center gap-1">
          <div class="i-mdi-user"></div>
          <span>{{ user.value.user_metadata?.username }}</span>
        </router-link>
      </div>

      <canvas id="canvas" ref="canvas" width="640" height="640"></canvas>
      
      <div v-if="showHomeScreen" class="game-home absolute inset-0 text-center flex items-center w-full">
        <div class="game-home__content w-[400px] mx-auto flex flex-col">
          <GameLogo/>
          <div class="menu">
              <button class="btn btn-lg w-full mb-3" @click="startGame">Play</button>
              <router-link class="btn btn-lg" to="/leaderboard" role="button">Leaderboard</router-link>
          </div>
          <p class="self-end mt-5">Created by <a href="https://saugi.me" target="_blank" class="text-link">Saugi</a></p>
        </div>
      </div>
    </div>
    <ModalDialog v-model:open="finishModalOpen">
      <h1 class="text-orange-500 text-center text-cursive">You Finished!</h1>
      <p v-if="game" class="text-center">Time: {{ game?.timer.getTimeString() }}</p>

      <div class="buttons flex gap-3 mt-5">
        <button @click="saveScore" class="btn text-white flex-1" :disabled="saveScoreLoading" v-if="!isScoreSaved">
          <IconLoader v-if="saveScoreLoading"></IconLoader>
          Save Score
        </button>
        <button class="btn btn-blue text-white flex-1" @click="restart">Restart</button>
      </div>
    </ModalDialog>
    <LoginModal v-model:open="loginModalOpen" @success="onAuthSuccess" @click:register="() => {loginModalOpen = false; registerModalOpen = true}"></LoginModal>
    <RegisterModal v-model:open="registerModalOpen" @success="onAuthSuccess" @click:login="() => {loginModalOpen = true; registerModalOpen = false}"></RegisterModal>
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