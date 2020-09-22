import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import store from "store"

import { API_LOGIN } from "../../../utils/Services"
import { isValidEmail, checkStatus } from "../../../utils/Helpers"
import { AuthContext } from "../../../contexts/AuthContext"

export class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',

			displayFeedbackEmail: 'none',
			displayFeedbackPassword: 'none',
			displayErrorInfo: 'none',

			passwordInputType: 'password',
			showHidePasswordLabel: 'Tampilkan',

			displayLoginButton: 'block',
			displayLoading: 'none',

			errorMessage: ''
		}

		this._handleInputChange = this._handleInputChange.bind(this)
		this._handleLogin = this._handleLogin.bind(this)
		this._handleShowHidePassword = this._handleShowHidePassword.bind(this)
	}

	async _handleLogin(event) {
		event.preventDefault()

		this.setState({
			displayLoading: 'block',
			displayLoginButton: 'none'
		})

		const self = this
		const url = API_LOGIN

		let email = this.state.email
		let password = this.state.password

		let data = {
			email: email,
			password: password
		}

		await fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(checkStatus)
		.then(function(json) {
			store.set("userdata", json)
			window.location.href = "/"
		})
		.catch(function(err) {
			self.setState({
				errorMessage: err,
				displayErrorInfo: 'block',
				displayLoading: 'none',
				displayLoginButton: 'block'
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

		if (name === 'email') {
			this.setState({
				displayFeedbackEmail: isValidEmail(value) ? 'none' : 'block'
			})
		}
	}

	_handleShowHidePassword() {
		let nextState = 'password'
		let nextLabel = 'Tampilkan'
		if (this.state.passwordInputType === 'password') {
			nextState = 'text'
			nextLabel = 'Sembunyikan'
		}

		this.setState({
			passwordInputType: nextState,
			showHidePasswordLabel: nextLabel
		})
	}

	render() {
		return (
			<Fragment>
				<div className="title">Login</div>
				<p className="subtitle">
					Ketikkan email dan password anda untuk mengakses fitur utama
				</p>

				<form>
					<div className="input-wrapper">
						<div className="input-header">
							<div className="input-label">Email *</div>
						</div>
						<div className="input-body">
							<input name="email" type="email" placeholder="Ketik Email"
								value={this.state.email} onChange={this._handleInputChange} required />
						</div>
						<div className="input-footer">
							<p className="input-feedback error" style={{ display: this.state.displayFeedbackEmail }}>
								Email yang Anda masukkan tidak valid!
							</p>
						</div>
					</div>
					<div className="input-wrapper">
						<div className="input-header d-flex justify-between">
							<div className="input-label">Password *</div>
							<div className="input-label label-forgot-password">
								Lupa Password?{" "}
								<Link to="forgot-password" className="text-link no-underline">
									Klik di sini
								</Link>
							</div>
						</div>
						<div className="input-body">
							<input name="password" type={this.state.passwordInputType} placeholder="Ketik Password"
								value={this.state.password} onChange={this._handleInputChange} required />
							<button type="button" className="show-password" onClick={this._handleShowHidePassword}>
								{this.state.showHidePasswordLabel}
							</button>
						</div>
						<div className="input-footer">
							<p className="input-feedback error" style={{ display: this.state.displayFeedbackPassword }}>
								Password yang Anda masukkan tidak valid!
							</p>
						</div>
					</div>
					<div className="d-flex justify-end">
						<button
							type="button"
							className="btn btn-primary"
							onClick={this._handleLogin}
							style={{ display: this.state.displayLoginButton }}
						>
							Masuk
						</button>
						<div className="loading-icon" style={{ display: this.state.displayLoading }}><div></div><div></div><div></div></div>
					</div>
					<div id="error-info" className="form-info bg-red mt-30" style={{ display: this.state.displayErrorInfo }}>
						{this.state.errorMessage}
					</div>
					<div id="success-info" className="form-info bg-green mt-30" style={{ display: this.context.parentState.showForgotPasswordInfo ? 'block' : 'none' }}>
						{this.context.parentState.forgotPasswordInfo}
					</div>
				</form>
			</Fragment>
		);
	}
}

Login.contextType = AuthContext
export default Login;
