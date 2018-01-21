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
        this.moving = false
        drawseq.reset()

        console.log('game reset')
        // 添加初始方块
        Game.add_new_squares()

        this.gameover = false
    }

    btn_dispatch(x, y) {
        if (Const.RESTART_BTN.check_click(x, y) && this.gameover) {
            console.log('gameover touch')
            this.reset()
        }
        if (Const.DUMP_BTN.check_click(x, y)) {
            drawseq.dump()
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
    }

    draw() {
        drawseq.draw()
    }

    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
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
            e.preventDefault()
            if (startX && startY && move_dir) {
                startX = null
                startY = null
                if (!this.gameover) {
                    Game.move_effect(this, move_dir)
                }
            }
        }).bind(this))
    }

    lock_moving() {
        this.moving = true
    }
    unlock_moving() {
        this.moving = false
    }
    game_over() {
        console.log('gameover')
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
    }
}
