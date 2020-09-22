import React from 'react';
import { Icon } from "../atoms"

const Search = ({ value, onChange, className }) => {
	return (
		<div className={`search ${className}`}>
			<input
				value={value}
				onChange={onChange}
				placeholder={"Cari..."}
			/>
			<Icon name="fa fa-search" size="xsmall" />
		</div>
	);
};


Search.propTypes = {
	value: String,
	onChange: Function,
	className: String
};


export default Search;
