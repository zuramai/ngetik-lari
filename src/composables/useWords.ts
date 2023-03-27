import { randomArray } from "@/app/utils/array"
import { computed, onMounted, ref } from "vue"

const words = ref(localStorage.getItem('words') || [])

export const useWords  = () => {
    const isWordFetched = computed(() => words.value.length);
    const fetchWords = async () => {
        const result = await fetch(import.meta.env.VITE_BASE_URL+'/words.json')
        const json = await result.json()
        words.value = json
        console.log('Words fetched');
    }

    
    const randomWord =  () => {
        return randomArray(words.value as string[])
    }

    return {
        isWordFetched,
        fetchWords,
        randomWord
    }
}