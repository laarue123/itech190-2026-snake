import { CELL_SIZE } from "./settings.js"
import { EventHandler } from "./event.js"

export class Snake{
	position = [[10,10]]
	color = 'green'
	input = undefined
	dir = [0,0]

	constructor(eventHandler){
		this.events = eventHandler
		this.events.subscribe('keypress', (key) =>this.inputHandler(key))	
		this.events.subscribe('foodHit', (data)=>this.grow(data))	
	}

	inputHandler(key){
		let tmp = [0,0]
	
		switch (key) {
			case 'ArrowUp':
				tmp = [0,-1]
				break;
			case 'ArrowDown':
				tmp = [0,1]
				break;
			case 'ArrowLeft':
				tmp = [-1,0]
				break;
			case 'ArrowRight':
				tmp = [1,0]
				break;
			default:
				return;
		}

		if(this.position.length == 1){
			this.dir = [...tmp]
		}else{
			const pos = tmp.map((num , index) => num + this.position[0][index])
			if(JSON.stringify(pos) != JSON.stringify(this.position[1])){
				this.dir =[...tmp]
			}
		}
		

	}

	grow(){
		//make snake grow when it hits food
	}

	update(){
		//what to do if there is no dir?
		
		
		//update the segments position
		

		//update head position
		this.position[0][0]+=this.dir[0]
		this.position[0][1]+=this.dir[1]
	}

	draw(ctx){
		for(let i=0; i<this.position.length; i++){
			ctx.fillStyle = this.color
			ctx.fillRect(this.position[i][0]*CELL_SIZE, this.position[i][1]*CELL_SIZE, CELL_SIZE, CELL_SIZE)
		}
	}
}