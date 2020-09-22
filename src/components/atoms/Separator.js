import React from "react";

const Separator = ({ width, height, color, text }) => {
	return (
		<span
			className={`separator ${color}`}
			style={{ width: width, height: height, background: color }}
		>
			{text && <span className="text">{text}</span>}
		</span>
	);
};

Separator.defaultProps = {
	width: "1px",
	height: "100%",
	color: "#e6eef4",
	text: ""
};

export default Separator;
