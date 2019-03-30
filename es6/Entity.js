'use strict';

export class Entity {
	constructor(entity, token, listener) {
		this._entity = entity;
		this._subEntities = new Map();
		this._token = token;
		this._listener = listener;
	}

	dispose() {
		this._subEntities.forEach(entity => entity.dispose());
		this._listener.remove();
	}

	// protected method to keep track of sub entities.
	_subEntity(entityType, href, token, onChange) {
		// Clean up if that href has already been added.
		if (this._subEntities.has(href)) {
			this._subEntities.get(href).dispose();
		}
		entityFactory(entityType, href, token, (entity) => {
			this._subEntities.set(href, entity);
			onChange(entity);
		});
	}
}
