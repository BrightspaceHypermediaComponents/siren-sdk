import { dispose, entityFactory, updateEntity } from './EntityFactory.js';
import { EntitySirenProperties } from './EntitySirenProperties.js';

/**
 * @typedef {import('siren-parser').Entity} ParsedEntity
 * @typedef {import('./EntityFactory.js').EntityListener} EntityListener
 */

/**
 * Abstract Entity class to help create entity classes.
 */
export class Entity extends EntitySirenProperties {
	/**
	 * Primes the object used by the entityFactory. Should never be called outside.
	 * @param {ParsedEntity} entity A hypermedia siren entity as defined by [the siren specification]{@link https://github.com/kevinswiber/siren}
	 * @param {String|Function} [token] JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
	 * @param {EntityListener} [listener] Listener helper class
	 */
	constructor(entity, token, listener) {
		super();
		if (this.constructor === Entity) {
			throw new TypeError('Cannot construct Entity instances directly');
		}
		this._entity = entity;

		/**
		 * @type {Map<string, EntitySirenProperties>}
		 */
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

	/**
	 * @param {ParsedEntity} entity
	 */
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
	 *
	 * @template {EntitySirenProperties} EntityType
	 * @param {new (...args: any[]) => EntityType} entityType A entity class that extends this class.
	 * @param {string|ParsedEntity} href Href or Entity of the entity to be created
	 * @param {(entityType: EntityType, error: any) => void} onChange callback function that accepts an {entityType} to be called when subentity changes.
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
	 *
	 * @template {EntitySirenProperties} EntityType
	 * @param {new (...args: any[]) => EntityType} entityType A entity class that extends this class.
	 * @param {string} source Href of the entity to be created
	 * @param {(entityType: EntityType, error: any) => void} onChange callback function that accepts an {entityType} to be called when subentity changes.
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
				} else if (entity) {
					Promise.all(entity._subEntitiesLoadStatus).then(() => {
						resolve && resolve();
						resolve = null;
						reject = null;
					});
				} else {
					resolve && resolve();
					resolve = null;
					reject = null;
				}
			});
		}));
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 *
	 * @template {EntitySirenProperties} EntityType
	 * @param {new (...args: any[]) => EntityType} entityType A entity class that extends this class.
	 * @param {ParsedEntity} entity Entity that has already been fetched as a sub-entity. Requires either an href or a self link
	 * @param {(entityType: EntityType, error: any) => void} onChange callback function that accepts an {entityType} to be called when subentity changes.
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

		const seedEntity = isEmbeddedLink
			? undefined
			: entity;

		// Clean up if that href has already been added.
		if (this._subEntities.has(link.href)) {
			dispose(this._subEntities.get(link.href));
		}
		this._subEntitiesLoadStatus.push(new Promise((resolve) => {
			entityFactory(entityType, link, this._token, (entity) => {
				this._subEntities.set(link.href, entity);
				onChange(entity);
				Promise.all(entity._subEntitiesLoadStatus).then(() => {
					resolve && resolve();
					resolve = null;
				});
			}, seedEntity);
		}));
	}
}
