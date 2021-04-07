/* global fetchMock */
import { ContentWebLinkEntity } from '../../../src/activities/content/ContentWebLinkEntity.js';
import { contentWebLinkData } from './data/TestContentWebLinkEntity.js';
import { getFormData } from '../../utility/test-helpers.js';

describe('ContentWebLinkEntity', () => {
	let webLinkData;
	let contentWebLinkEntity;

	beforeEach(() => {
		webLinkData = window.D2L.Hypermedia.Siren.Parse(contentWebLinkData);
		contentWebLinkEntity = new ContentWebLinkEntity(webLinkData);
	});

	afterEach(() => {
		fetchMock.reset();
	});

	describe('Reads properties', () => {
		it('reads title', () => {
			expect(contentWebLinkEntity.title()).to.equal('Test Web Link Title');
		});

		it('reads rich text description', () => {
			expect(contentWebLinkEntity.descriptionRichText()).to.equal('<p>description text</p>');
		});

		it('reads text description', () => {
			expect(contentWebLinkEntity.descriptionText()).to.equal('description text');
		});

		it('reads url', () => {
			expect(contentWebLinkEntity.url()).to.equal('https://phoenix-is-the-best.com');
		});

		it('reads isExternalResources', () => {
			expect(contentWebLinkEntity.isExternalResource()).to.equal(true);
		});
	});

	describe('Equality tests', () => {
		it('Equality should return true when details match', () => {
			const webLinkData = {
				title: 'Test Web Link Title',
				url: 'https://phoenix-is-the-best.com',
				isExternalResource: true
			};
			expect(contentWebLinkEntity.equals(webLinkData)).to.equal(true);
		});

		it('Equality should return false when title is different', () => {
			const webLinkData = {
				title: 'New Title',
				url: 'https://phoenix-is-the-best.com',
				isExternalResource: true
			};
			expect(contentWebLinkEntity.equals(webLinkData)).to.equal(false);
		});

		it('Equality should return false when url is different', () => {
			const webLinkData = {
				title: 'Test Web Link Title',
				url: 'https://phoenix-is-the-very-best.com',
				isExternalResource: true
			};
			expect(contentWebLinkEntity.equals(webLinkData)).to.equal(false);
		});

		it('Equality should return false when isExternalResource is different', () => {
			const webLinkData = {
				title: 'Test Web Link Title',
				url: 'https://phoenix-is-the-best.com',
				isExternalResource: false
			};
			expect(contentWebLinkEntity.equals(webLinkData)).to.equal(false);
		});
	});

	describe('Actions', () => {
		it('saves title', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/weblinks/12345', webLinkData);

			await contentWebLinkEntity.setWebLinkTitle('New Title');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('title')).to.equal('New Title');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves description', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/weblinks/12345', webLinkData);

			await contentWebLinkEntity.setWebLinkDescription('<p>New description</p>');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('description')).to.equal('<p>New description</p>');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves url', async() => {
			fetchMock.patchOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/weblinks/12345', webLinkData);

			await contentWebLinkEntity.setWebLinkUrl('https://phoenix-is-the-very-best.com');

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('url')).to.equal('https://phoenix-is-the-very-best.com');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('saves isExternalResource', async() => {
			fetchMock.putOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/weblinks/12345/external', webLinkData);

			await contentWebLinkEntity.setWebLinkExternalResource(false);

			const form = await getFormData(fetchMock.lastCall().request);
			if (!form.notSupported) {
				expect(form.get('isExternalResource')).to.equal('false');
			}
			expect(fetchMock.called()).to.be.true;
		});

		it('performs delete request', async() => {
			fetchMock.deleteOnce('https://fake-tenant-id.weblinks.api.proddev.d2l/6613/weblinks/12345', webLinkData);
			await contentWebLinkEntity.deleteWebLink();
			expect(fetchMock.called()).to.be.true;
		});
	});
});
