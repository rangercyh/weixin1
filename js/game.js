import Const from './const'
import Square from './square/square'
import DrawSeq from './draw_seq'

let drawseq = new DrawSeq()
let game_over = false

const Squares_Cfg = {
    s1 : {
        img : 'images/1.png',
        tar : 's2'
    },
    s2 : {
        img : 'images/2.png',
        tar : 's3',
    },
    s3 : {
        img : 'images/3.png',
        tar : 's4',
    },
    s4 : {
        img : 'images/4.png',
        tar : 's5',
    },
    s5 : {
        img : 'images/5.png',
        tar : 's6',
    },
    s6 : {
        img : 'images/6.png',
        tar : 's7',
    },
    s7 : {
        img : 'images/7.png',
        tar : 's8',
    },
    s8 : {
        img : 'images/8.png',
        tar : null,
    }
}

const init_x = Const.FRAME_LENGTH + Const.SQUARE_SLIDE_LENGTH * 2
const init_y = Const.FRAME_LENGTH + Const.SQUARE_SLIDE_LENGTH

// 初始化最开始的squares
export function init_squares() {
    let s1 = new Square(Squares_Cfg.s1.img)
    s1.set(init_x, init_y)
    drawseq.add_pre_square(s1)
    let s2 = new Square(Squares_Cfg.s1.img)
    s2.set(init_x + Const.SQUARE_SLIDE_LENGTH, init_y)
    drawseq.add_pre_square(s2)
    game_over = false
}

export function move_effect(move_dir) {
    console.log('方向：', move_dir)
    // 上锁
    if (move_dir == 3) {
        game_over = true
    }
}

export function game_update() {
    return game_over
}
