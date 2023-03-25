<script lang="ts" setup>
import { login } from '@/api/user';
import { reactive } from 'vue';
import FormInput from '../forms/FormInput.vue';
import ModalDialog from '../ModalDialog.vue';
import { useAuth } from '@/composables/useAuth'

const auth = useAuth();

const props = defineProps<{
  open: boolean
}>()
defineEmits(['update:open'])

const login = reactive({
  email: '',
  password: ''
})

const doLogin = () => {
  const loginSuccess = auth.login(login.email, login.password)

  if (!loginSuccess) {

  }
}
</script>
<template>
  <ModalDialog :open="open" @update:open="v => $emit('update:open', v)">
    <h1 class="text-orange-500 text-center text-cursive">Login</h1>
    <form method="POST" @submit.prevent="doLogin">
      <div v-if="auth.errorMessage.value !== ''" class="alert alert-danger">
        {{ auth.errorMessage.value }}
      </div>
      <FormInput name="email" label="Email" v-model="login.email" type="email"></FormInput>
      <FormInput name="password" label="Password" v-model="login.password" type="password"></FormInput>
      <div class="flex justify-end">
        <button class="btn btn-sm">Submit</button>
      </div>
    </form>
  </ModalDialog>
</template>