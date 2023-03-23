import { randomWord } from "@/api/words";
import { Block, type BlockContent } from "../Block";

export const randomArray = <T>(arr: T[]) => {
    const index = Math.floor(Math.random() * arr.length - 1)
    return arr[index]
}

export const matrixToBlock = (matrix: BlockContent[][]) => {
    return matrix.map((row, rowIndex) => {
        return row.map((content, colIndex) => {
            if(content === '') 
                content = randomWord()
            return new Block(content, {row: rowIndex, col: colIndex})
        })
    })
}