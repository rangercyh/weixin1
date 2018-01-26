import Const from '../const'
import Sprite from '../base/sprite'

export default class Square extends Sprite {
    constructor(id, lvl, idx, stat) {
        // console.log('new Square = ', id, lvl, idx, stat)
        let cfg = Const.Squares_Cfg.get(lvl)
        super(cfg.img, Const.SQUARE_SLIDE_LENGTH, Const.SQUARE_SLIDE_LENGTH)
        let pos = Const[stat].idx2pos(idx)
        this.x = parseInt(pos.x)
        this.y = parseInt(pos.y)
        this.lvl = parseInt(lvl)
        this.stat = stat
        this.idx = parseInt(idx)
        this.row = parseInt(idx / 10)
        this.col = parseInt(idx % 10)
        this.id = id
        this.running = 0
    }

    check_set_idx(idx) {
        return Const[this.stat].idx_in_arena(idx)
    }

    set_idx(idx) {
        let pos = Const[this.stat].idx2pos(idx)
        this.x = pos.x
        this.y = pos.y
        this.idx = idx
        this.row = parseInt(idx / 10)
        this.col = idx % 10
    }

    start_run(arrow) {
        this.running = arrow
        // console.log('start', this.id, this.idx)
    }

    stop_run() {
        this.running = 0
        // console.log('stop', this.id, this.idx)
    }

    flush_idx() {
        let idx = Const.PANEL.pos2idx(this.x, this.y)
        if (idx) {
            if (this.stat != 'PANEL') {
                this.stat = 'PANEL'
            }
            this.idx = idx
            this.row = parseInt(idx / 10)
            this.col = idx % 10
        }
        idx = Const.PRE.pos2idx(this.x, this.y)
        if (idx) {
            if (this.stat != 'PRE') {
                this.stat = 'PRE'
            }
            this.idx = idx
            this.row = parseInt(idx / 10)
            this.col = idx % 10
        }
    }

    update() {
        if (this.running == Const.RUNNING_ARROW.DOWN || this.running == Const.RUNNING_ARROW.SLIDE_DOWN) {
            this.y += Const.MOVEING_SPEED
            this.flush_idx()
        }
        if (this.running == Const.RUNNING_ARROW.LEFT) {
            this.x -= Const.MOVEING_SPEED
            this.flush_idx()
        }
        if (this.running == Const.RUNNING_ARROW.RIGHT) {
            this.x += Const.MOVEING_SPEED
            this.flush_idx()
        }
    }

    draw() {
        this.drawToCanvas(this.x, this.y)
    }
}
