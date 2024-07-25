document.addEventListener('DOMContentLoaded', function () {
	const invElements = document.querySelectorAll('.inv')
	const hoverSrc = 'assets/monetki.glb'
	const hoverTexts = document.querySelectorAll('.hover-text')

	invElements.forEach(invElement => {
		const modelViewer = invElement.querySelector('.coin-model')
		const interactiveText = invElement.querySelector('.interactive-text')
		const originalSrc = modelViewer.getAttribute('src')

		function handleMouseEnter() {
			modelViewer.setAttribute('src', hoverSrc)
			interactiveText.style.color = '#ffd700' // Изменяем цвет текста на желтый
			const hoverTextId = `${interactiveText.dataset.hoverText}-text`
			hoverTexts.forEach(hoverText => {
				if (hoverText.id === hoverTextId) {
					hoverText.classList.add('active')
				} else {
					hoverText.classList.remove('active')
				}
			})
		}

		function handleMouseLeave() {
			modelViewer.setAttribute('src', originalSrc)
			interactiveText.style.color = '' // Возвращаем исходный цвет текста
			hoverTexts.forEach(hoverText => {
				hoverText.classList.remove('active')
			})
		}

		// Добавляем обработчики событий как для текста, так и для модели монетки
		interactiveText.addEventListener('mouseenter', handleMouseEnter)
		interactiveText.addEventListener('mouseleave', handleMouseLeave)
		modelViewer.addEventListener('mouseenter', handleMouseEnter)
		modelViewer.addEventListener('mouseleave', handleMouseLeave)
	})
})