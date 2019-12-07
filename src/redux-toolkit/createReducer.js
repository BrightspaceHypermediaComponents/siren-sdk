
import createNextState from 'immer';

export function createReducer(initialState, mapOrBuilderCallback) {
	var actionsMap = typeof mapOrBuilderCallback === 'function' ? executeReducerBuilderCallback(mapOrBuilderCallback) : mapOrBuilderCallback;
	return function (state, action) {
		if (state === void 0) {
			state = initialState;
		}

		// @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
		// than an Immutable<S>, and TypeScript cannot find out how to reconcile
		// these two types.
		return createNextState(state, function (draft) {
			var caseReducer = actionsMap[action.type];
			return caseReducer ? caseReducer(draft, action) : undefined;
		});
	};
}

function executeReducerBuilderCallback(builderCallback) {
	var actionsMap = {};
	var builder = {
		addCase: function addCase(typeOrActionCreator, reducer) {
			var type = typeof typeOrActionCreator === 'string' ? typeOrActionCreator : typeOrActionCreator.type;

			if (type in actionsMap) {
				throw new Error('addCase cannot be called with two reducers for the same action type');
			}

			actionsMap[type] = reducer;
			return builder;
		}
	};
	builderCallback(builder);
	return actionsMap;
}