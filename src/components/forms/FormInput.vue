<script lang="ts" setup>
const props = withDefaults(defineProps<{
    name: string 
    label: string
    modelValue: string 
    type?: string
}>(), {
    type: 'text'
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <div class="input-group mb-2">
        <label :for="name">{{ label }}</label>
        <input :type="type" :value="modelValue" 
                @input="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement)!.value)" 
                class="form-control | w-full px-3 py-2 bg-orange-100 
                    bg-opacity-40 rounded-md border-2 border-solid border-orange-300
                    focus:outline-none focus:bg-opacity-60 transition duration-200">
    </div>
</template>