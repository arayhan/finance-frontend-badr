import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./Home/Home"
import AccountNumber from "./AccountNumber/AccountNumber"
import Program from "./Program/Program"
import Donor from "./Donor/Donor"
import DonorForm from "./Donor/DonorForm"
import DonorView from "./Donor/DonorView"

const MainRouter = () => {
	return (
		<Switch>
			<Route exact path="/account-number" component={AccountNumber} />
			<Route exact path="/program" component={Program} />
			<Route exact path="/donor" component={Donor} />
			<Route exact path="/donor/form" component={DonorForm} />
			<Route exact path="/donor/form/:id" component={DonorForm} />
			<Route exact path="/donor/view/:id" component={DonorView} />
			<Route exact path="/transaksi/penerimaan" component={AccountNumber} />
			<Route path="/" component={Home} />
		</Switch>
	)
}

export default MainRouter
