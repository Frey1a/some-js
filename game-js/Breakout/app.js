const user = document.querySelector('.the__user')
let leftUser = user.offsetLeft;
console.log(leftUser)

document.addEventListener('keydown', function (e) {
	e = e || window.event;
	let leftUser = user.offsetLeft
	console.log(leftUser)

	var keyCode = e.keyCode || e.which,
		arrow = {left: 37, up: 38, right: 39, down: 40};
	if (leftUser > 0 && leftUser < 425) {
		switch (keyCode) {
			case arrow.left:
				user.style.left = leftUser - 25 + "px"
				break;
			case arrow.right:
				user.style.left = leftUser + 25 + "px"
				break;
		}
	} else if (leftUser == 0) {
		switch (keyCode) {
			case arrow.right:
				user.style.left = leftUser + 25 + "px"
				break;
		}
	} else if (leftUser == 425) {
		switch (keyCode) {
			case arrow.left:
				user.style.left = leftUser - 25 + "px"
				break;
		}
	}


})
