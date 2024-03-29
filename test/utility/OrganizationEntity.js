import { Entity } from '../../src/es6/Entity.js';
import { SimpleEntity } from '../../src/es6/SimpleEntity.js';

export const classes = {
	course: 'course',
	active: 'active',
	inactive: 'inactive'
};

export class OrganizationEntity extends Entity {
	// Entity has a constructor that is called from the factory to keep track of what is required to be cleaned.
	code() {
		return this._entity && this._entity.properties && this._entity.properties.code;
	}

	endDate() {
		return this._entity && this._entity.properties && this._entity.properties.endDate;
	}

	isActive() {
		return this._entity && this._entity.properties && this._entity.properties.isActive;
	}

	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	onImageChange(onChange) {
		const image = this.imageEntity();
		const imageHref = image && image.href;
		imageHref && this._subEntity(SimpleEntity, imageHref, onChange);
	}

	onSemesterChange(onChange) {
		const semesterHref = this._semesterHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, onChange);
	}

	startDate() {
		return this._entity && this._entity.properties && this._entity.properties.startDate;
	}

	_semesterHref() {
		if (!this._entity || !this._entity.hasLinkByRel('https://api.brightspace.com/rels/parent-semester')) {
			return;
		}

		return this._entity.getLinkByRel('https://api.brightspace.com/rels/parent-semester').href;
	}
}
