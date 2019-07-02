'use strict';

export async function getToken(token) {
	const tokenValue = await ((typeof (token) === 'function')
		? token()
		: token);

	return await new Token(tokenValue);
}

export function compareTokens(a, b) {
	return a.toString() === b.toString();
}

export const TOKEN_COOKIE = -1;
export const TOKEN_COOKIE_CACHE_KEY = 'cookie';

class Token {
	constructor(token) {
		this._cacheKey = this._praseCacheKey(token);
		this._value = token;
	}

	get value() {
		return this._value;
	}

	toString() {
		return this._cacheKey;
	}

	isResolved() {
		return !!this.value;
	}

	/**
	 * From the static data from the JWT create a static key.
	 * @param {*} token
	 */
	_praseCacheKey(token) {
		if (!token) {
			return '';
		}
		if (token === TOKEN_COOKIE) {
			return TOKEN_COOKIE_CACHE_KEY;
		}

		const tokenParts = token.split('.');

		if (tokenParts.length < 3) {
			return token;
		}

		const decoded = JSON.parse(atob(tokenParts[1]).toString());

		const volatileClaims = ['exp', 'iat', 'jti', 'nbf'];
		const normalizedClaims = Object.keys(decoded)
			.filter(function(val) { return volatileClaims.indexOf(val) === -1; })
			.reduce(function(result, key) {
				result[key] = decoded[key];
				return result;
			}, {});

		const cacheKey = btoa(JSON.stringify(normalizedClaims));
		return cacheKey.toLowerCase();
	}
}
