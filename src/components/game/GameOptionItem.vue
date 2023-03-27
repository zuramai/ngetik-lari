<script lang="ts" setup>
const props = defineProps<{
    imageSrc?: string 
    value: string
    name: string
    modelValue: string 
    disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>
<template>
    <input type="radio" :id="value" :name="name" class="game-option-input  hidden" :value="value" :disabled="disabled" @change="emit('update:modelValue', value)" :checked="value == modelValue">
    <label :for="value">
        <div class="game-option-item rounded-md w-32 p-3 h-24 flex items-center justify-center border-2 border-orange-600 border-solid cursor-pointer">
            <img v-if="imageSrc" :src="imageSrc" :alt="value" class="w-full">
            <p v-else class="text-center">{{ value }}</p>
        </div>
    </label>
</template>
<style>
.game-option-item {
    background-color: var(--color-primary-light);
}
.game-option-input:checked + label .game-option-item {
    outline: 5px solid red;
}
.game-option-input:disabled + label .game-option-item {
    opacity: .5;
    cursor: not-allowed
}

</style>