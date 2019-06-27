let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 25;
let ctx = canvas.getContext('2d');
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

let combo = function (left, top, width, height, color, type) {
    this.type = type;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = -1;
    this.speedY = -1;

    this.createC = function () {
        if (this.type == 'text') {
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.font = this.width + "px " + this.height;
            ctx.fillText(this.color + diem,this.left,this.top);
        } else {
            if (this.height > 0) {
                ctx.beginPath();
                ctx.rect(this.left, this.top, this.width, this.height);
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.left,this.top, this.width, this.height, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                //ctx.closePath();
            }
        }
    }

    this.updateC = function () {
        this.left += this.speedX;
        this.top += this.speedY;
    }

    this.clearC = function () {
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    this.diChuyen = function () {
        if (rightPressed && this.left < canvas.width - this.width) {
            this.left += 3;
        } else if (leftPressed && this.left > 0) {
            this.left -= 3;
        }
    }
}

let nums = 0;
let diem = 0;

let quaBong = new combo(canvas.width / 2, canvas.height - 11, 8, 0, 'violet');
let thanhDo = new combo(canvas.width / 2 - 60, canvas.height - 3, 120, 3, 'grey');
let score = new combo(10, 30, 30, 'Arial', 'SCORE : ', 'text');

function check() {
    for (i=quaBong.top;i<=quaBong.top+thanhDo.width;i++){
        for (j= thanhDo.top;j<=thanhDo.top+thanhDo.height;j++){
            if (i == j) {
                return true;
                break;
            }
        }
    }
    return false;
}

function start() {
    nums++;
    if (nums % 100 == 0) {
        diem++;
    }
    quaBong.clearC();
    score.createC();
    quaBong.createC();
    thanhDo.createC();
    quaBong.updateC();
    thanhDo.diChuyen();

    if (quaBong.top < quaBong.width ||
        (check() && quaBong.top + quaBong.width > thanhDo.top &&
            quaBong.top < thanhDo.top + thanhDo.height &&
            quaBong.left + quaBong.width > thanhDo.left &&
            quaBong.left < thanhDo.left + thanhDo.width)) {
        quaBong.speedY = -quaBong.speedY;
    }
    if (quaBong.top > canvas.height - quaBong.width) {
        clearInterval(interval);
        alert('GAME OVER');
        document.location.reload();
    }
    if (quaBong.left < quaBong.width || quaBong.left > canvas.width - quaBong.width) {
        quaBong.speedX = -quaBong.speedX;
    }

}

let interval = setInterval(start, 1);