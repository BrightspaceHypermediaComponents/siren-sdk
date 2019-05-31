import { EnrollmentCollectionEntity } from '../enrollments/EnrollmentCollectionEntity.js';
import { Entity } from '../es6/Entity.js';
import { entityFactory } from '../es6/EntityFactory.js';
import { Rels } from '../hypermedia-constants.js';

export class root extends Entity {
	/**
	 * A constructed {@link EnrollmentCollectionEntity} object
	 * @param function onChange Callback function that accepts an {function} to be called when entity changes
	 */
	enrollments(onChange) {
		if (!this._enrollmentshref) {
			return;
		}
		entityFactory(EnrollmentCollectionEntity, this._enrollmentshref, this._token, onChange);
	}

	_enrollmentshref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.enrollments)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.enrollments).href;
	}

}
