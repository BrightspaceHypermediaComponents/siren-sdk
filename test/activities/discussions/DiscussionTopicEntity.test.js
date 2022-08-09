import { DiscussionTopicEntity } from '../../../src/activities/discussions/DiscussionTopicEntity.js';
import { editableDiscussionTopic } from './data/EditableDiscussionTopic.js';
import { expect } from '@open-wc/testing';
import { nonEditableDiscussionTopic } from './data/NonEditableDiscussionTopic.js';
import SirenParse from 'siren-parser';

describe('DiscussionTopicEntity', () => {
	let editableEntity, nonEditableEntity;

	beforeEach(() => {
		nonEditableEntity = SirenParse(nonEditableDiscussionTopic);
		editableEntity = SirenParse(editableDiscussionTopic);
	});

	describe('Basic loading', () => {
		it('reads name', () => {
			const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
			expect(discussionTopic.name()).to.equal('What a great topic');
		});
	});

	describe('Equals', () => {
		let modifiedEntity;

		beforeEach(() => {
			modifiedEntity = {
				name: 'What a great topic',
				description: '<p>A great topic description</p>',
			};
		});

		it('returns true when equal', () => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);
			expect(discussionTopic.equals(modifiedEntity)).to.be.true;
		});

		it('returns false when name not equal', () => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);
			modifiedEntity.name = 'New name for discussion topic';
			expect(discussionTopic.equals(modifiedEntity)).to.be.false;
		});

		it('returns false when description not equal', () => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);
			modifiedEntity.description = 'New description for discussion topic';
			expect(discussionTopic.equals(modifiedEntity)).to.be.false;
		});
	});

	describe('name', () => {
		describe('canEditName', () => {
			it('returns true when name is editable', () => {
				const discussionTopic = new DiscussionTopicEntity(editableEntity);
				expect(discussionTopic.canEditName()).to.be.true;
			});

			it('returns false when name is not editable', () => {
				const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
				expect(discussionTopic.canEditName()).to.be.false;
			});
		});
	});

	describe('description', () => {
		describe('canEditDescription', () => {
			it('returns true when description is editable', () => {
				const discussionTopic = new DiscussionTopicEntity(editableEntity);
				expect(discussionTopic.canEditDescription()).to.be.true;
			});

			it('returns false when description are is editable', () => {
				const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
				expect(discussionTopic.canEditDescription()).to.be.false;
			});
		});

		describe('properties', () => {
			describe('descriptionPlaintext', () => {
				it('returns description in plain text when description is editable', () => {
					const discussionTopic = new DiscussionTopicEntity(editableEntity);
					expect(discussionTopic.descriptionPlaintext()).to.equal('A great topic description');
				});

				it('returns description in plain text when description is not editable', () => {
					const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
					expect(discussionTopic.descriptionPlaintext()).to.equal('A great topic description');
				});
			});

			describe('descriptionHtml', () => {
				it('returns description in html format when description is editable', () => {
					const discussionTopic = new DiscussionTopicEntity(editableEntity);
					expect(discussionTopic.descriptionHtml()).to.equal('<p>A great topic description</p>');
				});

				it('returns description in html format when description is not editable', () => {
					const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
					expect(discussionTopic.descriptionHtml()).to.equal('<p>A great topic description</p>');
				});
			});
		});
	});
});
