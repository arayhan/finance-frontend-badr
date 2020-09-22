import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Login from "./Login/Login"
import Help from "./Help/Help"
import ForgotPassword from "./ForgotPassword/ForgotPassword"
import ResetPassword from "./ResetPassword/ResetPassword"
import { AuthContext } from "../../contexts/AuthContext"

class AuthRouter extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showForgotPasswordInfo: false,
			forgotPasswordInfo: ''
		}
	}

	render() {
		return (
			<AuthContext.Provider value={{
				parentState: this.state
			}}
			>
				<Switch>
					<Route path="/help" component={Help} />
					<Route path="/forgot-password" component={ForgotPassword} />
					<Route path="/reset-password" component={ResetPassword} />
					<Route path="/" component={Login} />
				</Switch>
			</AuthContext.Provider>
		);
	}
}

export default AuthRouter;
