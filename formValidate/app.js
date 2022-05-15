const register = document.querySelector("#register")
const signIn = document.querySelector("#sign-in")

register.classList.add("hiden")
register.opacity = 0


signIn.querySelector(".form__sign button").addEventListener("click", function () {
	signIn.style.opacity = 0
	setTimeout(function () {
		signIn.classList.add("hiden")
		register.classList.remove("hiden")
		register.style.opacity = 1
	}, 500)

})
register.querySelector(".form__sign button").addEventListener("click", function () {
	register.style.opacity = 0

	setTimeout(function () {
		register.classList.add("hiden")
		signIn.classList.remove("hiden")
		signIn.style.opacity = 1
	}, 500)


})

