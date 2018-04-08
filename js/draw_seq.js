import Const from './const'
import Sprite from './base/sprite'
import Square from './square/square'
import Fruit from './square/fruit'

let ctx = canvas.getContext('2d')

let instance

let draw_frames = function(canvas_ctx = ctx) {
    canvas_ctx.fillRect(Const.SQUARE_START_X, 0, Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH * 2)
    canvas_ctx.fillRect(Const.SQUARE_START_X + Const.FRAME_LENGTH + Const.PANEL.WIDTH, 0, Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH * 2)
    canvas_ctx.fillRect(Const.SQUARE_START_X + Const.FRAME_LENGTH, 0, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
    canvas_ctx.fillRect(Const.SQUARE_START_X + Const.FRAME_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH, Const.PANEL.WIDTH, Const.FRAME_LENGTH)
    canvas_ctx.fillRect(Const.SQUARE_START_X + Const.FRAME_LENGTH, Const.FRAME_LENGTH + Const.PRE.HEIGHT, Const.PANEL.WIDTH, Const.DIS_HEIGHT)
}

let draw_buttons = function(canvas_ctx = ctx) {
    for (let k in Const.BTNS) {
        canvas_ctx.save()
        canvas_ctx.fillStyle = Const.BTNS[k].style
        canvas_ctx.fillRect(Const.BTNS[k].x, Const.BTNS[k].y, Const.BTNS[k].w, Const.BTNS[k].h)
        canvas_ctx.restore()
        canvas_ctx.save()
        canvas_ctx.font = Const.BTNS[k].font
        canvas_ctx.fillText(Const.BTNS[k].text, Const.BTNS[k].text_x(), Const.BTNS[k].text_y())
        canvas_ctx.restore()
    }
}

let draw_gameover = function(score, canvas_ctx = ctx) {
    canvas_ctx.save()
    canvas_ctx.fillStyle = Const.RESTART_BTN.style
    canvas_ctx.fillRect(Const.RESTART_BTN.x, Const.RESTART_BTN.y, Const.RESTART_BTN.w, Const.RESTART_BTN.h)
    canvas_ctx.restore()
    canvas_ctx.save()
    canvas_ctx.font = Const.RESTART_BTN.font
    canvas_ctx.fillText(Const.RESTART_BTN.text, Const.RESTART_BTN.text_x(), Const.RESTART_BTN.text_y())
    canvas_ctx.fillText("积分：" + score, Const.RESTART_BTN.text_x() + 20, Const.RESTART_BTN.text_y() + 30)
    canvas_ctx.restore()
}

let draw_fruits = function(lvl_map, canvas_ctx = ctx) {
    let start_x = 5
    canvas_ctx.clearRect(start_x, 0, Const.FRUIT_SLIDE_LENGTH, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH)
    let fruits = Const.Squares_Cfg
    for (let [key, value] of fruits) {
        let alpha = 0.3
        if (lvl_map.has(key)) {
            alpha = 1
        }
        canvas_ctx.save()
        canvas_ctx.globalAlpha = alpha
        let fruit = new Fruit(key, start_x, Const.SCREEN_HEIGHT + Const.FRAME_LENGTH - key * Const.FRUIT_SLIDE_LENGTH)
        fruit.draw(canvas_ctx)
        canvas_ctx.restore()
    }
}

let draw_score = function(score, canvas_ctx = ctx) {
    canvas_ctx.save()
    canvas_ctx.fillStyle = Const.SCORE_ARENA.style
    canvas_ctx.fillRect(Const.SCORE_ARENA.x, Const.SCORE_ARENA.y, Const.SCORE_ARENA.w, Const.SCORE_ARENA.h)
    canvas_ctx.restore()
    canvas_ctx.save()
    canvas_ctx.font = Const.SCORE_ARENA.font
    canvas_ctx.fillText(score, Const.SCORE_ARENA.text_x(), Const.SCORE_ARENA.text_y())
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
        this.squares = new Set()
        this.square_id = 1
        this.squares_lvl_map = new Map()
        this.score = 0
    }

    add_square(lvl, idx, stat) {
        this.squares.add(new Square(this.square_id, lvl, idx, stat))
        this.square_id++
        if (!this.squares_lvl_map.has(lvl)) {
            this.squares_lvl_map.set(lvl, 0)
        }
        let num = this.squares_lvl_map.get(lvl)
        this.squares_lvl_map.set(lvl, num + 1)
    }
    remove_square(id) {
        this.squares.forEach((v) => {
            if (v.id == id) {
                this.squares.delete(v)
            }
        })
    }

    get_squares_map() {
        return this.squares_lvl_map
    }
    get_squares() {
        return [...this.squares]
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
    get_moving_squares() {
        let squares = []
        let arrow = 0
        this.squares.forEach((v) => {
            if (v.running > 0) {
                squares.push(v)
                arrow = v.running
            }
        })
        if (arrow == Const.RUNNING_ARROW.DOWN || arrow == Const.RUNNING_ARROW.SLIDE_DOWN) {
            // 按照idx排序，由大到小
            squares.sort(function(a, b) {
                let a_stat = a.stat == 'PRE' && 1 || 2
                let b_stat = b.stat == 'PRE' && 1 || 2
                if (a_stat > b_stat) {
                    return -1
                } else if (a_stat == b_stat) {
                    return b.idx - a.idx
                } else {
                    return 1
                }
            })
        }
        if (arrow == Const.RUNNING_ARROW.LEFT) {
            // 按照col排序，由小到大
            squares.sort(function(a, b) {
                let a_col = a.idx % 10
                let b_col = b.idx % 10
                return a_col - b_col
            })
        }
        if (arrow == Const.RUNNING_ARROW.RIGHT) {
            // 按照col排序，由大到小
            squares.sort(function(a, b) {
                let a_col = a.idx % 10
                let b_col = b.idx % 10
                return b_col - a_col
            })
        }
        return { squares : squares, arrow : arrow }
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

    update(score) {
        this.squares.forEach((v) => {
            v.update()
        })
        this.score = score
    }

    draw(databus) {
        // 清除画布
        ctx.clearRect(Const.SQUARE_START_X, 0, Const.SCREEN_WIDTH, Const.SCREEN_HEIGHT)

        // 画背景
        this.bg.drawToCanvas(Const.SQUARE_START_X + Const.FRAME_LENGTH, Const.FRAME_LENGTH)
        // 画方块
        this.squares.forEach((square) => {
            square.draw()
        })
        // 画边框
        draw_frames()

        // 画调试按钮
        draw_buttons()

        // 画合成图
        draw_fruits(this.squares_lvl_map)
        draw_score(this.score)

        if (databus.gameover) {
            draw_gameover(databus.score)
        }
    }
}
