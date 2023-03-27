<script lang="ts" setup>
import GameLogo from '@/components/GameLogo.vue'
import { useAuth } from '@/composables/useAuth';
const auth = useAuth()
</script>
<template>
    <header class="page-header | text-center py-5">
        <GameLogo></GameLogo>
        <ul class="header-menu p-0 list-none flex justify-center gap-5">
            <li>
                <router-link to="/">Play</router-link>
            </li>
            <li>
                <router-link to="/leaderboard">Leaderboard</router-link>
            </li>
            <li v-if="auth.currentUser !== null">
                <router-link to="/profile">Profile</router-link>
            </li>
            <li v-else>
                <router-link to="/">Login</router-link>
            </li>
        </ul>
    </header>
</template>
<style>
.header-menu .router-link-active {
    color: rgb(255, 102, 0);
    text-decoration: underline;
}
</style>