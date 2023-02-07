import { Entity } from '../../es6/Entity.js';

export class NamedEntity extends Entity {

	name() {
		const subEntity = this._entity && this._entity.getSubEntityByClass('name');
		return subEntity && subEntity.properties && subEntity.properties.name;
	}

}
