// global util functions related to err handling
function popupError(str, relVars, color) {
	// base prototype of note, warn, error
	const $errRoot = $('.g-notification-wrapper')
	$errRoot.append($(`<div class='g-notification-box' style='text-color: ${color};'></div>`)
		.append($(`<p class='g-notification-box-text'>${str}</p>`))
	)

	console.log($errRoot[0])

	const index = $errRoot.children().length - 1

	setTimeout(() => {
		$($errRoot.children()[index]).addClass('g-notification-box-disappearing')
		setTimeout(() => $errRoot.children().slice(index, index + 1).remove(), 500)
	}, 5000)

	if (relVars) {
		console.log(`Regarding ${str}:`)
		Object.keys(relVars).forEach(key => {
			console.log(key)
			console.log(relVars[key])
		})
		console.log('')
	}

	return str
}

function note(str, relVars) {
	return popupError(str, relVars, 'white')
}

function warn(str, relVars) {
	return popupError(str, relVars, 'yellow')
}

function error(str, relVars) {
	return popupError(str, relVars, 'red')
}

// error codes
const ERR_SCENE_LOAD_INVALIDNAME    = "Tried to load a scene with an invalid name. Scene names must be non-empty strings."
const ERR_SCENE_LOAD_UNDEFINED      = "Tried to load a scene with a non-existent name. Make sure the scene exists."
const ERR_SCENE_LOAD_NONGLOBALEMPTY = "Tried to load an empty ({}|null|undefined) non-global scene. Only the global scene can be empty."
const ERR_SCENE_LOAD_NOHTML			= "Tried to load a scene with no initial html (scene.html == []|null|undefined)."