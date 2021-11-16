// all global consts have G_ prefix, and all global consts are found here
// so, to find the value of a G_ const for debugging, this is the place to look and nowhere else

// this script should execute post-document load (should be accomplished by <script defer...>)

// is debug
const G_IS_DEBUG = nw.App.argv.includes("--debug")

// root element
const G_ROOT_ELEMENT = document.getElementById('root')

// world map canvas w/h
const G_WMAP_CANVAS_WIDTH = 400
const G_WMAP_CANVAS_HEIGHT = 400

// world map save file extension
const G_WORLD_SAVE_FILE_EXTENSION = 'world'

// default objects
const G_DEFAULT_UPREFS_OBJECT = {
	musicVolume: 50,
	sfxVolume: 50,

	lang: 'en',

	maximized: true,

	winWidth: 620,
	winHeight: 400,
}

// world types
const G_WORLD_TYPE_ROCK = 0
const G_WORLD_TYPE_GAS = 1