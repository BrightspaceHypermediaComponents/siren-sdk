
export const PendingContainerMixin = superclass => class extends superclass {

	static get properties() {
		return {
			_hasPendingChildren: {
				type: Boolean
			}
		};
	}

	constructor() {
		super();
		this.__pendingCount = 0;
		this._hasPendingChildren = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-pending-state', this.__onPendingState);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-pending-state', this.__onPendingState);
	}

	async __onPendingState(e) {
		const promise = e.detail.promise;
		if (!promise) {
			return;
		}
		this._hasPendingChildren = true;
		this.__pendingCount++;
		try {
			await promise;
		} catch (e) {
			// to supress uncaught exception logs
		} finally {
			this.__pendingCount--;
			if (this.__pendingCount === 0) {
				this._hasPendingChildren = false;
				const pendingEvent = new CustomEvent('d2l-pending-resolved', {
					composed: true,
					bubbles: true
				});
				this.dispatchEvent(pendingEvent);
			}
		}
	}
};
