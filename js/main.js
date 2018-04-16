import TouchManager from 'touch_manager'
import Updater from 'utils/updater'
import GameCenter from 'game_center'


let touch_manager = new TouchManager()
window.touch_manager = touch_manager
let game_center = new GameCenter()
window.game_center = game_center
let updater = new Updater()
window.updater = updater

export default class Main {
    constructor() {
        this.tick = 0
        this.tick_count = 0
        // wx.setPreferredFramesPerSecond(30)
        this.loop()
    }

    loop(time) {
        this.update(time)
        this.drawframe()
        // 默认为 60 帧，wx.setPreferredFramesPerSecond([1 - 60])
        requestAnimationFrame(this.loop.bind(this))
    }

    // 逻辑帧处理补帧
    update(ts) {
        touch_manager.tick()
        game_center.update()
        updater.udt_update()
    }

    // 渲染帧直接画，注意保持渲染帧高于逻辑帧
    drawframe() {
        game_center.drawframe()
    }
}
