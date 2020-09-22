import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import SmartDataTable from 'react-smart-data-table'
import ReactPaginate from "react-paginate"
import PropTypes from "prop-types"
import PopPop from "react-poppop";
import { Icon } from "../atoms"

DataTable.propTypes = {
	headers: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	hasActions: PropTypes.bool,
	hasFooter: PropTypes.bool,
	hasViewButton: PropTypes.bool,
	hasUpdateButton: PropTypes.bool,
	actionAccessor: PropTypes.string,
	updateCallback: PropTypes.func,
	deleteCallback: PropTypes.func,
	viewCallback: PropTypes.func,
	perPage: PropTypes.number,
	onRowClick: PropTypes.func,
	hoverable: PropTypes.bool,
	searchValue: PropTypes.string
};

DataTable.defaultProps = {
	hasActions: true,
	hasFooter: false,
	hasViewButton: true,
	hasUpdateButton: false,
	hoverable: true,
	searchValue: '',
}

function DataTable({
	headers,
	data,
	hasActions,
	hasFooter,
	hasViewButton,
	hasUpdateButton,
	searchValue,
	actionAccessor,
	updateCallback,
	deleteCallback,
	viewCallback,
	onRowClick,
	hoverable
}) {

	const [perPage, setPerPage] = useState(10)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedRow, setSelectedRow] = useState(null) // to get the selected row id for delete button
	const location = useLocation()

	const pageSizes = [5, 10, 15, 20, 25, 30, 40, 50]

	// Show Actions
	if (data && hasActions) {
		data.forEach((item, index) => {
			// push "actions" to data, parse value from key action accessor
			data[index].actions = actionAccessor ? data[index][actionAccessor] : index
		})

		// push action key to headers
		headers.actions = {
			text: 'Actions',
			sortable: false,
			invisible: !data,
			filterable: false,
			transform: (value, index, row) => {
				return (
					<div className="d-flex">
						{hasViewButton &&
							<button
								className="btn btn-icon btn-green mr-5"
								onClick={() => {
									if (viewCallback) viewCallback(value, index, row)
								}}
							>
								<Icon name="fa fa-eye" />
							</button>
						}
						{hasUpdateButton &&
							<button
								className="btn btn-icon btn-primary mr-5"
								onClick={() => {
									if (updateCallback) updateCallback(value, index, row)
								}}
							>
								<Icon name="fa fa-edit" />
							</button>
						}
						<button
							className="btn btn-icon btn-red"
							onClick={() => {
								setSelectedRow(row)
								if (deleteCallback) setShowDeleteModal(true)
							}}
						>
							<Icon name="fa fa-trash" />
						</button>
					</div>
				)
			},
		}
	}

	return (
		<div className="datatable">
			{showDeleteModal &&
				<PopPop
					open={showDeleteModal}
					closeBtn={true}
					closeOnEsc={true}
					position="centerCenter"
					onClose={() => setShowDeleteModal(false)}
				>
					<div className="py-20 px-50 text-center ">
						<h1 className="mb-20 text-title-size-normal text-color-primary">Delete</h1>
						<div className="mb-10">Apakah anda yakin</div>
						<div className="mb-30">akan menghapus <b>{selectedRow[actionAccessor]}</b> dari database?</div>
						<div className="d-flex justify-center">
							<button
								className="btn btn-transparent btn-outline mr-15"
								onClick={() => {
									if (deleteCallback) deleteCallback(selectedRow.actions)
									setShowDeleteModal(false)
								}}
							>
								Ya
							</button>
							<button
								className="btn btn-green"
								onClick={() => setShowDeleteModal(false)}
							>
								Batal
							</button>
						</div>
					</div>
				</PopPop>
			}

			<div className="datatable-body">
				<SmartDataTable
					sortable
					withFooter={hasFooter}
					data={data}
					filterValue={searchValue}
					headers={headers}
					perPage={perPage}
					className={`${onRowClick ? 'table-clickable' : ''} ${hoverable ? 'table-hoverable' : ''}`}
					onRowClick={(event, { rowData, rowIndex, tableData }) => {
						if (onRowClick) onRowClick(rowData, rowIndex, tableData[rowIndex][actionAccessor])
					}}
					emptyTable={(
						<div className="text-center text-color-primary p-30">
							<div className="mb-10">Pencarian dengan kata kunci <b><i>{searchValue}</i></b> tidak ditemukan.</div>
							<div className="mb-10">Silahkan cari dengan kata kunci lainnya atau anda dapat menambahkannya</div>
							<div>dengan klik <b><i>tombol tambah</i></b>.</div>
						</div>
					)}
					paginator={({ activePage, totalPages, onPageChange }) => (
						<div className="datatable-footer d-flex flex-lg-column align-center justify-end">
							<div className="perpage mr-30 mr-md-0 mb-md-15">
								<span>Show</span>
								<select
									value={perPage}
									className="mx-5"
									onChange={e => setPerPage(Number(e.target.value))}
								>
									{pageSizes.map(pageSize => (
										<React.Fragment>
											{pageSize <= data.length &&
												<option key={pageSize} value={pageSize}>
													{pageSize}
												</option>
											}
										</React.Fragment>
									))}
								</select>
								<span>per page</span>
							</div>

							<ReactPaginate
								previousLabel={'PREV'}
								nextLabel={'NEXT'}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageCount={totalPages}
								forcePage={activePage - 1}
								marginPagesDisplayed={1}
								pageRangeDisplayed={3}
								onPageChange={(page) => {
									onPageChange(page, { activePage: page.selected + 1 })
								}}
								containerClassName={'pagination'}
								subContainerClassName={'pages pagination'}
								activeClassName={'active'}
							/>
						</div>)}
				/>
			</div>
		</div >
	)
}

export default DataTable;
