import { GradeCandidateEntity } from '../../src/activities/GradeCandidateEntity.js';
import { testData } from './data/GradeCandidateEntity.js';

describe('GradeCandidateEntity', () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('Grade', () => {
		let entity;
		let associateGradeSpy;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.gradeCandidateEntity.grade);
			entity = new GradeCandidateEntity(entityJson);
			associateGradeSpy = sandbox.spy(entity, 'associateGrade');
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grades/20');
		});

		it('gets getGradeCandidates', () => {
			expect(entity.getGradeCandidates()).to.be.an('array').that.is.empty;
		});

		it('is not a category', () => {
			expect(entity.isCategory()).to.be.false;
		});

		it('can associate grade', () => {
			expect(entity.canAssociateGrade()).to.be.true;
		});

		it('returns a promise when associating grade', () => {
			entity.associateGrade();
			expect(associateGradeSpy.returnValues[0]).to.be.a('promise');
		});
	});

	describe('Grade without Associate Action', () => {
		let entity;
		let associateGradeSpy;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.gradeCandidateEntity.gradeWithoutAssociateAction);
			entity = new GradeCandidateEntity(entityJson);
			associateGradeSpy = sandbox.spy(entity, 'associateGrade');
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grades/20');
		});

		it('gets getGradeCandidates', () => {
			expect(entity.getGradeCandidates()).to.be.an('array').that.is.empty;
		});

		it('is not a category', () => {
			expect(entity.isCategory()).to.be.false;
		});

		it('can associate grade', () => {
			expect(entity.canAssociateGrade()).to.be.false;
		});

		it('cannot associate to a grade', () => {
			entity.associateGrade();
			expect(associateGradeSpy.returnValues).to.not.be.a('promise');
		});
	});

	describe('Category with Grade', () => {
		let entity;
		let associateGradeSpy;

		beforeEach(() => {
			const entityJson = window.D2L.Hypermedia.Siren.Parse(testData.gradeCandidateEntity.categoryWithGrade);
			entity = new GradeCandidateEntity(entityJson);
			associateGradeSpy = sandbox.spy(entity, 'associateGrade');
		});

		it('gets href', () => {
			expect(entity.href()).to.equal('https://9caa9c10-0175-4c56-84e5-fc2bca4d8a52.grades.api.proddev.d2l/organizations/6609/grade-categories/5010');
		});

		it('gets getGradeCandidates', () => {
			const expected = entity.getGradeCandidates();
			expect(expected).to.be.an('array');
			expect(expected).to.have.lengthOf(1);
		});

		it('is a category', () => {
			expect(entity.isCategory()).to.be.true;
		});

		it('can associate grade', () => {
			expect(entity.canAssociateGrade()).to.be.false;
		});

		it('cannot associate to a grade', () => {
			entity.associateGrade();
			expect(associateGradeSpy.returnValues).to.not.be.a('promise');
		});
	});
});
