import { expect } from '@open-wc/testing';
import { gradeScheme } from './data/GradeScheme.js';
import { GradeSchemeEntity } from '../../../src/activities/associateGrade/GradeSchemeEntity.js';
import SirenParse from 'siren-parser';

describe('GradeSchemeEntity', () => {
	describe('get properties', () => {
		let entity;

		beforeEach(() => {
			const entityJson = SirenParse(gradeScheme);
			entity = new GradeSchemeEntity(entityJson);
		});

		it('gets name', () => {
			expect(entity.name()).to.equal('my grade scheme');
		});
	});
});
