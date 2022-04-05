const squares = document.querySelectorAll('.content__grid--square')
const mole = document.querySelector('.mole')
const timeRun = document.getElementById("info--time")
const score = document.querySelector('#info--scores')


let result = 0;
let hitPosition;
let currentTime = 5


function randomSquare() {
	removeMole()
	let randomSquare = squares[Math.floor(Math.random() * 9)]
	randomSquare.classList.add('mole')

	hitPosition = randomSquare.id


}

squares.forEach(square => {
	square.addEventListener('mousedown', () => {
		if (square.id == hitPosition) {
			result++
			score.textContent = result
			hitPosition = null

		}
	})
})
function removeMole() {
	squares.forEach(square => {
		square.classList.remove('mole')
	})

}

function moveMole() {
	setInterval(randomSquare, 500)
}

function countDown() {
	if (currentTime >= 1) {
		currentTime--
	}
	else {
		currentTime === 0
	}
	timeRun.textContent = currentTime
	if (currentTime >= 1) {
		moveMole()
	}
	else if (currentTime === 0) {
		clearInterval(countDownTimerId)
		removeMole()
		alert("GAME OVER!")
	}

}
let countDownTimerId = setInterval(countDown, 1000)





