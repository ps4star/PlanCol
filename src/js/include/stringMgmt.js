// lang-independent strings
(() => {

const lang = JSON.parse(io.readFile('uprefs.json')).lang

function uString(langSchematic) {
	return langSchematic[lang]
}

// create global var
globalThis.uString = uString

})()