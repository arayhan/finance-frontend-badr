import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Search } from "../../../components/molecules"
import { Icon, Loading } from "../../../components/atoms"

export class AccountNumber extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputSearch: '',
			data: [
				{
					id: 1,
					name: 'Aset',
					subtopic: [
						{
							id: 1,
							name: 'Aset Lancar',
							subtopic: [
								{
									id: 1,
									name: 'Kas'
								},
								{
									id: 2,
									name: 'Bank'
								},
								{
									id: 3,
									name: 'Surat Berharga'
								},
								{
									id: 4,
									name: 'Piutang',
									subtopic: [
										{
											id: 1,
											name: 'Piutang Karyawan'
										},
										{
											id: 2,
											name: 'Piutang Pihak ke-3'
										}
									]
								}
							]
						}
					]
				}
			]
		}
	}

	render() {
		const { inputSearch, data } = this.state

		return (
			<div className="app-content">
				<div className="content-header">
					<div className="title">Daftar Nomor Akun</div>
				</div>
				<div className="content-body p-0">
					<div className="d-flex flex-md-column p-20 justify-between">
						<Search
							value={inputSearch}
							onChange={(e) => this.setState({ inputSearch: e.target.value })}
							className="mb-md-10 mr-10 w-md-full"
						/>
						<Link to={'account-number/form'} className="btn btn-green">Tambah</Link>
					</div>

					{!data &&
						<div className="d-flex justify-center py-50">
							<Loading />
						</div>
					}

					{data &&
						<div className="datatable">
							<div className="datatable-body">
								<table>
									<thead>
										<tr>
											<th>Nomor Akun</th>
											<th>Aksi</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<span className="mr-20"><Icon name="fa fa-chevron-down" /></span>
												<span>1 - Aset</span>
											</td>
											<td>
												<div className="d-flex">
													<button className="btn btn-icon btn-primary mr-5">
														<Icon name="fa fa-edit" />
													</button>
													<button className="btn btn-icon btn-red">
														<Icon name="fa fa-trash" />
													</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default AccountNumber
