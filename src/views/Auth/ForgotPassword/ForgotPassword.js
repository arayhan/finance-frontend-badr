import React, { Component, Fragment } from "react"

import { API_FORGOT_PASSWORD } from "../../../utils/Services"
import { isValidEmail } from "../../../utils/Helpers"
import { AuthContext } from "../../../contexts/AuthContext"
import { withRouter } from "react-router-dom"

class ForgotPassword extends Component {
	constructor(props) {
        super(props)

        this.state = {
            email: '',

			displayFeedbackEmail: 'none',

			displayForgotButton: 'block',
			displayLoading: 'none'
		}
		
		this._handleInputChange = this._handleInputChange.bind(this)
		this._handleForgotPassword = this._handleForgotPassword.bind(this)
	}

	async _handleForgotPassword(event) {
		const { history } = this.props

		event.preventDefault()

		this.setState({
			displayLoading: 'block',
			displayForgotButton: 'none'
		})

		const url = API_FORGOT_PASSWORD

        let email = this.state.email

        let data = {
            email: email
        }

        await fetch(
            url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            }
        )

		this.context.parentState.showForgotPasswordInfo = true
		this.context.parentState.forgotPasswordInfo = 'Pengaturan password baru sudah dikirim ke email anda. Silahkan periksa link anda.'
		history.push('/')
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

	render() {
		return (
			<Fragment>
				<div className="title">Lupa Password</div>
				<p className="subtitle">
					Ketikkan email anda dan kami akan mengirimkan link untuk mengubah
					password.
				</p>

				<form>
					<div className="input-wrapper">
						<div className="input-header">
							<div className="input-label">Email *</div>
						</div>
						<div className="input-body">
							<input type="email" placeholder="Ketik Email" name="email"
								value={this.state.email} onChange={this._handleInputChange} required />
						</div>
						<div className="input-footer">
							<p className="input-feedback error" style={{ display: this.state.displayFeedbackEmail }}>
								Email yang Anda masukkan tidak valid!
							</p>
						</div>
					</div>
					<div className="d-flex justify-end">
						<button type="button" className="btn btn-primary" onClick={this._handleForgotPassword} style={{ display: this.state.displayForgotButton }}>
							Kirim
						</button>
						<div className="loading-icon" style={{ display: this.state.displayLoading }}><div></div><div></div><div></div></div>
					</div>
				</form>
			</Fragment>
		);
	}
}

ForgotPassword.contextType = AuthContext
export default withRouter(ForgotPassword)
