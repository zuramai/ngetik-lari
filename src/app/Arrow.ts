import arrowImageSrc from '@/assets/icons/arrow-up.svg'
export enum Direction {
    TOP_LEFT = 'TOP_LEFT',
    TOP_CENTER = 'TOP_CENTER',
    TOP_RIGHT = 'TOP_RIGHT',
    BOTTOM_LEFT = 'BOTTOM_LEFT',
    BOTTOM_CENTER = 'BOTTOM_CENTER',
    BOTTOM_RIGHT = 'BOTTOM_RIGHT',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
}
export class Arrow {
    rotateDeg = 0
    arrowEl: HTMLImageElement

    constructor(canvas: HTMLCanvasElement) {
        const arrowImage = new Image 
        arrowImage.src = arrowImageSrc
        arrowImage.classList.add('direction-arrow')

        this.arrowEl = arrowImage

        canvas.parentElement?.append(arrowImage)
        this.hide()
    }

    rotate(deg: number) {
        this.arrowEl.style.rotate = `${deg}deg`
    }

    show() {
        this.arrowEl.classList.remove('hidden')
        this.arrowEl.classList.add('block')
    }

    hide() {
        this.arrowEl.classList.add('hidden')
        this.arrowEl.classList.remove('block')
    }

    changeDirection(to: Direction) {
        console.log('changed arrow direction ', to);
        
        const directionMap = {
            [Direction.BOTTOM_CENTER]: 180,
            [Direction.BOTTOM_RIGHT]: 135,
            [Direction.RIGHT]: 90,
            [Direction.TOP_RIGHT]: 45,
            [Direction.TOP_CENTER]: 0,
            [Direction.TOP_LEFT]: -45,
            [Direction.LEFT]: -90,
            [Direction.BOTTOM_LEFT]: -135,
        }
        this.rotate(directionMap[to])
    }
}