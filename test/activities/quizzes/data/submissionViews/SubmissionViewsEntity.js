export const editableCollection = {
	class: ['submission-views', 'collection'],
	entities: [
		{
			class: ['submission-view', 'primary'],
			rel: ['item'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		},
		{
			class: ['submission-view', 'secondary'],
			rel: ['item'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/9?workingCopyId=123'
		}
	],
	links: [
		{
			rel: ['self'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews?workingCopyId=123'
		}
	],
	actions: [
		{
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews?workingCopyId=123',
			name: 'add',
			method: 'POST',
			fields: []
		}
	]
};

export const nonEditableCollection = {
	class: ['submission-views', 'collection'],
	entities: [
		{
			class: ['submission-view', 'primary'],
			rel: ['item'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/7?workingCopyId=123'
		},
		{
			class: ['submission-view', 'secondary'],
			rel: ['item'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews/9?workingCopyId=123'
		}
	],
	links: [
		{
			rel: ['self'],
			href:
				'/{orgUnitId}/quizzes/{quizId}/submissionviews?workingCopyId=123'
		}
	]
};
