import Const from './const'
import Sprite from './base/sprite'
import Square from './square/square'

let ctx = canvas.getContext('2d')

let instance

let draw_frames = function(canvas_ctx = ctx) {
    canvas_ctx.fillRect(0, 0, Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH * 2)
    canvas_ctx.fillRect(Const.FRAME_LENGTH + Const.PANEL.WIDTH, 0, Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH * 2)
    canvas_ctx.fillRect(Const.FRAME_LENGTH, 0, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
    canvas_ctx.fillRect(Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
    canvas_ctx.fillRect(Const.FRAME_LENGTH, Const.FRAME_LENGTH + Const.PRE.HEIGHT, Const.PANEL.WIDTH, Const.DIS_HEIGHT)
}

let draw_buttons = function(canvas_ctx = ctx) {
    canvas_ctx = ctx
    canvas_ctx.save()
    canvas_ctx.fillStyle = Const.DUMP_BTN.style
    canvas_ctx.fillRect(Const.DUMP_BTN.x, Const.DUMP_BTN.y, Const.DUMP_BTN.w, Const.DUMP_BTN.h)
    canvas_ctx.restore()
    canvas_ctx.save()
    canvas_ctx.font = Const.DUMP_BTN.font
    canvas_ctx.fillText(Const.DUMP_BTN.text, Const.DUMP_BTN.x + 14, Const.DUMP_BTN.y + 22)
    canvas_ctx.restore()
    canvas_ctx.save()
    canvas_ctx.fillStyle = Const.RESTART_BTN.style
    canvas_ctx.fillRect(Const.RESTART_BTN.x, Const.RESTART_BTN.y, Const.RESTART_BTN.w, Const.RESTART_BTN.h)
    canvas_ctx.restore()
    canvas_ctx.save()
    canvas_ctx.font = Const.RESTART_BTN.font
    canvas_ctx.fillText(Const.RESTART_BTN.text, Const.RESTART_BTN.x + 14, Const.RESTART_BTN.y + 22)
    canvas_ctx.restore()
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
        this.square_id = 1
    }

    add_square(lvl, idx, stat) {
        this.squares.push(new Square(this.square_id, lvl, idx, stat))
        this.square_id++
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
        // 按照idx排序，由大到小
        squares.sort(function(a, b) {
            return a.idx > b.idx
        })
        return squares
    }
    get_panel_squares() {
        let squares = []
        this.squares.forEach((v) => {
            if (v.stat == 'PANEL') {
                squares.push(v)
            }
        })
        return squares
    }
    dump() {
        let pre_squares = this.get_pre_squares()
        let panel_squares = this.get_panel_squares()
        let str = ''
        for (let i = 1; i <= Const.PRE.ROW; i++) {
            str += '=|'
            for (let j = 1; j <= Const.PRE.COL; j++) {
                let find = false
                for (let v of pre_squares) {
                    if (v.idx == (i * 10 + j)) {
                        find = true
                        break
                    }
                }
                if (find) {
                    str += ' @|'
                } else {
                    str += i * 10 + j
                    str += '|'
                }
            }
            str += '=\n'
        }
        str += '------------\n'
        for (let i = 1; i <= Const.PANEL.ROW; i++) {
            str += '=|'
            for (let j = 1; j <= Const.PANEL.COL; j++) {
                let find = false
                for (let v of panel_squares) {
                    if (v.idx == (i * 10 + j)) {
                        find = true
                        break
                    }
                }
                if (find) {
                    str += ' @|'
                } else {
                    str += i * 10 + j
                    str += '|'
                }
            }
            str += '=\n'
        }
        console.log(str)
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

        // 画调试按钮
        draw_buttons()
    }
}
