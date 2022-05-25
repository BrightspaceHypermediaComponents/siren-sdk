import { CompetenciesEntity } from '../../src/competencies/CompetenciesEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/CompetenciesEntity.js';

describe('CompetenciesEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = SirenParse(testData.competenciesEntity);
		entity = new CompetenciesEntity(entityJson);
	});

	it('has associated count', () => {
		expect(entity.associatedCount()).to.equal(123);
	});

	it('has unevaluated count', () => {
		expect(entity.unevaluatedCount()).to.equal(54);
	});

	it('has dialog url property', () => {
		expect(entity.dialogUrl()).to.equal('/d2l/lms/dropbox/dialogs/modify/folder_newedit_activities.d2l?ou=132730&db=1152');
	});
});
