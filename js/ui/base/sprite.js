import Matrix from '../../utils/matrix'

let ctx = canvas.getContext('2d')
/**
 * 游戏基础的精灵类
 */
export default class Sprite {
    constructor(img, x = 0, y = 0, width, height) {
        this.img = img

        this.x = x
        this.y = y
        this.width = width || img.width
        this.height = height || img.height

        this.add_x = 0
        this.add_y = 0
        this.scale_x = 1
        this.scale_y = 1
        this.degree = 0

        this.visible = true
    }

    /**
     * 将精灵图绘制在canvas上
     */
    draw(canvas_ctx = ctx) {
        if (!this.visible)
            return
        // 生效次序：位移、旋转、缩放
        canvas_ctx.translate(this.add_x, this.add_y)
        let rad = this.degree * Math.PI / 180
        let draw_x = this.x
        let draw_y = this.y
        if (rad != 0 || this.scale_x != 1 || this.scale_y != 1) {
            canvas_ctx.translate(this.width / 2, this.height / 2)
            draw_x = draw_x - this.width / 2
            draw_y = draw_y - this.height / 2
        }
        canvas_ctx.rotate(rad)
        canvas_ctx.scale(this.scale_x, this.scale_y)
        canvas_ctx.drawImage(
            this.img,
            draw_x,
            draw_y,
            this.width,
            this.height
        )
        canvas_ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    sr(x_scale = 1, y_scale = 1, degree = 0) {
        this.scale_x = this.scale_x * x_scale
        this.scale_y = this.scale_y * y_scale
        this.degree = this.degree + degree
    }

    ps(x = 0, y = 0, scale = 1) {
        this.scale_x = this.scale_x * scale
        this.scale_y = this.scale_y * scale
        this.add_x = this.add_x + x
        this.add_y = this.add_y + y
    }

    aabb() {
    }

    test(x, y) {

    }

    dump() {
        console.log('add_x = ', this.add_x, 'add_y = ', this.add_y)
        console.log('degree = ', this.degree)
        console.log('scale_x = ', this.scale_x, 'scale_y = ', this.scale_y)
    }
}

