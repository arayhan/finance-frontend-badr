import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { AlertContent } from "../../../components/atoms"

class DonorForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			paramsId: null,
			showAlert: true,
			formData: {
				post_id: null,
				id: null,
				name: null,
				email: null,
				body: null
			},
		}
	}

	componentDidMount() {
		const params = this.props.match.params
		if (params.id) this._fetchData(params.id)
	}

	_fetchData = (paramsId) => {
		fetch(`https://jsonplaceholder.typicode.com/comments/${paramsId}`)
			.then(res => res.json())
			.then(res => {
				const formData = {
					post_id: res.postId,
					id: res.id,
					name: res.name,
					email: res.email,
					body: res.body
				}

				this.setState({
					paramsId: paramsId,
					formData: formData
				})
			})
	}

	_handleChangeFormData = e => {
		const { formData } = this.state
		const { value, name } = e.target

		formData[name] = value

		this.setState({
			formData: formData
		})
	}

	render() {
		const { paramsId, formData, showAlert } = this.state

		return (
			<div className="app-content">
				{showAlert &&
					<AlertContent
						status="error"
						message="Edit sumber dana tidak berhasil. Silahkan periksa koneksi internet anda atau data yang anda inputkan."
						onClose={() => this.setState({ showAlert: false })}
					/>
				}

				<div className="content-header">
					<div className="title">{!paramsId ? 'Tambah' : 'Update'} Sumber Dana</div>
				</div>
				<div className="content-body">
					<form className="d-flex flex-column">

						<div className="d-flex flex-md-column justify-between align-start">
							<div className="input-wrapper w-full mr-30">
								<div className="input-header d-flex justify-between">
									<div className="input-label">Kode *</div>
								</div>
								<div className="input-body">
									<input
										type="text"
										name="id"
										value={formData.id}
										placeholder="Ketik Kode"
										onChange={this._handleChangeFormData}
										required
										disabled={paramsId}
									/>
								</div>
								<div className="input-footer">
									{!formData.id &&
										<p className="input-feedback error">
											Kode yang Anda masukkan tidak valid!
										</p>
									}
								</div>
							</div>
							<div className="input-wrapper w-full">
								<div className="input-header d-flex justify-between">
									<div className="input-label">Nama *</div>
								</div>
								<div className="input-body">
									<input
										type="text"
										name="name"
										value={formData.name}
										placeholder="Ketik Nama"
										onChange={this._handleChangeFormData}
										required
									/>
								</div>
								<div className="input-footer">
									{!formData.name &&
										<p className="input-feedback error">
											Nama yang Anda masukkan tidak valid!
										</p>
									}
								</div>
							</div>
						</div>

						<div className="d-flex flex-md-column justify-between align-start">
							<div className="input-wrapper w-full mr-30">
								<div className="input-header d-flex justify-between">
									<div className="input-label">Alamat *</div>
								</div>
								<div className="input-body">
									<textarea type="text" placeholder="Ketik Alamat" rows="5" required></textarea>
								</div>
								<div className="input-footer">
									<p className="input-feedback error">
										Alamat yang Anda masukkan tidak valid!
									</p>
								</div>
							</div>
							<div className="input-wrapper w-full">
								<div className="input-header d-flex justify-between">
									<div className="input-label">No.Hp/Telepon *</div>
								</div>
								<div className="input-body">
									<input type="text" placeholder="Ketik No.Hp/Telepon" required />
								</div>
								<div className="input-footer">
									<p className="input-feedback error">
										No.Hp/Telepon yang Anda masukkan tidak valid!
									</p>
								</div>
							</div>
						</div>

						<div className="d-flex flex-md-column justify-between align-start">
							<div className="input-wrapper w-full mr-30">
								<div className="input-header d-flex justify-between">
									<div className="input-label">Email *</div>
								</div>
								<div className="input-body">
									<input type="text" placeholder="Ketik Email" required />
								</div>
								<div className="input-footer">
									<p className="input-feedback error">
										Email yang Anda masukkan tidak valid!
									</p>
								</div>
							</div>
							<div className="input-wrapper w-full">
								<div className="input-header d-flex justify-between">
									<div className="input-label">Web *</div>
								</div>
								<div className="input-body">
									<input type="text" placeholder="Ketik Web" required />
								</div>
								<div className="input-footer">
									<p className="input-feedback error">
										Web yang Anda masukkan tidak valid!
									</p>
								</div>
							</div>
						</div>

					</form>
				</div>

				<div className="content-footer d-flex justify-between align-center">
					<button className="btn btn-white btn-outline" onClick={() => this.props.history.goBack()}>Kembali</button>
					<button className="btn btn-green">Simpan</button>
				</div>
			</div>
		);
	}
}

export default withRouter(DonorForm);
