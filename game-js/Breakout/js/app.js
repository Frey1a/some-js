const mainGrid = document.querySelector(".main__grid")
const scoreDisplay = document.querySelector('.main__header--scout')

const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 500
let xDirection = -2
let yDirection = 2


const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0


class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis]
		this.bottomRight = [xAxis + blockWidth, yAxis]
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
		this.topLeft = [xAxis, yAxis + blockHeight]
	}
}


//all my blocks
const blocks = [
	new Block(10, 470),
	new Block(120, 470),
	new Block(230, 470),
	new Block(340, 470),
	new Block(450, 470),
	new Block(10, 440),
	new Block(120, 440),
	new Block(230, 440),
	new Block(340, 440),
	new Block(450, 440),
	new Block(10, 410),
	new Block(120, 410),
	new Block(230, 410),
	new Block(340, 410),
	new Block(450, 410),
	new Block(10, 380),
	new Block(120, 380),
	new Block(230, 380),
	new Block(340, 380),
	new Block(450, 380),
	new Block(10, 350),
	new Block(120, 350),
	new Block(230, 350),
	new Block(340, 350),
	new Block(450, 350),
	new Block(10, 320),
	new Block(120, 320),
	new Block(230, 320),
	new Block(340, 320),
	new Block(450, 320),



]

//draw my blocks
function addBlocks() {
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement('div')
		block.classList.add('grid__block')
		block.style.left = blocks[i].bottomLeft[0] + 'px'
		block.style.bottom = blocks[i].bottomLeft[1] + 'px'
		mainGrid.appendChild(block)
	}
}
addBlocks()



function createDiv(className) {
	const name = document.createElement("div")
	name.classList.add(className)
	return name

}


const user = createDiv("grid__user")
mainGrid.appendChild(user)
drawUser()


const ball = createDiv("grid__ball")
mainGrid.appendChild(ball)
drawBall()


//move user
function moveUser(e) {
	switch (e.key) {
		case 'ArrowLeft':
			if (currentPosition[0] > 0) {
				currentPosition[0] -= 10
				drawUser()
			}
			break
		case 'ArrowRight':
			if (currentPosition[0] < (boardWidth - blockWidth)) {
				currentPosition[0] += 10
				drawUser()
			}
			break
	}
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
	user.style.left = currentPosition[0] + 'px'
	user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
	ball.style.left = ballCurrentPosition[0] + 'px'
	ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
	ballCurrentPosition[0] += xDirection
	ballCurrentPosition[1] += yDirection
	drawBall()
	checkForCollisions()
}
timerId = setInterval(moveBall, 15)

//check for collisions
function checkForCollisions() {
	//check for block collision
	for (let i = 0; i < blocks.length; i++) {
		if
			(
			(ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
			((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
		) {
			const allBlocks = Array.from(document.querySelectorAll('.grid__block'))
			allBlocks[i].classList.remove('grid__block')
			blocks.splice(i, 1)
			changeDirection()
			score++
			scoreDisplay.innerHTML = score
			if (blocks.length == 0) {
				scoreDisplay.innerHTML = 'You Win!'
				clearInterval(timerId)
				document.removeEventListener('keydown', moveUser)
			}
		}
	}
	// check for wall hits
	if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
		changeDirection()
	}

	//check for user collision
	if
		(
		(ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
		(ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
	) {
		changeDirection()
	}

	//game over
	if (ballCurrentPosition[1] <= 0) {
		clearInterval(timerId)
		scoreDisplay.innerHTML = 'You lose!'
		document.removeEventListener('keydown', moveUser)
	}
}


function changeDirection() {
	if (xDirection === 2 && yDirection === 2) {
		yDirection = -2
		return
	}
	if (xDirection === 2 && yDirection === -2) {
		xDirection = -2
		return
	}
	if (xDirection === -2 && yDirection === -2) {
		yDirection = 2
		return
	}
	if (xDirection === -2 && yDirection === 2) {
		xDirection = 2
		return
	}
}








