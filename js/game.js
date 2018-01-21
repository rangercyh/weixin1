import DrawSeq from './draw_seq'
import Const from './const'

let drawseq = new DrawSeq()

let init_squares = {
    idx : [23, 24],
    lvl : 1,
    stat : 'PRE',
}
// 初始化最开始的squares
export function add_new_squares() {
    init_squares.idx.forEach((v) => {
        drawseq.add_square(init_squares.lvl, v, init_squares.stat)
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
        if (squares.length > 0) {
            squares.forEach((v) => {
                v.start_run()
            })
        } else {
            databus.unlock_moving()
        }
    }
}

function check_touch_square(v1, v2) {
    if ((v1.idx % 10 == v2.idx % 10) && (v1.y + Const.SQUARE_SLIDE_LENGTH == v2.y)) {
        return true
    }
}

function check_stop(square, panel_list) {
    // 检查是否触底
    if (Const.PANEL.check_at_bottom(square.idx)) {
        return true
    }
    // 检查是否触及别的非running方块
    for (let v of panel_list) {
        if (!v.running && check_touch_square(square, v)) {
            return true
        }
    }
}

function check_gameover() {
    let pre_squares = drawseq.get_pre_squares()
    // console.log(pre_squares)
    if (pre_squares.length > 0) {
        return true
    }
}

export function game_update(databus) {
    let squares = drawseq.get_running_squares()
    if (squares.length > 0) {
        let panel_squares = drawseq.get_panel_squares()
        squares.forEach((v) => {
            if (check_stop(v, panel_squares)) {
                v.stop_run()
            }
        })
    } else {
        // 全部都stop之后做检查和变换
        if (databus.moving) {
            // 变换
            // 检查是否gameover
            if (check_gameover()) {
                databus.gameover = true
                return
            }
            // 产生新的pre方块
            add_new_squares()
            databus.unlock_moving()
        }
    }
    return false
}
