
/* global describe it expect sinon*/
import { ConsortiumRootEntity } from '../../src/consortium/ConsortiumRootEntity';

const consortiumRoot = {'class':['consortium'], 'actions':[{'href':'https://7f5bdf4f-ac6d-41e4-a614-4c6a0a938bff.consortium.api.proddev.d2l/tokens', 'name':'consortium-tokens', 'method':'POST'}]};

describe('Consortium entity', () => {
	describe('serializes', () => {
		it('hasaction', () =>{
			const entity =  window.D2L.Hypermedia.Siren.Parse(consortiumRoot);
			const consortiumRootEntity = new ConsortiumRootEntity(entity);
			assert.equals(consortiumRoot.actions[0].href, consortiumRootEntity.getConsortiumCollection());
		});
	});
});

