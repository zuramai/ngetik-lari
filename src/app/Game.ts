import { randomWord } from "@/api/words"
import type { GameMap } from "./GameMap"
import { Player } from "./Player"
import { MapDust } from "./maps/MapDust"
import { MoveDirection, type Position } from "./types/Player"
import type { Block } from "./Block"

export class Game {
    canvas: HTMLCanvasElement
    map: GameMap | null = null
    ctx: CanvasRenderingContext2D
    player: Player|null = null
    currentlyTyping = ""
    nextBlocks:  Block[]|null = []

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas 
        this.ctx = canvas.getContext('2d')!
        this.chooseMap()
        this.start()
        
        window.addEventListener('keydown', e => this.events(e))
    }

    chooseMap() {
        // Auto choose
        this.map = new MapDust()
    }

    start() {
        this.player = new Player(this.map?.startAt!)
        setInterval(() => {
            // this.map!.map.forEach(row => {
            //     row.forEach(col => {
            //         if(typeof col.content == 'string') col.content = randomWord()
            //     })
            // })
        },100)
        requestAnimationFrame(() => this.render())
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

    gameover() {

    }

    draw() {
        this.map?.draw(this.ctx, this.getCameraPosition())
        this.player!.draw(this.ctx);
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
        
        console.log(this.checkNextBlocks())
    }

    type(key: string)  {
        if(key === 'Backspace') {
            this.currentlyTyping = this.currentlyTyping.slice(0, -1)
            this.nextBlocks?.forEach(block => block.currentlyTyping = this.currentlyTyping)

            if(this.currentlyTyping == "") this.nextBlocks = []
            return 
        }
        if(key.search(/^[a-zA-Z0-9-]+$/) == -1) return 
        if(['Shift', 'Control', 'Enter'].includes(key)) return 
        
        this.currentlyTyping += key
        console.log('typing: ', this.currentlyTyping)
        
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

    movePlayerTo(position: Position) {
        this.player!.position = position
    }

    events(e: KeyboardEvent) {
        
        const directionMap: Record<string, any> = {
            'ArrowLeft': MoveDirection.LEFT,
            'ArrowUp': MoveDirection.UP,
            'ArrowRight': MoveDirection.RIGHT,
            'ArrowDown': MoveDirection.DOWN,
        }
        if(Object.keys(directionMap).includes(e.key)) e.preventDefault()
        console.log(e.key);
        
        if(directionMap[e.key]) this.move(directionMap[e.key])
        else this.type(e.key)
    }
}