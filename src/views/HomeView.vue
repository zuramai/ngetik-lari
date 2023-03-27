<script lang="ts" setup>
import { Game } from '@/app/Game';
import LoginModal from '@/components/auth/LoginModal.vue';
import GameLogo from '@/components/GameLogo.vue'
import  ModalDialog from '@/components/ModalDialog.vue';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useAuth } from '@/composables/useAuth'
import RegisterModal from '@/components/auth/RegisterModal.vue';
import * as scoreApi from '@/api/score'
import IconLoader from '@/components/icons/IconLoader.vue';
import {useWords} from '@/composables/useWords'
import GameOptionItem from '@/components/game/GameOptionItem.vue';
import type {GameOptions} from '@/types/Game'

import ImageDog from '@/assets/images/characters/dog.png'
import ImagePig from '@/assets/images/characters/pig.png'


const auth = useAuth()
const canvas = ref()
const game = ref<Game>(new Game())
const words = useWords()

type Screen = 'home' | 'game' | 'options'

const screen = ref<Screen>('home')
const gameOptions = reactive<GameOptions>({
  character: 'dog',
  map: 'dust',
  mode: 'lari'
})
const finishTime = ref("00:00")
const finishModalOpen = ref(false)
const loginModalOpen = ref(false)
const registerModalOpen = ref(false)

game.value.onFinish(() => {
  game.value?.timer.stop()
  finishTime.value = game.value?.timer.getTimeString()!
  finishModalOpen.value = true
})

const isScoreSaved = ref(false)
const restart = () => {
  game.value?.restart()
  isScoreSaved.value = false
  finishModalOpen.value = false 
}

const startGame = async () => {
  screen.value = 'game'
  game.value?.init(canvas.value, gameOptions)
  await words.fetchWords()
  game.value?.start()
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

      <!-- Game screen -->
      <canvas v-show="screen == 'game'" id="canvas" ref="canvas" width="640" height="640"></canvas>
      
      <!-- Game home page -->
      <div v-if="screen == 'home'" class="game-home absolute inset-0 text-center flex items-center w-full">
        <div class="game-home__content w-[400px] mx-auto flex flex-col">
          <GameLogo/>
          <div class="menu">
              <button class="btn btn-lg w-full mb-3" @click="screen = 'options'">Play</button>
              <router-link class="btn btn-lg" to="/leaderboard" role="button">Leaderboard</router-link>
          </div>
          <p class="self-end mt-5">
            <a href="https://github.com/zuramai/ngetik-lari" target="_blank">
              <div class="i-mdi-github text-xl mr-2" ></div>
            </a>
            <span>Created by <a href="https://saugi.me" target="_blank" class="text-link">Saugi</a></span>
          </p>
        </div>
      </div>

      <!-- Game options -->
      <div v-else-if="screen == 'options'" class="game-options p-10 text-xl">
        <h1 class="text-cursive text-orange-500 mb-5">Choose</h1>
        <table>
          <tr>
            <td>Character</td>
            <td class="flex gap-3">
              <GameOptionItem :imageSrc="ImageDog" value="dog" name="character" v-model="gameOptions.character"></GameOptionItem>
              <GameOptionItem :imageSrc="ImagePig" value="pig" name="character" v-model="gameOptions.character"></GameOptionItem>
            </td>
          </tr>
          <tr>
            <td>Map</td>
            <td>
              <GameOptionItem  value="dust" name="map" v-model="gameOptions.map"></GameOptionItem>
            </td>
          </tr>
          <tr>
            <td>Mode</td>
            <td class="flex gap-3">
              <GameOptionItem  value="lari" name="mode" v-model="gameOptions.mode"></GameOptionItem>
              <GameOptionItem  value="kejar" name="mode" v-model="gameOptions.mode" :disabled="true"></GameOptionItem>
            </td>
          </tr>
        </table>
        <button class="btn btn-lg w-full mb-3 text-xl" @click="startGame">Start Game</button>
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
.logo h1 {
    background: linear-gradient(to bottom, orange, red);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
}
.game-home, .game-options {
  background-color: var(--color-primary-light);
  height: 640px;
}
.game-options table tr td:first-child {
  width: 13rem;
}
.game-options table tr td {
  padding: 1rem 0;
}
</style>