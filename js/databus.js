import Const from './const'
import DrawSeq from './draw_seq'
import * as Game from './game'

let drawseq = new DrawSeq()

let instance

let startX
let startY
let move_dir
/**
 * 全局状态管理器
 */
export default class DataBus {
    constructor() {
        if (instance) {
            return instance
        }

        instance = this
        this.reset()
        this.initEvent()
    }

    reset() {
        canvas.removeEventListener('touchstart', this.touchHandler)
        this.touchHandler = null
        this.frame = 0
        this.score = 0
        this.moving = 0
        this.moving_check = false
        drawseq.reset()

        console.log('game reset')
        // 添加初始方块
        Game.add_new_squares(true)

        this.gameover = false
        wx.startAccelerometer()
    }

    slide_left() {
        this.lock_moving(Const.RUNNING_ARROW.LEFT)
        console.log('slide left')
        let squares = drawseq.get_panel_squares()
        if (squares.length > 0) {
            squares.forEach((v) => {
                v.start_run(Const.RUNNING_ARROW.LEFT)
            })
        } else {
            this.unlock_moving()
        }
    }
    slide_right() {
        this.lock_moving(Const.RUNNING_ARROW.RIGHT)
        console.log('slide right')
        let squares = drawseq.get_panel_squares()
        if (squares.length > 0) {
            squares.forEach((v) => {
                v.start_run(Const.RUNNING_ARROW.RIGHT)
            })
        } else {
            this.unlock_moving()
        }
    }
    slide_down() {
        this.lock_moving(Const.RUNNING_ARROW.SLIDE_DOWN)
        console.log('slide down')
        let squares = drawseq.get_squares()
        if (squares.length > 0) {
            squares.forEach((v) => {
                v.start_run(Const.RUNNING_ARROW.SLIDE_DOWN)
            })
        } else {
            this.unlock_moving()
        }
    }
    btn_dispatch(x, y) {
        if (Const.BTNS.DUMP_BTN.check_click(x, y)) {
            drawseq.dump()
        }
        if (Const.RESTART_BTN.check_click(x, y) && this.gameover) {
            console.log('gameover touch')
            this.reset()
        }
        if (Const.BTNS.END_BTN.check_click(x, y)) {
            this.gameover = true
        }
        if (!this.gameover && !(this.moving > 0)) {
            if (Const.BTNS.SLIDE_LEFT_BTN.check_click(x, y)) {
                this.slide_left()
            }
            if (Const.BTNS.SLIDE_RIGHT_BTN.check_click(x, y)) {
                this.slide_right()
            }
            if (Const.BTNS.SLIDE_DOWN_BTN.check_click(x, y)) {
                this.slide_down()
            }
        }
    }

    touchEventHandler(e) {
        e.preventDefault()
        if (e.touches.length > 0) {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            this.btn_dispatch(x, y)
        }
    }

    update() {
        if (this.gameover) {
            if (!this.touchHandler) {
                this.game_over()
            }
            return
        }
        this.frame++
        Game.game_update(this)
        drawseq.update()
        if (this.slide_mark) {
            this.slide_mark = false
            this.slide_down()
        }
    }

    draw() {
        drawseq.draw(this)
    }

    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            if (this.gameover) {
                return
            }
            e.preventDefault()
            if (!this.moving && e.touches.length == 1) {
                let x = e.touches[0].clientX
                let y = e.touches[0].clientY
                if (Const.check_in_screen(x, y)) {
                    move_dir = null
                    startX = x
                    startY = y
                } else {
                    this.btn_dispatch(x, y)
                }
            }
        }).bind(this))

        canvas.addEventListener('touchmove', ((e) => {
            if (this.gameover) {
                return
            }
            e.preventDefault()
            if (startX && startY && e.touches.length == 1) {
                let x = e.touches[0].clientX
                let y = e.touches[0].clientY
                if (Const.check_in_screen(x, y)) {
                    let diffX = x - startX
                    let diffY = y - startY
                    if (Math.abs(diffX) > Math.abs(diffY) && diffX > 0) {
                        move_dir = Const.MOVING_RIGHT
                    }
                    if (Math.abs(diffX) > Math.abs(diffY) && diffX < 0) {
                        move_dir = Const.MOVING_LEFT
                    }
                    if (Math.abs(diffX) < Math.abs(diffY) && diffY > 0) {
                        move_dir = Const.MOVING_DOWN
                    }
                    if (Math.abs(diffX) < Math.abs(diffY) && diffY < 0) {
                    }
                }
            }
        }).bind(this))

        canvas.addEventListener('touchend', ((e) => {
            if (this.gameover) {
                return
            }
            e.preventDefault()
            if (startX && startY && e.touches.length <= 0) {
                startX = null
                startY = null
                if (!this.gameover && !this.moving) {
                    if (move_dir) {
                        Game.move_effect(this, move_dir)
                    } else {
                        // 变化pre方块
                        Game.change_pre_squares()
                    }
                }
            }
        }).bind(this))

    }

    lock_moving(arrow) {
        this.moving = arrow
        this.moving_check = true
    }
    unlock_moving() {
        this.moving = 0
        this.moving_check = false
    }
    game_over() {
        console.log('gameover')
        wx.stopAccelerometer()
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
    }
    add_score(lvl) {
        let score = Const.Squares_Cfg[lvl].score
        this.score += score
    }
}
