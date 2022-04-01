const squares = document.querySelectorAll('.content__grid--square')
const mole = document.querySelector('.mole')
const timeRun = document.querySelector('#info--time')
const score = document.querySelector('#info--scores')


let result = 0;
let hitPosition;
let currentTime = 60


function randomSquare() {
	squares.forEach(square => {
		square.classList.remove('mole')
	})

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

function moveMole() {
	let timeId = null
	timeId = setInterval(randomSquare, 1000)
}

function countDown(){
				currentTime --
moveMole()
				timeRun.textContent = currentTime

				if(currentTime === 0){
								clearInterval(countDownTimerId)
								alert("GAME OVER!")
				}
				
}
let countDownTimerId = setInterval(countDown, 1000)





