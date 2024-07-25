document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('.section')
	const navItems = document.querySelectorAll('.nav div')

	function setActiveSection() {
		let index = sections.length
		while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

		navItems.forEach(item => item.classList.remove('active'))
		navItems[index].classList.add('active')

		sections.forEach(section => section.classList.remove('active'))
		sections[index].classList.add('active')
	}

	window.addEventListener('scroll', setActiveSection)

	navItems.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault()
			const targetId = item.getAttribute('data-section')
			const targetSection = document.getElementById(targetId)
			targetSection.scrollIntoView({ behavior: 'smooth' })
		})
	})

	setActiveSection()
})