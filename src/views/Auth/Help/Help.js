import React, { Component, Fragment } from "react"
import { Separator } from "../../../components/atoms"

export class Help extends Component {
	render() {
		return (
			<Fragment>
				<div className="title">Bantuan</div>
				<p className="subtitle">
					Kami akan membantu permasalahan yang anda hadapi saat menggunakan
					eManage.
				</p>

				<form>
					<div className="input-wrapper">
						<div className="input-header d-flex justify-between">
							<div className="input-label">Nama *</div>
						</div>
						<div className="input-body">
							<input type="text" placeholder="Ketik Nama" required />
						</div>
						<div className="input-footer">
							<p className="input-feedback error">
								Nama yang Anda masukkan tidak valid!
							</p>
						</div>
					</div>
					<div className="input-wrapper">
						<div className="input-header d-flex justify-between">
							<div className="input-label">Deskripsi *</div>
						</div>
						<div className="input-body">
							<textarea
								type="text"
								placeholder="Ketik Deskripsi"
								required
							></textarea>
						</div>
						<div className="input-footer">
							<p className="input-feedback error">
								Deskripsi yang Anda masukkan tidak valid!
							</p>
						</div>
					</div>
					<div className="input-wrapper">
						<div className="input-header d-flex justify-between">
							<div className="input-label">Upload Gambar</div>
						</div>
						<div className="input-body">
							<input type="file" />
						</div>
					</div>
					<div className="d-flex flex-column align-center">
						<button class="btn btn-primary w-250 mb-25">Masuk</button>
						<Separator width="100%" height="1px" text="Atau" />
						<button class="btn btn-green w-250 mt-25">Melalui Whatsapp</button>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default Help;
