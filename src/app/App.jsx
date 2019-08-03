import React, {Component} from 'react';
import Spinner from '../components/shared/spinner/Spinner';
import Error from '../components/shared/errors/Error';
import {connect} from 'react-redux';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

class App extends Component {

	render() {
		const { children, isLoading, error } = this.props;

		return (
			<div>
				<div className='container'>
				{isLoading ? <Spinner /> : children}
				{error &&
				<Error />}
				</div>
			</div>
		);
	}
}

export default connect(state => ({ routerState: state.router, isLoading: state.isLoading, error: state.error }))(App);