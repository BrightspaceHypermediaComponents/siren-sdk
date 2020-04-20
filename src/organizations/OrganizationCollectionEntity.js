import { Entity } from '../es6/Entity.js';
import { OrganizationEntity } from './OrganizationEntity';
import { performSirenAction } from '../es6/SirenAction.js';

const rels = {
	organization: 'https://api.brightspace.com/rels/organization',
	discover: 'https://discovery.brightspace.com'
};

const actions = {
	searchOrganizationCollection: 'search-course-collection',
	createOrgUnit: 'create-org-unit'
};

/**
 * A collection of sub entities pointing to distinct organizations
 */
export class OrganizationCollectionEntity extends Entity {

	/**
	 * @returns list of string represented hrefs pointing to siren entities
	 */
	_organizations() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByRel(rels.organization);
	}

	activities() {
		if (!this._entity) {
			return;
		}
		return this._entity.getSubEntitiesByRel(rels.discover);
	}

	onOrganizationsChange(onChange) {
		const items = this._organizations();

		items.forEach((entity, index) => {
			const onChangeWithIndex = collectedItem => {
				onChange(collectedItem, index);
			};
			entity && this._subEntity(OrganizationEntity, entity, onChangeWithIndex);
		});
		return items.length;
	}

	totalItems() {
		const pagingInfo = this._pagingInfo();
		return pagingInfo && pagingInfo.total;
	}

	currentPage() {
		const pagingInfo = this._pagingInfo();
		return pagingInfo && pagingInfo.page;
	}

	totalPages() {
		const totalItems = this.totalItems();
		const pageSize = this.pageSize();
		return totalItems && pageSize && Math.ceil(totalItems / pageSize);
	}

	pageSize() {
		const pagingInfo = this._pagingInfo();
		return pagingInfo && pagingInfo.pageSize;
	}

	_pagingInfo() {
		return (
			this._entity &&
			this._entity.properties &&
			this._entity.properties.pagingInfo
		);
	}

	hasNextPage() {
		return this._entity.hasLinkByRel('next');
	}

	hasPrevPage() {
		return this._entity.hasLinkByRel('prev');
	}

	nextPageHref() {
		if (!this.hasNextPage()) {
			return;
		}

		return this._entity.getLinkByRel('next').href;
	}

	prevPageHref() {
		if (!this.hasPrevPage()) {
			return;
		}

		return this._entity.getLinkByRel('prev').href;
	}

	async search(query) {
		const fields = [
			{ name: 'search', value: query },
			{ name: 'page', value: 1 }
		];
		return this._performSearch(fields);
	}

	async jumpToPage(page) {
		const fields = [
			{ name: 'page', value: page }
		];
		return this._performSearch(fields);
	}

	async _performSearch(fields) {
		const searchAction = this._entity.getActionByName(
			actions.searchOrganizationCollection
		);
		const entity = await performSirenAction(
			this._token,
			searchAction,
			fields,
			true
		);
		const link = entity && entity.getLinkByRel('self');
		return link && link.href;
	}

	async createOrgUnit(name, code, type) {
		const createOrgUnitAction = this._entity.getActionByName(
			actions.createOrgUnit
		);
		const defaultFields = this._getDefaultFields(createOrgUnitAction, ['parentId', 'draft']);
		const fields = [
			{ name: 'orgUnitTypeId', value: type },
			{ name: 'name', value: name },
			{ name: 'code', value: code },
			...defaultFields
		];
		const entity = await performSirenAction(
			this._token,
			createOrgUnitAction,
			fields,
			true
		);
		return new OrganizationEntity(entity, this._token);
	}

	canCreateOrgUnit() {
		return this._entity.hasActionByName(actions.createOrgUnit);
	}

	_getDefaultFields(action, fieldNames) {
		const defaultFields = [];
		fieldNames.forEach(name => {
			if (action.hasFieldByName(name)) {
				const field = action.getFieldByName(name);
				field.value && defaultFields.push({ name, value: field.value });
			}
		});
		return defaultFields;
	}
}
