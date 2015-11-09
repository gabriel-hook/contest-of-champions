import Model from './Model.js';

class List  {
	constructor(elements, model = Model){
		this.Model = model;
		this.list = elements.map((element) => this.prepareElement(element));
	}

	[Symbol.iterator]() { 
		return this.list;
	}

	where(filter){
		return this.list.filter(({ attr }) => {
			if(filter)
				for(const key in filter)
					if(attr[key] !== filter[key])
						return false;
			return true;
		});
	}

	prepareElement(element){
		if(element && typeof element === 'object'){
			if(element instanceof Model)
				return element;
			else
				return new this.Model(element);
		}
		return element;
	}

	add(element){
		this.items.push(this.prepareElement(element));
	}

	remove(element){
		const index = this.items.indexOf(element);
		if(index !== -1){
			return this.items.removeAtIndex(index);
		}
		return element;
	}

	removeAtIndex(index){
		return this.splice(index, 1);
	}

	toJSON(){
		const list = [];
		for(const element of this.list){
			list.push(element.toJSON);
		}
		return { list };
	}
}

export default List;
