import { Snake } from "./snake.js"
import {Food } from './food.js'
import { CELL_SIZE, WIDTH, HEIGHT, FPS } from "./settings.js"
import { EventHandler } from "./event.js"


let currentTime = 0

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const eventHandler = new EventHandler()
const snake = new Snake(eventHandler)
const food = new Food(eventHandler)

document.addEventListener('DOMContentLoaded', ()=>{
	document.addEventListener('keydown', (event) => eventHandler.publish('keypress', event.key))
	canvasSetUp()
	mainLoop(0)
})

const canvasSetUp = () =>{
	canvas.width = CELL_SIZE * WIDTH
	canvas.height = CELL_SIZE * HEIGHT
}

const drawBackground = (ctx)=>{
	const white = '#F5F5F5'
	const blue = '#90D5FF'

	for(let x = 0; x < WIDTH; x++){
		for(let y = 0; y < HEIGHT; y++){
			ctx.fillStyle = ((x%2==0 && y%2==0) || (x%2==1 && y%2==1))? blue : white
			ctx.fillRect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE)
		}
	}
}


const mainLoop = (timestamp) =>{
	requestAnimationFrame(mainLoop)
	const delta = (timestamp - currentTime) / 1000 //timestamp updates in miliseconds
	
	if (delta < (1 / FPS)){return}
	currentTime = timestamp
	
	//update
	snake.update()

	//check collisions
	if(JSON.stringify(snake.position[0]) == JSON.stringify(food.position)){
		eventHandler.publish('foodHit', {})
	}

	//draw
	ctx.fillStyle = '#fff'
	ctx.fillRect(0,0, CELL_SIZE*WIDTH, CELL_SIZE*HEIGHT)
	drawBackground(ctx)
	food.draw(ctx)
	snake.draw(ctx)


}
