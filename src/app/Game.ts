import type { GameMap } from "./GameMap"
import { Player } from "./Player"
import { MapDust } from "./maps/MapDust"

export class Game {
    canvas: HTMLCanvasElement
    map: GameMap | null = null
    ctx: CanvasRenderingContext2D
    player: Player|null = null

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
        this.player = new Player(this.map?.startAt!)
        this.draw()
    }

    gameover() {

    }

    draw() {
        this.map?.draw(this.ctx)
        this.player!.draw(this.ctx);
    }
}