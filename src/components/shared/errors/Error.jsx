import React from 'react';

import {connect} from 'react-redux';

class Error extends React.Component{

	render() {
		const {data} = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="error-template">
						<h1>Oops!</h1>
						<div className="error-details">
							{data}
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default connect(state => ({data: state.error}))(Error);