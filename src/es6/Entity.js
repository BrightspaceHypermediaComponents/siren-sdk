import { entityFactory, dispose, updateEntity } from './EntityFactory.js';
import { EntitySirenProperties } from './EntitySirenProperties.js';

/**
 * Abstract Entity class to help create entity classes.
 */
export class Entity extends EntitySirenProperties {
	/**
	 * Primes the object used by the entityFactory. Should never be called outside.
	 * @param {Object} entity A hypermedia siren entity as defined by [the siren specification]{@link https://github.com/kevinswiber/siren}
	 * @param {String|Function|null} token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
	 * @param {Function} listener Listener helper class
	 */
	constructor(entity, token, listener) {
		super();
		if (this.constructor === Entity) {
			throw new TypeError('Cannot construct Entity instances directly');
		}
		this._entity = entity;
		this._subEntities = new Map();
		this._token = token;
		this._listener = listener;
		this._subEntitiesLoadStatus = [];
	}
	/**
	 * Get the url assigned to this entity.
	 */
	self() {
		if (!this._entity || !this._entity.hasLinkByRel('self')) {
			return;
		}

		return this._entity.getLinkByRel('self').href;
	}
	subEntitiesLoaded() {
		return Promise.all(this._subEntitiesLoadStatus);
	}
	update(entity) {
		updateEntity(this.self(), this._token, entity);
	}
	/**
	 * Cleans up this entity by deleting the callbacks listeners stored in the entity store.
	 */
	dispose() {
		this._subEntities.forEach(entity => dispose(entity));
		if (this._listener) {
			this._listener.remove();
		}
	}
	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} href Href or Entity of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntity(entityType, href, onChange) {
		if (!href) {
			return;
		}
		// Clean up if that href has already been added.
		if (typeof href === 'string') {
			this._subEntityByHref(entityType, href, onChange);
		} else {
			this._subEntityByEntity(entityType, href, onChange);
		}
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} source Href of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntityByHref(entityType, source, onChange) {
		// Clean up if that href has already been added.
		if (this._subEntities.has(source)) {
			dispose(this._subEntities.get(source));
		}

		this._subEntitiesLoadStatus.push(new Promise((resolve, reject) => {
			entityFactory(entityType, source, this._token, (entity, error) => {
				this._subEntities.set(source, entity);
				onChange(entity, error);
				if (error) {
					reject && reject();
					resolve = null;
					reject = null;
				} else {
					Promise.all(entity._subEntitiesLoadStatus).then(() => {
						resolve && resolve();
						resolve = null;
						reject = null;
					});
				}
			});
		}));
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} entity Entity that has already been fetched as a sub-entity. Requires either an href or a self link
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntityByEntity(entityType, entity, onChange) {
		if (!entity) {
			return;
		}

		const isEmbeddedLink = !!(entity.href);
		const hasSelfLink = entity.hasLinkByRel && entity.hasLinkByRel('self');

		if (!isEmbeddedLink && !hasSelfLink) {
			return;
		}

		const link = isEmbeddedLink
			? entity
			: entity.getLinkByRel('self');

		// Clean up if that href has already been added.
		if (this._subEntities.has(link.href)) {
			dispose(this._subEntities.get(link.href));
		}

		const seedEntity = isEmbeddedLink
			? undefined
			: entity;

		this._subEntitiesLoadStatus.push(new Promise((resolve, reject) => {
			entityFactory(entityType, link, this._token, (entity, error) => {
				this._subEntities.set(link.href, entity);
				onChange(entity, error);
				if (error) {
					reject && reject();
					resolve = null;
					reject = null;
				} else {
					Promise.all(entity._subEntitiesLoadStatus).then(() => {
						resolve && resolve();
						resolve = null;
						reject = null;
					});
				}
			}, seedEntity);
		}));
	}
}
