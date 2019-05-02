import { Rels } from '../hypermedia-constants';
/**
 * A d2l Notification Entity is a representation of a notification that has a type and unread count
 */
export class NotificationEntity {
	constructor(_entity) {
		this._entity = _entity;
	}
	/**
	 * Current count of unread notifications
	 */
	count() {
		return this._entity && this._entity.properties && this._entity.properties.count;
	}
	/**
	 * the type of notification
	 */
	type() {
		return this._entity && this._entity.properties && this._entity.properties.type;
	}

	getLink() {
		if (!this._entity.hasLinkByRel(Rels.Notifications.updatesSource)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Notifications.updatesSource).href;
	}

}
