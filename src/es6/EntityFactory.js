import 'd2l-polymer-siren-behaviors/store/entity-store.js';

/**
 * @typedef {import('siren-parser').Entity} ParsedEntity
 * @typedef {import('siren-parser').Link} SirenLink
 * @typedef {import('./EntitySirenProperties').EntitySirenProperties} EntitySirenProperties
 */

/** Allows one to manage the event store listeners. Makes it easy to update, add and remove a listener for the entity store. */
export class EntityListener {
	constructor() {
		this._href;
		this._token;
		this._onChange;
		this._removeListener;
	}

	add(href, token, onChange, entity) {
		if (!this._validate(href, onChange, entity)) {
			return;
		}

		this._href = href;
		this._token = token;
		this._onChange = onChange;

		window.D2L.Siren.EntityStore.addListener(this._href, this._token, this._onChange).then((removeListener) => {
			this._removeListener = removeListener;
			window.D2L.Siren.EntityStore.get(this._href, this._token).then((storedEntity) => {
				if (storedEntity) {
					this._onChange(storedEntity);
					return;
				}
				if (entity) {
					window.D2L.Siren.EntityStore.update(href, token, entity);
				} else {
					window.D2L.Siren.EntityStore.fetch(href, token);
				}
			});
		});
	}

	update(href, token, onChange, entity) {
		if (href === this._href || token === this._token || onChange === this._onChange) {
			return;
		}
		this._removeListener();
		this._addListener(href, token, onChange, entity);
	}

	remove() {
		this._removeListener && this._removeListener();
	}

	_validate(href, onChange, entity) {
		href = href && href.href || href;
		const entityIsGood = !entity || (entity.hasLinkByRel('self') && entity.getLinkByRel('self').href === href);

		// token can be empty.
		return href && typeof onChange === 'function' && entityIsGood;
	}
}

/**
 * This creates and fetch a new entity. Whenever the entity changes onChange is called.
 * @param {new(...args: any[]) => EntitySirenProperties} entityType The type of the entity. For example OrganizationEntity
 * @param {SirenLink|String} href Siren Link or Href of the entity to be created
 * @param {String|Function} [token] JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
 * @param {(entity: EntitySirenProperties, error: any) => void} onChange Callback function that accepts an {entityType} to be called when entity changes. If there are errors onChange is called with (null, error)
 * @param {ParsedEntity} entity (Optional) Entity that has already been fetched.
 */
export function entityFactory(entityType, href, token, onChange, entity) {
	const entityListener = new EntityListener();
	const onChangeWrapped = (entity, error) => {

		if (!entity && error) {
			// Prevent errors from being thrown in the Firefox & Safari console when the user navigates away while fetches are in progress
			// https://desire2learn.atlassian.net/browse/GAUD-158
			if (
				(error['name'] === 'TypeError' && (error['message'] === 'NetworkError when attempting to fetch resource.' || error['message'] === 'Load failed')) ||
				(error['name'] === 'AbortError' && error['message'] === 'The operation was aborted')
			) {
				console.warn(`${error.toString()} (Possibly due to navigation while fetching)`);
				return;
			}
		}

		if (entity) {
			onChange(new entityType(entity, token, entityListener));
		} else {
			onChange(null, error);
		}
	};
	// This add the listener then calls the fetch.
	entityListener.add(href, token, onChangeWrapped, entity);
}

export function updateEntity(href, token, entity) {
	if (entity) {
		window.D2L.Siren.EntityStore.update(href, token, entity);
	} else {
		window.D2L.Siren.EntityStore.fetch(href, token, true);
	}
}

/**
 * Some times the entity doesn't exists so this allows the cleanup code to be cleaner.
 * @param {EntitySirenProperties|null} entity Object that is of an Entity type.
 */
export function dispose(entity) {
	entity && entity.dispose && entity.dispose();
}
