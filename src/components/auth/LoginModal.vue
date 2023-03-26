<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue';
import FormInput from '../forms/FormInput.vue';
import ModalDialog from '../ModalDialog.vue';
import { useAuth } from '@/composables/useAuth'
import IconLoader from '../icons/IconLoader.vue';

const auth = useAuth();

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits(['update:open','click:register', 'success'])
const loginSuccess = ref(false)

const login = reactive({
  email: '',
  password: ''
})

const doLogin = async () => {
  loginSuccess.value = await auth.login(login.email, login.password)

  if (loginSuccess.value === true) {
    emit('success')
    setTimeout(() => {
      emit('update:open', false)
    }, 5000);
  }
}

</script>
<template>
  <ModalDialog :open="open" @update:open="v => $emit('update:open', v)">
    <h1 class="text-orange-500 text-center text-cursive">Login</h1>
    <form method="POST" v-if="!loginSuccess" @submit.prevent="doLogin">
      <div v-if="auth.errorMessage.value !== ''" class="alert alert-danger">
        {{ auth.errorMessage.value }}
      </div>
      <FormInput name="email" label="Email" v-model="login.email" type="email"></FormInput>
      <FormInput name="password" label="Password" v-model="login.password" type="password"></FormInput>
      <div class="flex justify-between">
        <span>
          Don't have account?
          <a href="#" class="text-link" @click="emit('click:register')">Register</a>
        </span>
        <button class="btn btn-sm" :disabled="auth.isLoading.value">
          <IconLoader v-if="auth.isLoading.value"></IconLoader>
          <span>Submit</span>
        </button>
      </div>
    </form>
    <div class="auth-success text-center pt-3 text-xl pb-3" v-else>
      <div class="i-mdi-check-circle mx-auto text-4xl text-green-500 "></div>
      <span class="text-orange-400">Sign in success</span>
    </div>
  </ModalDialog>
</template>