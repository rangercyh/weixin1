let ctx = canvas.getContext('2d')
/**
 * 游戏基础的精灵类
 */
export default class Sprite {
    constructor(imgSrc = '', width = 0, height = 0) {
        this.img = new Image()
        this.img.src = imgSrc

        this.width = width
        this.height = height

        this.visible = true
    }

    /**
     * 将精灵图绘制在canvas上
     */
    drawToCanvas(x = 0, y = 0, canvas_ctx = ctx) {
        if (!this.visible)
            return

        canvas_ctx.drawImage(
            this.img,
            x, y,
            this.width,
            this.height
        )
    }

    update() {}
}
