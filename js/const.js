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
const DISAPPEAR_NUM = 3
const Max_Square_Lvl = 8

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

const RUNNING_DOWN = 1
const RUNNING_LEFT = 2
const RUNNING_RIGHT = 3
const RUNNING_SLIDE_DOWN = 4

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
        check_at_bottom(idx, running) {
            if (running == RUNNING_DOWN || running == RUNNING_SLIDE_DOWN) {
                let row = parseInt(idx / 10)
                return row == this.ROW
            }
            if (running == RUNNING_LEFT) {
                let col = idx % 10
                return col == 1
            }
            if (running == RUNNING_RIGHT) {
                let col = idx % 10
                return col == this.COL
            }
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

    SLIDE_LEFT : 1,
    SLIDE_RIGHT : 2,

    Max_Square_Lvl : Max_Square_Lvl,
    DISAPPEAR_NUM : DISAPPEAR_NUM,

    RUNNING_ARROW : {
        DOWN : RUNNING_DOWN,
        LEFT : RUNNING_LEFT,
        RIGHT : RUNNING_RIGHT,
        SLIDE_DOWN : RUNNING_SLIDE_DOWN,
    },

    check_in_screen : function(x, y) {
        if ((x > this.FRAME_LENGTH && x < (this.FRAME_LENGTH + this.SCREEN_WIDTH)) &&
            (y > this.FRAME_LENGTH && y < (this.FRAME_LENGTH + this.SCREEN_HEIGHT))) {
            return true
        }
    },

    BTNS : {
        DUMP_BTN : {
            x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
            y : 100,
            w : 80,
            h : 30,
            style : "#0aaaff",
            font : "normal small-caps 25px arial",
            text : "打印",
            text_x : function() {
                return this.x + 14
            },
            text_y : function() {
                return this.y + 22
            },
            check_click : function(x, y) {
                let click = (x >= this.x && x <= (this.x + this.w)) &&
                            (y >= this.y && y <= (this.y + this.h))
                // console.log('dump btn click', click)
                return click
            },
        },
        END_BTN : {
            x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
            y : 200,
            w : 80,
            h : 30,
            style : "#0aaaff",
            font : "normal small-caps 25px arial",
            text : "结束",
            text_x : function() {
                return this.x + 14
            },
            text_y : function() {
                return this.y + 22
            },
            check_click : function(x, y) {
                let click = (x >= this.x && x <= (this.x + this.w)) &&
                            (y >= this.y && y <= (this.y + this.h))
                // console.log('restart btn click', click)
                return click
            },
        },
        SLIDE_LEFT_BTN : {
            x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
            y : 300,
            w : 80,
            h : 30,
            style : "#0aaaff",
            font : "normal small-caps 25px arial",
            text : "左倾",
            text_x : function() {
                return this.x + 14
            },
            text_y : function() {
                return this.y + 22
            },
            check_click : function(x, y) {
                let click = (x >= this.x && x <= (this.x + this.w)) &&
                            (y >= this.y && y <= (this.y + this.h))
                // console.log('restart btn click', click)
                return click
            },
        },
        SLIDE_RIGHT_BTN : {
            x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
            y : 400,
            w : 80,
            h : 30,
            style : "#0aaaff",
            font : "normal small-caps 25px arial",
            text : "右倾",
            text_x : function() {
                return this.x + 14
            },
            text_y : function() {
                return this.y + 22
            },
            check_click : function(x, y) {
                let click = (x >= this.x && x <= (this.x + this.w)) &&
                            (y >= this.y && y <= (this.y + this.h))
                // console.log('restart btn click', click)
                return click
            },
        },
        SLIDE_DOWN_BTN : {
            x : SQUARE_SLIDE_LENGTH * PRE_COL + 2 * FRAME_LENGTH + 10,
            y : 600,
            w : 80,
            h : 30,
            style : "#0aaaff",
            font : "normal small-caps 25px arial",
            text : "下倾",
            text_x : function() {
                return this.x + 14
            },
            text_y : function() {
                return this.y + 22
            },
            check_click : function(x, y) {
                let click = (x >= this.x && x <= (this.x + this.w)) &&
                            (y >= this.y && y <= (this.y + this.h))
                // console.log('restart btn click', click)
                return click
            },
        },
    },
    RESTART_BTN : {
        x : 0,
        y : 0,
        w : SQUARE_SLIDE_LENGTH * PRE_COL + FRAME_LENGTH * 2,
        h : SQUARE_SLIDE_LENGTH * (PRE_ROW + PANEL_ROW) + DIS_HEIGHT + FRAME_LENGTH * 2,
        style : "rgba(255,165,0,0.5)",
        font : "normal small-caps 25px arial",
        text : "GAMEOVER",
        text_x : function() {
            return this.x + 90
        },
        text_y : function() {
            return this.y + 200
        },
        check_click : function(x, y) {
            let click = (x >= this.x && x <= (this.x + this.w)) &&
                        (y >= this.y && y <= (this.y + this.h))
            // console.log('restart btn click', click)
            return click
        },
    },
    Squares_Cfg : {
        1 : {
            img : 'images/1.png',
            tar : 2,
            score : 10,
        },
        2 : {
            img : 'images/2.png',
            tar : 3,
            score : 100,
        },
        3 : {
            img : 'images/3.png',
            tar : 4,
            score : 200,
        },
        4 : {
            img : 'images/4.png',
            tar : 5,
            score : 400,
        },
        5 : {
            img : 'images/5.png',
            tar : 6,
            score : 800,
        },
        6 : {
            img : 'images/6.png',
            tar : 7,
            score : 2000,
        },
        7 : {
            img : 'images/7.png',
            tar : 8,
            score : 4000,
        },
        8 : {
            img : 'images/8.png',
            tar : null,
            score : 10000,
        }
    }
}

console.log(Args.SCREEN_WIDTH, Args.SCREEN_HEIGHT)

export default Args
