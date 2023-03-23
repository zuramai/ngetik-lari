<script lang="ts" setup>
import GameLogo from '@/components/GameLogo.vue'

</script>
<template>
    <header class="page-header | text-center py-5">
        <GameLogo></GameLogo>
        <ul class="p-0 list-none flex justify-center gap-5">
            <li>
                <router-link to="/">Play</router-link>
            </li>
            <li>
                <router-link to="/leaderboard">Leaderboard</router-link>
            </li>
        </ul>
    </header>
</template>
