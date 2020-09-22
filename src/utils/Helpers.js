import store from "store"

export const GetAuth = () => {
	let userdata = store.get("userdata")

	return userdata || false
}

export function isValidEmail(str) {
	if (str === null || str === '') {
		return false
	}

	const regexPatt = /(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}/
	let result = str.match(regexPatt)

	return result || false
}

export function isValidPassword(str) {
	if (str === null || str === '') {
		return false
	}

	const regexPatt = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
	let result = str.match(regexPatt)

	return result || false
}

export async function checkStatus(response) {
	if (response.ok) {
		let json = await response.json()
		if (json.error_detail) {
			let body = JSON.parse(json.error_detail.http_body)
			throw body.message
		}
		return json
	} else {
		let json = await response.json()
		throw json.message
	}
}

export function buildUrl(url, params) {
	let paramString = ''
	let count = 0
	let paramsLength = Object.getOwnPropertyNames(params).length
	for (let [key, value] of Object.entries(params)) {
		paramString = paramString + key + '=' + value
		if (++count < paramsLength) {
			paramString = paramString + '&'
		}
	}

	return encodeURI(url + '?' + paramString)
}