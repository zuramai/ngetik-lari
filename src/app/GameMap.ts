import type { MapMatrix } from "./types/Map";
import type { GameMapInterface } from '@/app/types/Map'

export class GameMap implements GameMapInterface {
    map: MapMatrix
    name: string 

    constructor(name: string, map: MapMatrix) {
        this.name = name
        this.map = map 
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.map.forEach(row => {
            row.forEach(block => {
                
            });
        })
    }
    
}