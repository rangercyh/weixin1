import DrawSeq from './draw_seq'
import Const from './const'
import Square from './square/square'

let drawseq = new DrawSeq()

let init_squares = {
    idx : [23, 24],
    lvl : 1,
    stat : 'PRE',
}
// 初始化最开始的squares
export function init_squares() {
    init_squares.idx.forEach((v) => {
        drawseq.add_square(new Square(init_squares.lvl, v, init_squares.stat))
    })
    // let idx = Const.PANEL.pos2idx(10, 140)
    // if (idx) {
    //     console.log(10, 140, idx)
    // }
    // console.log('init')
    // for (let i = 0; i < 331; i++) {
    //     for (let j = 0; j < 600; j++) {
    //         let idx = Const.PRE.pos2idx(i, j)
    //         if (idx) {
    //             console.log(i, j, idx)
    //         }
    //     }
    // }
}

export function move_effect(databus, move_dir) {
    console.log('方向：', move_dir)
    // 上锁
    if (move_dir == Const.MOVING_LEFT) {
        let squares = drawseq.get_pre_squares()
        let can_move = true
        for (let v of squares) {
            if (!v.check_set_idx(v.idx - 1)) {
                can_move = false
                break
            }
        }
        if (can_move) {
            squares.forEach((v) => {
                v.set_idx(v.idx - 1)
            })
        }
    }
    if (move_dir == Const.MOVING_RIGHT) {
        let squares = drawseq.get_pre_squares()
        let can_move = true
        for (let v of squares) {
            if (!v.check_set_idx(v.idx + 1)) {
                can_move = false
                break
            }
        }
        if (can_move) {
            squares.forEach((v) => {
                v.set_idx(v.idx + 1)
            })
        }
    }
    if (move_dir == Const.MOVING_DOWN) {
        databus.lock_moving()
        let squares = drawseq.get_pre_squares()
        console.log(squares)
        if (squares.length > 0) {
            console.log(squares.length)
            squares.forEach((v) => {
                v.start_run()
            })
        } else {
            databus.unlock_moving()
        }
    }
}

export function game_update() {
    let squares = drawseq.get_running_squares()
    if (squares.length > 0) {
        squares.forEach((v) => {
            if (Const.PANEL.check_at_bottom(v.idx)) {
                console.log('game_update stop')
                v.stop_run()
            }
        })
    }
    return false
}
