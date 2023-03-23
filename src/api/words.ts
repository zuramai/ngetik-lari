import { randomArray } from "@/app/utils/array"
import { onMounted, ref } from "vue"

const words = ref(localStorage.getItem('words') || [])

if(words.value.length === 0) {
    fetch('/words.json')
        .then(res => res.json())
        .then(res => words.value = res)
} 

export const randomWord = () => {
    return randomArray(words.value as string[])
}