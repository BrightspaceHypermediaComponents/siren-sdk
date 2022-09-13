import { DiscussionTopicEntity } from '../../../src/activities/discussions/DiscussionTopicEntity.js';
import { editableDiscussionTopic } from './data/EditableDiscussionTopic.js';
import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client.js';
import { getFormData } from '../../utility/test-helpers.js';
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

	describe('hasPosts', () => {
		it('returns true when topic has posts', () => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);
			expect(discussionTopic.hasPosts()).to.be.true;
		});

		it('returns false when topic does not have posts', () => {
			const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
			expect(discussionTopic.hasPosts()).to.be.false;
		});
	});

	describe('delete', () => {
		it('delete Topic', async() => {
			fetchMock.deleteOnce('https://f5aa43d7-c082-485c-84f5-4808147fe98a.discussions.api.dev.brightspace.com/6613/forums/10003/topics/10004', editableEntity);

			const discussionTopic = new DiscussionTopicEntity(editableEntity);

			await discussionTopic.delete();
			expect(fetchMock.called()).to.be.true;
		});

		it('cannot delete topic', async() => {
			const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);
			await discussionTopic.delete();
			expect(fetchMock.done());
		});

		afterEach(() => {
			fetchMock.reset();
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

	describe('save', () => {
		beforeEach(() => {
			// Mock PATCH topic call, which only exists in editable discussion topic entities
			fetchMock.patch('https://f5aa43d7-c082-485c-84f5-4808147fe98a.discussions.api.dev.brightspace.com/6613/forums/10003/topics/10004', editableEntity);
		});

		afterEach(() => {
			fetchMock.reset();
		});

		it('saves', async() => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);

			await discussionTopic.save({
				name: 'New name',
				description: '<p>New description</p>',
			});

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('name')).to.equal('New name');
				expect(form.get('description')).to.equal('<p>New description</p>');
			}

			expect(fetchMock.called()).to.be.true;
			expect(fetchMock.calls().length).to.equal(1);
		});

		describe('sync with forum feature', () => {
			let discussionTopic;

			beforeEach(() => {
				discussionTopic = new DiscussionTopicEntity(editableEntity);
			});

			it('syncs when topic name is changed and topic is flagged to sync with forum name by the topic mobx entity', async() => {
				await discussionTopic.save(
					{ name: 'New name' },
					true,
				);

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('name')).to.equal('New name');
					expect(form.get('shouldSyncNameWithForum')).to.equal('true');
				}
			});

			it('does not fire patch topic action nor sync with forum name when topic name is unchanged', async() => {
				await discussionTopic.save(
					{ name: 'What a great topic' },
					true,
				);

				expect(fetchMock.called()).to.be.false;
			});

			it('does not sync when topic is flagged to not sync with forum name by the topic mobx entity', async() => {
				await discussionTopic.save(
					{ name: 'New name' },
					false,
				);

				const form = await getFormData(fetchMock.lastCall().request);
				if (!form.notSupported) {
					expect(form.get('name')).to.equal('New name');
					expect(form.get('shouldSyncNameWithForum')).to.equal('false');
				}
			});
		});

		it('skips save if not dirty', async() => {
			const discussionTopic = new DiscussionTopicEntity(editableEntity);

			await discussionTopic.save({
				name: 'What a great topic',
				description: '<p>A great topic description</p>',
			});

			expect(fetchMock.called()).to.be.false;
		});

		it('skips save if not editable', async() => {
			const discussionTopic = new DiscussionTopicEntity(nonEditableEntity);

			await discussionTopic.save({
				name: 'New name',
				description: '<p>New description</p>',
			});

			expect(fetchMock.called()).to.be.false;
		});
	});
});
