/* global fetchMock */

import { ContentEntity } from '../../../src/activities/content/ContentEntity.js';
import { editableContent } from './data/EditableContent.js';

describe('ContentEntity', () => {
	let editableEntity;

	beforeEach(() => {
		editableEntity = window.D2L.Hypermedia.Siren.Parse(editableContent);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			var contentEntity = new ContentEntity(editableEntity);
			expect(contentEntity.name()).to.equal('Extra Special Content');
		});
	});
});
