import React from "react";

const Icon = ({ className, name, size, badge }) => {
	return (
		<span className={`icon ${size}`}>
			<i className={name} />
			{badge && <span className="badge"></span>}
		</span>
	);
};

Icon.defaultProps = {
	className: "",
	name: "",
	size: "normal",
	badge: false
};

export default Icon;
