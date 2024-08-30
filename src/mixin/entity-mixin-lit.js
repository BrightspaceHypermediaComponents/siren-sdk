import { dispose, entityFactory } from '../es6/EntityFactory.js';
import { AsyncStateEvent } from '@brightspace-ui/core/helpers/asyncStateEvent.js';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

/**
 * @template {new (...args: any[]) => import('lit').ReactiveElement} S
 * @param {S} superclass
 */
const InternalEntityMixinLit = superclass => class extends superclass {

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
			/**
			 * Error object is set if there is an error fetching entity. Undefined if entity was successfully retrieved.
			 */
			_entityError: { type: Object }
		};
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Prevent entity disposal if element is being reordered (i.e. repeat directive)
		if (this.isConnected) {
			return;
		}

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
			const pendingPromise = new Promise((resolve) => {
				pendingResolve = resolve;
			});

			const pendingEvent = new AsyncStateEvent(pendingPromise);
			this.dispatchEvent(pendingEvent);

			entityFactory(this._entityType, this.href, this.token, (entity, error) => {
				this._entity = entity;
				this._entityError = error;
				if (pendingResolve) {
					pendingResolve();
					pendingResolve = null;
				}
			});
		}
	}
};

export const EntityMixinLit = dedupeMixin(InternalEntityMixinLit);
