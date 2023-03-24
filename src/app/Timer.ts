export class Timer {
    time = -1
    interval: NodeJS.Timer | null = null

    getTimeString() {
        const timeString = `${Math.floor(this.time/60).toString().padStart(2,'0')}:${(this.time%60).toString().padStart(2,'0')}`
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
        this.interval = setInterval(() => this.time++, 1000)
        this.time++
    }

    stop() {
        clearInterval(this.interval!)
    }
}