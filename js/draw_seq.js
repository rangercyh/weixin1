import Const from './const'
import Sprite from './base/sprite'

let ctx = canvas.getContext('2d')

let instance

let draw_frames = function(canvas_ctx = ctx) {
    canvas_ctx.fillRect(0, 0, Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH * 2)
    canvas_ctx.fillRect(Const.FRAME_LENGTH + Const.PANEL.WIDTH, 0, Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH * 2)
    canvas_ctx.fillRect(Const.FRAME_LENGTH, 0, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
    canvas_ctx.fillRect(Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
    canvas_ctx.fillRect(Const.FRAME_LENGTH, Const.FRAME_LENGTH + Const.PRE.HEIGHT, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
}

/**
 * 界面绘图器
 */
export default class DrawSeq {
    constructor() {
        if (instance) {
            return instance
        }

        instance = this
        this.bg = new Sprite('images/bg.png', Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT)
        this.reset()
    }

    reset() {
        this.squares = []
    }

    add_square(square) {
        this.squares.push(square)
    }

    get_squares() {
        return this.squares
    }
    get_pre_squares() {
        let squares = []
        this.squares.forEach((v) => {
            if (v.stat == 'PRE') {
                squares.push(v)
            }
        })
        return squares
    }
    get_running_squares() {
        let squares = []
        this.squares.forEach((v) => {
            if (v.running) {
                squares.push(v)
            }
        })
        return squares
    }

    update() {
        this.squares.forEach((v) => {
            v.update()
        })
    }

    draw() {
        // 清除画布
        ctx.clearRect(0, 0, Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT)

        // 画背景
        this.bg.drawToCanvas(Const.FRAME_LENGTH, Const.FRAME_LENGTH)
        // 画方块
        this.squares.forEach((square) => {
            square.draw()
        })
        // 画边框
        draw_frames()
    }
}
