export class EventHandler{
	constructor(){
		this.events = {}
	}

	publish(event, data){
		if(!(event in this.events)){return}
		for(const fn of this.events[event]){
			fn(data)
		}
	}

	subscribe(event, fn){
		if(!(event in this.events)){
			this.events[event] = []
		}

		this.events[event].push(fn)
	}
}