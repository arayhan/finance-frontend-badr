import React, { Component } from "react"
import { GetAuth } from "./utils/Helpers"
import Main from "./views/Main/Main"
import Auth from "./views/Auth/Auth"

class App extends Component {
	render() {
		return GetAuth() ? <Main /> : <Auth />
	}
}

export default App
