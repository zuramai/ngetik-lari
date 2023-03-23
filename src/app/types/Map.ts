import type { Block } from "../Block"

export type MapMatrix = Block[][]

export interface GameMapInterface {
    name: string
    map: MapMatrix
}