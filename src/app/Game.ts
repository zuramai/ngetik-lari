import { useWords } from "@/composables/useWords"
import type { GameMap } from "./GameMap"
import { Player } from "./Player"
import { MapDust } from "./maps/MapDust"
import { MoveDirection, type Position } from "./types/Player"
import type { Block } from "./Block"
import { Direction } from "./Arrow"
import { Timer } from "./Timer"
import { watch } from "vue"
import { Arrow } from "./Arrow"

const words = useWords()

export class Game {
    canvas: HTMLCanvasElement
    map: GameMap | null = null
    arrow: Arrow
    ctx: CanvasRenderingContext2D
    player: Player|null = null
    currentlyTyping = ""
    nextBlocks:  Block[]|null = []
    timer = new Timer()
    mode:'lari'|'kejar' = 'lari'
    finishCallbacks: (() => void)[] = []

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas 
        this.ctx = canvas.getContext('2d')!
        this.arrow = new Arrow(canvas)
        this.chooseMap()
        // this.start()
        
        window.addEventListener('keydown', e => this.events(e))
    }

    chooseMap() {
        // Auto choose
    }

    start() {
        this.map = new MapDust()
        this.player = new Player(this.map?.startAt!)
        this.timer.start()
        this.arrow.show()
        this.arrow.checkRotation(this.player!.position, this.map?.finishAt!)
        requestAnimationFrame(() => this.render())
    }

    stop() {
        this.timer.stop()
    }

    render() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.draw()
        requestAnimationFrame(() => this.render())
    }

    getCameraPosition() {
        const playerPosition = this.player!.position
        const currentPlayerBlock = this.map!.map[playerPosition.row][playerPosition.col]
        
        const canvasCenter = { x: this.canvas.width/2, y: this.canvas.height/2 }
        const blockCenter = { x: currentPlayerBlock.getX() + currentPlayerBlock.width/2, y: currentPlayerBlock.getY() + currentPlayerBlock.height/2 }

        return {
            x: canvasCenter.x- blockCenter.x, 
            y: canvasCenter.y - blockCenter.y 
        }
    }

    checkNextBlocks() {
        const moveMap = {
            [MoveDirection.DOWN]: [0, 1],
            [MoveDirection.UP]: [0, -1],
            [MoveDirection.RIGHT]: [1, 0],
            [MoveDirection.LEFT]: [-1, 0],
        }
        const possibleBlocks: Block[] = []
        Object.values(moveMap).forEach(d => {
            const nextCol = this.player?.position.col! + d[1]
            const nextRow = this.player?.position.row! + d[0]
            const nextBlock = this.map?.map![nextRow]?.[nextCol] || null
            if(nextCol > 0 && nextRow > 0 && nextBlock && nextBlock.content !== 0) {
                possibleBlocks.push(nextBlock)
            } 
        })

        return possibleBlocks
    }

    onFinish(cb: () => void) {
        this.finishCallbacks.push(cb)
    }

    gameover() {
        this.finishCallbacks.forEach(cb => cb())
    }

    draw() {
        this.map?.draw(this.ctx, this.getCameraPosition())
        this.player!.draw(this.ctx);
        this.timer.draw(this.ctx)
    }

    move(direction: MoveDirection) {
        const moveMap = {
            [MoveDirection.DOWN]: [0, 1],
            [MoveDirection.UP]: [0, -1],
            [MoveDirection.RIGHT]: [1, 0],
            [MoveDirection.LEFT]: [-1, 0],
        }
        const moveTo = moveMap[direction]

        const nextRow = this.player?.position.row! + moveTo[1]
        const nextCol = this.player?.position.col! + moveTo[0]
        
        const nextBlock = this.map?.map?.[nextRow]?.[nextCol] || null

        if(!nextBlock || !nextBlock.content) return 

        this.player!.position.row = nextRow
        this.player!.position.col = nextCol

        
    }

    type(e: KeyboardEvent)  {
        const key = e.key
        if(key === 'Backspace') {
            e.preventDefault()
            this.currentlyTyping = this.currentlyTyping.slice(0, -1)
            this.nextBlocks?.forEach(block => block.currentlyTyping = this.currentlyTyping)

            if(this.currentlyTyping == "") this.nextBlocks = []
            return 
        }
        if(key.search(/^[a-zA-Z0-9-]+$/) == -1) return 
        if(['Shift', 'Control', 'Enter'].includes(key)) return 
        
        this.currentlyTyping += key
        
        const possibleBlocks = this.checkNextBlocks()

        if(this.nextBlocks?.length !== 1) {
            this.nextBlocks = possibleBlocks.filter(block => block.content.toString().startsWith(this.currentlyTyping))
        }

        // If no possible words, reset
        if(!this.nextBlocks.length){
            this.currentlyTyping = ''
            return
        }

        // Type to all possible blocks
        this.nextBlocks.forEach(n  => n.currentlyTyping = this.currentlyTyping)

        
        const completelyTypedBlock = this.nextBlocks.find(block => block?.currentlyTyping === block?.content)
        if(completelyTypedBlock) {
            this.movePlayerTo(completelyTypedBlock!.position)
            this.currentlyTyping = ""
            this.nextBlocks.forEach(b => b.currentlyTyping = '')
            this.nextBlocks = []
        }
    }

    restart() {
        this.start()
    }

    movePlayerTo(position: Position) {
        this.player!.position = position
        this.arrow.checkRotation(this.player!.position, this.map?.finishAt!)

        if(this.player!.position.col === this.map?.finishAt.col &&
            this.player!.position.row === this.map?.finishAt.row) {
                this.gameover()
            }
    }

    events(e: KeyboardEvent) {
        
        const directionMap: Record<string, any> = {
            'ArrowLeft': MoveDirection.LEFT,
            'ArrowUp': MoveDirection.UP,
            'ArrowRight': MoveDirection.RIGHT,
            'ArrowDown': MoveDirection.DOWN,
        }
        if(Object.keys(directionMap).includes(e.key)) e.preventDefault()
        
        if(directionMap[e.key]) this.move(directionMap[e.key])
        else this.type(e)
    }
}