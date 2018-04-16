let instance

export default class TouchManager {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.quene = []
        this.addTouchEvent()
    }

    addTouchEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()
            if (e.touches.length == 1) {
                this.quene.push({
                    x : e.touches[0].clientX,
                    y : e.touches[0].clientY,
                    what : 'start',
                })
            }
        }).bind(this))

        canvas.addEventListener('touchmove', ((e) => {
            e.preventDefault()
            if (e.touches.length == 1) {
                this.quene.push({
                    x : e.touches[0].clientX,
                    y : e.touches[0].clientY,
                    what : 'move',
                })
            }
        }).bind(this))

        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault()
            if (e.touches.length <= 0) {
                this.quene.push({
                    what : 'end',
                })
            }
        }).bind(this))
    }

    tick() {
        this.quene.forEach((v) => {
            window.game_center.on_touch(v)
        })
        this.quene = []
    }
}
