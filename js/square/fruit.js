import Const from '../const'
import Sprite from '../base/sprite'
let ctx = canvas.getContext('2d')

export default class Fruit extends Sprite {
    constructor(lvl, x, y) {
        let cfg = Const.Squares_Cfg.get(lvl)
        super(cfg.img, Const.FRUIT_SLIDE_LENGTH, Const.FRUIT_SLIDE_LENGTH)
        // console.log('new Square = ', id, lvl, idx, stat)
        this.x = x
        this.y = y
    }

    draw(canvas_ctx = ctx) {
        this.drawToCanvas(this.x, this.y, canvas_ctx)
    }
}
