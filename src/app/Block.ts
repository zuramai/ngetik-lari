import type { Point } from "./types/Map"
import type { Position } from "./types/Player"

export type BlockContent = string | 0 | 'player' | 'musuh'

const blockColors = {
    0: 'orange',
    empty: '#faca96'
}

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

    draw(ctx: CanvasRenderingContext2D, cameraPosition: Point) {
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
        
        ctx.font = "13px arial"
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        if(this.content) ctx.fillText(this.content.toString(), blockX + this.width/2, blockY + this.height / 2)
    }
}