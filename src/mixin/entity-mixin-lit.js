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
			_entity: { type: Object }
		};
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		// this calls this._entity.dispose() if entity is actually an entity.
		// Note this will dispose all child entities used.
		dispose(this._entity);
	}

	shouldUpdate(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._getEntity();
		}
		return this.href && this.token;
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

	_getEntity() {
		dispose(this._entity);
		if (typeof this._entityType === 'function') {
			let pendingResolve;
			var pendingPromise = new Promise(function(resolve) {
				pendingResolve = resolve;
			});

			const pendingEvent = new CustomEvent('pending-state', {
				composed: true,
				bubbles: true,
				detail: { promise: pendingPromise }
			});
			this.dispatchEvent(pendingEvent);

			entityFactory(this._entityType, this.href, this.token, entity => {
				this._entity = entity;
				if (pendingResolve) {
					pendingResolve();
					pendingResolve = null;
				}
			});
		}
	}
};
