import React from 'react';
// Import the styles for this component
import './Header.css';

// A functional component that has static information to be rendered on the screen
const Header = () => {
	return (
		<div className="row">
			<div id="forHeader" className="col-sm-12">
				<h1>LOTTO+...on the GO</h1>
			</div>
		</div>
	);
};
// Export the component to be used by other files
export default Header;