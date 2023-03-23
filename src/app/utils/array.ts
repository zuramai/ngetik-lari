import { Block, type BlockContent } from "../Block";

export const matrixToBlock = (matrix: BlockContent[][]) => {
    return matrix.map(row => row.map(content => new Block(content)))
}