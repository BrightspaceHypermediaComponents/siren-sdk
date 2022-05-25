import { Entity } from '../es6/Entity.js';
import { NotificationEntity } from './NotificationEntity.js';
import { Rels } from '../hypermedia-constants.js';
/**
 * A collection of {@link NotificationEntity | Notification Entities}
 */
export class NotificationCollectionEntity extends Entity {

	getNotifications() {
		const notificationEntityList = [];
		const notificationCollectionEntity = this._notificationCollectionEntity();
		for (let i = 0; i < this._size(); i++) {
			notificationEntityList.push(new NotificationEntity(notificationCollectionEntity[i]));
		}
		return notificationEntityList;
	}

	_size() {
		const notificationCollectionEntity = this._notificationCollectionEntity();
		return (notificationCollectionEntity && notificationCollectionEntity.length) || 0;
	}

	_notificationCollectionEntity() {
		return this._entity && this._entity.getSubEntities(Rels.Notifications);
	}

}
