import type { Position } from "./types/Player";
import DogImage from '@/assets/images/dog.png'

export class Player {
    position: Position
    width = 70
    height = 40
    image: HTMLImageElement

    constructor(position: Position) {
        this.position = position
        this.image = new Image 
        this.image.src = DogImage
    }

    draw(ctx: CanvasRenderingContext2D) {
        const playerX = ctx.canvas.width / 2 - this.width/2 
        const playerY = ctx.canvas.height / 2 - this.height / 2
        
        ctx.fillStyle = 'rgba(255,0,0, .3)'
        ctx.drawImage(this.image, playerX, playerY, this.width, this.height)
    }
}