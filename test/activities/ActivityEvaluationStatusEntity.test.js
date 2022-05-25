import { ActivityEvaluationStatusEntity } from '../../src/activities/ActivityEvaluationStatusEntity.js';
import { expect } from '@open-wc/testing';
import SirenParse from 'siren-parser';
import { testData } from './data/ActivityEvaluationEntity.js';

describe('ActivityEvaluationStatusEntity', () => {
	let entity;

	beforeEach(() => {
		const entityJson = SirenParse(testData.assignmentStatusEntity);
		entity = new ActivityEvaluationStatusEntity(entityJson);
	});

	describe('Loads all properties', () => {
		it('can get num assigned', () => {
			expect(entity.numAssigned()).to.equal(30);
		});

		it('can get num completed', () => {
			expect(entity.numCompleted()).to.equal(15);
		});

		it('can get num evaluated', () => {
			expect(entity.numEvaluated()).to.equal(10);
		});

		it('can get num published', () => {
			expect(entity.numPublished()).to.equal(5);
		});

		it('can get num newSubmissions', () => {
			expect(entity.numNewSubmissions()).to.equal(1);
		});

		it('can get num resubmissions', () => {
			expect(entity.numResubmissions()).to.equal(2);
		});
	});

	describe('Loads all sub entities', () => {
		it('can get assess all application href', () => {
			expect(entity.assessAllApplication()).to.equal('assess-all');
		});

		it('can get assess new application href', () => {
			expect(entity.assessNewApplication()).to.equal('assess-new');
		});

		it('can get assess all application href', () => {
			expect(entity.submissionApplication()).to.equal('submission');
		});
	});

	describe('Loads the correct activity types', () => {
		it('can get assignment activity type', () => {
			const entityJson = SirenParse(testData.assignmentStatusEntity);
			entity = new ActivityEvaluationStatusEntity(entityJson);

			expect(entity.getActivityType()).to.equal('assignment');
		});

		it('can get quiz activity type', () => {
			const entityJson = SirenParse(testData.quizStatusEntity);
			entity = new ActivityEvaluationStatusEntity(entityJson);

			expect(entity.getActivityType()).to.equal('quiz');
		});

		it('can get discussion topic activity type', () => {
			const entityJson = SirenParse(testData.discussionTopicStatusEntity);
			entity = new ActivityEvaluationStatusEntity(entityJson);

			expect(entity.getActivityType()).to.equal('topic');
		});

		it('returns null when unable to find activity type', () => {
			const entityJson = SirenParse(testData.unexpectedStatusEntity);
			entity = new ActivityEvaluationStatusEntity(entityJson);

			expect(entity.getActivityType()).to.be.null;
		});
	});
});
