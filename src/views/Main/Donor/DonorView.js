import React, { Component } from "react"
import { Loading } from "../../../components/atoms"

class DonorView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			paramsId: null,
			data: null
		}
	}

	componentDidMount() {
		const params = this.props.match.params
		if (params.id) this._fetchData(params.id)
		else this.props.history.goBack()
	}

	_fetchData = (paramsId) => {
		fetch(`https://jsonplaceholder.typicode.com/comments/${paramsId}`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					paramsId: paramsId,
					data: res
				})
			})
	}

	render() {
		const { paramsId, data } = this.state

		return (
			<div className="app-content">
				<div className="content-header">
					<div className="title">View Sumber Dana</div>
				</div>
				<div className="content-body">
					{!data && <div className="d-flex justify-center"><Loading /></div>}
					{data &&
						<React.Fragment>
							<div className="d-flex flex-lg-column">
								<div className="d-flex flex-md-column w-full">
									<div className="bg-content p-15 w-min-200 w-md-full">Kode</div>
									<div className="text-color-primary p-15 flex-full">{data.id}</div>
								</div>
								<div className="d-flex flex-md-column w-full">
									<div className="bg-content p-15 w-min-200 w-md-full">Nama</div>
									<div className="text-color-primary p-15 flex-full">{data.name}</div>
								</div>
							</div>

							<div className="d-flex flex-lg-column">
								<div className="d-flex flex-md-column w-full">
									<div className="bg-content p-15 w-min-200 w-md-full">Alamat</div>
									<div className="text-color-primary p-15 flex-full">{data.body}</div>
								</div>
								<div className="d-flex flex-md-column w-full">
									<div className="bg-content p-15 w-min-200 w-md-full">Durasi</div>
									<div className="text-color-primary p-15 flex-full">-</div>
								</div>
							</div>

							<div className="d-flex flex-lg-column">
								<div className="d-flex flex-md-column w-full">
									<div className="bg-content p-15 w-min-200 w-md-full">Email</div>
									<div className="text-color-primary p-15 flex-full">{data.email}</div>
								</div>
								<div className="d-flex flex-md-column w-full">
									<div className="bg-content p-15 w-min-200 w-md-full">Web</div>
									<div className="text-color-primary p-15 flex-full">-</div>
								</div>
							</div>
						</React.Fragment>
					}
				</div>
				<div className="content-footer d-flex justify-between align-center">
					<button className="btn btn-white btn-outline" onClick={() => this.props.history.goBack()}>Kembali</button>
					<button className="btn btn-green">Simpan</button>
				</div>
			</div>
		);
	}
}

export default DonorView;
