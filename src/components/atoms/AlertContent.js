import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from "./"

const AlertContent = ({ status, message, onClose }) => {
	return (
		<div className={`content-alert alert-${status}`}>
			<div>{message}</div>
			<button
				className="btn btn-icon no-bg"
				onClick={() => {
					if (onClose) onClose()
				}}>
				<Icon name="fas fa-times" size="small" />
			</button>
		</div>
	);
};


AlertContent.propTypes = {
	status: PropTypes.string,
	onClose: PropTypes.element,
};


export default AlertContent;
