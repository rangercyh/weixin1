/*
=====================
=|11|12|13|14|15|16|=
=|21|22|23|24|25|26|=
=--------dis--------=
=|11|12|13|14|15|16|=
=|21|22|23|24|25|26|=
=|31|32|33|34|35|36|=
=|41|42|43|44|45|46|=
=|51|52|53|54|55|56|=
=|61|62|63|64|65|66|=
=|71|72|73|74|75|76|=
=====================
*/

// 方块边长
const SQUARE_SLIDE_LENGTH = 50
const MOVEING_SPEED = SQUARE_SLIDE_LENGTH / 5

// panel区域
const PANEL_ROW = 7
const PANEL_COL = 6

// 预准备区域
const PRE_ROW = 2
const PRE_COL = 6

// 分界
const DIS_HEIGHT = 30

// 边框
const FRAME_LENGTH = 10

let Args = {
    SQUARE_SLIDE_LENGTH : SQUARE_SLIDE_LENGTH,

    PANEL : {
        ROW : PANEL_ROW,
        COL : PANEL_COL,
        WIDTH : SQUARE_SLIDE_LENGTH * PANEL_COL,
        HEIGHT : SQUARE_SLIDE_LENGTH * PANEL_ROW,
        X : FRAME_LENGTH,
        Y : FRAME_LENGTH + SQUARE_SLIDE_LENGTH * PRE_ROW + DIS_HEIGHT,
        idx2pos : function(idx) {
            let row = parseInt(idx / 10)
            let col = idx % 10

            return {
                x : FRAME_LENGTH + (col - 1) * SQUARE_SLIDE_LENGTH,
                y : FRAME_LENGTH + DIS_HEIGHT + (PRE_ROW + row - 1) * SQUARE_SLIDE_LENGTH,
            }
        },
        idx_in_arena : function(idx) {
            let row = parseInt(idx / 10)
            let col = idx % 10
            if ((row >= 1 && row <= PANEL_ROW) && (col >= 1 && col <= PANEL_COL)) {
                return true
            }
        },
        pos2idx : function(x, y) {
            let x_dis = x - this.X
            let y_dis = y - this.Y
            // console.log(x_dis, y_dis, x_dis % SQUARE_SLIDE_LENGTH, y_dis % SQUARE_SLIDE_LENGTH)
            if (x_dis >= 0 && y_dis >= 0 && (x_dis % SQUARE_SLIDE_LENGTH == 0) && (y_dis % SQUARE_SLIDE_LENGTH == 0)) {
                let row = parseInt(y_dis / SQUARE_SLIDE_LENGTH) + 1
                let col = parseInt(x_dis / SQUARE_SLIDE_LENGTH) + 1
                let idx = row * 10 + col
                if (this.idx_in_arena(idx)) {
                    return idx
                }
            }
        },
        check_at_bottom(idx) {
            let row = parseInt(idx / 10)
            return row == this.ROW
        }
    },

    PRE : {
        ROW : PRE_ROW,
        COL : PRE_COL,
        WIDTH : SQUARE_SLIDE_LENGTH * PRE_COL,
        HEIGHT : SQUARE_SLIDE_LENGTH * PRE_ROW,
        X : FRAME_LENGTH,
        Y : FRAME_LENGTH,
        idx2pos : function(idx) {
            let row = parseInt(idx / 10)
            let col = idx % 10

            return {
                x : FRAME_LENGTH + (col - 1) * SQUARE_SLIDE_LENGTH,
                y : FRAME_LENGTH + (row - 1) * SQUARE_SLIDE_LENGTH,
            }
        },
        idx_in_arena : function(idx) {
            let row = parseInt(idx / 10)
            let col = idx % 10
            if ((row >= 1 && row <= PRE_ROW) && (col >= 1 && col <= PRE_COL)) {
                return true
            }
        },
        pos2idx : function(x, y) {
            let x_dis = x - this.X
            let y_dis = y - this.Y
            // console.log(x_dis, y_dis, x_dis % SQUARE_SLIDE_LENGTH, y_dis % SQUARE_SLIDE_LENGTH)
            if (x_dis >= 0 && y_dis >= 0 && (x_dis % SQUARE_SLIDE_LENGTH == 0) && (y_dis % SQUARE_SLIDE_LENGTH == 0)) {
                let row = parseInt(y_dis / SQUARE_SLIDE_LENGTH) + 1
                let col = parseInt(x_dis / SQUARE_SLIDE_LENGTH) + 1
                let idx = row * 10 + col
                if (this.idx_in_arena(idx)) {
                    return idx
                }
            }
        },
    },

    DIS_HEIGHT : DIS_HEIGHT,
    FRAME_LENGTH : FRAME_LENGTH,

    SCREEN_WIDTH : SQUARE_SLIDE_LENGTH * PRE_COL,
    SCREEN_HEIGHT : SQUARE_SLIDE_LENGTH * (PRE_ROW + PANEL_ROW) + DIS_HEIGHT,

    MOVEING_SPEED : MOVEING_SPEED,
    MOVING_LEFT : 1,
    MOVING_RIGHT : 2,
    MOVING_DOWN : 3,

    check_in_screen : function(x, y) {
        if ((x > this.FRAME_LENGTH && x < (this.FRAME_LENGTH + this.SCREEN_WIDTH)) &&
            (y > this.FRAME_LENGTH && y < (this.FRAME_LENGTH + this.SCREEN_HEIGHT))) {
            return true
        }
    },

    DUMP_BTN : {
        x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
        y : 100,
        w : 80,
        h : 30,
        style : "#0aaaff",
        font : "normal small-caps 25px arial",
        text : "打印",
        check_click : function(x, y) {
            let click = (x >= this.x && x <= (this.x + this.w)) &&
                        (y >= this.y && y <= (this.y + this.h))
            // console.log('dump btn click', click)
            return click
        },
    },
    RESTART_BTN : {
        x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
        y : 400,
        w : 80,
        h : 30,
        style : "#00FF00",
        font : "normal small-caps 25px arial",
        text : "重置",
        check_click : function(x, y) {
            let click = (x >= this.x && x <= (this.x + this.w)) &&
                        (y >= this.y && y <= (this.y + this.h))
            // console.log('restart btn click', click)
            return click
        },
    },
}

console.log(Args.SCREEN_WIDTH, Args.SCREEN_HEIGHT)

export default Args
