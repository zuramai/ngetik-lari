<script lang="ts" setup>
import { emit } from 'process';

const props = defineProps<{
    open: boolean
}>()
defineEmits(['update:open'])
</script>
<template>
    <div class="modal-wrapper | absolute z-5 inset-0 flex items-center justify-center" :class="{invisible: !open}">
        <div class="modal absolute bg-orange-200 min-h-32 w-100 rounded-lg border-amber-400 outline outline-4 outline-orange-200 border-10 border-solid ">
            <div class="modal-close absolute right-0 z-5" @click="$emit('update:open', false)">
                <a href="#">
                    <div class="i-mdi-alpha-x text-4xl" aria-label="Close" title="Close"></div>
                </a>
            </div>
            <div class="modal-content p-3">
                <slot></slot>
            </div>
        </div>
    </div>
</template>