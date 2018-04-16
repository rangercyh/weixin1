import CreateJs from '../libs/createjs'
import * as Const from '../const'

export default class UI_Stack {
    constructor() {
        this.stack = []
    }

    push_ui(ui) {
        this.stack.push(ui)
    }

    pop_ui() {
        return this.stack.pop()
    }

    get_top_ui() {
        return this.stack[this.stack.length - 1]
    }

    remove_ui(ui_name) {
        this.stack.forEach((v, i) => {
            if (v.ui_name == ui_name) {
                this.stack.splice(i, 1)
            }
        })
    }

    update_draw_seq() {
        let stage = window.game_center.stage
    }
}

