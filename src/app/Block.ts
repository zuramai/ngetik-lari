export type BlockContent = string | 0 | 'player' | 'musuh'

export class Block {
    content: BlockContent 

    constructor(content: BlockContent) {
        this.content = content
    }

    isOccupied() {
        return this.content === 0
    }
}