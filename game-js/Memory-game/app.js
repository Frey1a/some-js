const cardArray = [
	{
		name: 'fries',
		img: './img/fries.png',
	},
	{
		name: 'hotdog',
		img: './img/hotdog.png',
	},
	{
		name: 'cheeseburger',
		img: './img/cheeseburger.png',
	},
	{
		name: 'ice-cream',
		img: './img/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: './img/milkshake.png',
	},
	{
		name: 'pizza',
		img: './img/pizza.png',
	},
	{
		name: 'fries',
		img: './img/fries.png',
	},
	{
		name: 'hotdog',
		img: './img/hotdog.png',
	},
	{
		name: 'cheeseburger',
		img: './img/cheeseburger.png',
	},
	{
		name: 'ice-cream',
		img: './img/ice-cream.png',
	},
	{
		name: 'milkshake',
		img: './img/milkshake.png',
	},
	{
		name: 'pizza',
		img: './img/pizza.png',
	},
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('.result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBroard() {
	for (let i = 0; i < cardArray.length; i++) {
		const card = document.createElement('img')
		card.setAttribute('src', './img/blank.png')
		card.setAttribute('data-id', i)
		card.addEventListener('click', flipCard)
		gridDisplay.append(card)
	}
}
createBroard()
resultDisplay.textContent = cardsWon.length

function checkMatch() {
	const cards = document.querySelectorAll('img')
	const optionOneId = cardsChosenIds[0]
	const optionTwoId = cardsChosenIds[1]
	console.log(optionOneId)
	console.log(optionTwoId)

	if (optionOneId == optionTwoId) {
		cards[optionOneId].setAttribute('src', './img/blank.png')
		cards[optionTwoId].setAttribute('src', './img/blank.png')
	} else {
		if (cardsChosen[0] == cardsChosen[1]) {
			alert('You found a match!')
			cards[cardsChosenIds[0]].setAttribute('src', 'img/white.png')
			cards[cardsChosenIds[1]].setAttribute('src', 'img/white.png')
			cards[cardsChosenIds[0]].removeEventListener('click', flipCard)
			cards[cardsChosenIds[1]].removeEventListener('click', flipCard)
			cardsWon.push(cardsChosen)
		} else {
			cards[optionOneId].setAttribute('src', './img/blank.png')
			cards[optionTwoId].setAttribute('src', './img/blank.png')
			alert('Sorry try again')
		}
	}

	cardsChosen = []
	cardsChosenIds = []
	resultDisplay.textContent = cardsWon.length
	if (cardsWon.length == cardArray.length / 2) {
		resultDisplay.innerHTML = "Congratulation you found them all!"
	}
}
function flipCard() {

	const cardId = this.getAttribute('data-id')
	cardsChosen.push(cardArray[cardId].name)
	cardsChosenIds.push(cardId)
	this.setAttribute('src', cardArray[cardId].img)
	if (cardsChosen.length === 2) {
		setTimeout(checkMatch, 500)
	}
}
