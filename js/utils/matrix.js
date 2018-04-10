/**
 * 简单三阶矩阵
 */
export default class Matrix3 {
    constructor(m1, m2, m3, m4, m5, m6, m7, m8, m9) {
        this.matrix = [
            m1 || 1, m2 || 0, m3 || 0,
            m4 || 0, m5 || 1, m6 || 0,
            m7 || 0, m8 || 0, m9 || 1
        ]
    }

    identity() {
        this.matrix = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]
    }

    multiply(a) {
        this.matrix[0] = this.matrix[0] * a[0] + this.matrix[1] * a[3]
        this.matrix[1] = this.matrix[0] * a[1] + this.matrix[1] * a[4]
        this.matrix[2] = this.matrix[0] * a[2] + this.matrix[1] * a[5] + this.matrix[2]
        this.matrix[3] = this.matrix[3] * a[0] + this.matrix[4] * a[3]
        this.matrix[4] = this.matrix[3] * a[1] + this.matrix[4] * a[4]
        this.matrix[5] = this.matrix[3] * a[2] + this.matrix[4] * a[5] + this.matrix[5]
    }

    get_transform() {
        return [this.matrix[0], this.matrix[3], this.matrix[1], this.matrix[4], this.matrix[2], this.matrix[5]]
    }
}
