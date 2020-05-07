import { CompetenciesEntity } from '../../src/competencies/CompetenciesEntity.js';
import { testData } from './data/CompetenciesEntity.js';

describe('CompetenciesEntity', () => {
	let entity, entityJson;

	beforeEach(() => {
		entityJson = window.D2L.Hypermedia.Siren.Parse(testData.competenciesEntity);
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
