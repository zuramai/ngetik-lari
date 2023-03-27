import { randomArray } from "@/app/utils/array"
import { onMounted, ref } from "vue"

const words = ref(localStorage.getItem('words') || [])

export const useWords  = () => {

    const fetchWords = async () => {
        fetch('/words.json')
            .then(res => res.json())
            .then(res => {
                console.log('Words fetched');
                words.value = res
            })
    }

    if(words.value.length === 0) {
        fetchWords()
    } 
    
    const randomWord =  () => {
        return randomArray(words.value as string[])
    }

    return {
        fetchWords,
        randomWord
    }
}