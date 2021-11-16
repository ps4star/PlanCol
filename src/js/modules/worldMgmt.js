// world mgmt (not rendering)
export function createNewWorld(name) {
	// setup an io cache for the world file
	const worldObj = {}

	// calc type
	worldObj.type = utils.pickRandom([G_WORLD_TYPE_ROCK, G_WORLD_TYPE_GAS])

	// create a cache for the world
	io.makeCache(`w-${name}`, `sdata/${name}.${G_WORLD_SAVE_FILE_EXTENSION}`, worldObj)
}