import Const from '../const'
import Sprite from '../base/sprite'


export default class Square extends Sprite {
    constructor(img, w = Const.SQUARE_SLIDE_LENGTH, h = Const.SQUARE_SLIDE_LENGTH) {
        super(img, w, h)
        this.set()
    }

    set(x = 0, y = 0) {
        this.x = x
        this.y = y
        this.running = false
    }

    start_run() {
        this.running = true
    }

    stop_run() {
        this.running = false
    }

    update() {
        if (this.running) {
            this.y += Const.MOVEING_SPEED
        }
    }

    draw() {
        this.drawToCanvas(this.x, this.y)
    }
}
