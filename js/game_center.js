import CreateJs from 'libs/createjs'
import GameLogic from 'gamelogic/gamelogic'

let instance

export default class TouchManager {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        //创建舞台
        this.stage = new CreateJs.Stage(canvas)
        this.gamelogic = new GameLogic()
    }

    on_touch(event) {
        console.log(event)
        this.gamelogic.on_touch(event)
    }

    update() {
        this.gamelogic.update()
    }

    drawframe() {
        this.stage.update()
    }

    get_stage() {
        return this.stage
    }
}
