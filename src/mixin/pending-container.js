
export const PendingContainer = superclass => class extends superclass {

	static get properties() {
		return {
			hasPendingChildren: {
				type: Boolean
			},
			pendingCount: {
				type: Number
			},
		};
	}

	constructor() {
		super();
		this.pendingCount = 0;
		this.hasPendingChildren = false;
	}

	connectedCallback() {
		this.addEventListener('pending-state', this.__onPendingState);
		if (super.connectedCallback) {
			super.connectedCallback();
		}
	}

	disconnectedCallback() {
		this.addEventListener('pending-state', this.__onPendingState);
		if (super.disconnectedCallback) {
			super.disconnectedCallback();
		}
	}

	async __onPendingState(e) {
		const promise = e.detail.promise;
		if (promise) {
			this.hasPendingChildren = true;
			this.pendingCount++;
			try {
				await promise;
			} catch (e) {
				// to supress uncaught exception logs
			} finally {
				this.pendingCount--;
				if (this.pendingCount === 0) {
					this.hasPendingChildren = false;
					const pendingEvent = new CustomEvent('pending-resolved', {
						composed: true,
						bubbles: true
					});
					this.dispatchEvent(pendingEvent);
				}
			}
		}
	}
};
