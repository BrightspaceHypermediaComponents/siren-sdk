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
			expect(discussionTopic.descriptionPlaintext()).to.equal('Example description for test case');
			expect(discussionTopic.descriptionHtml()).to.equal('<p> Example description for test case </p>');
		});
	});

	describe('Editable', () => {
		it('sets canEditName to true', () => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);
			expect(discussionTopic.canEditName()).to.be.true;
			expect(discussionTopic.canEditDescription()).to.be.true;
		});
	});

	describe('Non Editable', () => {
		it('sets canEditName to false', () => {
			const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
			expect(discussionTopic.canEditName()).to.be.false;
			expect(discussionTopic.canEditDescription()).to.be.false;
		});
	});
});
