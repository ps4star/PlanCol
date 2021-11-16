// scene manager stuff
class SceneManager {
	static GLOBAL_SCENE_KEY = 'global'

	constructor(sceneSchematic, rootElement) {
		this.sceneSchematic = sceneSchematic
		this.currentScene = null

		this.sceneFlags = {}

		this.$root = $(rootElement)
	}

	clear() {
		// unwrap $
		const rootElement = this.$root[0]

		// delete all children
		while (rootElement.lastChild) rootElement.removeChild(rootElement.lastChild)
	}

	load(sceneName) {
		const isGlobal = sceneName === SceneManager.GLOBAL_SCENE_KEY

		if (!isGlobal) {
			// ensure scene is valid
			if (!sceneName) {
				return error(ERR_SCENE_LOAD_INVALIDNAME, { schematic: this.sceneSchematic, sceneName })
			}

			// ensure scene exists
			if (!(sceneName in this.sceneSchematic)) {
				return error(ERR_SCENE_LOAD_UNDEFINED, { schematic: this.sceneSchematic, sceneName })
			}

			// first load global, then come back
			this.load(SceneManager.GLOBAL_SCENE_KEY)
		} else {
			// ready to clear stage, first run unload hook if possible
			const currentHooks = this.currentScene?.data?.hooks?.unload
			if (currentHooks) currentHooks.unload()

			// clear stage (currently dirty, pre-global)
			this.clear()
		}

		// loads new scene; unpack structure
		const thisScene = this.sceneSchematic[sceneName]

		// allow empty scene ONLY IF global (just return in this case so normal scene is loaded)
		if (!thisScene || Object.entries(thisScene) < 1) {
			if (isGlobal)
				return
			else
				return error(ERR_SCENE_LOAD_NONGLOBALEMPTY, { schematic: this.sceneSchematic })
		}

		let { html, hooks } = thisScene

		// verify that html is not undefined
		if (!html) {
			return error(ERR_SCENE_LOAD_NOHTML, { sceneName, thisScene, html })
		}

		// array-ify
		if (!Array.isArray(html)) {
			html = [html]
			warn(WARN_SCENE_LOAD_NONARRAY)
		}

		// finally can begin loading scene
		html.forEach(el => {
			this.$root.append(el)
		})

		// process hooks
		if (!hooks) return

		// run load hook
		if (hooks.load) hooks.load()

		this.currentScene = {
			name: sceneName,
			data: this.sceneSchematic[sceneName],
		}
	}

	setFlagIn(sceneName, flagName, flagValue) {
		const thisFlagObj = this.sceneFlags[sceneName]
		if (typeof thisFlagObj !== 'object') {
			this.sceneFlags[sceneName] = {}
		}

		this.sceneFlags[sceneName][flagName] = flagValue
	}

	setFlagHere(flagName, flagValue) {
		this.setFlagIn(this.currentScene.name, flagName, flagValue)
	}

	readFlagIn(sceneName, flagName) {
		return this.sceneFlags[sceneName][flagName]
	}

	readFlagHere(flagName) {
		return this.readFlagIn(this.currentScene.name, flagName)
	}
}