<script lang="ts" setup>
import { reactive, ref } from 'vue';
import FormInput from '../forms/FormInput.vue';
import ModalDialog from '../ModalDialog.vue';
import { useAuth } from '@/composables/useAuth'
import IconLoader from '../icons/IconLoader.vue';

const auth = useAuth();

const props = defineProps<{
  open: boolean
}>()

const registerSuccess = ref(false)
const register = reactive({
  username: '',
  email: '',
  password: ''
})
const emit = defineEmits(['click:login', 'success', 'update:open'])

const doRegister = async () => {
  const success = await auth.register(register.email, register.username, register.password)

  if (success === true) {
    registerSuccess.value = success
    emit('success')
    setTimeout(() => {
      emit('update:open', false)
    }, 5000);
  }
}

</script>
<template>
  <ModalDialog :open="open" @update:open="v => $emit('update:open', v)">
    <h1 class="text-orange-500 text-center text-cursive">Register</h1>
    <form v-if="!registerSuccess" method="POST" @submit.prevent="doRegister">
      <div v-if="auth.errorMessage.value !== ''" class="alert alert-danger">
        {{ auth.errorMessage.value }}
      </div>
      <FormInput name="username" label="Username" v-model="register.username" ></FormInput>
      <FormInput name="email" label="Email" v-model="register.email" type="email"></FormInput>
      <FormInput name="password" label="Password" v-model="register.password" type="password"></FormInput>
      <div class="flex justify-between">
        <span>
          Have an account?
          <a href="#" class="text-link" @click="emit('click:login')">Login</a>
        </span>
        <button class="btn btn-sm" :disabled="auth.isLoading.value">
          <IconLoader v-if="auth.isLoading.value"></IconLoader>
          Submit
        </button>
      </div>
    </form>
    <div class="auth-success text-center pt-3 text-xl pb-3" v-else>
      <div class="i-mdi-check-circle mx-auto text-4xl text-green-500 "></div>
      <span class="text-orange-400">Sign up success</span>
    </div>
  </ModalDialog>
</template>