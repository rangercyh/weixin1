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
}
