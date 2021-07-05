let in_game = false
let ufo_dy = 0
let ufo_dx = 0
let ufo_y = 0
let ufo_x = 0
let missile_y = 0
let interval_step = 0
let missile_x = 0
let bar_x = 0
let interval = 0
let in_missile = false
let point = 0
input.onButtonPressed(Button.A, function () {
    if (bar_x > 0) {
        led.unplot(bar_x, 4)
        bar_x = bar_x - 1
        led.plot(bar_x, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    if (bar_x < 4) {
        led.unplot(bar_x, 4)
        bar_x = bar_x + 1
        led.plot(bar_x, 4)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (!(in_missile)) {
        in_missile = true
        missile_x = bar_x
        missile_y = 3
    }
})
basic.forever(function () {
    point = 0
    interval = 500
    interval_step = 10
    ufo_x = 0
    ufo_y = 0
    ufo_dx = 1
    ufo_dy = 0
    bar_x = 2
    basic.showString("GO!")
    led.plot(0, 0)
    led.plot(bar_x, 4)
    basic.pause(interval)
    in_game = true
    while (in_game) {
        if (ufo_y == 0 && ufo_x == 4) {
            ufo_dx = 0
            ufo_dy = 1
        } else if (ufo_y == 1 && ufo_x == 4) {
            ufo_dx = -1
            ufo_dy = 0
        } else if (ufo_y == 1 && ufo_x == 0) {
            ufo_dx = 0
            ufo_dy = 1
        } else if (ufo_y == 2 && ufo_x == 0) {
            ufo_dx = 1
            ufo_dy = 0
        } else if (ufo_y == 2 && ufo_x == 4) {
            ufo_dx = 0
            ufo_dy = 1
        } else if (ufo_y == 3 && ufo_x == 4) {
            ufo_dx = -1
            ufo_dy = 0
        } else if (ufo_y == 3 && ufo_x == 0) {
            in_game = false
        }
        if (in_game) {
            if (Math.randomRange(0, 9) < 8) {
                led.plot(ufo_x + ufo_dx, ufo_y + ufo_dy)
                led.unplot(ufo_x, ufo_y)
                ufo_x = ufo_x + ufo_dx
                ufo_y = ufo_y + ufo_dy
            }
        } else {
            game.setScore(point)
            game.gameOver()
        }
        basic.pause(interval)
        if (in_game && in_missile) {
            if (missile_y < 0) {
                led.unplot(missile_x, missile_y + 1)
                in_missile = false
            } else {
                led.plot(missile_x, missile_y)
                led.unplot(missile_x, missile_y + 1)
                led.plot(ufo_x, ufo_y)
                if (missile_x == ufo_x && missile_y == ufo_y) {
                    point = point + 1
                    in_missile = false
                    ufo_x = 0
                    ufo_y = 0
                    ufo_dx = 1
                    ufo_dy = 0
                    if (interval - interval_step >= 0) {
                        interval = interval - interval_step
                    }
                    led.plot(ufo_x, ufo_y)
                    for (let i = 0; i < 30; i++) {
                        basic.pause(10)
                        led.toggle(missile_x, missile_y)
                    }
                    led.unplot(missile_x, missile_y)
                } else {
                    missile_y = missile_y - 1
                }
            }
        }
        led.plot(bar_x, 4)
    }
})