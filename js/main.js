import DataBus from './databus'
import Const from './const'

let databus = new DataBus()

export default class Main {
    constructor() {
        this.loop()
    }

    loop() {
        this.update()
        this.render()
        window.requestAnimationFrame(this.loop.bind(this), canvas)
    }

    update() {
        databus.update()
    }

    render() {
        databus.draw()
    }

    slide(arrow) {
        if (!databus.moving_check) {
            if (arrow == Const.SLIDE_LEFT) {
                databus.slide_left()
            }
            if (arrow == Const.SLIDE_RIGHT) {
                databus.slide_right()
            }
        }
    }
}
