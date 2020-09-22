import React, { Component, Fragment } from "react"

import { API_RESET_PASSWORD, API_RESET_PASSWORD_VALIDATE } from "../../../utils/Services"
import { isValidPassword, checkStatus } from "../../../utils/Helpers"
import { AuthContext } from "../../../contexts/AuthContext"
import { withRouter } from "react-router-dom"

export class ResetPassword extends Component {
	constructor(props) {
		super(props)

		this.state = {
			valid: 0,

			password: '',
			confirmPassword: '',

			displayFeedbackPassword: 'none',
			displayFeedbackConfirmPassword: 'none',

			passwordInputType1: 'password',
			showHidePasswordLabel1: 'Tampilkan',
			passwordInputType2: 'password',
			showHidePasswordLabel2: 'Tampilkan',

			displayErrorInfo: 'none',
			errorMessage: '',

			displaySaveButton: 'block',
			displayLoading: 'none'
		}

		this._handleInputChange = this._handleInputChange.bind(this)
		this._handleResetPassword = this._handleResetPassword.bind(this)
		this._handleShowHidePassword1 = this._handleShowHidePassword1.bind(this)
		this._handleShowHidePassword2 = this._handleShowHidePassword2.bind(this)
	}

	async _handleResetPassword(event) {
		const { history } = this.props

		event.preventDefault()

		this.setState({
			displayLoading: 'block',
			displaySaveButton: 'none'
		})

		const self = this
		const url = API_RESET_PASSWORD

		let token = this.getToken()

		let password = this.state.password
		let confirmPassword = this.state.confirmPassword

		if (!(isValidPassword(password) && password === confirmPassword)) {
			return
		}

		let data = {
			password: password
		}

		await fetch(url, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(data)
		})
		.then(checkStatus)
		.then(function(json) {
			self.context.parentState.showForgotPasswordInfo = true
			self.context.parentState.forgotPasswordInfo = 'Password Anda berhasil diperbarui.'
			history.push('/')
		})
		.catch(function(err) {
			self.setState({
				displayErrorInfo: 'block',
				errorMessage: 'Terdapat kesalahan',
				displayLoading: 'none',
				displaySaveButton: 'block'
			})
		})
	}

	_handleInputChange(event) {
		let target = event.target
		let value = target.value
		let name = target.name

		this.setState({
			[name]: value
		})

		if (name === 'password') {
			this.setState({
				displayFeedbackPassword: isValidPassword(value) ? 'none' : 'block'
			})
		}

		if (name === 'confirmPassword') {
			this.setState({
				displayFeedbackConfirmPassword: this.state.password === value ? 'none' : 'block'
			})
		}
	}

	_handleShowHidePassword1() {
		let nextState = 'password'
		let nextLabel = 'Tampilkan'
		if (this.state.passwordInputType1 === 'password') {
			nextState = 'text'
			nextLabel = 'Sembunyikan'
		}

		this.setState({
			passwordInputType1: nextState,
			showHidePasswordLabel1: nextLabel
		})
	}

	_handleShowHidePassword2() {
		let nextState = 'password'
		let nextLabel = 'Tampilkan'
		if (this.state.passwordInputType2 === 'password') {
			nextState = 'text'
			nextLabel = 'Sembunyikan'
		}

		this.setState({
			passwordInputType2: nextState,
			showHidePasswordLabel2: nextLabel
		})
	}

	componentWillMount() {
		this.validateToken()
	}

	async validateToken() {
		const url = API_RESET_PASSWORD_VALIDATE
		const self = this

		let token = this.getToken()

		await fetch(
			url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}
		).then(function (response) {
			let status = response.status
			let valid = -1

			if (status === 200) {
				valid = 1
			}

			self.setState({
				valid: valid
			})
		})
	}

	getToken() {
		let pathname = window.location.pathname
		let pathNameArr = pathname.split('/')

		return pathNameArr[pathNameArr.length - 1]
	}

	render() {
		const formResetPassword = (
			<Fragment>
				<div className="title">Ketikkan Password Baru</div>
				<p className="subtitle">
					Ketikkan password baru dan konfirmasi passoword baru. Pastikkan
					password berupa kombinasi huruf dan angka.
				</p>

				<form>
					<div className="input-wrapper">
						<div className="input-header d-flex justify-between">
							<div className="input-label">Password Baru *</div>
						</div>
						<div className="input-body">
							<input
								type={this.state.passwordInputType1}
								name="password"
								placeholder="Ketik Password Baru"
								value={this.state.password}
								onChange={this._handleInputChange}
								required
							/>
							<button type="button" className="show-password" onClick={this._handleShowHidePassword1}>
								{this.state.showHidePasswordLabel1}
							</button>
						</div>
						<div className="input-footer">
							<p className="input-feedback error" style={{ display: this.state.displayFeedbackPassword }}>
								Password yang Anda masukkan tidak valid!
							</p>
						</div>
					</div>
					<div className="input-wrapper">
						<div className="input-header d-flex justify-between">
							<div className="input-label">Konfirmasi Password Baru *</div>
						</div>
						<div className="input-body">
							<input
								type={this.state.passwordInputType2}
								name="confirmPassword"
								placeholder="Ketik Konfirmasi Password Baru"
								value={this.state.confirmPassword}
								onChange={this._handleInputChange}
								required
							/>
							<button type="button" className="show-password" onClick={this._handleShowHidePassword2}>
								{this.state.showHidePasswordLabel2}
							</button>
						</div>
						<div className="input-footer">
							<p className="input-feedback error" style={{ display: this.state.displayFeedbackConfirmPassword }}>
								Password yang Anda masukkan tidak sesuai!
							</p>
						</div>
					</div>
					<div className="d-flex justify-end">
						<button className="btn btn-primary" onClick={this._handleResetPassword} style={{ display: this.state.displaySaveButton }}>Simpan</button>
						<div className="loading-icon" style={{ display: this.state.displayLoading }}><div></div><div></div><div></div></div>
					</div>
					<div id="error-info" className="form-info bg-red mt-30" style={{ display: this.state.displayErrorInfo }}>
						{this.state.errorMessage}
					</div>
				</form>
			</Fragment>
		)

		if (this.state.valid === 1) {
			return formResetPassword
		} else if (this.state.valid === -1) {
			return (
				<Fragment>
					<div className="title">Not Found</div>
				</Fragment>
			)
		} else {
			return (
				<Fragment></Fragment>
			)
		}
	}
}

ResetPassword.contextType = AuthContext
export default withRouter(ResetPassword)
