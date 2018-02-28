import './js/libs/weapp-adapter'
import './js/libs/symbol'
import Const from './js/const'

import Main from './js/main'

let main = new Main()

// 0为竖屏，1为横屏
let lastState = 0;
let lastTime = Date.now();
wx.onAccelerometerChange(function(res) {
    const now = Date.now();
    // 500ms检测一次
    if (now - lastTime < 200) {
        return;
    }
    lastTime = now;
    if (res.x > 0.3) {
        main.slide(Const.SLIDE_RIGHT)
    }
    if (res.x < -0.3) {
        main.slide(Const.SLIDE_LEFT)
    }

    // let nowState;
    // // 57.3 = 180 / Math.PI
    // const Roll = Math.atan2(-res.x, Math.sqrt(res.y * res.y + res.z * res.z)) * 57.3;
    // const Pitch = Math.atan2(res.y, res.z) * 57.3;
    // // 横屏状态
    // if (Roll > 50) {
    //     if ((Pitch > -180 && Pitch < -60) || (Pitch > 130)) {
    //         nowState = 1;
    //     } else {
    //         nowState = lastState;
    //     }
    // } else if ((Roll > 0 && Roll < 30) || (Roll < 0 && Roll > -30)) {
    //     let absPitch = Math.abs(Pitch);
    //     // 如果手机平躺，保持原状态不变，40容错率
    //     if ((absPitch > 140 || absPitch < 40)) {
    //         nowState = lastState;
    //     } else if (Pitch < 0) { /* 收集竖向正立的情况 */
    //         nowState = 0;
    //     } else {
    //         nowState = lastState;
    //     }
    // }
    // else {
    //   nowState = lastState;
    // }
    // // 状态变化时，触发
    // if (nowState !== lastState) {
    //     lastState = nowState;
    //     if (nowState === 1) {
    //         console.log('change:横屏');
    //     } else {
    //         console.log('change:竖屏');
    //     }
    // }

    // if (last_x) {
    //     if (Math.abs(last_x - res.x) > 0.2 && res.x < -0.2) {
    //         main.slide(Const.SLIDE_LEFT)
    //     }
    //     if (Math.abs(last_x - res.x) > 0.2 && res.x > 0.2) {
    //         main.slide(Const.SLIDE_RIGHT)
    //     }
    // } else {
    //     if (res.x > 0.2) { // 右倾
    //         main.slide(Const.SLIDE_RIGHT)
    //     }
    //     if (res.x < -0.2) {
    //         main.slide(Const.SLIDE_LEFT)
    //     }
    // }
    // last_x = res.x
})
