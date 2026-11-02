import { CELL_SIZE, WIDTH, HEIGHT } from "./settings.js";

export class Food{
	constructor(eventHandler){
		this.events = eventHandler
		this.setSpot()
		this.events.subscribe('foodHit', (data)=>this.setSpot(data))
	}

	setSpot(){
		//pick a random spot on the map and set the new position
		const x = Math.floor(Math.random()*WIDTH)
		const y = Math.floor(Math.random()*HEIGHT)
		this.position=[x,y]
	}

	draw(ctx){
		ctx.fillStyle = 'red'
		ctx.fillRect(this.position[0]*CELL_SIZE, this.position[1]*CELL_SIZE, CELL_SIZE, CELL_SIZE)
	}
}