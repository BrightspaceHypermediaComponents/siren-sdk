import { createAction } from './createAction.js';
import { createReducer } from './createReducer.js';
import { _extends } from './extends.js';

function getType$1(slice, actionKey) {
	return slice + "/" + actionKey;
} // internal definition is a little less restrictive

export function createSlice(options) {
	var name = options.name,
		initialState = options.initialState;

	if (!name) {
		throw new Error('`name` is a required option for createSlice');
	}

	var reducers = options.reducers || {};
	var extraReducers = typeof options.extraReducers === 'undefined' ? {} : typeof options.extraReducers === 'function' ? executeReducerBuilderCallback(options.extraReducers) : options.extraReducers;
	var reducerNames = Object.keys(reducers);
	var sliceCaseReducersByName = {};
	var sliceCaseReducersByType = {};
	var actionCreators = {};
	reducerNames.forEach(function (reducerName) {
		var maybeReducerWithPrepare = reducers[reducerName];
		var type = getType$1(name, reducerName);
		var caseReducer;
		var prepareCallback;

		if (typeof maybeReducerWithPrepare === 'function') {
			caseReducer = maybeReducerWithPrepare;
		} else {
			caseReducer = maybeReducerWithPrepare.reducer;
			prepareCallback = maybeReducerWithPrepare.prepare;
		}

		sliceCaseReducersByName[reducerName] = caseReducer;
		sliceCaseReducersByType[type] = caseReducer;
		actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
	});

	var finalCaseReducers = _extends({}, extraReducers, {}, sliceCaseReducersByType);

	var reducer = createReducer(initialState, finalCaseReducers);
	return {
		name: name,
		reducer: reducer,
		actions: actionCreators,
		caseReducers: sliceCaseReducersByName
	};
}