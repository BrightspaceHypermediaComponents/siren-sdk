/* global fetchMock */
import { ContentLTILinkEntity } from '../../../src/activities/content/contentLTILinkEntity.js';
import { contentLTILinkData } from './data/TestContentLTILinkEntity.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('ContentLTILinkEntity', () => {
	let ltiLinkData;
	let contentLTILinkEntity;

	beforeEach(() => {
		ltiLinkData = window.D2L.Hypermedia.Siren.Parse(contentLTILinkData);
		contentLTILinkEntity = new ContentLTILinkEntity(ltiLinkData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			expect(contentLTILinkEntity.title()).to.equal('Test LTI Link Title');
		});

		it('reads rich text description', () => {
			expect(contentLTILinkEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			expect(contentLTILinkEntity.descriptionText()).to.equal('description text');
		});

		it('reads url', () => {
			expect(contentLTILinkEntity.url()).to.equal('https://phoenix-is-the-best.com');
		});

		it('reads isExternalResources', () => {
			expect(contentLTILinkEntity.isExternalResource()).to.equal(true);
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const ltiLinkData = {
				title: 'Test LTI Link Title',
				descriptionRichText: '<p>description text</p>',
				url: 'https://phoenix-is-the-best.com',
				isExternalResource: true
			};
			expect(contentLTILinkEntity.equals(ltiLinkData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const ltiLinkData = {
				title: 'New Title',
				descriptionRichText: '<p>description text</p>',
				url: 'https://phoenix-is-the-best.com',
				isExternalResource: true
			};
			expect(contentLTILinkEntity.equals(ltiLinkData)).to.equal(false);
		});

		it('Equality should return false when description is different', () => {
			const ltiLinkData = {
				title: 'New Title',
				descriptionRichText: '<p>New description text</p>',
				url: 'https://phoenix-is-the-best.com',
				isExternalResource: true
			};
			expect(contentLTILinkEntity.equals(ltiLinkData)).to.equal(false);
		});

		it('Equality should return false when url is different', () => {
			const ltiLinkData = {
				title: 'New Title',
				descriptionRichText: '<p>New description text</p>',
				url: 'https://phoenix-is-the-very-best.com',
				isExternalResource: true
			};
			expect(contentLTILinkEntity.equals(ltiLinkData)).to.equal(false);
		});

		it('Equality should return false when isExternalResource is different', () => {
			const ltiLinkData = {
				title: 'New Title',
				descriptionRichText: '<p>New description text</p>',
				url: 'https://phoenix-is-the-very-best.com',
				isExternalResource: false
			};
			expect(contentLTILinkEntity.equals(ltiLinkData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345', ltiLinkData);

			await contentLTILinkEntity.setLTILinkTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345', ltiLinkData);

			await contentLTILinkEntity.setLTILinkDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves isExternalResource', async() => {
			fetchMock.putOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345/external', ltiLinkData);

			await contentLTILinkEntity.setLTILinkExternalResource(false);

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('isExternalResource')).to.equal('false');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/ltilinks/12345', ltiLinkData);
			await contentLTILinkEntity.deleteLTILink();
			expect(fetchMock.called()).to.be.true;
		});
	});
});
