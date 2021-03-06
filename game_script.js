let canvas
let canvasContext
let snakeHeadX = [300]
let snakeHeadY = [200, 200, 200, 200]
const SNAKE_WIDTH = 20
const SNAKE_HEIGHT = 20
let moveSpeedX = 20
let moveSpeedY = 0
let foodX
let foodY
snakeHeadX[1] = snakeHeadX[0] - SNAKE_WIDTH
snakeHeadX[2] = snakeHeadX[1] - SNAKE_WIDTH
snakeHeadX[3] = snakeHeadX[2] - SNAKE_WIDTH

window.onload = function() {
	canvas = document.getElementById('gameCanvas')
	canvasContext = canvas.getContext('2d')
	randomFood()
	setInterval(callBoth, 61)
	document.addEventListener('keydown', keyPush)
}
function callBoth() {
	drawEverything()
	snakeMovement()
}
function drawEverything() {
	canvasContext.fillStyle = 'black'
	canvasContext.fillRect(0, 0, canvas.width, canvas.height)
	canvasContext.fillStyle = 'red'
	canvasContext.fillRect(foodX, foodY, SNAKE_WIDTH, SNAKE_HEIGHT)
	for(i = 0; i < snakeHeadX.length; i++) {
		canvasContext.fillStyle = 'green'
		canvasContext.fillRect(snakeHeadX[i], snakeHeadY[i], SNAKE_WIDTH, SNAKE_HEIGHT)
	}
}
function keyPush(e) {
	switch(e.keyCode) {
		// moveLeft
		case 37:
			if (moveSpeedX != 20) {
				moveSpeedX = -20
				moveSpeedY = 0
			}
			break
		// moveUp
		case 38:
			if (moveSpeedY != 20) {
				moveSpeedX = 0
				moveSpeedY = -20
			}
			break
		// moveRight
		case 39:
			if (moveSpeedX != -20) {
				moveSpeedX = 20
				moveSpeedY = 0
			}
			break
		// moveDown
		case 40:
			if (moveSpeedY != -20) {
				moveSpeedX = 0
				moveSpeedY = 20
			}
			break
	}
}
function randomFood() {
	foodX = (Math.ceil(Math.random() * 40) * 20)
	foodY = (Math.ceil(Math.random() * 30) * 20)
	if (foodX == 800) {
		foodX -= SNAKE_WIDTH
	}
	if (foodY == 600) {
		foodY -= SNAKE_HEIGHT
	}
}
function snakeMovement() {
	console.log(snakeHeadX[0], snakeHeadY[0])
	let tailX = [...snakeHeadX]
	let tailY = [...snakeHeadY]
	snakeHeadX[0] += moveSpeedX
	snakeHeadY[0] += moveSpeedY
	for(i = 1; i < tailX.length; i++) {
		snakeHeadX[i] = tailX[i - 1]
		snakeHeadY[i] = tailY[i - 1]
	}
	tailIncrement()
	gameOver()
}
function tailIncrement() {
	if (snakeHeadX[0] == foodX && snakeHeadY[0] == foodY) {
		snakeHeadX.push(snakeHeadX[snakeHeadX.length - 1])
		snakeHeadY.push(snakeHeadY[snakeHeadY.length - 1])
		randomFood()
	}
}
function gameOver() {
	if (snakeHeadX[0] < 0 || snakeHeadX[0] > (canvas.width - SNAKE_WIDTH) || snakeHeadY[0] < 0 || snakeHeadY[0] > (canvas.height - SNAKE_HEIGHT)) {
		snakeHeadX = [300]
		snakeHeadY = [200, 200, 200, 200]
		snakeHeadX[1] = snakeHeadX[0] - SNAKE_WIDTH
		snakeHeadX[2] = snakeHeadX[1] - SNAKE_WIDTH
		snakeHeadX[3] = snakeHeadX[2] - SNAKE_WIDTH
		moveSpeedX = 20
		moveSpeedY = 0
	}
	for (i = 3; i < snakeHeadX.length; i++) {
		if (snakeHeadX[0] == snakeHeadX[i] && snakeHeadY[0] == snakeHeadY[i]) {
			snakeHeadX = [300]
			snakeHeadY = [200, 200, 200, 200]
			snakeHeadX[1] = snakeHeadX[0] - SNAKE_WIDTH
			snakeHeadX[2] = snakeHeadX[1] - SNAKE_WIDTH
			snakeHeadX[3] = snakeHeadX[2] - SNAKE_WIDTH
			moveSpeedX = 20
			moveSpeedY = 0
		}
	}
}