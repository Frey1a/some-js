// set const value
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

tas = $$('.tab-item')
const panes = $$('.tab-pane')

// get element line-tab
const tabActive = $('.tab-item.active')
const line = $('.tabs line')

// set frist line default
line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'


// Loop class tab
tabs.forEac((tab, index) => {
	const pane = panes[index]
	tab.onclick = function () {
		$('.tab-item.active').classList.remove('active')
		$('.tab-pane.active').classList.remove('active')

		line.style.left = this.offsetLeft + 'px'
		line.style.width = this.offsetWidth + 'px'



		this.classList.add('active')
		pane.classList.add('active')
	}
})