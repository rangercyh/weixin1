/**
 * 实现一个工具, 用于方便的注册和取消一些每一帧执行的函数
 *
 * 注册: udt_add_updater
 * 取消: udt_remove_updater
 * 每帧调用一次: udt_update
 *
 */
export default class Updater {
    constructor() {
        this.pool = new Map()
        this.freenode = []
        this.count = 0
    }

    udt_add_updater(cb, ud) {
        let p
        if (this.freenode.length > 0) {
            p = this.freenode.pop()
        }
        if (p) {
            this.pool.set(p, {
                cb : cb,
                ud : ud,
            })
        } else {
            this.pool.set(this.count + 1, {
                cb : cb,
                ud : ud,
            })
            p = this.count + 1
        }
        this.count++
        return p
    }

    udt_remove_updater(handle) {
        if (this.pool.has(handle)) {
            this.pool.delete(handle)
            this.freenode.push(handle)
            this.count--
        }
    }

    udt_update() {
        this.pool.forEach((v) => {
            v.cb(v.ud)
        })
    }

    dump() {
        console.log(this.pool)
        console.log(this.freenode)
        console.log(this.count)
    }
}
