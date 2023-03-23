import type { GameMap } from "./GameMap"
import { MapDust } from "./maps/MapDust"

export class Game {
    canvas: HTMLCanvasElement
    map: GameMap | null = null
    ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas 
        this.ctx = canvas.getContext('2d')!
        this.chooseMap()
    }

    chooseMap() {
        // Auto choose
        this.map = new MapDust()
    }

    start() {
        
    }

    gameover() {

    }

    draw() {
        this.map?.draw(this.ctx)
    }
}