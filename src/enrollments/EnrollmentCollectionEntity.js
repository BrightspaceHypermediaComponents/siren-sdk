'use strict';

import { Entity } from '../es6/Entity.js';
import { Rels } from '../hypermedia-constants';
/**
 * A collection of sub entities pointing to distinct enrollments
 */
export class EnrollmentCollectionEntity extends Entity {
	/**
	 * @returns list of string represented hrefs pointing to siren entities
	 */
	enrollmentsHref() {
		if (!this._entity || !this._entity.getSubEntitiesByRel) {
			return;
		}
		const enrollmentEntities = this._entity.getSubEntitiesByRel(Rels.userEnrollment);
		return enrollmentEntities.map(e => e.href).filter(href => href);
	}
}
