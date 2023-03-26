<script lang="ts" setup>
type Option = {
    value: string 
    text: string 
    disabled?: boolean
}
const props = withDefaults(defineProps<{
    options: Option[]
    label: string
    modelValue: string 
    name?: string
}>(), {
    name: 'text'
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <div class="input-group">
        <label :for="name">{{ label }}</label>
        <select :value="modelValue" :id="name"
                @input="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement)!.value)" 
                class="form-control | w-full px-2 py-1 bg-orange-100 
                    bg-opacity-40 rounded-md border-2 border-solid border-orange-300
                    focus:outline-none focus:bg-opacity-60 transition duration-200">
            <option :value="option.value" v-for="option in options" :key="option.value" :disabled="option.disabled === true">{{ option.text }}</option>
        </select>
    </div>
</template>