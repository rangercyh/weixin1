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

        // 添加初始方块
        Game.init_squares()

        this.gameOver = false
    }

    touchEventHandler(e) {
        e.preventDefault()
        console.log('gameover touch')
        this.reset()
    }

    update() {
        if (this.gameOver) {
            if (!this.touchHandler) {
                this.game_over()
            }
            return
        }
        this.frame++
        this.gameOver = Game.game_update()
        drawseq.update()
    }

    draw() {
        drawseq.draw()
    }

    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()
            if (!this.moving && e.touches.length == 1) {
                move_dir = null
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
            }
        }).bind(this))

        canvas.addEventListener('touchmove', ((e) => {
            e.preventDefault()
            if (startX && startY && e.touches.length == 1) {
                let x = e.touches[0].clientX
                let y = e.touches[0].clientY

                let diffX = x - startX
                let diffY = y - startY

                if (Math.abs(diffX) > Math.abs(diffY) && diffX > 0) {
                    console.log("向右")
                    move_dir = Const.MOVING_RIGHT
                }
                if (Math.abs(diffX) > Math.abs(diffY) && diffX < 0) {
                    console.log("向左")
                    move_dir = Const.MOVING_LEFT
                }
                if (Math.abs(diffX) < Math.abs(diffY) && diffY > 0) {
                    console.log("向下")
                    move_dir = Const.MOVING_DOWN
                }
                if (Math.abs(diffX) < Math.abs(diffY) && diffY < 0) {
                    console.log("向上")
                }
            }
        }).bind(this))

        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault()
            if (startX && startY && move_dir) {
                startX = null
                startY = null
                if (!this.gameOver) {
                    Game.move_effect(move_dir)
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
