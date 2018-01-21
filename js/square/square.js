import Const from '../const'
import Sprite from '../base/sprite'

const Squares_Cfg = {
    1 : {
        img : 'images/1.png',
        tar : 2,
    },
    2 : {
        img : 'images/2.png',
        tar : 3,
    },
    3 : {
        img : 'images/3.png',
        tar : 4,
    },
    4 : {
        img : 'images/4.png',
        tar : 5,
    },
    5 : {
        img : 'images/5.png',
        tar : 6,
    },
    6 : {
        img : 'images/6.png',
        tar : 7,
    },
    7 : {
        img : 'images/7.png',
        tar : 8,
    },
    8 : {
        img : 'images/8.png',
        tar : null,
    }
}

export default class Square extends Sprite {
    constructor(lvl, idx, stat) {
        super(Squares_Cfg[lvl].img, Const.SQUARE_SLIDE_LENGTH, Const.SQUARE_SLIDE_LENGTH)
        let pos = Const[stat].idx2pos(idx)
        this.x = pos.x
        this.y = pos.y
        this.lvl = lvl
        this.stat = stat
        this.idx = idx
    }

    check_set_idx(idx) {
        return Const[this.stat].idx_in_arena(idx)
    }

    set_idx(idx) {
        let pos = Const[this.stat].idx2pos(idx)
        this.x = pos.x
        this.y = pos.y
        this.idx = idx
    }

    start_run() {
        this.stat = 'PANEL'
        this.running = true
        console.log('start')
    }

    stop_run() {
        this.running = false
    }

    update() {
        if (this.running) {
            this.y += Const.MOVEING_SPEED
            console.log(this.x, this.y)
            let idx = Const.PANEL.pos2idx(this.x, this.y)
            if (idx) {
                this.idx = idx
            }
        }
    }

    draw() {
        this.drawToCanvas(this.x, this.y)
    }
}
