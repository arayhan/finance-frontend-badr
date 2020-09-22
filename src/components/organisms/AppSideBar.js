import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom"
import { Icon } from "../atoms"

export class AppSideBar extends Component {
	render() {
		return (
			<div id="appSideBar">
				<ul>
					<li>
						<NavLink exact to="/" activeClassName="active" className="d-flex flex-column">
							<Icon name="fab fa-leanpub" />
							<span className="item-text">Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/account-number" activeClassName="active" className="d-flex flex-column">
							<Icon name="fas fa-luggage-cart" />
							<span className="item-text">Nomor Akun</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/program" activeClassName="active" className="d-flex flex-column">
							<Icon name="fas fa-lightbulb" />
							<span className="item-text">Program</span>
						</NavLink>
					</li >
					<li>
						<NavLink to="/donor" activeClassName="active" className="d-flex flex-column">
							<Icon name="fas fa-layer-group" />
							<span className="item-text">Sumber Dana</span>
						</NavLink>
					</li >
					<li>
						<Link className="d-flex flex-column">
							<Icon name="fas fa-th-large" />
							<span className="item-text">Transaksi</span>
						</Link>
						<ul>
							<li>
								<NavLink to="/transaksi/penerimaan" activeClassName="active" className="d-flex flex-column">
									<Icon name="fab fa-leanpub" />
									<span className="item-text">Penerimaan Kas/Bank</span>
								</NavLink>
							</li>
						</ul>
					</li>
				</ul >
			</div >
		);
	}
}

export default AppSideBar;
