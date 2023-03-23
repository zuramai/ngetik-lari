import { randomWord } from "@/api/words"
import type { GameMap } from "./GameMap"
import { Player } from "./Player"
import { MapDust } from "./maps/MapDust"
import { MoveDirection } from "./types/Player"

export class Game {
    canvas: HTMLCanvasElement
    map: GameMap | null = null
    ctx: CanvasRenderingContext2D
    player: Player|null = null

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
        
        const nextBlock = this.map?.map[nextRow][nextCol]
        if(!nextBlock || !nextBlock.content) return 

        this.player!.position.row = nextRow
        this.player!.position.col = nextCol
        
        console.log(this.player!.position)
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
    }
}