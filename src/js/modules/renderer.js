export class Renderer2D {
	static DEFAULT_FILL = '#FFFFFF'

	constructor() {}

	init(canvas) {
		this.width = canvas.width
		this.height = canvas.height

		this.intCanvas = new OffscreenCanvas(canvas.width, canvas.height)
		this.ctx = this.intCanvas.getContext('2d')

		this.extCanvas = canvas
		this.extCtx = this.extCanvas.getContext('2d')
	}

	fillRect(x, y, w, h, { color }) {
		this.ctx.fillStyle = color ?? Renderer2D.DEFAULT_FILL
		this.ctx.fillRect(x, y, w, h)
	}

	// dumps the actual pixel buffer to exposed canvas
	drawBuffer() {
		this.extCtx.drawImage(this.intCanvas, 0, 0)
	}
}