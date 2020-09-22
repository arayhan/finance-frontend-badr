import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Separator } from "../atoms";
import store from "store";

export class AppHeader extends Component {
	_handleLogout = () => {
		store.remove("userdata");
		window.location.href = "/";
	};

	render() {
		return (
			<div id="appHeader">
				<div className="d-flex justify-between align-center">
					<div className="left">
						<Link to="/" className="logo d-flex align-center">
							<Icon name="fas fa-donate" />
							<span className="text">eManage</span>
						</Link>
					</div>
					<div className="right d-flex align-center">
						<div className="menu d-flex align-center">
							<button>
								<Icon name="fas fa-bell" badge />
							</button>
							<Separator width="2px" height="40px" />
							<button>
								<Icon name="fas fa-question-circle" />
							</button>
						</div>
						<div className="profile-menu d-flex align-center">
							<div className="image">
								<img
									src="https://brandyourself.com/blog/wp-content/uploads/linkedin-profile-picture-tips.png"
									alt="profile"
								/>
							</div>
							<div className="name">Adriana C. Ocampo</div>
							<button className="btn btn-text" onClick={this._handleLogout}>
								<Icon name="fas fa-sign-out-alt" size="small" />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AppHeader;
