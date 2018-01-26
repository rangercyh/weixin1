import Const from '../const'
import Sprite from '../base/sprite'
let ctx = canvas.getContext('2d')

export default class Fruit extends Sprite {
    constructor(lvl) {
        // console.log('new Square = ', id, lvl, idx, stat)
        let cfg = Const.Squares_Cfg.get(lvl)
        super(cfg.img, Const.FRUIT_SLIDE_LENGTH, Const.FRUIT_SLIDE_LENGTH)
    }

    draw(x, y, canvas_ctx = ctx) {
        this.drawToCanvas(x, y, canvas_ctx)
    }
}
