import type { Block } from "../Block"

export type MapMatrix = Block[][]
export type Point = {
    x: number
    y: number
}
export interface GameMapInterface {
    name: string
    map: MapMatrix
}