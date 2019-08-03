import React, {Component} from 'react';
import { connect } from 'react-redux';
import Spinner from '../components/shared/spinner/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

class App extends Component {

	render() {
		const { children, isLoading } = this.props;

		return (
			<div>
				<div className='container'>
				{isLoading ? <Spinner /> : children}
				</div>
			</div>
		);
	}
}

export default connect(state => ({ routerState: state.router, isLoading: state.isLoading }))(App);