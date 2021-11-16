class utils {
	static randInt(start, end) {
		return Math.floor(Math.random() * (end - start + 1)) + start
	}

	static pickRandom(list) {
		return list[this.randInt(0, list.length - 1)]
	}
}