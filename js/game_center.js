import * as Const from 'const'

let instance

export default class TouchManager {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
    }

    on_touch(event) {
        console.log(event)
    }

    update() {

    }

    drawframe() {

    }
}
