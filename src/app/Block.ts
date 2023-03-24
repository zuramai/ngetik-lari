import type { Point } from "./types/Map"
import type { Position } from "./types/Player"
import FlagImage from '@/assets/images/flag.png'

export type BlockContent = string | 0 

const blockColors = {
    0: 'orange',
    empty: '#faca96'
}

const finishImage = new Image 
finishImage.src = FlagImage

export class Block {
    content: BlockContent 
    currentlyTyping = ""
    position: Position
    width = 91.42
    height = 91.42

    constructor(content: BlockContent, position: Position) {
        this.content = content
        this.position =  position
    }

    isOccupied() {
        return this.content === 0
    }

    getX() {
        return this.position.col * this.height
    }

    getY() {
        return this.position.row * this.width 
    }

    draw(ctx: CanvasRenderingContext2D, cameraPosition: Point, finishAt?: Position) {
        ctx.beginPath()
        
        ctx.fillStyle = blockColors[this.content === 0 ? 0 : 'empty' ]

        const blockY = this.getY() + cameraPosition.y
        const blockX = this.getX() + cameraPosition.x
        
        ctx.rect(blockX, blockY, this.width, this.height)
        ctx.fill()
        
        if(this.content ===  0) {
            ctx.strokeStyle = 'rgba(12,12,12,1)'
            ctx.stroke() 
        }

        
        if(this.content) {
            const textSize = ctx.measureText(this.content)
            // Draw text
            ctx.font = "13px arial"
            ctx.textAlign = "left"
            ctx.fillStyle = 'white'
            ctx.fillText(this.content.toString(), blockX + this.width/2 - textSize.width/2, blockY + this.height / 2)

            const isCorrectlyTyped = this.content.toString().startsWith(this.currentlyTyping)

            //  Draw typed text
            ctx.fillStyle = isCorrectlyTyped ? 'rgba(12,12,12,1)' : 'red'
            ctx.fillText(this.currentlyTyping.toString(), blockX + this.width/2 - textSize.width/2, blockY + this.height / 2)

            if(finishAt && finishAt.col == this.position.col && finishAt.row == this.position.row) {
                ctx.drawImage(finishImage, blockX + this.width/2 - 20, blockY + this.height / 2 + 10, 40, 25)
            }
        } 
    }

}