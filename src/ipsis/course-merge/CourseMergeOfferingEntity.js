/**
 * CourseMergeOfferingEntity class representation of course merge offering as defined in the LMS
 * See: ISirenCourseMergeSerializer.SerializeCourseOfferingResult
 */
import { Actions, Rels } from '../../hypermedia-constants.js';
import { Entity } from '../../es6/Entity.js';
import { OrganizationEntity } from '../../organizations/OrganizationEntity.js';
import { performSirenAction } from '../../es6/SirenAction.js';

export class CourseMergeOfferingEntity extends Entity {
	ownedByMultipleSourceSystems() {
		return this._entity?.properties?.ownedByMultipleSourceSystems;
	}

	orgUnitId() {
		return this._entity?.properties?.orgUnitId;
	}

	isPendingMerge() {
		return this._entity?.properties?.isPendingMerge;
	}

	isPendingUnmerge() {
		return this._entity?.properties?.isPendingUnmerge;
	}

	isMerged() {
		return this._entity?.properties?.isMerged;
	}

	hasContent() {
		return this._entity?.properties?.hasContent;
	}

	onOrganizationChange(onChange) {
		const organizationHref = this.organizationHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are disposed when this object is disposed.
		organizationHref && this._subEntity(OrganizationEntity, organizationHref, onChange);
	}

	organizationHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.organization)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.organization).href;
	}

	hasSelectAction() {
		return this._entity?.hasActionByName(Actions.ipsis.sisCourseMerge.select);
	}

	getSelectAction() {
		if (!this.hasSelectAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.select);
	}

	async select() {
		const action = this.getSelectAction();
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action, null, true);
	}

	hasSelectAsTargetAction() {
		return this._entity?.hasActionByName(Actions.ipsis.sisCourseMerge.selectAsTarget);
	}

	getSelectAsTargetAction() {
		if (!this.hasSelectAsTargetAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.selectAsTarget);
	}

	async selectAsTarget() {
		const action = this.getSelectAsTargetAction();
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action, null, true);
	}

	hasDeselectAction() {
		return this._entity?.hasActionByName(Actions.ipsis.sisCourseMerge.deselect);
	}

	getDeselectAction() {
		if (!this.hasDeselectAction()) {
			return;
		}

		return this._entity.getActionByName(Actions.ipsis.sisCourseMerge.deselect);
	}

	async deselect() {
		const action = this.getDeselectAction();
		if (!action) {
			return;
		}

		return await performSirenAction(this._token, action, null, true);
	}

	updateEntity(entity) {
		this._entity = entity;
	}

	mergedCourseOfferingsHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.ipsis.sisCourseMerge.mergedCourseOfferings)) {
			return;
		}
		return this._entity.getLinkByRel(Rels.ipsis.sisCourseMerge.mergedCourseOfferings).href;
	}
}
