export const Rels = {
	// default Brightspace domain rels
	assessment: 'https://api.brightspace.com/rels/assessment',
	assignment: 'https://api.brightspace.com/rels/assignment',
	color: 'https://api.brightspace.com/rels/color',
	completion: 'https://api.brightspace.com/rels/completion',
	content: 'https://api.brightspace.com/rels/content',
	courseOfferingInfoPage: 'https://api.brightspace.com/rels/course-offering-info-page',
	date: 'https://api.brightspace.com/rels/date',
	defaultSearch: 'https://api.brightspace.com/rels/default-search',
	departments: 'https://api.brightspace.com/rels/departments',
	displayName: 'https://api.brightspace.com/rels/display-name',
	enrollments: 'https://api.brightspace.com/rels/enrollments',
	evaluation: 'https://api.brightspace.com/rels/evaluation',
	filter: 'https://api.brightspace.com/rels/filter',
	filters: 'https://api.brightspace.com/rels/filters',
	firstName: 'https://api.brightspace.com/rels/first-name',
	lastName: 'https://api.brightspace.com/rels/last-name',
	myEnrollments: 'https://api.brightspace.com/rels/my-enrollments',
	myMeetings: 'https://meetings.api.brightspace.com/rels/my-meetings',
	myNotifications: 'https://notifications.api.brightspace.com/rels/my-notifications',
	myOrganizationGrades: 'https://api.brightspace.com/rels/my-organization-grades',
	myOrganizationAwards: 'https://api.brightspace.com/rels/my-organization-awards',
	userEnrollment: 'https://api.brightspace.com/rels/user-enrollment',
	organization: 'https://api.brightspace.com/rels/organization',
	organizationHomepage: 'https://api.brightspace.com/rels/organization-homepage',
	organizationImage: 'https://api.brightspace.com/rels/organization-image',
	organizations: 'https://api.brightspace.com/rels/organizations',
	parentSemester: 'https://api.brightspace.com/rels/parent-semester',
	profileImage: 'https://api.brightspace.com/rels/profile-image',
	quiz: 'https://api.brightspace.com/rels/quiz',
	role: 'https://api.brightspace.com/rels/role',
	root: 'https://api.brightspace.com/rels/root',
	richTextEditorConfig: 'https://api.brightspace.com/rels/richtext-editor-config',
	rubric: 'https://api.brightspace.com/rels/rubric',
	semesters: 'https://api.brightspace.com/rels/semesters',
	sequence: 'https://api.brightspace.com/rels/sequence',
	sorts: 'https://api.brightspace.com/rels/sorts',
	thumbnailRegular: 'https://api.brightspace.com/rels/thumbnail#regular',
	thumbnailSmall: 'https://api.brightspace.com/rels/thumbnail#small',
	userProfile: 'https://api.brightspace.com/rels/user-profile',
	user: 'https://api.brightspace.com/rels/user',
	users: 'https://api.brightspace.com/rels/users',
	whoami: 'https://api.brightspace.com/rels/whoami',
	widgetSettings: 'https://api.brightspace.com/rels/widget-settings',
	// Activities API sub-domain rels
	Activities: {
		myActivities: 'https://activities.api.brightspace.com/rels/my-activities',
		myActivitiesEmpty: 'https://activities.api.brightspace.com/rels/my-activities#empty',
		myOrganizationActivities: 'https://activities.api.brightspace.com/rels/my-organization-activities',
		myOrganizationActivitiesEmpty: 'https://activities.api.brightspace.com/rels/my-organization-activities#empty',
		activityCollection: 'https://activities.api.brightspace.com/rels/activity-collection',
		activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage',
		myActivityUsage: 'https://activities.api.brightspace.com/rels/my-activity-usage',
		userActivityUsage: 'https://activities.api.brightspace.com/rels/user-activity-usage',
		myUnassessedActivities: 'https://activities.api.brightspace.com/rels/my-unassessed-activities',
		overdue: 'https://activities.api.brightspace.com/rels/overdue',
		releaseConditionsDialogOpener: 'https://activities.api.brightspace.com/rels/release-conditions-dialog-opener',
		nextPeriod: 'https://activities.api.brightspace.com/rels/next-period',
		nextWeek: 'https://activities.api.brightspace.com/rels/next-week',
		previousPeriod: 'https://activities.api.brightspace.com/rels/previous-period',
		previousWeek: 'https://activities.api.brightspace.com/rels/previous-week',
		nextPage: 'https://activities.api.brightspace.com/rels/next-page',
		previousPage: 'https://activities.api.brightspace.com/rels/previous-page',
		feedback: 'https://activities.api.brightspace.com/rels/feedback',
		activityGrade: 'https://activities.api.brightspace.com/rels/activity-grade',
		activityHomepage: 'https://activities.api.brightspace.com/rels/activity-homepage',
		scoreOutOf: 'https://activities.api.brightspace.com/rels/score-out-of',
		gradeCandidates: 'https://activities.api.brightspace.com/rels/grade-candidates',
		associations: 'https://activities.api.brightspace.com/rels/associations',
		directAssociations: 'https://activities.api.brightspace.com/rels/direct-associations',
		newGradeAssociation: 'https://activities.api.brightspace.com/rels/new-grade-association',
		specialAccess: 'https://activities.api.brightspace.com/rels/special-access'
	},
	Conditions: {
		conditions: 'https://conditions.api.brightspace.com/rels/conditions',
		operators: 'https://conditions.api.brightspace.com/rels/--legacy-operators',
		createDialogOpener: 'https://conditions.api.brightspace.com/rels/--legacy-create-dialog-opener',
		attachDialogOpener: 'https://conditions.api.brightspace.com/rels/--legacy-attach-dialog-opener',
	},
	// Assessments
	Assessments: {
		assessmentApplication: 'https://assessments.api.brightspace.com/rels/assessment-application'
	},
	// Assignments
	Assignments: {
		instructions: 'https://assignments.api.brightspace.com/rels/instructions',
		anonymousMarking: 'https://assignments.api.brightspace.com/rels/anonymous-marking',
		turnitinDialogOpener: 'https://assignments.api.brightspace.com/rels/turnitin-dialog-opener',
		attachments: 'https://assignments.api.brightspace.com/rels/attachments',
		annotations: 'https://assignments.api.brightspace.com/rels/annotations',
		folderType: 'https://assignments.api.brightspace.com/rels/folder-type',
		groupsHomepage: 'https://assignments.api.brightspace.com/rels/groups-homepage',
		filesSubmissionLimit: 'https://assignments.api.brightspace.com/rels/files-submission-limit',
		submissionsRule: 'https://assignments.api.brightspace.com/rels/submissions-rule',
		notificationEmail: 'https://assignments.api.brightspace.com/rels/notification-email'
	},
	// Awards
	Awards: {
		courseUserAvailableAwards: 'https://awards.api.brightspace.com/rels/course-user-available-awards',
		courseUserAwardedAwards: 'https://awards.api.brightspace.com/rels/course-user-awarded-awards',
		releaseConditions: 'https://awards.api.brightspace.com/rels/release-conditions',
		userAward: 'https://awards.api.brightspace.com/rels/user-award',
		userAwards: 'https://awards.api.brightspace.com/rels/user-awards'
	},
	Checklists: {
		checklist: 'https://checklists.api.brightspace.com/rels/checklist',
		checklistItem: 'https://checklists.api.brightspace.com/rels/checklist-item'
	},
	Content: {
		moduleEntity: 'https://modules.api.brightspace.com/rels/content-module',
		weblinkEntity: 'https://weblinks.api.brightspace.com/rels/content-weblink',
		ltilinkEntity: 'https://weblinks.api.brightspace.com/rels/content-ltilink'
	},
	// Parents API sub-domain rels
	Parents: {
		allChildren: 'https://parents.api.brightspace.com/rels/all-my-children'
	},
	// Discussions API sub-domain rels
	Discussions: {
		description: 'https://discussions.api.brightspace.com/rels/description',
		mySubscriptions: 'https://discussions.api.brightspace.com/rels/my-subscriptions',
		topic: 'https://discussions.api.brightspace.com/rels/topic'
	},
	// Files API sub-domain rels
	Files: {
		files: 'https://files.api.brightspace.com/rels/files',
	},
	// Folio API sub-domain rels
	Folio: {
		contentItem: 'https://folio.api.brightspace.com/rels/Content',
		commentList: 'https://folio.api.brightspace.com/rels/CommentList',
		evidence: 'https://folio.api.brightspace.com/rels/Evidence',
		folio: 'https://folio.api.brightspace.com/rels/folio',
		reflection: 'https://folio.api.brightspace.com/rels/Reflection',
		courseInfo: 'https://folio.api.brightspace.com/rels/CourseInfo',
		courseList: 'https://folio.api.brightspace.com/rels/CourseList'
	},
	// Grades API sub-domain rels
	Grades: {
		category: 'https://grades.api.brightspace.com/rels/grade-category',
		comment: 'https://grades.api.brightspace.com/rels/comment',
		comments: 'https://grades.api.brightspace.com/rels/comments',
		description: 'https://grades.api.brightspace.com/rels/description',
		grade: 'https://grades.api.brightspace.com/rels/grade',
		userGrade: 'https://grades.api.brightspace.com/rels/user-grade',
		weight: 'https://grades.api.brightspace.com/rels/weight'
	},
	// Quizzes API sub-domain rels
	Quizzes: {
		description: 'https://quizzes.api.brightspace.com/rels/description',
		header: 'https://quizzes.api.brightspace.com/rels/header',
		shuffle: 'https://quizzes.api.brightspace.com/rels/shuffle',
		hints: 'https://quizzes.api.brightspace.com/rels/has-hints',
		disableRightClick: 'https://quizzes.api.brightspace.com/rels/disable-right-click',
		disablePagerAndAlerts: 'https://quizzes.api.brightspace.com/rels/disable-pager-access',
		password: 'https://quizzes.api.brightspace.com/rels/quiz-password',
		notificationEmail: 'https://quizzes.api.brightspace.com/rels/notification-email',
		preventMovingBackwards: 'https://quizzes.api.brightspace.com/rels/prevent-moving-backwards',
		autoSetGraded: 'https://quizzes.api.brightspace.com/rels/auto-set-graded',
		timing: 'https://quizzes.api.brightspace.com/rels/timing',
		timingType: 'https://quizzes.api.brightspace.com/rels/timing-type',
		timingLateType: 'https://quizzes.api.brightspace.com/rels/timing-late-type',
		attempts: 'https://quizzes.api.brightspace.com/rels/attempts',
		ipRestrictions: 'https://quizzes.api.brightspace.com/rels/ip'
	},
	// Themes API sub-domain rels
	Themes: {
		theme: 'https://themes.api.brightspace.com/rels/theme',
		logo: 'https://themes.api.brightspace.com/rels/logo',
	},
	// Notifications API sub-domain rels
	Notifications: {
		settings: 'https://notifications.api.brightspace.com/rels/settings',
		subscriptions: 'https://notifications.api.brightspace.com/rels/subscriptions',
		digest: 'https://digest.api.brightspace.com/rels/digest',
		emailSettings: 'https://notifications.api.brightspace.com/rels/email-settings',
		smsSettings: 'https://notifications.api.brightspace.com/rels/sms-settings',
		gateways: 'https://notifications.api.brightspace.com/rels/gateways',
		gateway: 'https://notifications.api.brightspace.com/rels/gateway',
		organizationNotifications: 'https://notifications.api.brightspace.com/rels/organization-notifications',
		updates: 'https://notifications.api.brightspace.com/rels/updates',
		updatesSource: 'https://notifications.api.brightspace.com/rels/updates-source'
	},
	// Rubrics API sub-domain rels
	Rubrics: {
		allowedAssociations: 'https://rubrics.api.brightspace.com/rels/allowed-associations',
		criteria: 'https://rubrics.api.brightspace.com/rels/criteria',
		criteriaGroups: 'https://rubrics.api.brightspace.com/rels/criteria-groups',
		criterion: 'https://rubrics.api.brightspace.com/rels/criterion',
		criterionCell: 'https://rubrics.api.brightspace.com/rels/criterion-cell',
		level: 'https://rubrics.api.brightspace.com/rels/level',
		levels: 'https://rubrics.api.brightspace.com/rels/levels',
		overallLevel: 'https://rubrics.api.brightspace.com/rels/overall-level',
		overallLevels: 'https://rubrics.api.brightspace.com/rels/overall-levels',
		rubric: 'https://rubrics.api.brightspace.com/rels/rubric'
	},
	Surveys: {
		survey: 'https://surveys.api.brightspace.com/rels/survey'
	},
	Alignments: {
		alignments: 'https://alignments.api.brightspace.com/rels/alignments',
		alignmentsHierarchical: 'https://alignments.api.brightspace.com/rels/activity-alignments-hierarchical',
		legacyCompetencies: 'https://alignments.api.brightspace.com/rels/legacy-competencies'
	},
	Outcomes: {
		intents: 'https://outcomes.api.brightspace.com/rels/intents',
		intent: 'https://outcomes.api.brightspace.com/rels/intent',
		outcome: 'https://outcomes.api.brightspace.com/rels/outcome'
	},
	Meetings: {
		meetingManagementTool: 'https://meetings.api.brightspace.com/rels/meeting-management-tool'
	},
	Users: {
		canonicalUser: 'https://users.api.brightspace.com/rels/canonical-user'
	},
	IANA: {
		edit: 'edit',
		preview: 'preview',
		createForm: 'create-form'
	}
};

export const Classes = {
	activities: {
		assigned: 'assigned',
		complete: 'complete',
		completion: 'completion',
		draft: 'draft',
		draftPublishedEntity: 'draft-published-entity',
		exempt: 'exempt',
		feedbackDate: 'feedback-date',
		published: 'published',
		scoreOutOf: 'score-out-of',
		started: 'started',
		userAssignmentActivity: 'user-assignment-activity',
		userQuizActivity: 'user-quiz-activity',
		userQuizAttemptActivity: 'user-quiz-attempt-activity',
		userContentActivity: 'user-content-activity',
		userCourseOfferingActivity: 'user-course-offering-activity-usage',
		userDiscussionActivity: 'user-discussion-activity',
		userChecklistActivity: 'user-checklist-activity',
		userSurveyActivity: 'user-survey-activity'
	},
	conditions: {
		legacyCondition: '--legacy-condition'
	},
	assignments: {
		annotated: 'annotated',
		assignment: 'assignment',
		assignmentSubmission: 'assignment-submission',
		assignmentType: {
			individual: 'individual',
			noGroupType: 'no-group-type',
			hasSubmissions: 'has-submissions'
		},
		attachment: 'attachment',
		attachmentList: 'attachment-list',
		instructions: 'instructions',
		file: 'file',
		latest: 'latest',
		link: 'link',
		submissionComment: 'submission-comment',
		submissionDate: 'submission-date',
		submissionList: 'assignment-submission-list',
		annotationTools: 'annotations',
		annotationEnabled: 'enabled',
		annotationDisabled: 'disabled'
	},
	associations: {
		singleAssociation: 'single-association',
		potentialAssociation: 'potential-association'
	},
	awards: {
		available: 'available',
		awarded: 'awarded',
		awardImage: 'award-image',
		badge: 'badge',
		certificate: 'certificate',
		releaseCondition: 'release-condition',
		releaseConditions: 'release-conditions',
		userAward: 'user-award',
		userAwards: 'user-awards'
	},
	consortium: {
		tokens: 'tokens',
		token: 'token'
	},
	content: {
		content: 'content',
		sequencedActivity: 'sequenced-activity',
		description: 'description'
	},
	webLink: {
		externalResource: 'external-resource'
	},
	courseImage: {
		courseImage: 'course-image',
		banner: 'banner',
		tile: 'tile',
		wide: 'wide',
		narrow: 'narrow',
		min: 'min',
		mid: 'mid',
		max: 'max',
		highDensity: 'high-density',
		lowDensity: 'low-density'
	},
	dates: {
		date: 'date',
		dueDate: 'due-date',
		endDate: 'end-date',
		issueDate: 'issue-date',
		startDate: 'start-date'
	},
	discussions: {
		discussion: 'discussion',
		topic: 'topic',
		description: 'description',
		unlocked: 'unlocked'
	},
	enrollments: {
		enrollment: 'enrollment',
		pinned: 'pinned',
		unpinned: 'unpinned'
	},
	grades: {
		category: 'grade-category',
		comments: 'comments',
		currentAssociation: 'current-association',
		description: 'description',
		final: 'final',
		grade: 'grade',
		userGrade: 'user-grade',
		userGrades: 'user-grades',
		weighted: 'weighted',
		points: 'points',
		newGradeCandidate: 'new-grade-candidate'
	},
	organizations: {
		courseOffering: 'course-offering',
	},
	organizationAvailability: {
		orgUnitAvailability: 'orgunit-availability',
		explicit: 'explicit',
		inherit: 'inherit',
		orgUnitType: 'orgunit-type',
		current: 'current',
		descendant: 'descendant'
	},
	quizzes: {
		quiz: 'quiz',
		description: 'description',
		descriptionIsDisplayed: 'description-is-displayed',
		introIsAppendedToDescription: 'intro-is-appended-to-description',
		header: 'header',
		headerIsDisplayed: 'header-is-displayed',
		shuffle: 'shuffle',
		hints: 'has-hints',
		disableRightClick: 'disable-right-click',
		disablePagerAndAlerts: 'disable-pager-access',
		checked: 'checked',
		password: 'password',
		notificationEmail: 'notificationEmail',
		autoSetGraded: 'auto-set-graded',
		timing: {
			recommended: 'recommended',
			enforced: 'enforced',
			showClock: 'show-clock',
			automaticZero: 'uselatelimit'
		},
		attempts: {
			overallGradeCalculationType: 'overall-grade-calculation-type',
			retakeIncorrectOnly: 'retake-incorrect-only'
		},
		ip: {
			restrictions: 'ip-restrictions',
			range: 'ip-range'
		}
	},
	text: {
		richtext: 'richtext'
	},
	users: {
		profile: 'profile'
	},
	notifications: {
		subscription: {
			instant: 'instant',
			digest: 'digest',
			subscribed: 'subscribed',
			unsubscribed: 'unsubscribed',
			disabled: 'disabled'
		}
	},
	rubrics: {
		analytic: 'analytic',
		assessmentCriterionCell: 'assessment-criterion-cell',
		associations: 'associations',
		criterion: 'criterion',
		criterionCell: 'criterion-cell',
		criterionCellSelector: 'criterion-cell-selector',
		criteriaGroup: 'criteria-group',
		description: 'description',
		feedback: 'feedback',
		holistic: 'holistic',
		level: 'level',
		overallFeedback: 'overall-feedback',
		overallLevel: 'overall-level',
		overallLevelSelector: 'overall-level-selector',
		numeric: 'numeric',
		overridden: 'overridden',
		percentage: 'percentage',
		selected: 'selected'
	},
	alignments: {
		selected: 'selected'
	},
	outcomes: {
		intent: 'intent',
		intents: 'intents',
		intentList: 'intent-list',
		organizationIntentList: 'organization-intent-list',
		outcome: 'outcome',
		outcomes: 'outcomes',
		selected: 'selected',
		suggested: 'suggested',
		demonstratableLevel: 'demonstratable-level'
	},
	meetings: {
		bookable: 'bookable'
	},
	relativeUri: 'relative-uri'
};

export const Actions = {
	enrollments: {
		addDepartmentFilter: 'add-department-filter',
		addSemesterFilter: 'add-semester-filter',
		pinCourse: 'pin-course',
		removeDepartmentFilter: 'remove-department-filter',
		removeSemesterFilter: 'remove-semester-filter',
		searchMyEnrollments: 'search-my-enrollments',
		searchMyPinnedEnrollments: 'search-my-pinned-enrollments',
		searchMyDepartments: 'search-my-departments',
		searchMySemesters: 'search-my-semesters',
		setRoleFilters: 'set-role-filters',
		unpinCourse: 'unpin-course',
		updateUserSettings: 'update-user-settings',
		roleFilters: {
			addFilter: 'add-filter',
			applyRoleFilters: 'apply-role-filters',
			clearRoleFilters: 'clear-role-filters',
			removeFilter: 'remove-filter'
		}
	},
	conditions: {
		legacyReplace: '--legacy-replace'
	},
	organizations: {
		removeHomepageBanner: 'remove-homepage-banner',
		setCatalogImage: 'set-catalog-image',
		deleteItem: 'delete-item',
		createExplicitAvailabilityItem: 'create-explicit-availability-item',
		createInheritedAvailabilityItem: 'create-inherited-availability-item',
		createCurrentOrgUnitAvailabilityItem: 'create-current-orgunit-availability-item'
	},
	activities: {
		create: 'create',
		selectCustomDateRange: 'select-custom-date-range',
		startAddNew: 'start-add-new',
		update: 'update',
		updateDraft: 'update-draft',
		scoreOutOf: {
			update: 'update'
		},
		associateGrade: 'associate-grade',
		save: 'save',
		filterWorkToDo: 'filter-work-to-do'
	},
	assignments: {
		assign: 'assign',
		delete: 'delete',
		setToGroup: 'set-to-group',
		setToIndividual: 'set-to-individual',
		updateInstructions: 'update-instructions',
		anonymousMarking: {
			updateAnonymousMarking: 'update-anonymous-marking'
		},
		updateName: 'update-name',
		updateCompletionType: 'update-completion-type',
		updateSubmissionType: 'update-submission-type',
		updateAnnotationToolsAvailability: 'update-annotation-tools-availability',
		update: 'quick-create-folder',
		updateFilesSubmissionLimit: 'update-files-submission-limit',
		updateDefaultScoringRubric: 'update-default-scoring-rubric',
		updateNotificationEmail: 'update-notification-email'
	},
	content: {
		updateTitle: 'update-title',
		updateDescription: 'update-description',
	},
	module: {
		deleteModule: 'delete-module'
	},
	webLink: {
		updateUrl: 'update-url',
		updateExternalResource: 'update-external-resource',
		deleteWeblink: 'delete-webLink',
		deleteLTIlink: 'delete-ltiLink',
	},
	notifications: {
		getCarrierClass: 'get-carrier',
		settings: {
			update: 'update'
		},
		emailSettings: {
			update: 'update',
			delete: 'delete'
		},
		smsSettings: {
			create: 'create',
			update: 'update',
			delete: 'delete',
			verify: 'verify'
		},
		gateways: {
			search: 'search'
		},
		gateway: {
			updateNumber: 'update-number'
		},
		subscription: {
			subscribe: 'subscribe',
			unsubscribe: 'unsubscribe',
			update: 'update'
		}
	},
	digest: {
		subscribeToParentNotifications: 'subscribe-to-parent-notifications',
		skipSubscribeToParentNotifications: 'skip-subscribe-to-parent-notifications',
		unsubscribeToParentNotifications: 'unsubscribe-to-parent-notifications'
	},
	rubrics: {
		selectCriterionCell: 'select-criterion-cell'
	},
	alignments: {
		removeAlignment: 'remove-alignment',
		startUpdateAlignments: 'start-update-alignments',
		select: 'select',
		deselect: 'deselect',
		submit: 'submit',
		saveAlignments: 'save-alignments'
	},
	outcomes: {
		select: 'select'
	},
	associations: {
		deleteAssociation: 'delete-association',
		createAssociation: 'create-association',
		createPotentialAssociation: 'create-potential-association'
	},
	files: {
		filePreviewLocation: 'file-preview-location'
	},
	quizzes: {
		updateName: 'update-name',
		updateShuffle: 'update-shuffle',
		updateHints: 'update-hints',
		updateDisableRightClick: 'update-disable-right-click',
		updateDisablePagerAndAlerts: 'update-disable-pager-access',
		updatePassword: 'update-quiz-password',
		updateNotificationEmail: 'update-notification-email',
		updatePreventMovingBackwards: 'update-prevent-moving-backwards',
		updateAutoSetGraded: 'update-auto-set-graded',
		delete: 'delete-quiz',
		updateDescription: 'update-description',
		updateHeader: 'update-header',
		timing: {
			updateType: 'update-timing-type',
			updateTimeLimit: 'update-timing-time-limit',
			updateLateTypeId: 'update-timing-late-type-id',
			updateHasTimer: 'update-timing-has-timer',
			updateTimingGraceLimit: 'update-timing-grace-limit',
			updateTimingLateData: 'update-timing-late-data'
		},
		attempts: {
			updateAttemptsAllowed: 'update-attempts',
			updateOverallGradeCalculationType: 'update-overall-grade-calculation-type',
			updateRetakeIncorrectOnly: 'update-retake-incorrect-only'
		},
		ipRestrictions: {
			update: 'update',
			delete: 'delete',
			add: 'add'
		}
	},
	workingCopy: {
		checkout: 'checkout',
		checkin: 'checkin'
	}
};
