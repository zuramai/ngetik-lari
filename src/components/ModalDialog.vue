<script lang="ts" setup>
const props = defineProps<{
    open: boolean
}>()
defineEmits(['update:open'])
</script>
<template>
    <div class="modal-wrapper | absolute z-5 inset-0 flex items-center justify-center" :class="{invisible: !open}">
        <div class="modal absolute bg-white min-h-32 w-100 rounded-lg border-amber-400 outline outline-4 outline-orange-200 border-10 border-solid ">
            <div class="modal-content p-3">
                <slot></slot>
            </div>
        </div>
    </div>
</template>