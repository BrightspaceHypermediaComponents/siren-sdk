'use strict';

import { Entity } from '../es6/Entity.js';
import { OrganizationEntity } from './OrganizationEntity';
import { performSirenAction } from '../es6/SirenAction.js';

const rels = {
	organization: 'https://api.brightspace.com/rels/organization'
};

const actions = {
	searchOrganizationCollection: 'search-course-collection'
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
			fields
		);
		const link = entity && entity.getLinkByRel('self');
		return link && link.href;
	}
}
