/* global describe it expect sinon*/
import { ConsortiumTokenCollectionEntity } from '../../src/consortium/ConsortiumTokenCollectionEntity.js';
import { ConsortiumTokenEntity } from '../../src/consortium/ConsortiumTokenEntity.js';
import { Rels } from '../../src/hypermedia-constants.js';
import { root } from '../../src/root/root.js';

describe('Consortium entity', () => {

	describe('Consortium entity', () => {
		const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidGVuYW50aWQiOiIxY2IxNmQ2YS04NTU3LTQ4NTAtODg0Ni0zZmE5YjYxNzQ0OTQiLCJpYXQiOjE1MTYyMzkwMjJ9.z5hMu02Cx8p7Lw0a_1nBVTkMD2UncN5UZre3l0SWo7c';
		const tenant1 = '1cb16d6a-8557-4850-8846-3fa9b6174494';
		const tenant2 = '8b33e567-c616-4667-868b-fdfe9edc3a78';
		const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidGVuYW50aWQiOiI4YjMzZTU2Ny1jNjE2LTQ2NjctODY4Yi1mZGZlOWVkYzNhNzgiLCJpYXQiOjE1MTYyMzkwMjJ9.cQjR28qT_c-os_FeFy4-L1NhCIY-9utPLzSHrzIMuOc';
		it('has collection', done => {
			const entity =  window.D2L.Hypermedia.Siren.Parse({
				class: ['tokens'],
				entities: [
					{
						class: [
							'token',
						],
						rel: [],
						properties: {
							tenant: tenant1,
							token: token1
						},
						links: [
							{
								rel: ['self'],
								href: 'https://consortium.api.dev.brightspace.com/1cb16d6a-8557-4850-8846-3fa9b6174494'
							},
							{
								rel: [Rels.root],
								href: '/root.json'
							}
						]
					},
					{
						class: [
							'token',
						],
						rel: [],
						properties: {
							tenant: tenant2,
							token: token2
						},
						links: [
							{
								rel: ['self'],
								href: 'https://consortium.api.dev.brightspace.com/8b33e567-c616-4667-868b-fdfe9edc3a78'
							},
							{
								rel: [Rels.root],
								href: '/root.json'
							}
						]
					}
				]
			});
			const consortium = new ConsortiumTokenCollectionEntity(entity);
			expect(consortium._consortiumTokenEntities().length).to.equal(2);
			const tokenEntities = [];
			const rootEntities = [];
			consortium.consortiumTokenEntities((entity) => {
				tokenEntities.push(entity);
				entity.rootOrganizationEntity((root) =>  {
					rootEntities.push(root);
				});
			});

			setTimeout(() => {
				expect(tokenEntities.length, 'token entities length invalid').to.be.equal(2);
				for (const entity of tokenEntities) {
					expect(entity).to.be.an.instanceof(ConsortiumTokenEntity);
				}
				expect(rootEntities.length, 'root entities length invalid').to.be.equal(2);
				for (const rootEntity of rootEntities) {
					expect(rootEntity).to.be.an.instanceof(root);
				}
				expect(tokenEntities[0].consortiumToken()).to.be.equal(token1);
				expect(tokenEntities[1].consortiumToken()).to.be.equal(token2);
				expect(tokenEntities[0].consortiumTenant()).to.be.equal(tenant1);
				expect(tokenEntities[1].consortiumTenant()).to.be.equal(tenant2);

				done();
			}, 50);
		});
	});
});
