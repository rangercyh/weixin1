let EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  InQuad: function (t) { return t*t },
  // decelerating to zero velocity
  OutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  InOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  InCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  OutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  InOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  InQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  OutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  InOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  InQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  OutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  InOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

export default class Easing {
    constructor(type) {
        this.reset(type)
    }

    reset(type) {
        this.o_alive = true
        self.o_duration = 8
        self.v_time = 0
        self.o_from = 0
        self.o_to = 1
        self.v_change = self.o_to - self.o_from
        this.set_easing_type(type || 'OutCubic')
        this.v_duration_func = null
    }

    set_easing_type(type) {
        self.o_ease_type = EasingFunctions[type]
    }

    set_duration_func(d, f, a) {
        let f = Math.floor(self.o_duration * d)
        self.v_duration_func[f] = {
            func : f,
            a : a,
        }
    }

    tick() {
        let time = self.v_time
    }
}
