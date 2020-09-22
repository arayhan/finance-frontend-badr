import React, { Component, Fragment } from "react"
import { AppHeader, AppSideBar } from "../../components/organisms"
import MainRouter from "./MainRouter"

class Main extends Component {
	render() {
		return (
			<Fragment>
				<AppHeader />
				<div className="d-flex">
					<AppSideBar />
					<MainRouter />
				</div>
			</Fragment>
		);
	}
}

export default Main
