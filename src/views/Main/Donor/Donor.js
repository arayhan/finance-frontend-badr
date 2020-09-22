import React, { Component } from "react"
import { Link } from "react-router-dom"
import { checkStatus, buildUrl } from "../../../utils/Helpers"
import { API_DONORS } from "../../../utils/Services"
import { DataTable, Search } from "../../../components/molecules"
import { AlertContent, Loading } from "../../../components/atoms"

class Donor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
			showAlert: true,
			inputSearch: ''
		}
	}

	componentDidMount() {
		this._fetchData()
	}

	_fetchData = () => {
		fetch('https://jsonplaceholder.typicode.com/comments')
			.then(res => res.json())
			.then(res => {
				this.setState({ data: res })
			})
	}

	_getHeaders = () => {
		return {
			postId: {
				invisible: true
			},
			id: {
				text: 'ID',
			},
			name: {
				text: 'Nama'
			},
			email: {
				text: 'Email'
			},
			body: {
				text: 'Konten',
				sortable: false
			},
		}
	}

	render() {
		const { data, showAlert, inputSearch } = this.state
		const headers = this._getHeaders()

		return (
			<div className="app-content">
				{showAlert &&
					<AlertContent
						status="success"
						message={(
							<div>
								Edit sumber dana dengan kode <b>001</b> berhasil.
								Anda dapat melihat detail data tersebut dengan klik <Link to="/donor">di sini</Link>
							</div>
						)}
						onClose={() => this.setState({ showAlert: false })}
					/>
				}

				<div className="content-header">
					<div className="title">Daftar Sumber Dana</div>
				</div>
				<div className="content-body p-0">
					<div className="d-flex flex-md-column p-20 justify-between">
						<Search
							value={inputSearch}
							onChange={(e) => this.setState({ inputSearch: e.target.value })}
							className="mb-md-10 mr-10 w-md-full"
						/>
						<Link to={'donor/form'} className="btn btn-green">Tambah</Link>
					</div>

					{!data &&
						<div className="d-flex justify-center py-50">
							<Loading />
						</div>
					}

					{data &&
						<DataTable
							headers={headers}
							data={data}
							hasUpdateButton
							hasViewButton
							searchValue={inputSearch}
							actionAccessor="id"
							updateCallback={(value, index, row) => {
								this.props.history.push(`${this.props.location.pathname}/form/${value}`)
							}}
							deleteCallback={(value, index, row) => alert(`DELETE : ${value}`)}
							viewCallback={(value, index, row) => {
								this.props.history.push(`${this.props.location.pathname}/view/${value}`)
							}}
						/>
					}
				</div>
			</div>
		)
	}
}

export default Donor
