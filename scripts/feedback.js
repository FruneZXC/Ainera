document.addEventListener('DOMContentLoaded', () => {
	const slider = document.querySelector('.slider')
	const sliderNav = document.querySelector('.slider-nav')
	const slides = slider.querySelectorAll('.slide')
	let currentSlide = 0
	const totalSlides = slides.length
	const interval = 2000 // Change slide every 2 seconds

	function setupSlides() {
		slides.forEach((slide, index) => {
			const angle = (index * (360 / totalSlides) + 180) % 360
			const translateZ = -300
			slide.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`

			// Добавляем обработчик клика на слайд
			slide.addEventListener('click', () => goToSlide(index))
		})
		updateActiveSlide()
	}

	slides.forEach((_, index) => {
		const dot = document.createElement('div')
		dot.classList.add('slider-nav-item')
		dot.addEventListener('click', () => goToSlide(index))
		sliderNav.appendChild(dot)
	})

	function goToSlide(n) {
		currentSlide = n
		const angle = -(currentSlide * (360 / totalSlides))
		slider.style.transform = `rotateY(${angle}deg)`
		updateActiveSlide()
	}

	function updateActiveSlide() {
		slides.forEach((slide, index) => {
			slide.classList.toggle('active', index === currentSlide)
		})
		document.querySelectorAll('.slider-nav-item').forEach((dot, index) => {
			dot.classList.toggle('active', index === currentSlide)
		})
	}

	function nextSlide() {
		goToSlide((currentSlide + 1) % totalSlides)
	}

	function prevSlide() {
		goToSlide((currentSlide - 1 + totalSlides) % totalSlides)
	}

	// Start auto-scrolling
	let autoScrollInterval = setInterval(nextSlide, interval)

	// Mouse hover functionality
	const sliderContainer = document.querySelector('.slider-container')
	sliderContainer.addEventListener('mouseenter', () => {
		clearInterval(autoScrollInterval)
	})

	sliderContainer.addEventListener('mouseleave', () => {
		autoScrollInterval = setInterval(nextSlide, interval)
	})

	// Mouse drag functionality
	let isDragging = false
	let startPos = 0
	let currentTranslate = 0
	let prevTranslate = 0

	slider.addEventListener('mousedown', dragStart)
	slider.addEventListener('touchstart', dragStart)
	slider.addEventListener('mouseup', dragEnd)
	slider.addEventListener('touchend', dragEnd)
	slider.addEventListener('mousemove', drag)
	slider.addEventListener('touchmove', drag)
	slider.addEventListener('mouseleave', dragEnd)

	function dragStart(e) {
		if (e.type === 'touchstart') {
			startPos = e.touches[0].clientX
		} else {
			startPos = e.clientX
		}
		isDragging = true
	}

	function drag(e) {
		if (isDragging) {
			const currentPosition =
				e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
			currentTranslate = prevTranslate + currentPosition - startPos
			const angle = (currentTranslate / slider.offsetWidth) * -360
			slider.style.transform = `rotateY(${angle}deg)`
		}
	}

	function dragEnd() {
		isDragging = false
		const movedBy = currentTranslate - prevTranslate
		if (Math.abs(movedBy) > 100) {
			if (movedBy < 0) {
				nextSlide()
			} else {
				prevSlide()
			}
		} else {
			goToSlide(currentSlide)
		}
		prevTranslate = currentTranslate
	}

	// Initialize
	setupSlides()
	updateActiveSlide()
})