
import { ConsortiumRootEntity } from '../../src/consortium/ConsortiumRootEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';

const consortiumRoot = { 'class':['consortium'], 'actions':[{ 'href':'https://7f5bdf4f-ac6d-41e4-a614-4c6a0a938bff.consortium.api.proddev.d2l/tokens', 'name':'consortium-tokens', 'method':'POST' }] };

describe('Consortium entity', () => {
	describe('serializes', () => {
		it('hasaction', () => {
			const entity = SirenParse(consortiumRoot);
			const consortiumRootEntity = new ConsortiumRootEntity(entity);
			expect(consortiumRoot.actions[0].href).to.be.equals(consortiumRootEntity.getConsortiumCollection().href);
		});
	});
});

