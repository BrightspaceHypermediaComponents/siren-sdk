import { entityFactory, dispose } from '../es6/EntityFactory.js';

export const EntityMixinLit = superclass => class extends superclass {

	static get properties() {
		return {
			/**
			 * Href for the entity
			 */
			href: {
				type: String,
				reflect: true
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },
			/**
			 * Entity object that extends the Entity class.
			 */
			_entity: { type: Object },
		};
	}

	constructor() {
		super();
	}

	set href(href) {
		const oldValue = this.__href;
		this.__href = href;
		this.requestUpdate('href', oldValue);
	}

	get href() {
		return this.__href;
	}

	set token(token) {
		const oldValue = this.__token;
		this.__token = token;
		this.requestUpdate('token', oldValue);
	}

	get token() {
		return this.__token;
	}

	set _entity(entity) {
		this.__entity = entity;
	}

	get _entity() {
		return this.__entity;
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		// this calls this._entity.dispose() if entity is actually an entity.
		// Note this will dispose all child entities used.
		dispose(this._entity);
	}

	requestUpdate(propChanges, oldValue) {
		if ((propChanges === 'href' && this.href && this.href !== oldValue)
			|| (propChanges === 'token' &&  this.token !== undefined && this.token !== oldValue)) {
			this.__onHrefChange(this.href, this.token);
		}

		return super.requestUpdate(propChanges, oldValue);
	}

	_entityHasChanged(newValue, oldValue) {
		oldValue = oldValue ? oldValue : this._entity;
		return newValue !== oldValue;
	}
	/**
	 * Protected method to set the entity type such as Organization Entity.
	 * Requires to be called in the constructor
	 * @param {Function} entityType  The type of the entity. For example OrganizationEntity
	 */
	_setEntityType(entityType) {
		if (typeof entityType === 'function') {
			this._entityType = entityType;
		}
	}

	__onHrefChange(href, token) {
		dispose(this._entity); // Make sure the entity is cleaned up before setting a new one.
		if (typeof this._entityType === 'function') {
			entityFactory(this._entityType, href, token, entity => {
				this._entity = entity;
			});
		}
	}
};
