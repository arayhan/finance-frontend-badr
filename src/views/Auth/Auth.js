import React, { Component } from "react"
import AuthRouter from "./AuthRouter"
import { Link } from "react-router-dom"
import { Icon } from "../../components/atoms"

class Auth extends Component {
	render() {
		return (
			<div id="authPage">
				<div className="header d-flex justify-between">
					<div className="left">
						<Link to="/" className="logo d-flex align-center">
							<Icon name="fas fa-donate" />
							<span className="text">eManage</span>
						</Link>
					</div>
					<div className="right">
						<Link to="/help">
							<span>Bantuan</span>
						</Link>
					</div>
				</div>
				<div className="body d-flex flex-md-column">
					<div className="left">
						<p>Kemudahan dalam pengelolaan keuangan adalah kunci</p>
						<p>Sederhana, rapi, dan membantu</p>
					</div>
					<div className="right d-flex flex-column justify-center flex-full">
						<AuthRouter />
					</div>
				</div>
			</div>
		);
	}
}

export default Auth;
