import Easing from '../libs/easing'
import Sprite from 'base/sprite'

let ctx = canvas.getContext('2d')

export default class Button extends Sprite {
    constructor(x, y, width = 0, height = 0, imgSrc = '') {
        super(imgSrc, x, y, width, height)
        this.easing = new Easing('OutCubic')
        this.easing.o_from = 1
        this.easing.o_to = 1.1
        this.easing.o_duration = 8
    }

    draw(canvas_ctx = ctx) {
        this.drawToCanvas(x, y, canvas_ctx)
    }

    on_touch_begin() {

    }

    on_touch_move() {
        
    }

    on_touch_end() {
        
    }

    apply() {

    }
    on_button_tick() {
        if (this.easing.o_alive) {
            this.easing.tick()
        }

        this.apply()
    }
}
