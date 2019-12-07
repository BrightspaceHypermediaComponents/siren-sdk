import { _extends } from './extends.js';

export function createAction(type, prepareAction) {
	function actionCreator() {
		if (prepareAction) {
			var prepared = prepareAction.apply(void 0, arguments);

			if (!prepared) {
				throw new Error('prepareAction did not return an object');
			}

			return _extends({
				type: type,
				payload: prepared.payload
			}, 'meta' in prepared && {
				meta: prepared.meta
			}, {}, 'error' in prepared && {
				error: prepared.error
			});
		}

		return {
			type: type,
			payload: arguments.length <= 0 ? undefined : arguments[0]
		};
	}

	actionCreator.toString = function () {
		return "" + type;
	};

	actionCreator.type = type;

	actionCreator.match = function (action) {
		return action.type === type;
	};

	return actionCreator;
}