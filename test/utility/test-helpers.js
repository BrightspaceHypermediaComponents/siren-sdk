// Safari doesn't support formData()
export async function getFormData(request) {
	try {
		const form = await request.formData();
		return form;
	}
	catch (e) {
		if (e.name === 'NotSupportedError') {
			return {
				notSupported: true
			};
		}
		throw e;
	}
}
