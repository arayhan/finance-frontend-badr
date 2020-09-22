const getApiBaseUrl = () => {
	return process.env.REACT_APP_API_ENDPOINT
}

export const API_LOGIN = getApiBaseUrl() + '/auth/login'
export const API_FORGOT_PASSWORD = getApiBaseUrl() + '/auth/forgot-password'
export const API_RESET_PASSWORD = getApiBaseUrl() + '/auth/forgot-password/reset'
export const API_RESET_PASSWORD_VALIDATE = getApiBaseUrl() + '/auth/forgot-password/validate'
export const API_DONORS = getApiBaseUrl() + '/donors'