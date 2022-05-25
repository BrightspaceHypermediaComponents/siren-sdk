export const SaveStatusMixin = superclass => class extends superclass {
	wrapSaveAction(promise) {
		this.dispatchEvent(new CustomEvent('d2l-siren-entity-save-start', {
			bubbles: true,
			composed: true
		}));

		return promise
			.then(result => {
				this.dispatchEvent(new CustomEvent('d2l-siren-entity-save-end', {
					bubbles: true,
					composed: true
				}));

				return result;
			})
			.catch(error => {
				this.dispatchEvent(new CustomEvent('d2l-siren-entity-save-error', {
					error,
					bubbles: true,
					composed: true
				}));

				return Promise.reject(error);
			});
	}
};
