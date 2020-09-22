import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Search } from "../../../components/molecules"
import { Loading } from "../../../components/atoms"

class Program extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputSearch: '',
			data: null
		}
	}

	render() {
		const { inputSearch, data } = this.state

		return (
			<div className="app-content">
				<div className="content-header">
					<div className="title">Daftar Anggaran Program</div>
				</div>
				<div className="content-body p-0">
					<div className="d-flex flex-md-column p-20 justify-between">
						<Search
							value={inputSearch}
							onChange={(e) => this.setState({ inputSearch: e.target.value })}
							className="mb-md-10 mr-10 w-md-full"
						/>
						<Link to={'program/form'} className="btn btn-green">Tambah</Link>
					</div>

					{!data &&
						<div className="d-flex justify-center py-50">
							<Loading />
						</div>
					}
				</div>
			</div>
		);
	}
}

export default Program;
