
const play_button               = document.getElementById("play-button")
const options_button            = document.getElementById("options-button")
const continue_button           = document.getElementById("continue-button")
const restart_buttons           = document.querySelectorAll(".restart-btns")
const back_to_menu_buttons      = document.querySelectorAll(".back-to-menu-btns")
const back_from_options_button  = document.getElementById("backToMenuOptions-button")


play_button.addEventListener("click", () => {
	init()
	switchScreen("hud-screen", "start-screen")
})

options_button.addEventListener("click", () => {
	switchScreen("options-screen", "start-screen")
})

back_from_options_button.addEventListener("click", () => {
	switchScreen("start-screen", "options-screen")
})

continue_button.addEventListener("click", () => {
	continues()
})

restart_buttons.forEach(btn => {
	btn.addEventListener("click", () => {
		restart()
		switchScreen("hud-screen", btn.dataset.screen)
	})
})

back_to_menu_buttons.forEach(btn => {
	btn.addEventListener("click", () => {
		destroy()
		switchScreen("start-screen", btn.dataset.screen)
	})
})

dialog_close_button.addEventListener("click", () => {
	dialog_container.classList.remove("left-0")
	dialog_container.classList.add("-left-60")
})

dialog_checkbox.addEventListener("input", () => {
	const value = dialog_checkbox.checked ? 0 : 1
	window.localStorage.setItem("SaSdialog", value)
})


close_skills.addEventListener("click", () => {
	updateUI("skills", false)
	updateUI("timer", true)
	timeBetweenWaves = 5
})

const warning_screen = document.querySelector("#warning-screen")
const close_warning = document.querySelector("#close-warning")

warning_screen.classList.remove("hidden")
warning_screen.classList.add("animate__animated", "animate__bounceIn")

warning_screen.addEventListener("animationend", () => {
	warning_screen.classList.remove("animate__animated", "animate__bounceIn")
})

document.querySelector("body").style.overflow = "hidden"

close_warning.addEventListener("click", () => {
	warning_screen.classList.add("animate__animated", "animate__bounceOut")

	warning_screen.addEventListener("animationend", () => {
		warning_screen.classList.remove("animate__animated", "animate__bounceOut")
		warning_screen.classList.add("hidden")
		document.querySelector("body").style.overflow = ""
	})
})



