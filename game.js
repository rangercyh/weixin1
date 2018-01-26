import './js/libs/weapp-adapter'
import './js/libs/symbol'
import Const from './js/const'

import Main from './js/main'

let main = new Main()

let last_x
wx.onAccelerometerChange(function(res) {
    // if (last_x) {
    //     let delta = res.x - last_x
    //     if ((delta > 0) && (Math.abs(delta) >= 0.5)) { // 左倾
    //         main.slide(Const.SLIDE_RIGHT)
    //     } else {
    //         main.slide(Const.SLIDE_LEFT)
    //     }
    // }
    // last_x = res.x
    if ((res.x >= 0 && res.x <= 1) && (res.y >= -0.8 && res.y < 0)) {  // 右倾
        // main.slide(Const.SLIDE_RIGHT)
    }
    if ((res.x >= -1 && res.x <= 0) && (res.y >= -0.9 && res.y < 0)) {  // 左倾
        // main.slide(Const.SLIDE_LEFT)
    }
})
