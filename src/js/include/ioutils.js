// global utils
(() => {

const fs = require('fs')
const attempt = (cb, relVars) => {
	try {
		return cb()
	} catch(e) {
		error(e.toString(), relVars)
		return false
	}
}

const ioCache = {}

class io {
	static writeFile(loc, str) {
		return attempt(() => fs.writeFileSync(loc, str), { loc, str })
	}

	static readFile(loc) {
		return attempt(() => fs.readFileSync(loc, { encoding: 'utf-8' }), { loc })
	}

	static deleteFile(loc) {
		return attempt(() => fs.unlinkSync(loc), { loc })
	}

	static ensureDir(loc) {
		return attempt(() => {
			const exists = fs.existsSync(loc)
			if (!exists) {
				fs.mkdirSync(loc)
			}
		}, { loc })
	}

	static ensureFile(loc) {
		return attempt(() => {
			const exists = fs.existsSync(loc)
			if (!exists) {
				fs.writeFileSync(loc, '')
			}
		}, { loc })
	}

	static makeCache(name, fname, defaultValue) {
		// forces file to exist if it doesn't
		const exists = fs.existsSync(fname)
		if (!exists) this.ensureFile(fname)

		// setup cache. if the file didn't exist originally we just use defaultValue ?? '' as initial value for file
		ioCache[name] = {
			fname,
			data: exists ? JSON.parse(this.readFile(fname)) : (defaultValue ?? ''),
		}

		this.writeCache(name)
	}

	static getCache(name) {
		return ioCache[name].data
	}

	static getCacheFileName(name) {
		return ioCache[name].fname
	}

	static setCacheVar(name, key, val) {
		ioCache[name][key] = val
	}

	static writeCache(name) {
		this.writeFile(ioCache[name].fname, JSON.stringify(ioCache[name].data))
	}
}

globalThis.io = io

})()

// io setup
io.ensureDir('sdata')
io.ensureFile('uprefs.json')

io.makeCache('uprefs', 'uprefs.json', G_DEFAULT_UPREFS_OBJECT)