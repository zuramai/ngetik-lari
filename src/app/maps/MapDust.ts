import type { Block, BlockContent } from "../Block";
import { GameMap } from "../GameMap";
import { matrixToBlock } from "../utils/array";

export class MapDust extends GameMap {
    constructor() {
        const name = "dust"
        const startAt = {
            row: 3,
            col: 3,
        }
        const map: BlockContent[][] = [
            [0,0,0,'',0,0,0,0],
            [0,0,0,'',0,0,0,0],
            [0,0,0,'','','','',0],
            [0,0,0,'',0,0,'',0],
            [0,'','','',0,'','',0],
            [0,'',0,0,0,'',0,0],
            [0,'','','','','','',''],
            [0,'',0,0,0,0,0,0],
        ]
        super(name, matrixToBlock(map))
    }
}