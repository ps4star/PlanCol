import { Renderer2D } from './modules/renderer.js'
import * as worldMgmt from './modules/worldMgmt.js'

// grab win
const win = nw.Window.get()

// grab uprefs
const uprefs = io.getCache('uprefs')

// setup renderer (basically wrapped ctx)
const r = new Renderer2D()

// setup scene library
const scenes = new SceneManager({

	'world': {
		html: [
			$(`<div id='world-wrapper'>`)
				.append($(`<div id='wmap-wrapper'>`)
					.append($(`<canvas width='${G_WMAP_CANVAS_WIDTH}' height='${G_WMAP_CANVAS_HEIGHT}' id='wmap-canvas'>`))
				)
				.append($(`<div id='world-ui-layer'>`))
		],
		hooks: {
			load() {
				// grab canvas and init renderer with it
				const can = $('#wmap-canvas')[0]
				r.init(can)

				// create world
				worldMgmt.createNewWorld('example world')
			},
		},
	},

	'global': {},

}, G_ROOT_ELEMENT)

// document ready
$(() => {
	// initialize win
	win.show()

	if (uprefs.maximized) {
		win.maximize()
	} else {
		win.resizeTo(uprefs.winWidth ?? 620, uprefs.winHeight ?? 400)
	}

	win.on('resize', (newWidth, newHeight) => {
		io.setCacheVar('upref', 'winWidth', newWidth)
		io.setCacheVar('upref', 'winHeight', newHeight)
		io.writeCache('upref')
	})

	// run main scene
	scenes.load('world')
})