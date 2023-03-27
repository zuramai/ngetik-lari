import { formatTime } from "@/utils/time"

export class Timer {
    time = 0
    interval: NodeJS.Timer | null = null

    getTimeString() {
        const timeString = `${formatTime(this.time)}`
        return timeString
    }

    draw(ctx: CanvasRenderingContext2D) {
        const timeString = this.getTimeString()
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.textAlign = "center"
        ctx.font = "36px Arial"
        ctx.fillText(timeString, ctx.canvas.width/2, 50)
        ctx.strokeText(timeString, ctx.canvas.width/2, 50)
    }

    start() {
        this.time = 0
        this.interval = setInterval(() => this.time++, 1000)
    }

    stop() {
        clearInterval(this.interval!)
    }

    restart() {
        this.time = 0
    }
}