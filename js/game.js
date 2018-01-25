import DrawSeq from './draw_seq'
import Const from './const'
import Chance from './libs/chance'

let chance = new Chance()
let drawseq = new DrawSeq()

let init_squares = {
    idx : [23, 24],
    lvl : 1,
    stat : 'PRE',
}
// 初始化最开始的squares
export function add_new_squares(init) {
    if (init) {
        init_squares.idx.forEach((v) => {
            drawseq.add_square(init_squares.lvl, v, init_squares.stat)
        })
    } else {
        let map = drawseq.get_squares_map()
        let key_arr = []
        let val_arr = []
        for (let i in map) {
            key_arr.push(i)
            val_arr.push(map[i])
        }
        let arr = chance.n(chance.weighted, 2, key_arr, val_arr)
        if (arr.length == init_squares.idx.length) {
            init_squares.idx.forEach((v, i) => {
                drawseq.add_square(arr[i], v, init_squares.stat)
            })
        }
    }
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
        databus.lock_moving(Const.RUNNING_ARROW.DOWN)
        let squares = drawseq.get_pre_squares()
        if (squares.length > 0) {
            squares.forEach((v) => {
                v.start_run(Const.RUNNING_ARROW.DOWN)
            })
        } else {
            databus.unlock_moving()
        }
    }
}

function check_touch_square(v1, v2) {
    let v1_row = v1.stat == 'PANEL' && v1.row || v1.row - Const.PRE.ROW
    let v2_row = v2.stat == 'PANEL' && v2.row || v2.row - Const.PRE.ROW
    if (v1.running == Const.RUNNING_ARROW.DOWN || v1.running == Const.RUNNING_ARROW.SLIDE_DOWN) {
        if (v1.col == v2.col && (v1_row + 1 == v2_row)) {
            return true
        }
    }
    if (v1.running == Const.RUNNING_ARROW.LEFT) {
        if (v1_row == v2_row && (v1.col - 1 == v2.col)) {
            return true
        }
    }
    if (v1.running == Const.RUNNING_ARROW.RIGHT) {
        if (v1_row == v2_row && (v1.col + 1 == v2.col)) {
            return true
        }
    }
}

function check_stop(square, panel_list) {
    // 检查是否触边
    if ((square.stat == 'PANEL') && Const.PANEL.check_at_bottom(square.idx, square.running)) {
        console.log('触边', square.id, square.running)
        return true
    }
    // 检查是否触及别的非running方块
    for (let v of panel_list) {
        if (!(v.running > 0) && check_touch_square(square, v)) {
            console.log('触块', square.id, square.running)
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

function get_near_square_id(square, panel_squares, pre_squares) {
    let near_ids = []

    return near_ids
}

function transform_squares(databus, moving) {
    let pre_squares = drawseq.get_pre_squares()
    let panel_squares = drawseq.get_panel_squares()
    if (panel_squares.length > 0) {
        panel_squares.sort(function(a, b) {
            if (a.row > b.row) {
                return -1
            } else if (a.row == b.row) {
                return a.col - b.col
            } else {
                return 1
            }
        })
        let dis_tb = []
        let check_tb = new Set()
        panel_squares.forEach((v) => {
            if (!check_tb.has(v.id) && v.lvl < Const.Max_Square_Lvl) {
                let near_ids = get_near_square_id(v, panel_squares, pre_squares)
                if (near_ids.length >= Const.DISAPPEAR_NUM) {
                    dis_tb.push({
                        start : v.idx,
                        dis : near_ids,
                        lvl : v.lvl,
                    })
                }
                near_ids.forEach((id) => {
                    check_tb.add(id)
                })
            }
        })
        if (dis_tb.length > 0) {
            dis_tb.forEach((v) => {
                v.dis.forEach((id) => {
                    drawseq.remove_square(id)
                })
                drawseq.add_square(v.lvl + 1, v.start, 'PANEL')
            })
            databus.slide_down()
            return true
        }
    }
    return false
}

export function game_update(databus) {
    let tb = drawseq.get_moving_squares()
    let squares = tb.squares
    if (squares.length > 0) {
        let check_squares
        if (tb.arrow == Const.RUNNING_ARROW.DOWN || tb.arrow == Const.RUNNING_ARROW.SLIDE_DOWN) {
            check_squares = drawseq.get_squares()
        } else {
            check_squares = drawseq.get_panel_squares()
        }
        squares.forEach((v) => {
            if (check_stop(v, check_squares)) {
                v.stop_run()
            }
        })
    } else {
        // 全部都stop之后做检查和变换
        if (!transform_squares(databus, databus.moving)) { // 没有变化
            if (databus.moving == Const.RUNNING_ARROW.DOWN || databus.moving == Const.RUNNING_ARROW.SLIDE_DOWN) {
                // 检查是否gameover
                if (check_gameover()) {
                    databus.gameover = true
                    return
                }
                // 产生新的pre方块
                add_new_squares()
            }
            databus.unlock_moving()
        }
    }
    return false
}

export function change_pre_squares() {
    let pre_squares = drawseq.get_pre_squares()
    if (pre_squares.length == init_squares.idx.length) {
        let a = pre_squares[0]
        let b = pre_squares[1]
        if (a.row != b.row) {   // 同列
            if (a.id < b.id) {
                b.set_idx(a.row * 10 + a.col + 1)
            } else {
                a.set_idx(b.row * 10 + b.col + 1)
            }
        } else {
            if (a.id < b.id) {
                b.set_idx((a.row - 1) * 10 + a.col)
            } else {
                a.set_idx((b.row - 1) * 10 + b.col)
            }
        }
    }
}
