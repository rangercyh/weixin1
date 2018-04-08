import Easing from '../libs/easing'
import Sprite from './sprite'

let ctx = canvas.getContext('2d')
/**
 * 游戏基础的按钮类
 */
export default class Button extends Sprite {
    constructor(x, y, width = 0, height = 0, imgSrc = '') {
        super(imgSrc, width, height)
        this.x = x
        this.y = y
        this.easing = new Easing()
    }

    draw(canvas_ctx = ctx) {
        this.drawToCanvas(x, y, canvas_ctx)
    }

    check

    update() {}
}
