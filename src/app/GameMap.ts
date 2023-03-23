import type { MapMatrix } from "./types/Map";
import type { GameMapInterface } from '@/app/types/Map'
import type { Position } from "./types/Player";

export class GameMap implements GameMapInterface {
    map: MapMatrix
    name: string 
    startAt: Position = { row: 0, col: 0 } // default

    constructor(name: string, map: MapMatrix) {
        this.name = name
        this.map = map 
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.map.forEach((row) => {
            row.forEach((block) => {
                block.draw(ctx)
            });
        })
    }
    
}