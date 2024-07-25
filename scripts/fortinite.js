var container = document.querySelector('#unity-container')
var canvas = document.querySelector('#unity-canvas')
var loadingBar = document.querySelector('#unity-loading-bar')
var progressBarFull = document.querySelector('#unity-progress-bar-full')
var fullscreenButton = document.querySelector('#unity-fullscreen-button')
var warningBanner = document.querySelector('#unity-warning')

// Shows a temporary message banner/ribbon for a few seconds, or
// a permanent error message on top of the canvas if type=='error'.
// If type=='warning', a yellow highlight color is used.
// Modify or remove this function to customize the visually presented
// way that non-critical warnings and error messages are presented to the
// user.
function unityShowBanner(msg, type) {
	function updateBannerVisibility() {
		warningBanner.style.display = warningBanner.children.length
			? 'block'
			: 'none'
	}
	var div = document.createElement('div')
	div.innerHTML = msg
	warningBanner.appendChild(div)
	if (type == 'error') div.style = 'background: red; padding: 10px;'
	else {
		if (type == 'warning') div.style = 'background: yellow; padding: 10px;'
		setTimeout(function () {
			warningBanner.removeChild(div)
			updateBannerVisibility()
		}, 5000)
	}
	updateBannerVisibility()
}

var buildUrl = '../assets/brook'
var loaderUrl = buildUrl + '/q.loader.js'
var config = {
	dataUrl: buildUrl + '/q.data',
	frameworkUrl: buildUrl + '/q.framework.js',
	codeUrl: buildUrl + '/q.wasm',
	streamingAssetsUrl: 'StreamingAssets',
	companyName: 'DefaultCompany',
	productName: 'My project (3)',
	productVersion: '0.1',
	showBanner: unityShowBanner,
}

// By default, Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
// config.matchWebGLToCanvasSize = false;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
	// Mobile device style: fill the whole browser client area with the game canvas:

	var meta = document.createElement('meta')
	meta.name = 'viewport'
	meta.content =
		'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes'
	document.getElementsByTagName('head')[0].appendChild(meta)
	container.className = 'unity-mobile'
	canvas.className = 'unity-mobile'

	// To lower canvas resolution on mobile devices to gain some
	// performance, uncomment the following line:
	config.devicePixelRatio = 1
	canvas.style.height = '400px'
	canvas.style.width = '300px'
	canvas.style.borderRadius = '0px'
} else {
	// Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

	// canvas.style.width = '1360px'
	// canvas.style.height = '720px'
	canvas.style.width = '960px'
	canvas.style.height = '600px'
}

loadingBar.style.display = 'block'

var script = document.createElement('script')
script.src = loaderUrl
script.onload = () => {
	createUnityInstance(canvas, config, progress => {
		progressBarFull.style.width = 100 * progress + '%'
	})
		.then(unityInstance => {
			loadingBar.style.display = 'none'
			fullscreenButton.onclick = () => {
				unityInstance.SetFullscreen(1)
			}

			// Add event listener for scroll events on the canvas
			canvas.addEventListener('wheel', handleCanvasScroll, { passive: false })
		})
		.catch(message => {
			alert(message)
		})
}

function handleCanvasScroll(event) {
	// Prevent the default scroll behavior on the canvas
	event.preventDefault()

	// Calculate the amount to scroll
	var delta = event.deltaY || event.detail || event.wheelDelta

	// Increase the scroll speed by multiplying delta
	var scrollSpeed = 2.5 // Adjust this value to increase or decrease scroll speed
	delta *= scrollSpeed

	// Scroll the window
	window.scrollBy({
		top: delta,
		behavior: 'auto', // Use 'auto' for immediate scrolling without smooth animation
	})
}

document.body.appendChild(script)